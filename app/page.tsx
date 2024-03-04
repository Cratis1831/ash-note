import { Button } from "@/components/ui/button";
import { SignUpButton, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col gap-8 max-w-lg mt-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight">
          A simple <span className="text-primary">note</span> taking app.
        </h1>
      </div>
      <SignedOut>
        <SignUpButton mode="modal" afterSignInUrl="/dashboard">
          <Button size="lg"> Get Started</Button>
        </SignUpButton>
      </SignedOut>
    </main>
  );
}
