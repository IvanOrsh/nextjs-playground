import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "@/components/buttons";

export default function NavMenu() {
  return (
    <nav className="bg-white flex justify-between items-center py-4 border-b border-gray-300">
      <Image src="/logo.svg" width={150} height={30} alt="NextSpace Logo" />

      <ul className="flex items-center space-x-4">
        <li className="text-2xl font-bold text-blue-600 hover:text-blue-800">
          <Link href="/about">About</Link>
        </li>

        <li className="text-2xl font-bold text-blue-600 hover:text-blue-800">
          <Link href="/blog">Blog</Link>
        </li>

        <li className="text-2xl font-bold text-blue-600 hover:text-blue-800">
          <Link href="/users">Users</Link>
        </li>

        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
}
