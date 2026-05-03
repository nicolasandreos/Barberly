"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import BookingSheet from "./booking-sheet";

const ButtonBook = ({ className }: { className?: string }) => {
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
        className={cn("text-md h-9 w-20", className)}
      >
        Book
      </Button>
      <BookingSheet isOpen={isSheetOpen} onClose={handleCloseSheet} />
    </>
  );
};

export default ButtonBook;
