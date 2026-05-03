"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import BookingSheet from "./booking-sheet";
import { useSession } from "next-auth/react";
import SidebarSheet from "./sidebar-sheet";

const ButtonBook = ({
  className,
  barbershopName,
  barbershopId,
  serviceName,
  serviceId,
  priceBrl,
}: {
  className?: string;
  barbershopName?: string;
  barbershopId?: string;
  serviceName?: string;
  serviceId?: string;
  priceBrl?: number;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: session } = useSession();

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };
  return (
    <>
      {session?.user ? (
        <>
          <Button
            onClick={handleOpenSheet}
            variant="outline"
            className={cn("text-md h-9 w-20", className)}
          >
            Book
          </Button>
          <BookingSheet
            isOpen={isSheetOpen}
            onClose={handleCloseSheet}
            barbershopName={barbershopName}
            barbershopId={barbershopId}
            serviceName={serviceName}
            serviceId={serviceId}
            priceBrl={priceBrl}
          />
        </>
      ) : (
        <>
          <Button
            onClick={handleOpenSheet}
            variant="outline"
            className={cn("text-md h-9 w-20", className)}
          >
            Book
          </Button>
          <SidebarSheet isOpen={isSheetOpen} onClose={handleCloseSheet} />
        </>
      )}
    </>
  );
};

export default ButtonBook;
