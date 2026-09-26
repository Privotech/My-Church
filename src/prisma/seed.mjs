import "dotenv/config";
import { readFile } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";
import ts from "typescript";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing. Add it to .env before seeding.");
}

const source = await readFile(
  new URL("../lib/church-data.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const starterContent = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

const prisma = new PrismaClient();

try {
  await prisma.$connect();

  const before = await Promise.all([
    prisma.sermon.count(),
    prisma.event.count(),
    prisma.teamMember.count(),
    prisma.testimonial.count(),
    prisma.galleryImage.count(),
  ]);

  const results = await prisma.$transaction([
    prisma.sermon.createMany({
      data: starterContent.initialSermons.map(({ id, date, ...item }) => ({
        id,
        ...item,
        date: new Date(date),
      })),
      skipDuplicates: true,
    }),
    prisma.event.createMany({
      data: starterContent.initialEvents,
      skipDuplicates: true,
    }),
    prisma.teamMember.createMany({
      data: starterContent.initialTeam,
      skipDuplicates: true,
    }),
    prisma.testimonial.createMany({
      data: starterContent.initialTestimonials.map(({ id, date, ...item }) => ({
        id,
        ...item,
        createdAt: new Date(date),
      })),
      skipDuplicates: true,
    }),
    prisma.galleryImage.createMany({
      data: starterContent.initialGalleryImages.map(
        ({ id, date, ...item }) => ({
          id,
          ...item,
          date: new Date(date),
        }),
      ),
      skipDuplicates: true,
    }),
  ]);

  const after = await Promise.all([
    prisma.sermon.count(),
    prisma.event.count(),
    prisma.teamMember.count(),
    prisma.testimonial.count(),
    prisma.galleryImage.count(),
  ]);

  const labels = [
    "sermons",
    "events",
    "team members",
    "testimonials",
    "gallery images",
  ];
  console.log(
    "Connected to PostgreSQL. Existing rows were kept; missing starter rows were added.",
  );
  labels.forEach((label, index) => {
    console.log(
      `${label}: ${results[index].count} added (${before[index]} before, ${after[index]} after)`,
    );
  });
} finally {
  await prisma.$disconnect();
}

// this admin space look to simple bulkylize it likek make it a more modern and more appealing to the eyes admin section also the admin section should be a normal landing page designed to explain how it works the their will be 2 buttons one to add and will show the top add section where u can add to anywhere on the site and also secind place remove where u can edit remove and update existing stuffs
