import NextBreadcrumb from "@/components/BreadCrumbs";
import NavBar from "./_components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#fafafa] dark:bg-background">
      <aside className="hidden border-r flex-col md:flex ml-8 pr-8 md:inset-y-28 md:fixed md:h-screen">
        <NavBar />
      </aside>
      <div className="md:pl-60 mt-8 pb-2 px-4">
        <NextBreadcrumb
          homeElement={"Home"}
          separator={<span> &gt; </span>}
          activeClasses="text-primary"
          containerClasses="flex py-5 pl-8 max-w-sm truncate md:max-w-2xl"
          listClasses="mx-2 font-bold"
          capitalizeLinks
        />
        {children}
      </div>
    </div>
  );
}
