import z from "zod";

const photovideoSchema = z.object({
  postsId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  userId: z.string(),
  url: z.string().url({
    message: "the url of the image is invalid",
  }),
});

export function validatePhotovideo(input: object) {
  return photovideoSchema.safeParse(input);
}

export function validatePartialPhotovideo(input: object) {
  return photovideoSchema.partial().safeParse(input);
}


