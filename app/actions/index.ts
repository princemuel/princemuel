import { contactAction } from "./contact";
import { subscribeAction } from "./subscribe";

export const server = {
  contact: contactAction,
  subscribe: subscribeAction,
};
