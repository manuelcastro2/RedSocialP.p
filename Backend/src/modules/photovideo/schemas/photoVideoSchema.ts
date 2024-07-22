import z from "zod";

const photoVideoSchema = z.object({
  postsId: z.string({
    required_error: "user is missing",
    invalid_type_error: "user is not valid",
  }),
  userId: z.string(),
  url: z.string().url({
    message: "the url of the image is invalid",
  }),
});

export type PhotoVideo=z.infer<typeof photoVideoSchema>

export function validatePhotoVideo(input: object) {
  return photoVideoSchema.safeParse(input);
}

export function validatePartialPhotoVideo(input: object) {
  return photoVideoSchema.partial().safeParse(input);
}
