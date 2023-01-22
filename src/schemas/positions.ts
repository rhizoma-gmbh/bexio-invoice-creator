import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export const PositionCustomExtended = z.object({
  amount: z.string(),
  unit_id: z.number(),
  account_id: z.number(),
  tax_id: z.number(),
  text: z.string(),
  unit_price: z.string(),
  discount_in_percent: z.string(),
  type: z.literal("KbPositionCustom"),
  parent_id: z.number().nullable(),
});

export const PositionArticleExtended = z.object({
  amount: z.string(),
  unit_id: z.number(),
  account_id: z.number(),
  tax_id: z.number(),
  text: z.string(),
  unit_price: z.string(),
  discount_in_percent: z.string(),
  article_id: z.number(),
  type: z.literal("KbPositionArticle"),
  parent_id: z.number().nullable(),
});

export const PositionTextExtended = z.object({
  text: z.string(),
  show_pos_nr: z.boolean(),
  type: z.literal("KbPositionText"),
  parent_id: z.number().nullable(),
});

export const PositionSubtotalExtended = z.object({
  text: z.string(),
  type: z.literal("KbPositionSubtotal"),
});

export const PositionPagebreakExtended = z.object({
  pagebreak: z.boolean(),
  type: z.literal("KbPositionPagebreak"),
});

export const PositionDiscountExtended = z.object({
  text: z.string(),
  is_percentual: z.boolean(),
  value: z.string(),
  type: z.literal("KbPositionDiscount"),
});
