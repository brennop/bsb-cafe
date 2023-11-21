// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  type Cafe = {
    name: string;
    geo: string;
    position: [number, number];
    instagram?: string | null;
    tags: Tag[];
    wifi?: string;
    location?: string;
    id: string;
    slug: string;
    region: Option;
  }

  type Tag = {
    icon: string;
  } & Option;

  type Option = {
    name: string;
    color: string;
  };

  type Metadata = {
    region: {
      select: {
        options: Option[];
      }
    },
    tags: {
      multi_select: {
        options: Option[];
      }
    },
  }
}

export { };
