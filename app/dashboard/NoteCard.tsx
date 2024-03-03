"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance, subDays } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ConvexError } from "convex/values";
import { useMemo, useState } from "react";

function NoteCard(task: Doc<"tasks">) {
  const creationTimeToDate = useMemo(
    () => new Date(task._creationTime),
    [task._creationTime]
  );

  const creationDate = useMemo(
    () => formatDistance(creationTimeToDate, new Date(), { addSuffix: true }),
    [creationTimeToDate]
  );

  const deleteTask = useMutation(api.tasks.deleteTask);
  const toggleTaskCompletion = useMutation(api.tasks.toggleCompleteTask);

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
    } catch (error) {
      console.log(error);
      throw new ConvexError("Unable to delete task");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <p>{task.title}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(task._id)}
          >
            <Trash2 />
          </Button>
        </CardTitle>
        <CardDescription className="text-xs">{creationDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
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
  );
}

export default NoteCard;
