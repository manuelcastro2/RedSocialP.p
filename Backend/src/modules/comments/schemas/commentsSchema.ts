import z from "zod";

const commentsSchema = z.object({
  postId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  userId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  content: z.string(),
});

export type Comments=z.infer<typeof commentsSchema>

export function validateComments(input: object) {
  return commentsSchema.safeParse(input);
}

export function validatePartialComments(input: object) {
  return commentsSchema.partial().safeParse(input);
}
