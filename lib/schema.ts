import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

export const userSchema = z.object({
  salutation_type: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  title_id: z.number(),
});

export type User = z.infer<typeof userSchema>;

export const titleSchema = z.object({
  name: z.string(),
});

export type Title = z.infer<typeof titleSchema>;

export const languageSchema = z.object({
  id: z.number(),
  name: z.string(),
  decimal_point: z.string(),
  thousands_separator: z.string(),
  date_format_id: z.number(),
  date_format: z.string(),
  iso_639_1: z.string(),
});

export type Language = z.infer<typeof languageSchema>;

export const currencySchema = z.object({
  id: z.number(),
  name: z.string(),
  round_factor: z.number(),
});

export type Currency = z.infer<typeof currencySchema>;

export const positionSchema = z.object({
  id: z.number(),
  amount: z.string(),
  unit_id: z.number(),
  account_id: z.number(),
  unit_name: z.string(),
  tax_id: z.number(),
  tax_value: z.string(),
  text: z.string(),
  unit_price: z.string(),
  discount_in_percent: z.string(),
  position_total: z.string(),
  pos: z.number(),
  internal_pos: z.number(),
  is_optional: z.boolean(),
  type: z.literal("KbPositionCustom"),
  parent_id: z.number().nullable(),
});

export type Position = z.infer<typeof positionSchema>;

export const positionCreateSchema = z.object({
  amount: z.string(),
  unit_id: z.number(),
  account_id: z.number(),
  tax_id: z.number(),
  text: z.string(),
  unit_price: z.string(),
  discount_in_percent: z.string(),
  type: z.literal("KbPositionCustom"),
});

export type PositionCreate = z.infer<typeof positionCreateSchema>;

export const taxSchema = z.object({
  percentage: z.string(),
  value: z.string(),
});

export const invoiceGetSchema = z.object({
  id: z.number(),
  document_nr: z.string(),
  title: z.string().nullable(),
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
  reference: z.null(),
  api_reference: z.null(),
  viewed_by_client_at: z.null(),
  updated_at: z.string(),
  esr_id: z.number(),
  qr_invoice_id: z.number(),
  template_slug: z.string(),
  taxs: z.array(taxSchema),
  network_link: z.string(),
  positions: z.array(positionSchema),
});

export type Invoice = z.infer<typeof invoiceGetSchema>;

export const invoiceCreateSchema = z.object({
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
  mwst_type: z.number(),
  mwst_is_net: z.boolean(),
  show_position_taxes: z.boolean(),
  is_valid_from: z.string(),
  is_valid_to: z.string(),
  reference: z.string().nullable(),
  api_reference: z.string().nullable(),
  template_slug: z.string(),
  positions: z.array(positionCreateSchema),
});

export type InvoiceCreate = z.infer<typeof invoiceCreateSchema>;
