import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { request } from "./lib.ts";
import { createInvoiceRequestObject } from "./lib/invoice.ts";

const decoder = new TextDecoder();
const groups: Record<string, number> = {};

for await (const chunk of Deno.stdin.readable) {
  // TODO: Handle possible partial chunk.
  const obj: Output = JSON.parse(decoder.decode(chunk));

  obj.records.forEach((record) => {
    record.entries.forEach((entry) => {
      const key = `${record.date}: ${entry.summary.trim()}`;
      if (key in groups) {
        groups[key] = entry.total_mins + groups[key];
      } else {
        groups[key] = entry.total_mins;
      }
    });
  });
}

const invoices = Object.entries(groups).map(([text, amount]) => ({
  amount: (amount / 60).toFixed(2),
  text: formatText(text),
}));

try {
  const response = await request(
    "/2.0/kb_invoice",
    "POST",
    createInvoiceRequestObject(invoices)
  );
  if (response.ok) {
    console.log("");
    console.log("Invoice created");
  } else {
    console.error("");
    console.error("Not able to create the invoice");
    console.error(response.status, response.statusText, response.url);
  }
} catch (e) {
  console.error(e);
}
