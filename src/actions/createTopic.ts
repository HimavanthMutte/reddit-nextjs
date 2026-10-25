"use server";
//we need to revalidate homepage
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]$/, {
      message: "Must be lowercase letters or dashes without numbers",
    }),
  description: z.string().min(10),
});

export async function createTopic(formdata: FormData) {
  const result = createTopicSchema.safeParse({
    name: formdata.get("name"),
    description: formdata.get("description"),
  });

  if (!result.success) console.log(result.error.flatten().fieldErrors);
}
