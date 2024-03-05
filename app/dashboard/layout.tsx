import NavBar from "./_components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <aside className="hidden border-r flex-col md:flex ml-8 pr-8 md:inset-y-28 md:fixed md:h-screen">
        <NavBar />
      </aside>
      <div className="md:pl-60 mt-8 pb-2 px-4">{children}</div>
    </div>
  );
}
