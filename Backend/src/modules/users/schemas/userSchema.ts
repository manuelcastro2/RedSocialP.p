import z from "zod";

export const userSchema = z.object({
  name: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }).min(5),
  nameUser:z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  createAt: z.date()
});

export type User=z.infer<typeof userSchema>

export function validateUser(input: object) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input: object) {
  return userSchema.partial().safeParse(input);
}
