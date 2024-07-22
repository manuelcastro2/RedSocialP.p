import z from "zod";

const postSchema = z.object({
userId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  content: z.string().url().optional(),
  media: z.enum(['photo','video']).optional(),
  caption: z.string(),
  likes:z.number().optional(),
  createAt: z.date()
});

export type Post=z.infer<typeof postSchema>

export function validatePosts(input: object) {
  return postSchema.safeParse(input);
}

export function validatePartialPosts(input: object) {
  return postSchema.partial().safeParse(input);
}
