import z from "zod";

const friendsSchema = z.object({
  userId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  friendId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  status: z.enum(['pending','accepted','rejected'])
});

export function validateFriends(input: object) {
  return friendsSchema.safeParse(input);
}

export function validatePartialFriends(input: object) {
  return friendsSchema.partial().safeParse(input);
}
