export const create_custom_el = (
  name: string,
  ctor: CustomElementConstructor,
) => {
  if (!customElements.get(name)) customElements.define(name, ctor);
};
