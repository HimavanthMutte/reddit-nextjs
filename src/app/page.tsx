import { Button } from "@heroui/react";

import { signIn } from "@/actions/userActions";
import { signOut } from "@/actions/userActions";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <form action={signIn}>
        <Button type="submit">Log In</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">Log Out</Button>
      </form>
      {session?.user ? (
        <h1>{JSON.stringify(session.user)}</h1>
      ) : (
        <h1>SIGNED OUT</h1>
      )}
    </>
  );
}
