import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export const Project = z.object({
  id: z.number(),
  uuid: z.string(),
  nr: z.string(),
  name: z.string(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  comment: z.string(),
  pr_state_id: z.number(),
  pr_project_type_id: z.number(),
  contact_id: z.number(),
  contact_sub_id: z.number().nullable(),
  pr_invoice_type_id: z.number().nullable(),
  pr_invoice_type_amount: z.string(),
  pr_budget_type_id: z.number().nullable(),
  pr_budget_type_amount: z.string(),
});
