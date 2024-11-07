import { handler } from "@/helpers/api-handler";

export const GET = handler(async () => {
  const response = `
  <OpenSearchDescription
    xmlns="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:moz="http://www.mozilla.org/2006/browser/search/"
  >
    <ShortName>Prince Muel</ShortName>
    <Description>Search princemuel.com</Description>
    <InputEncoding>UTF-8</InputEncoding>
    <Url method="get"
      type="text/html"
      template="https://www.google.com/search?q={searchTerms}+site%3Aprincemuel.com"
    />
  </OpenSearchDescription>
`;

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
});
