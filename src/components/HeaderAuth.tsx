"use client";

import { useSession } from "next-auth/react";

import { Button, Avatar, Popover } from "@heroui/react";
import { signIn, signOut } from "@/actions/userActions";

export default function HeaderAuth() {
  const session = useSession();

  let authContent;

  if (session.data?.user)
    authContent = (
      <Popover>
        <Popover.Trigger>
          <Avatar>
            <Avatar.Image
              alt={session.data.user.name || "user"}
              src={session.data.user.image!}
            />
            <Avatar.Fallback>
              {session.data.user.name![0].trim().toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
        </Popover.Trigger>
        <Popover.Content placement="left" className="max-w-64 rounded-md">
          <Popover.Dialog>
            <form action={signOut}>
              <Button type="submit" className="rounded-md" variant="danger">
                Sign Out
              </Button>
            </form>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    );
  else {
    authContent = (
      <div className="flex flex-row justify-between gap-3">
        <form action={signIn}>
          <Button type="submit" className="rounded-sm" variant="outline">
            Sign In
          </Button>
        </form>
        <form action={signIn}>
          <Button type="submit" className="rounded-sm" variant="primary">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
  return <div className="flex shrink-0 items-center gap-3">{authContent}</div>;
}
