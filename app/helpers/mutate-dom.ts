type UnsubscribeFn = () => void;
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe
export const mutate_dom = (node: Node, options: MutationObserverInit = {}): UnsubscribeFn => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Emit a custom event for each mutation
      node.dispatchEvent(new CustomEvent("mutate", { detail: { node, mutation, observer } }));
    }
  });
  observer.observe(node, options);

  return observer.disconnect;
};
