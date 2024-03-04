"use client";
import { api } from "@/convex/_generated/api";
import NoteCard from "./_components/NoteCard";
import Image from "next/image";
import CreateNote from "./_components/CreateNote";
import { useQuery } from "convex/react";

function Dashboard() {
  const tasks = useQuery(api.tasks.getTaskList);

  return (
    <div className="pl-8 pr-8">
      <div className="flex items-center justify-between mx-auto mt-4">
        <h1 className="text-2xl md:text-4xl font-semibold">Your Notes</h1>
        {/* <SearchBar /> */}
        <CreateNote />
      </div>
      <div className="flex items-center justify-center mt-12 md:mt-32">
        {tasks !== undefined && tasks?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-8">
            <Image
              src="/no_data.svg"
              width="400"
              height="400"
              alt="image showing no data"
            />
            <p className="text-3xl">No notes found!</p>
          </div>
        )}
        {tasks === undefined && <p>Loading tasks...</p>}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto">
        {tasks?.map((task) => (
          <div key={task._id} className="">
            <NoteCard {...task} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
