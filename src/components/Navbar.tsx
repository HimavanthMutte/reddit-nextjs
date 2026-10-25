import Link from "next/link";
import { Button, Input, Avatar, Popover } from "@heroui/react";
import { signIn, signOut } from "@/actions/userActions";

import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  let authContent = null;

  if (session?.user)
    authContent = (
      <Popover>
        <Popover.Trigger>
          <Avatar>
            <Avatar.Image
              alt={session.user.name || "user"}
              src={session.user.image!}
            />
            <Avatar.Fallback>
              {session.user.name![0].trim().toUpperCase()}
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-lg font-bold text-white"></div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Discuss
          </span>
        </Link>

        <form
          action=""
          method="GET"
          className="hidden w-full max-w-md sm:block"
        >
          <Input
            name="q"
            placeholder="Search discussions..."
            aria-label="Search discussions"
            className="w-full text-gray-400"
          />
        </form>

        <div className="flex shrink-0 items-center gap-3">{authContent}</div>
      </div>
    </nav>
  );
}
