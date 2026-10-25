import { auth } from "@/auth";

import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Navbar />
    </>
  );
}
