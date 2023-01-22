import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export const BankAccount = z.object({
  id: z.number(),
  name: z.string(),
  owner: z.string(),
  owner_address: z.string(),
  owner_zip: z.string(),
  owner_city: z.string(),
  bc_nr: z.string(),
  bank_name: z.string(),
  bank_nr: z.string(),
  bank_account_nr: z.string(),
  iban_nr: z.string(),
  currency_id: z.number(),
  account_id: z.number(),
  remarks: z.string(),
  qr_invoice_iban: z.string(),
  type: z.literal("bank"),
  invoice_mode: z.enum([
    "none",
    "qr_iban",
    "iban_with_creditor_reference",
    "iban_only",
  ]),
});
