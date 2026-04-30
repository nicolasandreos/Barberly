import { Avatar, AvatarImage } from "./ui/avatar";

const CurrentBooking = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm font-bold">BOOKINGS</p>
      <div className="bg-card flex justify-between overflow-hidden rounded-xl border border-white/10">
        <div className="flex flex-col gap-2 p-4">
          <span className="text-muted-foreground w-max rounded-full bg-[#221C3D] px-2 py-1 text-center text-sm">
            Confirmed
          </span>
          <p className="text-md font-bold">Hair Cut</p>
          <div className="flex items-center justify-start gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            Vintage Barber
          </div>
        </div>

        <div className="flex min-h-0 shrink-0 flex-col items-center justify-center self-stretch border-l border-white/10 px-10 py-4">
          <p className="text-lg">January</p>
          <p className="text-2xl">07</p>
          <p className="text-sm">10:10</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentBooking;
