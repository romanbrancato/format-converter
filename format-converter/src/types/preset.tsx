import { z } from "zod";

const PresetSchema = z.object({
    name: z.string(),
    removed: z.array(z.string()).nullable(),
    added: z.array(z.record(z.string())).nullable(),
    edited: z.array(z.record(z.string())).nullable(),
    order: z.array(z.string()),
    export: z.enum(["csv", "txt"]),
    widths: z.array(z.record(z.number())).nullable(),
    symbol: z.string(),
});

export type Preset = z.infer<typeof PresetSchema>;