"use client";

import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SidebarSheet from "./sidebar-sheet";

const MenuButton = ({ className }: { className?: string }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleOpenSheet}
        variant="outline"
        size="icon"
        className={cn("size-10", className)}
        aria-label="Barbershop menu"
      >
        <Menu className="size-5" />
      </Button>
      <SidebarSheet isOpen={isSheetOpen} onClose={handleCloseSheet} />
    </>
  );
};

export default MenuButton;
