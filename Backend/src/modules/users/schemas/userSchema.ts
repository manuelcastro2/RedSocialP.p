import z from "zod";

export const userSchema = z.object({
  name: z.string(),
  nameUser: z.string({
      required_error: "user is missing",
      invalid_type_error: "user is not valid"
    }).length(4),
  photoUser: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type User = z.infer<typeof userSchema>;

export function validateUser(input: object) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input: object) {
  return userSchema.partial().safeParse(input);
}
