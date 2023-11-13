export type Option = {
  name: string;
  color: string;
};

export type Cafe = {
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
};
