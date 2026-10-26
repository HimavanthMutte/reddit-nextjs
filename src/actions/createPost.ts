"use server";

//we need to revalidate both home page and topic page

import { z } from "zod";
import { auth } from "@/auth";
import type { Post } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { paths } from "@/path";
import { revalidatePath } from "next/cache";

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formdata: FormData,
): Promise<CreatePostFormState> {
  console.log("1. Action called");
  console.log("Current form errors:", formState.errors);
  const result = createPostSchema.safeParse({
    title: formdata.get("title"),
    content: formdata.get("content"),
  });

  console.log("2. Validation result:", result);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  console.log("3. Validation passed");

  const session = await auth();
  console.log("4. Session:", session?.user?.email);

  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }
    return {
      errors: {
        _form: ["Something went wrong"],
      },
    };
  }

  console.log("7. Revalidating homepage");
  revalidatePath("/");

  console.log("8. Revalidating topicpage");
  revalidatePath(paths.getTopicShowPath(slug));

  console.log("9. Redirecting to:", paths.getTopicShowPath(topic.slug));
  redirect(paths.getPostShowPath(slug, post.id));

  return { errors: {} };
}
