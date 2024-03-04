"use client";
import { Dumbbell, Home, ListTodo } from "lucide-react";
import { usePathname } from "next/navigation";
import NavBarItem from "./NavBarItem";

export interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

function NavBar() {
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

  return (
    <nav className="flex flex-col">
      <div className="flex flex-col gap-4 ">
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
