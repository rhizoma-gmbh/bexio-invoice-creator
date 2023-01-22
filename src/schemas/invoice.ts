import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import {
  PositionArticleExtended,
  PositionCustomExtended,
  PositionDiscountExtended,
  PositionPagebreakExtended,
  PositionSubtotalExtended,
  PositionTextExtended,
} from "./positions.ts";

export const InvoiceRequest = z.object({
  title: z.string().nullable(),
  contact_id: z.number(),
  contact_sub_id: z.number().nullable(),
  user_id: z.number(),
  pr_project_id: z.number().nullable(),
  language_id: z.number(),
  bank_account_id: z.number(),
  currency_id: z.number(),
  payment_type_id: z.number(),
  header: z.string(),
  footer: z.string(),
  mwst_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  mwst_is_net: z.boolean(),
  show_position_taxes: z.boolean(),
  is_valid_from: z.string(),
  is_valid_to: z.string(),
  reference: z.string().nullable(),
  api_reference: z.string().nullable(),
  template_slug: z.string().nullable(),
  positions: z.array(
    z.union([
      PositionCustomExtended,
      PositionArticleExtended,
      PositionTextExtended,
      PositionSubtotalExtended,
      PositionPagebreakExtended,
      PositionDiscountExtended,
    ])
  ),
});

export function createInvoiceRequestObject(
  positions: { amount: string; text: string }[]
) {
  return {
    title: "",
    contact_id: 2, // Radicle Foundation
    contact_sub_id: null,
    user_id: 1, // Sebastian Martinez
    pr_project_id: null,
    language_id: 4, // English
    bank_account_id: 1, // Raiffeisen Account
    currency_id: 1, // CHF
    payment_type_id: 4, // Rechnung
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
    positions: positions.map(({ amount, text }) => ({
      amount,
      unit_id: 2, // unit hours
      account_id: 150, // Dienstleistungserlös
      tax_id: 16, // 7.7%
      text,
      unit_price: "75",
      discount_in_percent: "0",
      type: "KbPositionCustom",
    })),
  };
}

export const InvoiceResponse = z.object({
  id: z.number(),
  document_nr: z.string(),
  title: z.string(),
  contact_id: z.number(),
  contact_sub_id: z.number().nullable(),
  user_id: z.number(),
  project_id: z.number().nullable(),
  logopaper_id: z.number(),
  language_id: z.number(),
  bank_account_id: z.number(),
  currency_id: z.number(),
  payment_type_id: z.number(),
  header: z.string(),
  footer: z.string(),
  total_gross: z.string(),
  total_net: z.string(),
  total_taxes: z.string(),
  total_received_payments: z.string(),
  total_credit_vouchers: z.string(),
  total_remaining_payments: z.string(),
  total: z.string(),
  total_rounding_difference: z.number(),
  mwst_type: z.number(),
  mwst_is_net: z.boolean(),
  show_position_taxes: z.boolean(),
  is_valid_from: z.string(),
  is_valid_to: z.string(),
  contact_address: z.string(),
  kb_item_status_id: z.number(),
  reference: z.string().nullable(),
  api_reference: z.string().nullable(),
  viewed_by_client_at: z.string().nullable(),
  updated_at: z.string(),
  esr_id: z.number(),
  qr_invoice_id: z.number(),
  template_slug: z.string(),
  taxs: z.object({ percentage: z.string(), value: z.string() }).array(),
  network_link: z.string(),
});

export const InvoicesResponses = InvoiceResponse.array();

export type Invoice = z.infer<typeof InvoiceResponse>;
export type Invoices = z.infer<typeof InvoicesResponses>;
