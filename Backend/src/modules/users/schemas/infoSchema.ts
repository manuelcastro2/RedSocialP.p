import z from "zod";

export const infoSchema = z.object({
  userId: z.string({required_error:"the user is required"}),
  birthPlace: z.string().optional(),
  academicStudies: z.string().optional(),
  contact: z.string().optional(),
  infoBasic: z.object({
    sex: z.string().optional(),
    birthDate: z.coerce.date().optional(),
  }).optional()
});

export type Info = z.infer<typeof infoSchema>;

export function validatePartialInfo(input: object) {
  return infoSchema.safeParse(input);
}
