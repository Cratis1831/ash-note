"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleMode } from "./ToggleMode";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DrawerMenu from "./DrawerMenu";

function Logo() {
  return (
    <Link href="/dashboard">
      <h1 className="text-2xl md:text-4xl font-bold">
        Ash<span className="text-primary">Notes</span>
      </h1>
    </Link>
  );
}

function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-background shadow-sm border-b py-6 md:px-12 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-8">
        {/* Logo */}
        <SignedIn>
          {/* Mobile Menu on SignedIn */}
          <div className="md:hidden">
            <DrawerMenu />
          </div>
        </SignedIn>
        <Logo />

        <div className="flex items-center gap-4">
          {pathname !== "/" && (
            <SignedOut>
              <Button>
                <SignInButton mode="modal" afterSignInUrl="/dashboard" />
              </Button>
            </SignedOut>
          )}
          <SignedIn>
            <Button variant="ghost" asChild className="hidden md:block">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <ToggleMode />
        </div>
      </div>
    </header>
  );
}

export default Header;
