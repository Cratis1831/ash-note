import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  item: {
    name: string;
    icon: React.ReactNode;
    link: string;
  };
  active: boolean;
}
function NavBarItem({ item, active }: NavItemProps) {
  return (
    <Link href={item.link} key={item.name}>
      <div
        className={cn(
          `flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-primary-foreground`,
          active ? "bg-primary text-primary-foreground" : "bg-transparent"
        )}
      >
        <p className="">{item.icon}</p>
        <p>{item.name}</p>
      </div>
    </Link>
  );
}

export default NavBarItem;
