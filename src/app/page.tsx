import { Button } from "@heroui/react";

import { signIn } from "@/actions/userActions";

export default function Home() {
  return (
    <form action={signIn}>
      <Button type="submit">Log In</Button>
    </form>
  );
}
