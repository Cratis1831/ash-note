"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Switch } from "@/components/ui/switch";
import { StatusUpdate } from "@/components/set-status";

function NoteDetails() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<string>("pending");

  const { user } = useUser();

  let userId: string | undefined = undefined;

  userId = user?.id ?? "";

  const { slug } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const task = useQuery(api.tasks.getTaskBySlug, {
    slug: slug as string,
    userId,
  });
  const updateTask = useMutation(api.tasks.updateTask);
  const isLoading = task === undefined;

  const handleUpdateTask = async (id: Id<"tasks">) => {
    try {
      setIsSubmitting(true);
      if (title === "" || description === "") {
        throw new Error("Title and description are required");
        // TODO: Add Form and zod for validation
      }
      await updateTask({
        id: id,
        title,
        description,
        isCompleted: isCompleted,
        status: statusUpdate,
      });
      toast({
        variant: "success",
        title: "Updated Note",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to update note",
      });
    }
    setIsSubmitting(false);
    router.back();
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsCompleted(task.isCompleted);
      setStatusUpdate(task.status);
    }
  }, [task]);

  return (
    <div className="flex flex-col max-w-sm md:max-w-xl gap-6 ml-6">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <div className="text-2xl">Loading your note...</div>
        </div>
      )}

      {!isLoading && task !== null && (
        <div className="flex flex-col max-w-xl gap-6 ml-6">
          <div>
            <Label htmlFor="title" className="text-right text-primary">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title of the note"
              className="col-span-3 mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-right text-primary">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description of the note"
              className="col-span-3 mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="slug" className="text-right text-primary">
              Slug
            </Label>
            <div className="col-span-3 mt-2">
              <Input
                id="slug"
                placeholder="Slug of the note"
                className="col-span-3 mt-2 cursor-not-allowed"
                value={slug}
                disabled
              />
            </div>
          </div>
          <div>
            <Label htmlFor="status" className="text-right text-primary">
              Status
            </Label>
            <div className="col-span-3 mt-2">
              <StatusUpdate
                status={statusUpdate}
                onStatusUpdate={(status) => {
                  setStatusUpdate(status);
                }}
              />
            </div>
          </div>

          <Button
            onClick={() => handleUpdateTask(task!._id)}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            Save Note
          </Button>
        </div>
      )}
    </div>
  );
}

export default NoteDetails;
