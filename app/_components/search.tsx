"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";

const inputSearchSchema = z.object({
  barbershopName: z
    .string()
    .max(100, {
      message: "Barbershop name must contain at most 100 characters",
    }),
});

type InputSearchSchema = z.infer<typeof inputSearchSchema>;

const SearchInput = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputSearchSchema>({
    resolver: zodResolver(inputSearchSchema),
    defaultValues: {
      barbershopName: "",
    },
  });

  const onSubmit = ({ barbershopName }: InputSearchSchema) => {
    const params = new URLSearchParams({ barbershopName });
    router.push(`/barbershop?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          aria-invalid={errors.barbershopName ? "true" : "false"}
          className="bg-card ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-12 flex-1 rounded-xl px-4 text-sm outline-none placeholder:text-[16px] focus-visible:ring-2"
          {...register("barbershopName")}
        />
        <Button
          type="submit"
          size="icon"
          className="size-12 shrink-0 rounded-xl"
          aria-label="Buscar"
        >
          <SearchIcon className="size-6" />
        </Button>
      </div>

      {errors.barbershopName && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {errors.barbershopName.message}
        </p>
      )}
    </form>
  );
};

export default SearchInput;
