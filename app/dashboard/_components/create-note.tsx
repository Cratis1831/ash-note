"use client";
import { StatusUpdate } from "@/components/set-status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

function CreateNote() {
  const addTask = useMutation(api.tasks.addTask);
  const { userId } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTask = async () => {
    try {
      setIsSubmitting(true);
      if (title === "" || description === "") {
        throw new Error("Title and description are required");
        // TODO: Add Form and zod for validation
      }
      await addTask({
        title,
        description,
        userId: userId ?? "",
        status: statusUpdate,
      });
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setStatusUpdate("");
    setIsSubmitting(false);
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Create a new note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            Create your new note here. Click Create Note when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-primary">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title of the note"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right text-primary">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description of the note"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
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
        </div>
        <DialogFooter>
          <Button onClick={handleAddTask} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            Create Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNote;
