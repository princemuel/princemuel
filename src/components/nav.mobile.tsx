import { component$ } from "@builder.io/qwik";
import type { CollectionEntry } from "astro:content";

type Props = {
  routes: CollectionEntry<"routes">[];
};

const MobileNavigation = component$((_props: Props) => {
  return <div></div>;
});

export default MobileNavigation;
