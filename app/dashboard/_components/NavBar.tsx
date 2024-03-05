"use client";
import { Dumbbell, Home, ListTodo } from "lucide-react";
import { usePathname } from "next/navigation";
import NavBarItem from "./NavBarItem";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

function NavBar() {
  const { user } = useUser();
  const navItems: NavItem[] = [
    {
      name: "Home",
      link: "/dashboard",
      icon: <Home />,
    },
    {
      name: "Workouts",
      link: "/dashboard/workouts",
      icon: <Dumbbell />,
    },
    {
      name: "Habit Tracker",
      link: "/dashboard/habit-tracker",
      icon: <ListTodo />,
    },
  ];

  const pathname = usePathname();

  const userInitials =
    user?.firstName?.charAt(0) ?? "" + user?.lastName?.charAt(1) ?? "";

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
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavBarItem
            key={item.name}
            item={item}
            active={pathname === item.link}
          />
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
