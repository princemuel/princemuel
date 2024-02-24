import { component$ } from "@builder.io/qwik";
import type { CollectionEntry } from "astro:content";

type Props = {
  toggle?: React.ReactNode;
  link?: React.ReactNode;
  routes: CollectionEntry<"routes">[];
};

export const MobileNavigation = component$((props: Props) => {
  return <div>{JSON.stringify(props, null, 2)}</div>;
});
