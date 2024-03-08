"use client";
import { api } from "@/convex/_generated/api";
import NoteCard from "./_components/NoteCard";
import Image from "next/image";
import CreateNote from "./_components/CreateNote";
import { useQuery, useConvexAuth } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "./_components/SearchBar";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

function Placeholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 ">
      <Image
        src="/no_data.svg"
        width="300"
        height="300"
        alt="image showing no data"
        className=""
        priority
      />
      <p className="text-2xl">You have no notes, add some now</p>
    </div>
  );
}

function Dashboard() {
  const [search, setSearch] = useState("");

  const { isAuthenticated, isLoading } = useConvexAuth();

  const tasks = useQuery(
    api.tasks.getTaskList,
    isAuthenticated ? undefined : "skip"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-12 md:mt-16">
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <div className="text-2xl">Loading your notes...</div>
        </div>
      </div>
    );
  }

  // const isLoading = tasks === undefined;

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pl-8 pr-8 mb-8">
      <h1 className="text-2xl md:text-4xl font-semibold pb-4">Your Notes</h1>
      <div className="flex justify-between mt-4 gap-2 mb-8">
        {/* <SearchBar /> */}
        <SearchBar search={search} setSearch={setSearch} />
        <CreateNote />
      </div>
      {filteredTasks?.length === 0 && <Placeholder />}
      {filteredTasks && filteredTasks?.length > 0 && (
        <Tabs defaultValue="Grid">
          <TabsList className="mb-4">
            <TabsTrigger value="Grid">Grid View</TabsTrigger>
            <TabsTrigger value="DataTable" className="hidden md:flex">
              Table View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Grid">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto ">
              {filteredTasks?.map((task) => (
                <div key={task._id}>
                  <NoteCard task={task} gridView />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="DataTable" className="hidden md:flex">
            <DataTable columns={columns} data={filteredTasks} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default Dashboard;
