// @ts-check
import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
// @ts-ignore
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOxlint from "eslint-plugin-oxlint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginQwik from "eslint-plugin-qwik";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

export default tseslint.config(
  {
    // note - intentionally uses computed syntax to make it easy to sort the keys
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
      ["import"]: fixupPluginRules(eslintPluginImport),
      ["simple-import-sort"]: eslintPluginSimpleImportSort,
      ["qwik"]: fixupPluginRules(eslintPluginQwik),
      ["unicorn"]: eslintPluginUnicorn,
    },
  },
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      "**/jest.config.js",
      "**/node_modules/**",
      "**/dist/**",
      "**/fixtures/**",
      "**/coverage/**",
      "**/__snapshots__/**",
      "**/build/**",
      "**/config/**",
      "**/src/**",
      "**/api/**",

      "*.config.*",
      "*.ignored.*",
      "*.local.*",
    ],
  },
  // extends ...
  eslint.configs.recommended,
  // @ts-expect-error
  ...compat.config(eslintPluginOxlint.configs.all),
  eslintPluginPrettierRecommended,
  // base config
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.node,
        ...globals["shared-node-browser"],
      },
      parserOptions: {
        allowAutomaticSingleRunInference: true,
        cacheLifetime: {
          // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
          // in the rare case that we do - just need to manually restart their IDE.
          glob: "Infinity",
        },
        project: "tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    rules: {
      //
      // eslint-plugin-import
      //
      // enforces consistent type specifier style for named imports
      "import/consistent-type-specifier-style": "error",
      // disallow non-import statements appearing before import statements
      "import/first": "error",
      // Require a newline after the last import/require in a group
      "import/newline-after-import": "error",
      // Forbid import of modules using absolute paths
      "import/no-absolute-path": "error",
      // disallow AMD require/define
      "import/no-amd": "off",
      // forbid default exports - we want to standardize on named exports so that imported names are consistent
      "import/no-default-export": "error",
      // disallow imports from duplicate paths
      "import/no-duplicates": "error",
      // Forbid the use of extraneous packages
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      // Forbid mutable exports
      "import/no-mutable-exports": "error",
      // Prevent importing the default as if it were named
      "import/no-named-default": "error",
      // Prohibit named exports
      "import/no-named-export": "off", // we want everything to be a named export
      // Forbid a module from importing itself
      "import/no-self-import": "error",
      // Require modules with a single export to use a default export
      "import/prefer-default-export": "off", // we want everything to be named

      // enforce a sort order across the codebase
      "simple-import-sort/imports": "error",

      //
      // eslint-plugin-unicorn
      //
      "unicorn/no-typeof-undefined": "error",
    },
  },

  {
    files: ["./app/**/*.astro"],
    ...eslintPluginAstro.configs.recommended,
    ...eslintPluginAstro.configs["jsx-a11y-strict"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  {
    files: ["./app/**/*.ts", "./app/**/*.tsx"],
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    rules: {
      // make sure we're not leveraging any deprecated APIs
      "deprecation/deprecation": "error",

      // TODO: https://github.com/typescript-eslint/typescript-eslint/issues/8538
      "@typescript-eslint/no-confusing-void-expression": "off",

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": false,
          minimumDescriptionLength: 5,
        },
      ],
      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowIIFEs: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-constant-condition": "off",
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],
      "@typescript-eslint/no-unnecessary-type-parameters": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/prefer-literal-enum-member": [
        "error",
        {
          allowBitwiseExpressions: true,
        },
      ],
      "@typescript-eslint/prefer-string-starts-ends-with": [
        "error",
        {
          allowSingleElementEquality: "always",
        },
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: true,
          ignorePrimitives: true,
        },
      ],
    },
  },

  {
    files: ["./app/**/*.jsx", "./app/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
      },
    },
    extends: [...compat.config(eslintPluginQwik.configs.strict)],
  },

  // Typescript Definition Files
  {
    files: ["./app/**/*.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  // Markdown Code Blocks Linting For JS
  {
    // all code blocks in .md files
    files: ["**/*.md/*.js?(x)", "**/*.md/*.ts?(x)"],
    rules: {
      "no-unreachable": "off",
      "no-unused-expressions": "off",
      "no-unused-labels": "off",
      "no-unused-vars": "off",
      "prefer-const": "warn",
      "jsx-a11y/alt-text": "off",
      "jsx-a11y/anchor-has-content": "off",
      "prefer-let/prefer-let": "off",
    },
  },

  // Markdown Code Blocks Linting For TS
  {
    // all ```ts & ```tsx code blocks in .md files
    files: ["**/*.md/*.ts?(x)"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["eslint.config.{js,cjs,mjs}"],
    rules: {
      // requirement
      "import/no-default-export": "off",
    },
  },
);
