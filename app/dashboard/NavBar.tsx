import { Dumbbell, Home, Utensils } from "lucide-react";
import Link from "next/link";
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
  return (
    <nav>
      <div className="flex flex-col gap-8">
        {navItems.map((item) => (
          <Link href={item.link} key={item.name}>
            <div className="flex gap-4">
              <p className="text-primary">{item.icon}</p>
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
