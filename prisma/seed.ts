import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/** Clears prior seed rows (fixed ids) so re-seeding replaces fake data entirely. */
async function resetSeedData() {
  await prisma.booking.deleteMany({
    where: { id: { startsWith: "booking-" } },
  });
  await prisma.phone.deleteMany({
    where: { id: { startsWith: "phone-" } },
  });
  await prisma.service.deleteMany({
    where: { id: { startsWith: "service-" } },
  });
  await prisma.barbershop.deleteMany({
    where: { id: { startsWith: "barbershop-" } },
  });
  await prisma.user.deleteMany({
    where: { id: { startsWith: "user-" } },
  });
}

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

type BarbershopSeed = {
  name: string;
  address: string;
  description: string;
};

const barbershopProfiles: BarbershopSeed[] = [
  {
    name: "The Wolf's Den & Co.",
    address: "214 Mercer St, New York, NY 10012",
    description:
      "A moody, leather-and-brass hideout for people who treat a haircut like a ritual. The Wolf's Den pairs razor-sharp fades with old-school hospitality: hot towels, small-batch tonics, and barbers who actually listen before they pick up the clippers. We built the shop around late-night energy and early-morning polish—whether you need a boardroom taper or something more experimental, every visit ends with a mirror moment you did not expect.",
  },
  {
    name: "Blade & Bourbon Parlour",
    address: "88 King St W, Toronto, ON M5H 1A1",
    description:
      "Half speakeasy, half surgical suite for your silhouette. Blade & Bourbon is where slow pours meet fast fades: oak paneling, a curated vinyl wall, and stations tuned for precision work on thick textures and stubborn cowlicks. Our team obsesses over weight removal, crown balance, and beard lines that photograph clean from every angle. Walk in loud, leave sharper than you arrived.",
  },
  {
    name: "Meridian Fade Studio",
    address: "4510 W Sunset Blvd, Los Angeles, CA 90027",
    description:
      "Sunset-adjacent studio obsessed with gradients that melt like butter. Meridian chases the perfect transition: low, mid, or drop fades paired with scalp-friendly techniques and color-safe finishing. We coach you on home styling, product load, and how to stretch a cut between visits. If you live in caps and hoodies or tailored suits, we map the fade to your lifestyle—not a template on a wall.",
  },
  {
    name: "Hudson Steel Cuts",
    address: "19 Hudson Pl, Hoboken, NJ 07030",
    description:
      "Industrial bones, warm lights, and barbers who treat hair like metalwork—measured, filed, and polished. Hudson Steel specializes in structured side parts, tight tapers for windy commutes, and beard sculpting that survives a PATH train sprint. We keep the playlist loud and the lines quiet. First-timers get a full consultation sketch before a single guard clicks on.",
  },
  {
    name: "Velvet Temple Grooming",
    address: "602 Queen St W, Toronto, ON M6J 1E3",
    description:
      "Soft velvet chairs, hard geometry on the fade. Velvet Temple is a calm pocket in a loud city: aromatics in the air, muted palettes, and barbers trained in curly-coily cutting as well as straight-razor finishes. We book longer slots on purpose—hair deserves unrushed sectioning, stretch drying when needed, and honest advice about density changes or seasonal shedding.",
  },
  {
    name: "Northbound Barber Collective",
    address: "1201 3rd Ave, Seattle, WA 98101",
    description:
      "Pacific Northwest grit with editorial polish. Northbound is a collective of independent chair renters united by one rule: no lazy lines. Rain-ready textures, sea-salt friendly styles, and beard oils that do not feel like chemistry class. We host monthly style labs where clients bring reference photos and leave with a cut sheet they can hand to any barber in the network.",
  },
  {
    name: "Crown & Collar House",
    address: "900 Michigan Ave, Chicago, IL 60611",
    description:
      "Lake-effect wind meets lakefront confidence. Crown & Collar blends Chicago hustle with royal-level finish work—think executive contours, crisp edge-ups, and hot-lather neck cleanups that feel like a exhale. Our house line of tonics is brewed locally; our fades are dialed for winter hats, summer festivals, and everything between.",
  },
  {
    name: "Ember Ash Grooming Lounge",
    address: "733 E Burnside St, Portland, OR 97214",
    description:
      "Warm ember lighting, cool ash tones on the walls, and cuts that age like a good flannel. Ember Ash leans artisanal: scissor-heavy shapes, lived-in layers, and beard care rooted in skin health. We are picky about tools—Japanese steel, German combs, and steam that actually opens pores instead of just smelling nice.",
  },
  {
    name: "Quarter Past Nine Barbers",
    address: "410 Peachtree St NE, Atlanta, GA 30308",
    description:
      "Southern charm, stopwatch precision. Quarter Past Nine got its name from clients who always ran late—so we built a shop where timing is sacred and conversation is optional. Fades that pop on camera, lineups that survive humidity, and a signature cool-down massage that turns a lunch break into a reset. We keep cold brew on tap and ego off the floor.",
  },
  {
    name: "The Ritual Room",
    address: "55 Pearl St, Brooklyn, NY 11201",
    description:
      "Minimal signage, maximal intention. The Ritual Room books by intention, not by buzz cut default: we map face shape, growth patterns, and how often you actually style your hair. Expect steam, stretching, and straight talk. We are the shop you text when you change jobs, cities, or chapters—because hair should keep pace with the plot twist.",
  },
  {
    name: "Salt Line Street Cuts",
    address: "22 Commercial Wharf, Boston, MA 02110",
    description:
      "Harbor breeze, sharp lines. Salt Line honors East Coast texture—wavy, coarse, unpredictable—and builds cuts that survive a nor'easter commute. Fishermen, founders, and first dates sit in the same chairs. We double down on neckline architecture, sideburn weight, and beards that look intentional even when you skip a trim week.",
  },
  {
    name: "Iron & Thread Barbershop",
    address: "301 Congress Ave, Austin, TX 78701",
    description:
      "Keep Austin weird, keep your fade clean. Iron & Thread mixes Texas heat humor with obsessive detail: clipper-over-comb mastery, razor lines that pop on stage lights, and beard blends for musicians who sweat under LEDs. The shop smells like cedar, sounds like Motown, and finishes every service with a lint roll and a honest mirror check from two angles.",
  },
  {
    name: "Maple Court Groomers",
    address: "1448 Rue Sainte-Catherine O, Montréal, QC H3G 1P9",
    description:
      "Bilingual banter, bilingual fades. Maple Court bridges classic European barbering with North American street shape—tight tapers, soft crops, and razor work that respects sensitive skin. Winter static, summer frizz—we plan for both. Our apprentices shadow for a year before they touch a fade solo; you feel that discipline in the chair.",
  },
  {
    name: "Atlas Clipper Society",
    address: "1900 Market St, Philadelphia, PA 19103",
    description:
      "Historic lobby energy, modern clipper science. Atlas is for people who read reviews, compare guard charts, and still want a human to translate it all. We document your baseline, photograph progress over visits, and adjust weight lines as your hair grows out. Society members get first dibs on experimental texture sessions—curly tops, design lines, creative color prep.",
  },
  {
    name: "Ghost Line Fades",
    address: "920 S Broadway, Los Angeles, CA 90015",
    description:
      "Invisible transitions, visible confidence. Ghost Line chases the hardest trick in barbering: fades so smooth they look like Photoshop in real life. We work slow, stretch skin, and use multiple passes instead of one aggressive swipe. Perfect for talent, athletes, and anyone whose calendar is mostly cameras.",
  },
  {
    name: "Copper Kettle Cuts",
    address: "411 Elm St, Dallas, TX 75202",
    description:
      "Warm copper fixtures, cool-headed barbers. Copper Kettle is a Dallas institution-in-the-making: big hair ambition without the mall-chain gloss. We specialize in thick hair management, weight distribution for cowlicks, and beard oils that do not compete with cologne. Fridays smell like coffee and aftershave; Saturdays feel like a family cookout with better fades.",
  },
  {
    name: "Raven Row Barbershop",
    address: "1520 Alaskan Way, Seattle, WA 98101",
    description:
      "Waterfront views, skyline-level fades. Raven Row draws night owls and early risers alike—chairs open before sunrise for film crews and close after dark for service industry regulars. We love corrective work: fixing uneven DIY lineups, blending patchy growth, and teaching you how to stretch a professional shape for two extra weeks.",
  },
  {
    name: "Beacon Hill Blade Co.",
    address: "45 Charles St, Boston, MA 02114",
    description:
      "Brick sidewalks, steel discipline. Beacon Hill Blade Co. caters to clients who want discretion and detail: quiet chairs, private consult nooks, and barbers who can execute a conservative corporate taper or a razor-only classic. We stock unisex fragrances and matte clays favored by architects and surgeons who hate shiny hair.",
  },
  {
    name: "Stellar Strand Studio",
    address: "888 Biscayne Blvd, Miami, FL 33132",
    description:
      "Heat, humidity, hair that refuses to behave—Stellar Strand was built for Miami reality. We layer cuts to move with ocean air, recommend finishes that survive rooftop parties, and teach diffusing tricks for curly guests. The studio glows like a softbox; your lineup leaves camera-ready without looking plastic.",
  },
  {
    name: "Driftwood & Dapper",
    address: "1100 Coast Village Rd, Santa Barbara, CA 93108",
    description:
      "Salt air, soft light, sharp collars. Driftwood & Dapper is relaxed luxury: barefoot-friendly vibes with scissor work worthy of a magazine spread. We love sun-lightened hair, grown-out surfer shags, and beards that need sculpting without looking overly manscaped. Every cut includes a scalp reset with cool stones when the Santa Ana winds crank up.",
  },
  {
    name: "The Last Chair Standing",
    address: "700 Lavaca St, Austin, TX 78701",
    description:
      "SXSW chaos outside, sanctuary inside. Last Chair Standing runs on stamina: marathon days during festival season, precision fades between conference calls the rest of the year. We keep one chair open daily for walk-in emergencies—bad interviews, breakups, or pre-proposal nerves. The motto is simple: whoever sits last, leaves first-class.",
  },
];

const serviceTemplates = [
  {
    name: "Signature sculpt haircut",
    category: "HAIR" as const,
    price: 62.0,
    imageUrl:
      "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
    body: "A full consultation, shampoo if needed, precision clipper and scissor work, blow-dry styling, and a tailored product plan so the shape holds until your next visit.",
  },
  {
    name: "Beard architecture session",
    category: "BEARD" as const,
    price: 42.0,
    imageUrl:
      "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
    body: "Cheek lines, neckline geometry, mustache balance, and hot-towel finish. We map growth patterns, trim without shock lines, and finish with skin-calming balm.",
  },
  {
    name: "Ceramic edge lineup",
    category: "HAIR" as const,
    price: 36.0,
    imageUrl:
      "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
    body: "Hairline and temple refresh without a full cut—straight razor where safe, clipper detailing where needed, and cooling post-shave treatment to reduce redness.",
  },
  {
    name: "Brow blueprint shaping",
    category: "EYESBROWS" as const,
    price: 22.0,
    imageUrl:
      "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
    body: "Measured symmetry, soft arch mapping, and cleanup that respects your natural density. Ideal before events, headshots, or whenever your expression needs a sharper frame.",
  },
  {
    name: "Upper back release massage",
    category: "MASSAGE" as const,
    price: 52.0,
    imageUrl:
      "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
    body: "Targeted work on traps, rhomboids, and neck base—perfect after travel or desk marathons. Pressure calibrated to your preference; no spa fluff, just functional relief.",
  },
  {
    name: "Silk route conditioning mask",
    category: "HAIR" as const,
    price: 28.0,
    imageUrl:
      "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
    body: "Deep moisture treatment for hair and beard, steam-assisted penetration, cool rinse, and a lightweight sealant so you leave nourished, not greasy.",
  },
];

const serviceAccentLines = [
  "We section damp hair like a blueprint so weight falls exactly where you want movement.",
  "Clipper heat is managed with cooling spray so sensitive scalps stay comfortable end to end.",
  "Every finish pass is checked under two light temperatures so your line reads clean indoors and outdoors.",
  "We stretch curly patterns dry and damp so shrinkage does not lie to us mid-cut.",
  "Guards are cleaned between passes; combs are swapped when switching chemical zones.",
  "Neck dusting uses a talc-free powder loved by clients who wear dark collars daily.",
  "Sideburns are measured to the pupil line unless your style notes say otherwise.",
  "We document your parting preference so grow-out looks intentional, not accidental.",
  "Razor work is optional and always preceded by a skin patch test if you are new to us.",
  "Blow-dry coaching is included—you leave knowing how to recreate the volume we built.",
  "Beard oil is warmed in the palms so follicles drink it evenly without a slick mask.",
  "Eyebrow mapping uses string and pencil first; blades touch only after you approve.",
  "Massage sessions end with breath cues so you re-enter the world slower, not dizzy.",
  "Conditioning masks are timed with a scalp massage to boost microcirculation.",
  "We keep a polaroid wall of lineups so returning clients can match a past favorite week.",
  "Clipper-over-comb is our love language for thick hair that laughs at single-guard fades.",
  "Crown work is cross-checked from above—balding patterns get honesty, not denial.",
  "We stash disposable capes for clients in fresh ink who cannot risk fabric friction.",
  "Kids cuts get the same station setup; patience is non-negotiable, shortcuts banned.",
  "Senior guests get seated first, extra time on ear detailing, and quieter blades if needed.",
  "We rinse with filtered water to reduce mineral buildup on color-treated hair.",
  "Straight razor neck passes are triple-stretched skin, single-direction, zero heroics.",
  "Clipper batteries are rotated mid-day so torque never drops during a lineup.",
  "We mirror-check the back of your head with you—no surprises at home.",
  "Post-service texts include product links sized to your hair density, not generic ads.",
];

function buildServiceDescription(
  shopName: string,
  template: (typeof serviceTemplates)[0],
  shopIndex: number,
  serviceSlotIndex: number,
): string {
  const accent =
    serviceAccentLines[
      (shopIndex * 4 + serviceSlotIndex * 3 + template.name.length) %
        serviceAccentLines.length
    ];
  return `${template.body}\n\nAt ${shopName}, ${accent}`;
}

const serviceCombinations = [
  [0, 1, 2],
  [0, 3, 4],
  [1, 2, 5],
  [0, 4, 5],
  [2, 3, 4, 5],
  [0, 1, 3, 5],
];

async function main() {
  await resetSeedData();

  const users = [
    {
      id: "user-1",
      name: "Jasper Whitlock",
      email: "jasper.whitlock@barberly.dev",
    },
    { id: "user-2", name: "Riley Mercer", email: "riley.mercer@barberly.dev" },
    {
      id: "user-3",
      name: "Theo Nakamura",
      email: "theo.nakamura@barberly.dev",
    },
    { id: "user-4", name: "Sofia Calder", email: "sofia.calder@barberly.dev" },
    {
      id: "user-5",
      name: "Elijah Brooks",
      email: "elijah.brooks@barberly.dev",
    },
  ];

  const barbershops = barbershopImageUrls.map((imageUrl, i) => {
    const profile = barbershopProfiles[i % barbershopProfiles.length];
    return {
      id: `barbershop-${i + 1}`,
      name: profile.name,
      address: profile.address,
      description: profile.description,
      imageUrl,
    };
  });

  const phones = barbershops.map((shop, i) => ({
    id: `phone-${i + 1}`,
    number: `+1 (555) 010-${String(i + 1).padStart(4, "0")}`,
    barbershopId: shop.id,
  }));

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
        description: buildServiceDescription(shop.name, template, i, j),
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
    "DONE",
    "CONFIRMED",
    "CANCELLED",
    "CONFIRMED",
    "DONE",
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
