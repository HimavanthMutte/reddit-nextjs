"use client";

import {
  Button,
  Popover,
  Input,
  Label,
  TextArea,
  TextField,
  FieldError,
} from "@heroui/react";
import { useActionState } from "react";
import { createTopic } from "@/actions";
export default function TopicCreateForm() {
  const [formState, updatedCreateTopicAction, isPending] = useActionState(
    createTopic,
    {
      errors: {},
    },
  );
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Popover.Trigger>
          <Button variant="primary">Create Topic</Button>
        </Popover.Trigger>
        <Popover.Content placement="left">
          <Popover.Dialog>
            <form action={updatedCreateTopicAction}>
              <div className="flex flex-col gap-4 p-4 w-80">
                <h3>Create a Topic</h3>
                <TextField isInvalid={!!formState.errors?.name?.length}>
                  <Label htmlFor="input-name">Name</Label>
                  <Input
                    name="name"
                    id="input-name"
                    placeholder="Enter topic name..."
                    type="text"
                  />
                  <FieldError>{formState.errors?.name?.join(",")}</FieldError>
                </TextField>
                <TextField isInvalid={!!formState.errors?.description?.length}>
                  <Label htmlFor="input-topic">Description</Label>
                  <TextArea
                    name="description"
                    id="input-topic"
                    placeholder="Describe your topic..."
                    className="resize-none"
                  />
                  <FieldError>
                    {formState.errors?.description?.join(",")}
                  </FieldError>
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
            </form>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
