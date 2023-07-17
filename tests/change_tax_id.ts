import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { request } from "../lib/request.ts";

const response = await request("/2.0/kb_invoice", "GET");
const invoices = await response.json();

const invoicesToEdit = invoices
  .filter((i) => new Date(i.is_valid_from) > new Date("2023-01-01"))
  .map((i) => i.id);

for (const invoiceId of invoicesToEdit) {
  const response = await request(
    `/2.0/kb_invoice/${invoiceId}/kb_position_custom`,
    "GET"
  );
  const positions = await response.json();

  for (const position of positions) {
    try {
      await request(
        `/2.0/kb_invoice/${invoiceId}/kb_position_custom/${position.id}`,
        "POST",
        {},
        {
          amount: position.amount,
          unit_id: position.unit_id,
          account_id: position.account_id,
          tax_id: 28,
          text: position.text,
          unit_price: position.unit_price,
          discount_in_percent: position.discount_in_percent,
        }
      );
    } catch (e) {
      console.warn(
        `Not able to update position ${position.id} in invoice ${invoiceId} (${e.message}))`
      );
    }
  }
}
