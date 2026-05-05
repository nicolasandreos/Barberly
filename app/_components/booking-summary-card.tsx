/** Booking summary block (reused in booking flow and detail sheet). */
export type BookingSummaryCardProps = {
  serviceName: string;
  priceLabel: string;
  dateLabel: string;
  timeLabel: string;
  barbershopName: string;
};

const BookingSummaryCard = ({
  serviceName,
  priceLabel,
  dateLabel,
  timeLabel,
  barbershopName,
}: BookingSummaryCardProps) => {
  return (
    <div className="bg-secondary/80 space-y-4 rounded-xl border border-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-semibold text-white">{serviceName}</span>
        <span className="text-sm font-semibold text-white">{priceLabel}</span>
      </div>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground shrink-0">Date</dt>
          <dd className="text-right font-medium text-white">{dateLabel}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground shrink-0">Time</dt>
          <dd className="text-right font-medium text-white">{timeLabel}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground shrink-0">Barbershop</dt>
          <dd className="text-right font-medium text-white">
            {barbershopName}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default BookingSummaryCard;
