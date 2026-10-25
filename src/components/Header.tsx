import Link from "next/link";
import { Input } from "@heroui/react";

import HeaderAuth from "./HeaderAuth";
export default async function Header() {
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
        <HeaderAuth />
      </div>
    </nav>
  );
}
