export const createHtml = (title: string, description: string) => {
  return {
    type: "div",
    props: {
      children: `${title} ${description}`,
      tw: "flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between",
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      },
    },
  };
};
