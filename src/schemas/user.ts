import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export const User = z.object({
  id: z.number(),
  salutation_type: z.enum(["male", "female"]),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  is_superadmin: z.boolean(),
  is_accountant: z.boolean(),
});
