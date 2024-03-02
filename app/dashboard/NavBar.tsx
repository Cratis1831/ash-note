"use client";
import { cn } from "@/lib/utils";
import { Dumbbell, Home, Settings, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavBarItem from "./NavBarItem";

function NavBar() {
  interface NavItem {
    name: string;
    link: string;
    icon: React.ReactNode;
  }
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
      name: "Nutrition",
      link: "/dashboard/nutrition",
      icon: <Utensils />,
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
