import { asDrizzleTable } from "@astrojs/db/utils";
import { Comment, db } from "astro:db";
import { Pets } from "./config";

export default async function () {
  const typeSafePets = asDrizzleTable("Pets", Pets);

  await db.insert(typeSafePets).values([
    { name: "Palomita", species: "cat", sound: "meow" },
    { name: "Pan", species: "dog", sound: "bark" },
  ]);

  await db.insert(Comment).values([
    { authorId: "djdjfhfyrur930", content: "Hope you like Astro DB!" },
    { authorId: "ikkdididiei", content: "Enjoy!" },
  ]);
}
