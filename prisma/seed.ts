import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = Array.from({ length: 5 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `Cliente ${i + 1}`,
    email: `cliente${i + 1}@barberly.dev`,
  }));

  const barbershops = Array.from({ length: 5 }, (_, i) => ({
    id: `barbershop-${i + 1}`,
    name: `Barberly Unidade ${i + 1}`,
    address: `Rua ${i + 100}, Centro`,
    description: `Barbearia completa da unidade ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/barbershop-${i + 1}/800/600`,
  }));

  const phones = barbershops.map((shop, i) => ({
    id: `phone-${i + 1}`,
    number: `+55 11 9${String(1000 + i).padStart(4, "0")}-${String(2000 + i).padStart(4, "0")}`,
    barbershopId: shop.id,
  }));

  const services = barbershops.map((shop, i) => ({
    id: `service-${i + 1}`,
    idBarbershop: shop.id,
    name: `Corte ${i + 1}`,
    price: (49.9 + i * 5).toFixed(2),
  }));

  const statuses = ["PENDING", "CONFIRMED", "CANCELLED", "CONFIRMED", "PENDING"] as const;

  const bookings = Array.from({ length: 5 }, (_, i) => {
    const startsAt = new Date();
    startsAt.setDate(startsAt.getDate() + i + 1);
    startsAt.setHours(9 + i, 0, 0, 0);

    const endsAt = new Date(startsAt);
    endsAt.setMinutes(endsAt.getMinutes() + 45);

    return {
      id: `booking-${i + 1}`,
      idUser: users[i].id,
      idBarbershop: barbershops[i].id,
      idService: services[i].id,
      status: statuses[i],
      startsAt,
      endsAt,
    };
  });

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
      },
      create: user,
    });
  }

  for (const barbershop of barbershops) {
    await prisma.barbershop.upsert({
      where: { id: barbershop.id },
      update: {
        name: barbershop.name,
        address: barbershop.address,
        description: barbershop.description,
        imageUrl: barbershop.imageUrl,
      },
      create: barbershop,
    });
  }

  for (const phone of phones) {
    await prisma.phone.upsert({
      where: { id: phone.id },
      update: {
        number: phone.number,
        barbershopId: phone.barbershopId,
      },
      create: phone,
    });
  }

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {
        idBarbershop: service.idBarbershop,
        name: service.name,
        price: service.price,
      },
      create: service,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {
        idUser: booking.idUser,
        idBarbershop: booking.idBarbershop,
        idService: booking.idService,
        status: booking.status,
        startsAt: booking.startsAt,
        endsAt: booking.endsAt,
      },
      create: booking,
    });
  }

  const [userCount, barbershopCount, phoneCount, serviceCount, bookingCount] = await Promise.all([
    prisma.user.count(),
    prisma.barbershop.count(),
    prisma.phone.count(),
    prisma.service.count(),
    prisma.booking.count(),
  ]);

  console.log(
    JSON.stringify({
      userCount,
      barbershopCount,
      phoneCount,
      serviceCount,
      bookingCount,
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
