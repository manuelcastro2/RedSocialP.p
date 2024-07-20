import z from "zod";

const messagesSchema = z.object({
  sederId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  receiverId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  content: z.string(),
  sendAt: z.date(),
});

export function validateMessages(input: object) {
  return messagesSchema.safeParse(input);
}

export function validatePartialMessages(input: object) {
  return messagesSchema.partial().safeParse(input);
}

