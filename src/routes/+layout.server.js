import { Client } from "@notionhq/client";
import "dotenv/config";

const key = process.env.NOTION_KEY;
const id = process.env.NOTION_PAGE_ID;

const notion = new Client({
  auth: key,
});

const dataQuery = () =>
  notion.databases
    .query({
      database_id: id || "",
    })
    .then((response) => {
      const data = response.results.map((page) => {
        // @ts-ignore
        const properties = Object.entries(page.properties);

        const transformed = properties.map(([key, value]) => {
          if (value.type === "rich_text" || value.type === "title") {
            return [key, value[value.type][0]?.plain_text];
          }

          return [key, value[value.type]];
        });

        const [id] = page.id.split("-");

        return {
          ...Object.fromEntries(transformed),
          id,
        };
      });

      data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      return data;
    })
    .then((data) => {
      return data.map((cafe) => {
        // @ts-ignore
        const [lat, lng] = cafe.geo.split(",").map((n) => parseFloat(n));
        const position = [lng, lat];

        // @ts-ignore
        const tags = cafe.tags.map((tag) => {
          const icon = tag.name.split(' ').at(0)
          return { ...tag, icon }
        })

        return { ...cafe, position, tags };
      });
    });

const metadataQuery = () =>
  notion.databases
    .retrieve({
      database_id: id || "",
    })
    .then((response) => {
      return response.properties;
    });

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
  /** @type {Cafe[]} */
  const cafes = await dataQuery();
  const metadata = await metadataQuery();
  const query = url.searchParams.get("q");

  return {
    cafes,
    metadata,
    query,
  };
}

export const config = {
  isr: {
    // 6 hours
    expiration: 60 * 60 * 6,
  },
}
