"use client";
import { Folder, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import NavBarItem from "./nav-bar-item";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Authenticated,
  useConvexAuth,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

function NavBar() {
  const { user } = useUser();
  const navItems: NavItem[] = [];

  const pathname = usePathname();

  const userInitials =
    user?.firstName?.charAt(0) ?? "" + user?.lastName?.charAt(1) ?? "";

  const { isAuthenticated, isLoading } = useConvexAuth();
  const addNotebook = useMutation(api.notebooks.addNotebook);
  const notebooks = useQuery(
    api.notebooks.getNotebooks,
    isAuthenticated ? undefined : "skip"
  );
  const tasks = useQuery(
    api.tasks.getTaskList,
    isAuthenticated ? undefined : "skip"
  );
  const handleAddNotebook = async () => {
    const title = "Untitled";
    const userId = user!.id;
    await addNotebook({
      title,
      userId,
    });
  };

  return (
    <nav className="flex flex-col">
      <div className="flex items-center gap-2 pl-2 mt-2 border-b pb-8">
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="user profile image" />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{user?.fullName ?? "User"}</p>
          <p className="text-muted-foreground text-xs">
            {user?.emailAddresses[0].emailAddress ?? ""}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavBarItem
            key={item.name}
            item={item}
            active={pathname === item.link}
          />
        ))}
        <Authenticated>
          <Button onClick={handleAddNotebook} className="mb-2">
            <PlusCircle />
            <span className="pl-2">Add Notebook</span>
          </Button>
          {notebooks &&
            notebooks.map((notebook) => (
              <Link
                href={`/dashboard/notebooks/${notebook._id}`}
                className="flex items-center justify-between mb-2"
                key={notebook._id}
              >
                <div className="flex items-center">
                  <Folder />
                  <p className="pl-2">{notebook.title}</p>
                </div>
                <div>
                  (
                  {
                    tasks?.filter((task) => task.notebook === notebook._id)
                      .length
                  }
                  )
                </div>
              </Link>
            ))}
        </Authenticated>
      </div>
    </nav>
  );
}

export default NavBar;
