import { Client } from "@notionhq/client";
import "dotenv/config";
import fs from "fs";

const key = process.env.NOTION_KEY;
const id = process.env.NOTION_PAGE_ID;

const notion = new Client({
  auth: key,
});

notion.databases
  .query({
    database_id: id,
  })
  .then((response) => {
    const data = response.results.map((page) => {
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

    return JSON.stringify(data, null, 2);
  })
  .then((data) => {
    fs.writeFileSync("./src/assets/data.json", data);
  });
