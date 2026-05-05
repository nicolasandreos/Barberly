"use client";

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { LogIn } from "lucide-react";

const SigninGoogleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="p-5">
          <LogIn className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card w-[400px] gap-8 rounded-2xl border-zinc-800 p-6 text-white">
        <DialogHeader className="flex flex-col items-center gap-2 space-y-0 text-center">
          <DialogTitle className="font-heading text-xl font-bold text-white">
            Sign in to the app
          </DialogTitle>
          <DialogDescription className="text-sm font-normal text-zinc-400">
            Continue with your Google account
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <Button
            variant="outline"
            type="button"
            className="h-11 max-w-full min-w-56 gap-2.5 rounded-lg border-zinc-600 bg-transparent px-8 font-bold text-white hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-600 dark:bg-transparent dark:hover:bg-white/10"
            onClick={onClick}
          >
            <Image
              src="/google-icon.svg"
              alt=""
              width={20}
              height={20}
              className="size-5 shrink-0"
              aria-hidden
            />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SigninGoogleButton;
