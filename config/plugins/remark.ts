// @ts-nocheck
import type { RemarkPlugins } from "astro";
import type { ElementContent } from "hast";
import type {
  ContainerDirective,
  LeafDirective,
  TextDirective,
} from "mdast-util-directive";
import { toString } from "mdast-util-to-string";
import { execSync } from "node:child_process";
import getReadingTime from "reading-time";
import remarkDirective from "remark-directive";
import remarkEmoji from "remark-emoji";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

type UnArray<T> = NonNullable<T extends (infer U)[] ? U : T>;
type RemarkPlugin = UnArray<import("@astrojs/markdown-remark").RemarkPlugin>;

const remarkReadingTime: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    file.data.astro.frontmatter.words = readingTime.words;
    file.data.astro.frontmatter.duration = readingTime.text;
  };
};

const remarkDeruntify: RemarkPlugin = () =>
  function (tree) {
    visit(tree, "text", function (node) {
      const wordCount = node.value.split(" ").length;

      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, "\u00A0$1");
      }
    });
  };

const remarkModifiedTime: RemarkPlugin = () =>
  function (_, file) {
    const filepath = file.history[0];
    const output = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.updatedAt = new Date(
      output.toString().trim() || Date.now(),
    ).toISOString();
  };

const remarkCodepenEmbed: RemarkPlugin = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "codepen") return;

        testDirectiveType(node, "leaf", "codepen", file);

        const { id, username } = node.attributes ?? {};

        if (!id) file.fail('Missing "id" ("#") on "codepen" directive.');

        if (!username) file.fail('Missing "username" on "codepen" directive.');

        const title = node.children
          .map((child: { value?: string }) => child?.value ?? "")
          .join(" ");

        buildElement<
          HTMLIFrameElement & {
            allowTransparency: boolean;
            credentialless: boolean;
          }
        >(
          node,
          "iframe",
          {
            title,
            src: `https://codepen.io/${username}/embed/preview/${id}?default-tab=result`,
            width: "560",
            height: "315",
            scrolling: "no",
            frameBorder: "no",
            loading: "lazy",
            allowTransparency: true,
            allowFullscreen: true,
            credentialless: true,
            referrerPolicy: "no-referrer",
            sandbox:
              "allow-forms allow-scripts allow-same-origin" as unknown as DOMTokenList,
          },
          [
            {
              type: "raw",
              value: `See the Pen <a href="https://codepen.io/${username}/pen/${id}">${title}</a> by <a href="https://codepen.io/${username}">@${username}</a> on <a href="https://codepen.io">CodePen</a>.`,
            },
          ],
        );
      }
    });
  };
};

const remarkYoutubeEmbed: RemarkPlugin = () => (tree, file) => {
  visit(tree, (node) => {
    if (
      node.type === "containerDirective" ||
      node.type === "leafDirective" ||
      node.type === "textDirective"
    ) {
      if (node.name !== "youtube") return;

      testDirectiveType(node, "leaf", "youtube", file);

      const { id, v, video } = node.attributes ?? {};
      const videoId = v ?? video ?? id;

      if (!videoId)
        file.fail(
          'Missing "id" ("#"), "v", or "video" on "youtube" directive.',
          node,
        );

      const title = node.children
        .map((child: { value?: string }) => child?.value ?? "")
        .join(" ");

      buildElement<
        HTMLIFrameElement & {
          allowTransparency: boolean;
          credentialless: boolean;
          csp: string;
        }
      >(node, "iframe", {
        title,
        src: `https://www.youtube-nocookie.com/embed/${videoId}`,
        width: "560",
        height: "315",
        frameBorder: "no",
        scrolling: "no",
        loading: "lazy",
        allowTransparency: true,
        allowFullscreen: true,
        credentialless: true,
        referrerPolicy: "no-referrer",
        sandbox: "allow-scripts allow-same-origin" as unknown as DOMTokenList,
        allow:
          "accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; browsing-topics 'none'; camera 'none'; display-capture 'none'; domain-agent 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport ''; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; usb 'none'; window-management 'none'; xr-spatial-tracking 'none'",
        csp: "sandbox allow-scripts allow-same-origin;",
      });
    }
  });
};

export const remarkPlugins: RemarkPlugins = [
  remarkDirective,
  remarkDeruntify,
  remarkReadingTime,
  remarkModifiedTime,
  // remarkToc,
  [remarkEmoji, { accessible: true }],
  remarkCodepenEmbed,
  remarkYoutubeEmbed,
];

function buildElement<T extends HTMLElement>(
  node: ContainerDirective | LeafDirective | TextDirective,
  tagName: string,
  attributes: Partial<T>,
  children?: ElementContent[],
) {
  node.data ??= {};
  node.data.hName = tagName;
  node.data.hProperties = {
    ...node.data.hProperties,
    ...attributes,
  };
  node.data.hChildren = children;
}

function testDirectiveType(
  node: { type: string },
  directiveType: "container" | "leaf" | "text",
  directiveName: string,
  file: VFile,
) {
  const colon_count =
    directiveType === "container"
      ? "three"
      : directiveType === "leaf"
        ? "two"
        : "one";
  const actualDirectiveType = node.type.replace("Directive", "");

  if (directiveType !== actualDirectiveType) {
    file.fail(
      `Unexpected ${actualDirectiveType} directive for "${directiveName}", use ${colon_count} colons for a ${directiveType} directive.`,
      node,
    );
  }
}
