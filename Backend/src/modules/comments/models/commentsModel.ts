import z from "zod";

const commentsSchema = z.object({
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

export function validateComments(input: object) {
  return commentsSchema.safeParse(input);
}

export function validatePartialComments(input: object) {
  return commentsSchema.partial().safeParse(input);
}
