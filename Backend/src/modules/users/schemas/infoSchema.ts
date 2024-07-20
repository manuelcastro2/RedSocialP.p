import z from "zod";

const infoSchema = z.object({
  userId:z.string(),
  birthPlace: z.string(),
  academic_training: z.string(),
  contact: z.string(),
  infoBasic: z.object({
    sex: z.string(),
    birthDate: z.date(),  
  }),
});

export function validatePartialInfo(input: object) {
  return infoSchema.partial().safeParse(input);
}
