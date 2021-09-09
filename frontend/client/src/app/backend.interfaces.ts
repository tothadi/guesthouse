import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Section {
  title: string;
  paragraphs: string[];
}

export interface Greet {
  motto: string;
  sections: Section[];
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
  data: Buffer;
  contentType: string;
  imgSrc: string;
}

export interface Room {
  order: number;
  menu: string;
  title: string;
  sections: Section[];
  link: string;
  pics?: Pictures[];
}
