import NavBar from "./NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  space-y-6 mt-4">
      <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden  w-[200px] border-r flex-col md:flex ml-4 pr-4">
          <NavBar />
        </aside>
        {children}
      </div>
    </div>
  );
}
