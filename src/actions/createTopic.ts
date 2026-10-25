"use server";
//we need to revalidate homepage
import { z } from "zod";

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
  };
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without numbers",
    }),
  description: z.string().min(10),
});

export async function createTopic(
  formState: CreateTopicFormState,
  formdata: FormData,
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formdata.get("name"),
    description: formdata.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  return { errors: {} };
}
