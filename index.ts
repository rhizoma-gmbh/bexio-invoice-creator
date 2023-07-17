import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import * as schema from "./lib/schema.ts";
import { Invoice } from "./lib/invoice.ts";
import { Output, formatText } from "./lib/klog.ts";
import { request } from "./lib/request.ts";

const decoder = new TextDecoder();
const groups: Record<string, number> = {};

for await (const chunk of Deno.stdin.readable) {
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

const positions = Object.entries(groups).map<schema.PositionCreate>(
  ([text, amount]) => ({
    amount: (amount / 60).toFixed(2),
    unit_id: 2,
    account_id: 150,
    tax_id: 16,
    text: formatText(text),
    unit_price: "75",
    discount_in_percent: "0",
    type: "KbPositionCustom",
  })
);

const invoice = Invoice.create({
  title: "",
  contact_id: 8,
  contact_sub_id: null,
  user_id: 1,
  pr_project_id: null,
  language_id: 4,
  bank_account_id: 1,
  currency_id: 1,
  payment_type_id: 4,
  header: "",
  footer: "",
  mwst_type: 0,
  mwst_is_net: false,
  show_position_taxes: false,
  is_valid_from: "",
  is_valid_to: "",
  reference: "",
  api_reference: "",
  template_slug: "",
  positions: [],
}).addPositions(positions);

try {
  const response = await request(
    "/2.0/kb_invoice",
    "POST",
    {},
    invoice.toJSON()
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
