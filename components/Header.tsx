"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleMode } from "./ToggleMode";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-background shadow-sm border-b py-6 px-12">
      {/* Logo */}
      <div className="flex justify-between items-center mx-8">
        <SignedOut>
          <Link href="/">
            <h1 className="text-4xl font-bold">
              Ash<span className="text-primary">Notes</span>
            </h1>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <h1 className="text-4xl font-bold">
              Ash<span className="text-primary">Notes</span>
            </h1>
          </Link>
        </SignedIn>
        <div className="flex items-center gap-4">
          {pathname !== "/" && (
            <SignedOut>
              <Button>
                <SignInButton mode="modal" afterSignInUrl="/dashboard" />
              </Button>
            </SignedOut>
          )}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ToggleMode />
        </div>
      </div>
    </header>
  );
}

export default Header;
