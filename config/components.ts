export const importConfig: ImportConfig = {
  imports: [
    {
      "./app/components/atoms/link.astro": [["default", "Link"]],
    },
    // {
    //   "./app/components/atoms/codesandbox.astro": [["default", "CodeSandbox"]],
    // },
    {
      "./app/components/atoms/figure.astro": [["default", "Figure"]],
    },
    // {
    //   "astro-embed": ["Tweet", "YouTube"],
    // },
    {
      "astro-icon/components": ["Icon"],
    },
  ],
};

type ImportConfig = Parameters<typeof import("astro-auto-import").default>[0];
