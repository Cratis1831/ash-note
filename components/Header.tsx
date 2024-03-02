import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleMode } from "./ToggleMode";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm border-b">
      {/* Logo */}
      <div className="flex justify-between items-center m-4">
        <h1 className="text-4xl font-bold">
          Ash<span className="text-primary">Notes</span>
        </h1>
        <div className="flex items-center gap-2">
          <SignedOut>
            <Button>
              <SignInButton mode="modal" afterSignInUrl="/dashboard" />
            </Button>
          </SignedOut>
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
