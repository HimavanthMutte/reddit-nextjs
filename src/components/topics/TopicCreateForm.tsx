import { Button, Popover, Input, Label, TextArea } from "@heroui/react";

import { createTopic } from "@/actions";
export default function TopicCreateForm() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Popover.Trigger>
          <Button variant="primary">Create Topic</Button>
        </Popover.Trigger>
        <Popover.Content placement="left">
          <Popover.Dialog>
            <form action={createTopic}>
              <div className="flex flex-col gap-4 p-4 w-80">
                <h3>Create a Topic</h3>
                <Label htmlFor="input-name">Name</Label>
                <Input
                  name="name"
                  id="input-name"
                  placeholder="Enter topic name..."
                  type="text"
                />
                <Label htmlFor="input-topic">Description</Label>
                <TextArea
                  name="description"
                  id="input-topic"
                  placeholder="Describe your topic..."
                  className="resize-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="rounded-md shadow-lg"
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
