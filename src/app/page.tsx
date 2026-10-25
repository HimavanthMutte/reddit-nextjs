import { Button } from "@heroui/react";

import { logOut, logIn } from "@/actions";

import { auth } from "@/auth";

import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <form action={logIn}>
        <Button type="submit">Log In</Button>
      </form>
      <form action={logOut}>
        <Button type="submit">Log Out</Button>
      </form>
      {session?.user ? (
        <h1>{JSON.stringify(session.user)}</h1>
      ) : (
        <h1>SIGNED OUT</h1>
      )}
      <Profile />
    </>
  );
}
