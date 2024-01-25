/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
    worker: true,
    "shared-node-browser": true,
  },
  extends: ["eslint:recommended", "plugin:astro/recommended", "plugin:astro/jsx-a11y-strict"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
    },
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  rules: {
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
  },
  settings: {
    react: {
      pragma: "h",
      version: "16.0",
    },
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-strict"],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "no-undef": "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      },
    },
    {
      files: ["*.d.ts"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
    {
      files: ["*.tsx"],
      plugins: ["react", "@typescript-eslint"],
      extends: ["plugin:react/recommended", "plugin:react/jsx-runtime"],
    },
    {
      files: ["*.ts", "*.mts", "*.cts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "no-undef": "off",
        // "@typescript-eslint/restrict-template-expressions": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    {
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
