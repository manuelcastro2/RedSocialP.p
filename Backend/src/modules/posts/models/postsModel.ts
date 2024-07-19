import z from "zod";

const userSchema = z.object({
userId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  content: z.string().url().optional(),
  media: z.enum(['photo','video']).optional(),
  caption: z.string(),
  createAt: z.date()
});

export function validateUser(input: object) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input: object) {
  return userSchema.partial().safeParse(input);
}
