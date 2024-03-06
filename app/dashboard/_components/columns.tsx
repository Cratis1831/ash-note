"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-column-header";
import { formatRelative } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function UserCard({ userId }: { userId: string }) {
  const { user } = useUser();
  if (userId !== user?.id) {
    return null;
  }

  return (
    <div className="flex gap-2 w-40 items-center">
      <Avatar className="w-8 h-8">
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
        <div className="flex items-center gap-2 text-wrap max-w-lg">
          {row.original.description}
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
  },
  {
    accessorKey: "isCompleted",
    cell({ row }) {
      return (
        <div className="flex justify-center items-center gap-2">
          {row.original.isCompleted ? "✅" : "❌"}
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Complete" />;
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
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </div>
      );
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Creation Date" />;
    },
  },
];
