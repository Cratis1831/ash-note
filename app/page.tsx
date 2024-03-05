import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 ">
      <div className="flex flex-col gap-8 max-w-lg mt-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight">
          A simple <span className="text-primary">note</span> taking app.
        </h1>
      </div>
      <SignedOut>
        <SignInButton
          mode="modal"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          <Button size="lg"> Get Started</Button>
        </SignInButton>
      </SignedOut>

      <div className="border rounded-lg shadow-2xl md:w-[1024px] overflow-clip m-8">
        <Image src="/main.png" width="2710" height="1625" alt="main" priority />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-12">
        <div className="border rounded-lg shadow-2xl md:w-[768px] overflow-clip m-8">
          <Image
            src="/new_note.png"
            width="2710"
            height="1625"
            alt="new_note"
            priority
          />
        </div>
        <div className="flex flex-col gap-2 max-w-sm md:max-w-md">
          <h3 className="text-3xl font-bold tracking-tighter">Create Notes</h3>
          <p className="text-md text-muted-foreground">
            Create notes and organize them with notebooks. You can also add
            descriptions to your notes.
          </p>
        </div>
      </div>
    </main>
  );
}
