"use client";
import NavBar from "@/app/dashboard/_components/NavBar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function DrawerMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        {/* NavBar Menu on Mobile */}
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription className="pt-6">
            <NavBar />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default DrawerMenu;
