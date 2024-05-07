import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// import { column, defineDb, defineTable, NOW } from "astro:db";

// const Comment = defineTable({
//   columns: {
//     id: column.text({ primaryKey: true }),
//     authorId: column.text(),
//     content: column.text({ optional: true }),
//     likes: column.number({ optional: true }),
//     flagged: column.boolean({ optional: true }),
//     published: column.date({ default: NOW }),
//   },
//   indexes: {
//     author_idx: { on: ["authorId"], unique: true },
//   },
// });

// const User = defineTable({
//   columns: {},
// });

// export const Pets = defineTable({
//   columns: {
//     name: column.text(),
//     species: column.text(),
//     sound: column.text(),
//   },
// });

// export default defineDb({ tables: { Comment, User, Pets } });

// import { asDrizzleTable } from "@astrojs/db/utils";
// import { Comment, db } from "astro:db";
// import { Pets } from "./config";

// export default async function () {
//   const typeSafePets = asDrizzleTable("Pets", Pets);

//   await db.insert(typeSafePets).values([
//     { name: "Palomita", species: "cat", sound: "meow" },
//     { name: "Pan", species: "dog", sound: "bark" },
//   ]);

//   await db.insert(Comment).values([
//     { authorId: "djdjfhfyrur930", content: "Hope you like Astro DB!" },
//     { authorId: "ikkdididiei", content: "Enjoy!" },
//   ]);
// }
