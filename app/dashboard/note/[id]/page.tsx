"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

function NoteDetails() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const task = useQuery(api.tasks.getTask, { id: id as Id<"tasks"> });

  const isLoading = task === undefined;

  return (
    <div className="flex flex-col max-w-xl gap-6 ml-6">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <div className="text-2xl">Loading your note...</div>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col max-w-xl gap-6 ml-6">
          <div>
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title of the note"
              className="col-span-3 text-primary"
              value={task.title || title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description of the note"
              className="col-span-3 text-primary"
              value={task.description || description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetails;
