"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleMode } from "./ToggleMode";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import DrawerMenu from "./DrawerMenu";

function Logo({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Link href={isLoggedIn ? "/dashboard" : "/"}>
      <h1 className="text-2xl md:text-4xl font-bold">
        Ash<span className="text-primary">Notes</span>
      </h1>
    </Link>
  );
}

function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-background shadow-sm border-b py-6 md:px-12 sticky top-0">
      {/* Logo */}
      <div className="flex justify-between items-center mx-8">
        <SignedOut>
          <Logo isLoggedIn={false} />
        </SignedOut>
        <SignedIn>
          {/* Mobile Menu on SignedIn */}
          <div className="md:hidden">
            <DrawerMenu />
          </div>
          {/* Logo */}
          <Logo isLoggedIn={true} />
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
