"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleMode } from "./ToggleMode";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm border-b">
      {/* Logo */}
      <div className="flex justify-between items-center my-4 mx-8">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            Ash<span className="text-primary">Notes</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
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
