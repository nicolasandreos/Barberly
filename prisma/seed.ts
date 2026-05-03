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

  const barbershopImageUrls = [
    "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
    "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
    "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
    "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
    "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
    "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
    "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
    "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
    "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
    "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
    "https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png",
    "https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png",
    "https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png",
    "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
    "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
    "https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png",
    "https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png",
    "https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png",
    "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
    "https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png",
    "https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png",
  ];

  const barbershops = barbershopImageUrls.map((imageUrl, i) => ({
    id: `barbershop-${i + 1}`,
    name: `Barberly Unidade ${i + 1}`,
    address: `Rua ${i + 100}, Centro`,
    description: `Barbearia completa da unidade ${i + 1}`,
    imageUrl,
  }));

  const phones = barbershops.map((shop, i) => ({
    id: `phone-${i + 1}`,
    number: `+55 11 9${String(1000 + i).padStart(4, "0")}-${String(2000 + i).padStart(4, "0")}`,
    barbershopId: shop.id,
  }));

  const serviceTemplates = [
    {
      name: "Corte de Cabelo",
      category: "HAIR",
      description: "Estilo personalizado com as últimas tendências.",
      price: 60.0,
      imageUrl:
        "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
    },
    {
      name: "Barba",
      category: "BEARD",
      description: "Modelagem completa para destacar sua masculinidade.",
      price: 40.0,
      imageUrl:
        "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
    },
    {
      name: "Pézinho",
      category: "HAIR",
      description: "Acabamento perfeito para um visual renovado.",
      price: 35.0,
      imageUrl:
        "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
    },
    {
      name: "Sobrancelha",
      category: "EYESBROWS",
      description: "Expressão acentuada com modelagem precisa.",
      price: 20.0,
      imageUrl:
        "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
    },
    {
      name: "Massagem",
      category: "MASSAGE",
      description: "Relaxe com uma massagem revigorante.",
      price: 50.0,
      imageUrl:
        "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
    },
    {
      name: "Hidratação",
      category: "HAIR",
      description: "Hidratação profunda para cabelo e barba.",
      price: 25.0,
      imageUrl:
        "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
    },
  ];

  const serviceCombinations = [
    [0, 1, 2],
    [0, 3, 4],
    [1, 2, 5],
    [0, 4, 5],
    [2, 3, 4, 5],
    [0, 1, 3, 5],
  ];

  const services = barbershops.flatMap((shop, i) => {
    const selectedTemplateIndexes =
      serviceCombinations[i % serviceCombinations.length];
    return selectedTemplateIndexes.map((templateIndex, j) => {
      const template = serviceTemplates[templateIndex];
      return {
        id: `service-${i + 1}-${j + 1}`,
        idBarbershop: shop.id,
        name: template.name,
        category: template.category,
        description: template.description,
        imageUrl: template.imageUrl,
        price: template.price.toFixed(2),
      };
    });
  });

  const primaryServicesByBarbershop = new Map(
    barbershops.map((shop) => [
      shop.id,
      services.find((service) => service.idBarbershop === shop.id),
    ]),
  );

  const statuses = [
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "CONFIRMED",
    "PENDING",
  ] as const;

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
      idService: primaryServicesByBarbershop.get(barbershops[i].id)!.id,
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
        category: service.category,
        description: service.description,
        imageUrl: service.imageUrl,
        price: service.price,
      },
      create: service,
    });
  }

  const fallbackDescription =
    "Serviço profissional oferecido pela nossa equipe.";
  const fallbackImageUrl = serviceTemplates[0].imageUrl;

  const allServices = await prisma.service.findMany({
    select: { id: true, name: true },
  });
  for (const row of allServices) {
    const template = serviceTemplates.find((t) => t.name === row.name);
    await prisma.service.update({
      where: { id: row.id },
      data: {
        description: template?.description ?? fallbackDescription,
        imageUrl: template?.imageUrl ?? fallbackImageUrl,
      },
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

  const [userCount, barbershopCount, phoneCount, serviceCount, bookingCount] =
    await Promise.all([
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
