"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BarbershopHeroActions = () => {
  const router = useRouter();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between p-4">
      <div className="pointer-events-auto">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur-sm"
          aria-label="Voltar"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-5" />
        </Button>
      </div>
      <div className="pointer-events-auto">
        <Root>
          <Trigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur-sm"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
          </Trigger>
          <Portal>
            <Overlay className="data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60" />
            <Content className="data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right bg-card fixed top-0 right-0 z-50 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 p-6 shadow-xl duration-200">
              <Title className="text-lg font-bold">Menu</Title>
              <Description className="sr-only">
                Atalhos de navegação do aplicativo.
              </Description>
              <Close asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  aria-label="Fechar menu"
                >
                  <X className="size-5" />
                </Button>
              </Close>
              <nav className="mt-10 flex flex-col gap-3">
                <Close asChild>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground rounded-lg px-2 py-2 text-base font-medium transition-colors"
                  >
                    Início
                  </Link>
                </Close>
              </nav>
            </Content>
          </Portal>
        </Root>
      </div>
    </div>
  );
};

export default BarbershopHeroActions;
