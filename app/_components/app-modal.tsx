"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const dialogSurfaceClass =
  "bg-card border-white/10 text-white sm:max-w-md gap-6 border p-6 text-center shadow-lg";

export type AppModalProps =
  | {
      open: boolean;
      onOpenChange: (open: boolean) => void;
      variant: "two-action";
      title: string;
      description: ReactNode;
      cancelLabel: string;
      confirmLabel: string;
      /** danger = red (sign-out / cancel booking) */
      confirmTone?: "danger" | "neutral";
      onCancel?: () => void;
      onConfirm: () => void | Promise<void>;
      isConfirmPending?: boolean;
    }
  | {
      open: boolean;
      onOpenChange: (open: boolean) => void;
      variant: "acknowledge";
      title: string;
      description: ReactNode;
      confirmLabel: string;
      onConfirm?: () => void;
    };

export function AppModal(props: AppModalProps) {
  if (props.variant === "acknowledge") {
    return (
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className={cn(dialogSurfaceClass)}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-violet-600"
              aria-hidden
            >
              <Check className="size-9 text-black" strokeWidth={3} />
            </div>
            <DialogHeader className="gap-2 text-center sm:text-center">
              <DialogTitle className="text-lg font-semibold text-white">
                {props.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-center text-sm">
                {props.description}
              </DialogDescription>
            </DialogHeader>
          </div>
          <Button
            type="button"
            className="h-11 w-full rounded-xl bg-white/10 font-semibold text-white hover:bg-white/15"
            onClick={() => {
              props.onConfirm?.();
              props.onOpenChange(false);
            }}
          >
            {props.confirmLabel}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  const tone = props.confirmTone ?? "danger";

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent showCloseButton={false} className={cn(dialogSurfaceClass)}>
        <DialogHeader className="gap-2 text-center sm:text-center">
          <DialogTitle className="text-lg font-semibold text-white">
            {props.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-sm">
            {props.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
            disabled={props.isConfirmPending}
            onClick={() => {
              props.onCancel?.();
              props.onOpenChange(false);
            }}
          >
            {props.cancelLabel}
          </Button>
          <Button
            type="button"
            className={cn(
              "h-11 flex-1 rounded-xl font-semibold text-white",
              tone === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-violet-600 hover:bg-violet-700",
            )}
            disabled={props.isConfirmPending}
            onClick={() => void props.onConfirm()}
          >
            {props.isConfirmPending ? "…" : props.confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
