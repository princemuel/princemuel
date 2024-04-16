import { column, defineDb, defineTable, NOW } from "astro:db";

const Comment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    authorId: column.text(),
    content: column.text({ optional: true }),
    likes: column.number({ optional: true }),
    flagged: column.boolean({ optional: true }),
    published: column.date({ default: NOW }),
  },
  indexes: {
    author_idx: { on: ["authorId"], unique: true },
  },
});

const User = defineTable({
  columns: {},
});

export const Pets = defineTable({
  columns: {
    name: column.text(),
    species: column.text(),
    sound: column.text(),
  },
});

export default defineDb({ tables: { Comment, User, Pets } });
