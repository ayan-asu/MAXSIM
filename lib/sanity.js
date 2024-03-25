import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "b8xc3xdp", // find this at manage.sanity.io or in your sanity.json file
  dataset: "production", // usually "production"
  //   apiVersion: '2023-02-01', // use a current ISO date
  useCdn: false, // `false` ensures fresh data
});
