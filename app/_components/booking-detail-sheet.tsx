"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { enUS } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { XIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import BarbershopContactSection from "@/app/_components/barbershop-contact-section";
import BookingSummaryCard from "@/app/_components/booking-summary-card";
import type { BookingWithDetails } from "@/app/_components/booking-card";
import { formatCurrency } from "@/lib/helpers";
import { BookingStatus } from "@/generated/prisma/enums";
import { cancelBooking } from "@/app/_actions/booking";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AppModal } from "@/app/_components/app-modal";

const STATUS_BADGE_EN: Record<BookingStatus, string> = {
  CONFIRMED: "Confirmed",
  DONE: "Finished",
  CANCELLED: "Cancelled",
};

function truncateAddress(address: string, maxLen = 42) {
  if (address.length <= maxLen) return address;
  return `${address.slice(0, maxLen)}…`;
}

type BookingDetailSheetProps = {
  booking: BookingWithDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const BookingDetailSheet = ({
  booking,
  open,
  onOpenChange,
}: BookingDetailSheetProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const priceLabel = useMemo(
    () => formatCurrency(Number(booking.service.price)),
    [booking.service.price],
  );

  const dateLabel = useMemo(
    () =>
      formatInTimeZone(booking.startsAt, "UTC", "MMMM d, yyyy", {
        locale: enUS,
      }),
    [booking.startsAt],
  );

  const timeLabel = useMemo(
    () => formatInTimeZone(booking.startsAt, "UTC", "HH:mm"),
    [booking.startsAt],
  );

  const canCancel = booking.status === BookingStatus.CONFIRMED;

  const handleConfirmCancelBooking = () => {
    startTransition(async () => {
      const result = await cancelBooking(booking.id);
      if (result.ok) {
        setCancelConfirmOpen(false);
        toast.success("Booking cancelled.");
        onOpenChange(false);
        router.refresh();
        return;
      }
      if (result.error === "UNAUTHENTICATED") {
        toast.error("Please sign in again.");
        return;
      }
      if (result.error === "NOT_FOUND" || result.error === "INVALID_STATE") {
        toast.error("Could not cancel this booking.");
        return;
      }
    });
  };

  const statusLabel = STATUS_BADGE_EN[booking.status];
  const isConfirmedBadge = booking.status === BookingStatus.CONFIRMED;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          showCloseButton={false}
          className="bg-card flex h-full max-h-dvh w-full flex-col gap-0 border-white/10 px-4 py-5 text-white sm:max-w-2xl"
        >
          <SheetHeader className="flex shrink-0 flex-row items-center justify-between gap-3 space-y-0 border-0 border-b border-white/10 p-0 px-1 pb-4">
            <SheetTitle className="text-lg font-semibold tracking-tight text-white">
              Booking details
            </SheetTitle>
            <SheetDescription className="sr-only">
              Booking details, location, and barbershop contact.
            </SheetDescription>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 shrink-0 text-white hover:bg-white/10"
                aria-label="Close"
              >
                <XIcon className="size-5" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-1 py-5">
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src="/map.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 42rem"
                priority
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-black/70 p-3 backdrop-blur-sm">
                <Avatar className="size-12 shrink-0 border border-white/10">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {booking.barbershop.name}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {truncateAddress(booking.barbershop.address)}
                  </p>
                </div>
              </div>
            </div>

            <span
              className={cn(
                "w-max rounded-full px-2 py-1 text-center text-[12px]",
                isConfirmedBadge
                  ? "text-primary bg-[#221C3D]"
                  : "text-muted-foreground bg-white/10",
              )}
            >
              {statusLabel}
            </span>

            <BookingSummaryCard
              serviceName={booking.service.name}
              priceLabel={priceLabel}
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              barbershopName={booking.barbershop.name}
            />

            <BarbershopContactSection
              phones={booking.barbershop.phones}
              className="mb-0"
            />
          </div>

          <div className="shrink-0 pt-4">
            {canCancel ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 flex-1 rounded-xl border-white/20 text-white hover:bg-white/10"
                  onClick={() => onOpenChange(false)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="h-11 flex-1 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                  disabled={isPending}
                  onClick={() => setCancelConfirmOpen(true)}
                >
                  Cancel booking
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                className="h-11 w-full rounded-xl text-base font-semibold"
                onClick={() => onOpenChange(false)}
              >
                Back
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AppModal
        open={cancelConfirmOpen}
        onOpenChange={setCancelConfirmOpen}
        variant="two-action"
        title="Cancel booking"
        description="Are you sure you want to cancel this appointment?"
        cancelLabel="Back"
        confirmLabel="Confirm"
        confirmTone="danger"
        isConfirmPending={isPending}
        onConfirm={handleConfirmCancelBooking}
      />
    </>
  );
};

export default BookingDetailSheet;
