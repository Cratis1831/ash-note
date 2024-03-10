"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-column-header";
import { formatDistance, formatRelative } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { capitalize, cn } from "@/lib/utils";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  LucideIcon,
  XCircle,
} from "lucide-react";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "pending",
    label: "Pending",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

function UserCard({ userId }: { userId: string }) {
  const { user } = useUser();
  if (userId !== user?.id) {
    return null;
  }

  return (
    <div className="flex gap-2 w-40 items-center text-xs">
      <Avatar className="w-6 h-6">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
      {user.fullName}
    </div>
  );
}

export const columns: ColumnDef<Doc<"tasks">>[] = [
  {
    accessorKey: "title",
    cell({ row }) {
      return (
        <div className="flex items-center gap-2 sm:text-wrap cursor-pointer font-semibold text-primary">
          <Link href={`/dashboard/note/${row.original.slug}`}>
            {row.original.title}
          </Link>
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: "description",
    cell({ row }) {
      return (
        <div className="flex items-center gap-2 text-wrap max-w-md">
          {row.original.description}
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
  },
  {
    accessorKey: "status",
    cell({ row }) {
      const status = statuses.find(
        (status) => status.value === row.original.status
      );
      return (
        <div
          className={cn(
            `flex justify-start items-center text-xs`,
            row.original.status === "completed"
              ? "border-success text-success"
              : "border-secondary-background text-muted-foreground"
          )}
        >
          {status && <status.icon className="mr-2 h-4 w-4 shrink-0" />}
          {capitalize(status?.label || row.original.status)}
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
  },
  {
    accessorKey: "userId",
    cell({ row }) {
      return (
        <div className="flex items-center gap-2 text-wrap max-w-lg">
          <UserCard userId={row.original.userId} />
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User" />;
    },
  },
  {
    accessorKey: "_creationTime",
    cell({ row }) {
      return (
        <div className="flex items-center gap-2">
          {formatDistance(new Date(row.original._creationTime), new Date(), {
            addSuffix: true,
          })}
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Creation Date" />;
    },
  },
];
