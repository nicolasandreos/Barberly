import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";

const UserInformation = () => {
  return (
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
  );
};

export default UserInformation;
