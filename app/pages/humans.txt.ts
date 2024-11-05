import { handler } from "@/helpers/api-handler";

export const GET = handler(async () => {
  const humansText = [
    "This website was built by Samuel Chukwuzube!",
    `/* TEAM */\nChef: Samuel Chukwuzube\nContact: ${new URL("contact-me", import.meta.env.SITE)}\nTwitter: @iamprincemuel\nLocation: Lagos, Nigeria`,
    `/* SITE */\nLast update: ${new Intl.DateTimeFormat("en-CA")
      .format(new Date())
      .replaceAll(
        "-",
        "/",
      )}\nDoctype: HTML5\nLanguage: English / French\nStandards: HTML5, CSS3, ES2023\nIDE: Neovim, Visual Studio Code, Figma\nComponents: TailwindCSS, Javascript etc.\nSoftware: Astrojs, MDX`,
    "Checkout the https://humanstxt.org/ protocol to see how you should format your humans.txt file!",
  ];

  return new Response(humansText.join("\n\n").trim(), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=UTF-8" },
  });
});
