import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Greet {
  motto: string;
  paragraphs: string[];
}

export interface Contact {
  order: number;
  label: string;
  data: string;
  link: string;
  icon: string;
  iconDef?: IconDefinition;
}

interface Pictures {
  caption?: string;
  base64: Buffer;
}

export interface Room {
  order: number;
  menu: string;
  title: string;
  paragraphs: string[];
  link: string;
  pics?: Pictures[];
}
