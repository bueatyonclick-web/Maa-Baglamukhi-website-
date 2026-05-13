import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  await prisma.admin.upsert({
    where: { email: "admin@baglamukhi.com" },
    update: {},
    create: {
      name: "Temple Admin",
      email: "admin@baglamukhi.com",
      password: passwordHash,
    },
  });

  const pkgCount = await prisma.pujaPackage.count();
  if (pkgCount === 0) {
    await prisma.pujaPackage.createMany({
      data: [
        {
          title: "Maa Baglamukhi Maha Puja",
          slug: "maa-baglamukhi-maha-puja",
          description:
            "Full sankalp with Vedic mantras and offerings for protection and victory.",
          price: 5100,
          duration: "3–4 hours",
          panditName: "Pandit Shri Ram Sharma",
          category: "PUJA",
          isFeatured: true,
        },
        {
          title: "Shatru Nashak Havan",
          slug: "shatru-nashak-havan",
          description: "Sacred havan for removing obstacles and hostile influences.",
          price: 11000,
          duration: "5–6 hours",
          panditName: "Pandit Shri Ram Sharma",
          category: "HAVAN",
          isFeatured: true,
        },
      ],
    });
  }

  const cs = await prisma.contactSettings.count();
  if (cs === 0) {
    await prisma.contactSettings.create({
      data: {
        templeName: "Shree Maa Baglamukhi Siddha Peeth",
        address: "Nalkheda, Agar Malwa, Madhya Pradesh, India",
        phone1: "+91 98765 43210",
        phone2: "+91 98765 43211",
        whatsapp: "+919876543210",
        email: "info@baglamukhi.com",
        googleMapLink: "https://maps.google.com",
      },
    });
  }

  const sl = await prisma.socialLinks.count();
  if (sl === 0) {
    await prisma.socialLinks.create({
      data: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        whatsapp: "https://wa.me/919876543210",
        twitter: "https://twitter.com",
      },
    });
  }

  const ws = await prisma.websiteSettings.count();
  if (ws === 0) {
    await prisma.websiteSettings.create({
      data: {
        heroTitle: "Shree Maa Baglamukhi Peeth",
        heroSubtitle: "Experience divine blessings through sacred rituals.",
        footerText: "॥ Jai Maa Baglamukhi ॥",
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
