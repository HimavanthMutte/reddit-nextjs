"use client";

import {
  Button,
  Popover,
  Input,
  Label,
  Form,
  TextArea,
  TextField,
} from "@heroui/react";
import { useActionState, useState } from "react";
import { createPost } from "@/actions";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, updatedCreatePostAction, isPending] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {},
    },
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Popover.Trigger>
          <Button variant="primary">Create Post</Button>
        </Popover.Trigger>
        <Popover.Content placement="left">
          <Popover.Dialog>
            <Form action={updatedCreatePostAction}>
              <div className="flex flex-col gap-4 p-4 w-80">
                <h3>Create a Post</h3>
                <TextField>
                  <Label htmlFor="input-name">Title</Label>
                  <Input
                    name="title"
                    id="input-title"
                    placeholder="Enter title..."
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  {formState.errors.title?.map((error) => (
                    <p key={error} className="text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                </TextField>
                <TextField>
                  <Label htmlFor="input-topic">Description</Label>
                  <TextArea
                    name="description"
                    id="input-topic"
                    placeholder="Describe your topic..."
                    className="resize-none"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                  {formState.errors.content?.map((error) => (
                    <p key={error} className="text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                </TextField>
                {formState.errors._form ? (
                  <div className="p-2 bg-red-300 border border-red-400">
                    {formState.errors._form}
                  </div>
                ) : null}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="rounded-md shadow-lg"
                  isDisabled={isPending}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
