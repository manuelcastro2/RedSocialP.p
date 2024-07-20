import z from "zod";

const photovideoShema = z.object({
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
  return photovideoShema.safeParse(input);
}

export function validatePartialPhotovideo(input: object) {
  return photovideoShema.partial().safeParse(input);
}
