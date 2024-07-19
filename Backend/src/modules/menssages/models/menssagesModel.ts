import z from "zod";

const menssagesSchema = z.object({
  sederId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  reciverId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  content: z.string(),
  sendAt: z.date(),
});

export function validateMenssages(input: object) {
  return menssagesSchema.safeParse(input);
}

export function validatePartialMenssages(input: object) {
  return menssagesSchema.partial().safeParse(input);
}
