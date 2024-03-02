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
import { TrashIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  creationTime: number;
}

function NoteCard({
  id,
  title,
  isCompleted,
  description,
  creationTime,
}: NoteCardProps) {
  const creationDate = formatDistance(new Date(creationTime), new Date(), {
    addSuffix: true,
  });

  const deleteTask = useMutation(api.tasks.deleteTask);
  const handleDelete = async (id: string) => {
    try {
      // await deleteTask(id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <p>{title}</p>
          <Button variant="ghost" size="sm">
            <Trash2 />
          </Button>
        </CardTitle>
        <CardDescription className="text-xs">{creationDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Badge variant={isCompleted ? "success" : "secondary"}>
          {isCompleted ? "Complete" : "In Progress"}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
