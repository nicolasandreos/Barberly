"use client";

import { useState } from "react";
import BookingCard from "./booking-card";
import BookingDetailSheet from "./booking-detail-sheet";
import type { BookingWithDetails } from "./booking-card";
import { cn } from "@/lib/utils";

const BookingCardOpenable = ({
  booking,
  compact = false,
}: {
  booking: BookingWithDetails;
  compact?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "block w-full shrink-0 cursor-pointer rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
          compact ? "" : "w-full",
        )}
      >
        <BookingCard booking={booking} compact={compact} />
      </button>
      <BookingDetailSheet
        booking={booking}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default BookingCardOpenable;
