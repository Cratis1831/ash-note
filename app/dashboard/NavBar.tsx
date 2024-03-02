"use client";
import { cn } from "@/lib/utils";
import { Dumbbell, Home, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
      link: "/workouts",
      icon: <Dumbbell />,
    },
    {
      name: "Nutrition",
      link: "/nutrition",
      icon: <Utensils />,
    },
  ];

  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav>
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link href={item.link} key={item.name}>
            <div
              className={cn(
                `flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-300 hover:bg-accent`,
                pathname === item.link
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent"
              )}
            >
              <p className="">{item.icon}</p>
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
