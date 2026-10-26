"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { paths } from "@/path";
import { revalidatePath } from "next/cache";

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
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
  console.log("1. Action called");
  console.log("Current form errors:", formState.errors);
  const result = createTopicSchema.safeParse({
    name: formdata.get("name"),
    description: formdata.get("description"),
  });

  console.log("2. Validation result:", result);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  console.log("3. Validation passed");

  const session = await auth();
  console.log("4. Session:", session?.user?.email);

  // Keep the rest of your existing code here.
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  let topic: Topic;
  console.log("5. Creating topic");

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });

    console.log("6. Topic created:", topic);
  } catch (err: unknown) {
    console.error("DATABASE ERROR:", err);

    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }

    return {
      errors: {
        _form: ["Something went wrong."],
      },
    };
  }

  console.log("7. Revalidating homepage");
  revalidatePath("/");

  console.log("8. Redirecting to:", paths.getTopicShowPath(topic.slug));
  redirect(paths.getTopicShowPath(topic.slug));

  return { errors: {} };
}
