import { User } from "@/generated/prisma/client";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";

const UserInformation = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <Avatar className="size-12 border border-violet-500/80">
        <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
        <AvatarFallback>PG</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-lg leading-none font-semibold text-white">
          {user.name}
        </p>
        <p className="truncate pt-1 text-xs text-zinc-400">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInformation;
