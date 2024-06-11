import { rate_limit, updateLikes } from "@/lib/actions";
import { ActionError, defineAction, z } from "astro:actions";
import { getEntry } from "astro:content";

export const server = {
  like: defineAction({
    input: z.object({
      liked: z.boolean(),
      slug: z.string().refine(async (v) => Boolean(await getEntry("posts", v))),
    }),
    handler: async ({ slug, liked }, context) => {
      const { isRateLimited } = await rate_limit(context);
      if (isRateLimited) throw new ActionError({ code: "TOO_MANY_REQUESTS" });
      return await updateLikes({ slug, liked, context });
    },
  }),
};
