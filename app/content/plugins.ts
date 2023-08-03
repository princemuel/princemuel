import {
  BLOCK,
  CODE,
  HIGHLIGHTED_LINE,
  INLINE_BLOCK,
  INLINE_CODE,
  NUMBERED_LINES,
  PRE,
  TITLE,
} from '@/config';
import { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';

export function codeBlockClasses() {
  return (tree: any) => {
    visit(
      tree,
      (node: any) =>
        Boolean(
          node.tagName === 'code' &&
            Object.keys(node.properties).length === 0 &&
            node.children.some((n: any) => n.type === 'text')
        ),

      (node: any) => {
        const textNode = node.children.find((n: any) => n.type === 'text');
        textNode.type = 'element';
        textNode.tagName = 'code';
        textNode.properties = { className: [INLINE_CODE] };
        textNode.children = [{ type: 'text', value: textNode.value }];
        node.properties.className = [INLINE_BLOCK];
        node.tagName = 'span';
      }
    );

    visit(
      tree,

      (node: any) =>
        Boolean(
          typeof node?.properties?.['data-rehype-pretty-code-fragment'] !==
            'undefined'
        ),

      (node: any) => {
        if (node.tagName === 'span') {
          node.properties.className = [
            ...(node.properties.className || []),
            INLINE_BLOCK,
          ];

          node.children[0].properties.className = [
            ...(node.children[0].properties.className || []),
            INLINE_CODE,
          ];

          return node;
        }

        if (node.tagName === 'div') {
          node.properties.className = [
            ...(node.properties.className || []),
            BLOCK,
          ];

          node.children = node.children.map((node: any) => {
            if (
              node.tagName === 'div' &&
              typeof node.properties?.['data-rehype-pretty-code-title'] !==
                'undefined'
            ) {
              node.properties.className = [
                ...(node.properties.className || []),
                TITLE,
              ];
            }
            if (node.tagName === 'pre') {
              node.properties.className = [PRE];

              if (node.children[0].tagName === 'code') {
                node.children[0].properties.className = [
                  ...(node.children[0].properties.className || []),
                  CODE,
                ];

                if (
                  typeof node.children[0].properties['data-line-numbers'] !==
                  'undefined'
                ) {
                  node.children[0].properties.className.push(NUMBERED_LINES);
                }
              }
            }

            return node;
          });

          return node;
        }
      }
    );
  };
}

export const codeBlockOptions: Partial<PrettyCodeOptions> = {
  theme: 'one-dark-pro',
  tokensMap: {
    // VScode command palette: Inspect Editor Tokens and Scopes
    // https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
    fn: 'entity.name.function',
    objKey: 'meta.object-literal.key',
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
    node.properties.className = [''];
  },
  onVisitHighlightedLine(node) {
    // add highlighted line classes
    node?.properties?.className?.push(HIGHLIGHTED_LINE);
  },
};
