import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        className="bg-card ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-12 flex-1 rounded-xl px-4 text-sm outline-none placeholder:text-[16px] focus-visible:ring-2"
      />
      <Button
        type="button"
        size="icon"
        className="size-12 shrink-0 rounded-xl"
        aria-label="Buscar"
      >
        <SearchIcon className="size-6" />
      </Button>
    </div>
  );
};

export default SearchInput;
