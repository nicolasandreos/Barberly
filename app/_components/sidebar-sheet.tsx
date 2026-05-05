import { categories } from "../_constants/categories";
import SigninGoogleButton from "./signin-google-button";
import { signIn, signOut, useSession } from "next-auth/react";
import UserInformation from "./user-information";
import { User } from "@/generated/prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CalendarDays, House, LogOut, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AppModal } from "@/app/_components/app-modal";

const SidebarSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const mainItems = [
    { label: "Home", icon: House, href: "/" },
    {
      label: "Bookings",
      icon: CalendarDays,
      href: "/bookings",
      requiresAuth: true,
    },
  ];

  const { data } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSignOut = () => {
    signOut();
  };
  const handleSignIn = () => {
    signIn("google");
  };

  const visibleMainItems = mainItems.filter(
    (item) => !item.requiresAuth || data?.user,
  );

  const [signOutConfirmOpen, setSignOutConfirmOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          showCloseButton={false}
          className="bg-card w-full border-white/10 px-4 py-5 text-white sm:max-w-lg"
        >
          <SheetHeader className="flex flex-row items-center justify-between gap-3 border-0 p-0 px-2 pt-1 pb-3">
            <SheetTitle className="text-lg font-semibold tracking-tight text-white">
              Menu
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-5 shrink-0 p-3 text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <XIcon className="size-5" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <div className="flex h-full flex-col px-2 pb-2">
            {data?.user ? (
              <UserInformation user={data.user as User} />
            ) : (
              <div className="flex w-full items-center justify-between pb-6">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Sign in to your account!
                </h2>
                <SigninGoogleButton onClick={handleSignIn} />
              </div>
            )}

            <nav className="mt-4 space-y-1">
              {visibleMainItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors",
                      isActive
                        ? "bg-violet-600 text-white"
                        : "text-zinc-100 hover:bg-white/10",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="my-4 border-b border-white/10" />

            <nav className="space-y-1">
              {categories.map((category) => {
                const isActive =
                  pathname === "/service" &&
                  searchParams.get("category") === category.label;
                return (
                  <Link
                    href={`/service?category=${category.label}`}
                    onClick={onClose}
                    key={category.label}
                    className={cn(
                      "flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition-colors",
                      isActive
                        ? "bg-violet-600 text-white"
                        : "text-zinc-100 hover:bg-white/10",
                    )}
                  >
                    {category.icon}
                    {category.label}
                  </Link>
                );
              })}
            </nav>

            <div className="my-4 border-b border-white/10" />

            <button
              type="button"
              className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-zinc-100 transition-colors hover:bg-white/10"
              onClick={() => setSignOutConfirmOpen(true)}
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <AppModal
        open={signOutConfirmOpen}
        onOpenChange={setSignOutConfirmOpen}
        variant="two-action"
        title="Sign out"
        description="Are you sure you want to sign out?"
        cancelLabel="Cancel"
        confirmLabel="Sign out"
        confirmTone="danger"
        onConfirm={() => {
          setSignOutConfirmOpen(false);
          handleSignOut();
        }}
      />
    </>
  );
};

export default SidebarSheet;
