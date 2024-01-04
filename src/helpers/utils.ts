import { cn, type CnOptions } from "tailwind-variants";

export const tw = <T extends CnOptions>(...classes: T) => cn(...classes)({ twMerge: true });
