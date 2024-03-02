"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import NoteCard from "./NoteCard";
import { Plus } from "lucide-react";
import Image from "next/image";

function Dashboard() {
  const tasks = useQuery(api.tasks.getTaskList);
  const addTask = useMutation(api.tasks.addTask);
  return (
    <div>
      <div className="flex items-center justify-center mx-auto mt-4">
        <Button
          onClick={() =>
            addTask({
              title: "My New Task",
              description: "Description of the task",
            })
          }
        >
          <Plus className="mr-2" /> Create Note
        </Button>
      </div>
      <div className="flex items-center justify-center mt-32">
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto mt-8 p-8">
        {tasks?.map((task) => (
          <div key={task._id} className="">
            <NoteCard
              title={task.title}
              description={task.description}
              isCompleted={task.isCompleted}
              creationTime={task._creationTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
