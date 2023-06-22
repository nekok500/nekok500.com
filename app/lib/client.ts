"use server";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { optimizeImage } from "next/dist/server/image-optimizer";

const DEBUG = true;

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),

    link: new HttpLink({
      uri: "https://headless-cms.nekok500.com/graphql",

      fetch: async (...pl) => {
        const [input, options] = pl;
        return fetch(input, {
          ...options,
          headers: {
            ...options?.headers,
            "CF-Access-Client-Id": "557284ad9121eedb74548361dbf1c096.access",
            "CF-Access-Client-Secret":
              "b499164f2333fed715c550321fa437e8059b3add1cc0e68ef125157835f2e199",
          },
        });
        // console.log(options);
        // const resp = await fetch(...pl);
        // console.log(await resp.clone().text());
        // return resp;
      },
    }),
  });
});
