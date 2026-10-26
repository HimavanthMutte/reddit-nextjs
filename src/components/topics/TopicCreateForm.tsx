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
import { createTopic } from "@/actions";
export default function TopicCreateForm() {
  const [formState, updatedCreateTopicAction, isPending] = useActionState(
    createTopic,
    {
      errors: {},
    },
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Popover.Trigger>
          <Button variant="primary">Create Topic</Button>
        </Popover.Trigger>
        <Popover.Content placement="left">
          <Popover.Dialog>
            <Form action={updatedCreateTopicAction}>
              <div className="flex flex-col gap-4 p-4 w-80">
                <h3>Create a Topic</h3>
                <TextField>
                  <Label htmlFor="input-name">Name</Label>
                  <Input
                    name="name"
                    id="input-name"
                    placeholder="Enter topic name..."
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {formState.errors.name?.map((error) => (
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
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  {formState.errors.description?.map((error) => (
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
