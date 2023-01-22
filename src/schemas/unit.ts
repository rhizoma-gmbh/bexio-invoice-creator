import { z } from "https://deno.land/x/zod@v3.16.1/index.ts";
import { request } from "../lib.ts";

export const Unit = z.object({
  id: z.number(),
  name: z.string(),
});

export const getUnitByName = async (name: string) => {
  const units = await Unit.parse(await request("/2.0/unit"));
  return units.find((unit) => unit.name === name);
};
