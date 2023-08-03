// div.BLOCK > pre.PRE > code.CODE
export const BLOCK =
  'overflow-hidden rounded-lg bg-rose-100/5 shadow-surface-elevation-low ring-1 ring-rose-100/[3%] ring-inset';

export const TITLE =
  'mb-0.5 rounded-md bg-rose-100/10 px-3 py-1 font-mono text-xs text-rose-100/70 shadow-sm';

export const PRE =
  'overflow-x-auto py-2 text-[13px] leading-6 [color-scheme:dark]';

export const CODE =
  'grid [&>span]:border-l-4 [&>span]:border-l-transparent [&>span]:pl-2 [&>span]:pr-3';

export const INLINE_BLOCK =
  'whitespace-nowrap border border-rose-200/10 px-1.5 py-px text-[12px] rounded-full bg-white/5 whitespace-nowrap text-rose-300/90';

export const INLINE_CODE = '';

export const NUMBERED_LINES =
  '[counter-reset:line] before:[&>span]:mr-3 before:[&>span]:inline-block before:[&>span]:w-4 before:[&>span]:text-right before:[&>span]:text-white/20 before:[&>span]:![content:counter(line)] before:[&>span]:[counter-increment:line]';
export const HIGHLIGHTED_LINE =
  '!border-l-rose-300/70 bg-rose-200/10 before:!text-white/70';

export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70`;

export const LINK_STYLES = `text-rose-100/90 underline decoration-rose-200/30 underline-offset-2 transition-all hover:text-rose-100 hover:decoration-rose-200/50`;

export const LINK_SUBTLE_STYLES = `hover:underline hover:decoration-rose-300/30 hover:underline-offset-2 hover:text-rose-200/90`;

export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-rose-100/0 hover:before:text-rose-100/50 pl-[1em] -ml-[1em]`;
