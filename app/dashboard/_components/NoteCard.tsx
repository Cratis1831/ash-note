"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import {
  Edit2,
  MoreVertical,
  NotebookPen,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface NoteCardProps {
  task: Doc<"tasks">;
  gridView?: boolean;
}
function NoteCard({ task, gridView }: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const deleteTask = useMutation(api.tasks.deleteTask);
  const toggleTaskCompletion = useMutation(api.tasks.toggleCompleteTask);

  const creationTimeToDate = useMemo(
    () => new Date(task._creationTime),
    [task._creationTime]
  );

  const creationDate = useMemo(
    () => formatDistance(creationTimeToDate, new Date(), { addSuffix: true }),
    [creationTimeToDate]
  );

  const handleToggle = async (task: Doc<"tasks">) => {
    try {
      await toggleTaskCompletion({
        id: task._id,
      });
    } catch (error) {
      throw new ConvexError("Unable to toggle task completion");
    }
  };

  const handleDelete = async (id: Id<"tasks">) => {
    try {
      await deleteTask({ id });
      toast({
        variant: "destructive",
        title: `Delete - ${task.title}`,
        description: "Your note has been deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      throw new ConvexError("Unable to delete task");
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this note?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the note permanently
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await handleDelete(task._id);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center text-sm md:text-lg gap-4">
            <div className="flex items-center gap-2 md:truncate">
              <NotebookPen size={30} className="text-primary" />
              <p
                className="sm:text-wrap cursor-pointer font-bold md:truncate"
                onClick={() => router.push(`/dashboard/note/${task.slug}`)}
              >
                {task.title}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/note/${task.slug}`)}
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <div className="flex gap-1 items-center cursor-pointer">
                    <Edit2 className="w-4 h-4" /> Edit
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsOpen(true)}
                  className="flex gap-1 items-center cursor-pointer"
                >
                  <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                    <TrashIcon className="w-4 h-4" /> Delete
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription className="text-xs">{creationDate}</CardDescription>
        </CardHeader>
        {gridView && (
          <CardContent>
            <p className="text-sm">{task.description}</p>
          </CardContent>
        )}
        <CardFooter>
          <Badge
            variant={task.isCompleted ? "success" : "secondary"}
            onClick={() => handleToggle(task)}
            className="cursor-pointer"
          >
            {task.isCompleted ? "Complete" : "In Progress"}
          </Badge>
        </CardFooter>
      </Card>
    </>
  );
}

export default NoteCard;
