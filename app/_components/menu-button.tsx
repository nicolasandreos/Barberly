import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { CalendarDays, House, LogOut, Menu, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "../_constants/categories";

const MenuButton = ({ className }: { className?: string }) => {
  const mainItems = [
    { label: "Inicio", icon: House, active: true },
    { label: "Agendamentos", icon: CalendarDays },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("size-10", className)}
          aria-label="Barbershop menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

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
              aria-label="Fechar menu"
            >
              <XIcon className="size-5" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex h-full flex-col px-2 pb-2">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Avatar className="size-12 border border-violet-500/80">
              <AvatarImage
                src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=120&q=80"
                alt="Pedro Goncalves"
              />
              <AvatarFallback>PG</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-lg leading-none font-semibold text-white">
                Pedro Goncalves
              </p>
              <p className="truncate pt-1 text-xs text-zinc-400">
                pedrogoncalves@gmail.com
              </p>
            </div>
          </div>

          <nav className="mt-4 space-y-1">
            {mainItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition-colors",
                    item.active
                      ? "bg-violet-600 text-white"
                      : "text-zinc-100 hover:bg-white/10",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="my-4 border-b border-white/10" />

          <nav className="space-y-1">
            {categories.map((category) => {
              return (
                <button
                  key={category.label}
                  type="button"
                  className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-zinc-100 transition-colors hover:bg-white/10"
                >
                  {category.icon}
                  {category.label}
                </button>
              );
            })}
          </nav>

          <div className="my-4 border-b border-white/10" />

          <button
            type="button"
            className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-zinc-100 transition-colors hover:bg-white/10"
          >
            <LogOut className="size-4" />
            Sair da conta
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
