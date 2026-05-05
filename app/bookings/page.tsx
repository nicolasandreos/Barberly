import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { FooterSpacing, MainContainer } from "@/app/_components/spacing";
import Subtitle from "@/app/_components/subtitle";
import BookingCardOpenable from "@/app/_components/booking-card-openable";
import { getUserBookings } from "@/app/_data_access/bookings";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const data = await getUserBookings();

  return (
    <>
      <Header />
      <MainContainer>
        <div className="space-y-6 py-6">
          <h1 className="text-2xl font-bold">Bookings</h1>

          {data?.confirmed && data.confirmed.length > 0 && (
            <div className="space-y-3">
              <Subtitle>CONFIRMED</Subtitle>
              <div className="flex flex-col gap-3">
                {data.confirmed.map((booking) => (
                  <BookingCardOpenable key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {data?.finished && data.finished.length > 0 && (
            <div className="space-y-3">
              <Subtitle>FINISHED</Subtitle>
              <div className="flex flex-col gap-3">
                {data.finished.map((booking) => (
                  <BookingCardOpenable key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {(!data?.confirmed || data.confirmed.length === 0) &&
            (!data?.finished || data.finished.length === 0) && (
              <p className="text-muted-foreground py-12 text-center">
                No bookings found.
              </p>
            )}
        </div>
      </MainContainer>
      <FooterSpacing />
      <Footer />
    </>
  );
}
