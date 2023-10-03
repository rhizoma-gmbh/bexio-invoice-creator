import fluent, { FluentIterable } from "fluent-iterable";
import * as schema from "./lib/schema";
import { Invoice } from "./lib/invoice";
import { Output, formatText } from "./lib/klog";
import { request } from "./lib/request";

const groups = new Map<string, number>();

for await (const line of console) {
  if (line) {
    const obj: Output = JSON.parse(line);
    obj.records.forEach((record) => {
      record.entries.forEach((entry) => {
        const key = `${record.date}: ${entry.summary.trim()}`;
        const value = groups.get(key);
        if (value) {
          groups.set(key, entry.total_mins + value);
        } else {
          groups.set(key, entry.total_mins);
        }
      });
    });
  }
}

const positions: FluentIterable<schema.PositionCreate> = fluent(
  groups.entries()
).map(([text, amount]) => ({
  amount: (amount / 60).toFixed(2),
  unit_id: 2,
  account_id: 150,
  tax_id: 28,
  text: formatText(text),
  unit_price: "75",
  discount_in_percent: "0",
  type: "KbPositionCustom",
}));

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
  mwst_is_net: true,
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
