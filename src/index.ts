import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import { CsvLine, readCsvReport } from "./csv.ts";
import { request } from "./lib.ts";
import { createInvoiceRequestObject } from "./schemas/invoice.ts";

const csv = await readCsvReport("./report.csv");

function createText(line: CsvLine) {
  if (line.endDate) {
    return `${line.startDate} - ${line.endDate}: ${line.project}: ${line.description}`;
  }
  return `${line.startDate}: ${line.project}: ${line.description}`;
}

const invoices = csv.map((item) => ({
  amount: item.hours.toString(),
  text: createText(item),
}));

console.log(invoices);

const response = await request(
  "/2.0/kb_invoice",
  "POST",
  createInvoiceRequestObject(invoices)
);

if (response.ok) {
  console.log("Invoice created");
}
