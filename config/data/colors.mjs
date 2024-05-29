function getHexColorLightness(hexColor = "") {
  const color = hexColor.replace(/^#/, "");
  // @ts-expect-error /.{2}/g matches pairs of chars in the hex string
  const [r, g, b] = color.match(/.{2}/gi).map((hex) => parseInt(hex, 16));
  const average = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  return average / 255;
}

export function createColorsObject(colors = [""]) {
  const sortedColors = colors.sort(
    (a, b) => getHexColorLightness(b) - getHexColorLightness(a),
  );

  let key = 50;
  return Object.fromEntries(
    new Map(sortedColors.map((color) => [(key += 50), color])),
  );
}
