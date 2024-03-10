import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-6">
      <h2 className="font-bold text-5xl">Uh oh!</h2>
      <p className="text-2xl text-muted-foreground">
        Could not find the page you were looking for.
      </p>
      <Link href="/" className="text-primary hover:underline">
        Go Back Home
      </Link>
    </div>
  );
}
