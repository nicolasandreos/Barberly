"use client";

import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { cn } from "@/lib/utils";

const Toaster = ({ className, toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className={cn("toaster group", className)}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: cn(
            "group toast border-border bg-card text-card-foreground shadow-lg",
            toastOptions?.classNames?.toast,
          ),
          description: cn(
            "text-muted-foreground",
            toastOptions?.classNames?.description,
          ),
          success: cn(
            "border-border bg-card text-card-foreground",
            toastOptions?.classNames?.success,
          ),
          error: cn(
            "border-destructive/40 bg-card text-card-foreground",
            toastOptions?.classNames?.error,
          ),
          actionButton: cn(
            "bg-primary text-primary-foreground",
            toastOptions?.classNames?.actionButton,
          ),
          cancelButton: cn(
            "bg-muted text-muted-foreground",
            toastOptions?.classNames?.cancelButton,
          ),
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
