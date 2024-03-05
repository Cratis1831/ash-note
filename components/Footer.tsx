import Link from "next/link";

export function Footer() {
  return (
    <div className="py-4 flex items-center border-t">
      <div className="mx-auto flex items-center gap-8">
        <div>AshNotes</div>

        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
}
