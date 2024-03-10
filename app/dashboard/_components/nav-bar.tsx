"use client";
import { Dumbbell, Folder, Home, ListTodo, PlusCircle } from "lucide-react";
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

export interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

function NavBar() {
  const { user } = useUser();
  const navItems: NavItem[] = [
    // {
    //   name: "Home",
    //   link: "/dashboard",
    //   icon: <Home />,
    // },
    // {
    //   name: "Workouts",
    //   link: "/dashboard/workouts",
    //   icon: <Dumbbell />,
    // },
    // {
    //   name: "Habit Tracker",
    //   link: "/dashboard/habit-tracker",
    //   icon: <ListTodo />,
    // },
  ];

  const pathname = usePathname();

  const userInitials =
    user?.firstName?.charAt(0) ?? "" + user?.lastName?.charAt(1) ?? "";

  const { isAuthenticated, isLoading } = useConvexAuth();
  const addNotebook = useMutation(api.notebooks.addNotebook);
  const notebooks = useQuery(
    api.notebooks.getNotebooks,
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
          <Button onClick={handleAddNotebook}>
            <PlusCircle />
            <span className="pl-2">Add Notebook</span>
          </Button>
          {notebooks &&
            notebooks.map((notebook) => (
              <div
                className="flex items-center justify-between text-sm pt-3 "
                key={notebook._id}
              >
                <NavBarItem
                  item={{
                    name: notebook.title,
                    link: `/dashboard/notebooks/${notebook._id}`,
                    icon: <Folder />,
                  }}
                  active={pathname === `/dashboard/notebooks/${notebook._id}`}
                />
                ({Math.floor(Math.random() * 10) + 1})
              </div>
            ))}
        </Authenticated>
      </div>
    </nav>
  );
}

export default NavBar;
