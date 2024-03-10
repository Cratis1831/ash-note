import NextBreadcrumb from "@/components/bread-crumbs";
import NavBar from "./_components/nav-bar";
import { auth } from "@clerk/nextjs/server";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  auth().protect();
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
