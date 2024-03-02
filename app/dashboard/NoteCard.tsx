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

interface NoteCardProps {
  text: string;
  isCompleted: boolean;
  creationTime: number;
}
function NoteCard({ text, isCompleted, creationTime }: NoteCardProps) {
  const creationDate = formatDistance(new Date(creationTime), new Date(), {
    addSuffix: true,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          {text}{" "}
          <Badge variant={isCompleted ? "success" : "outline"}>
            {isCompleted ? "Complete" : "In Progress"}
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs">{creationDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
