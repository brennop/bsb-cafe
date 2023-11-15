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
    tags: Option[];
    wifi?: string;
    location?: string;
    id: string;
    slug: string;
    region: Option;
  }
}

export { };
