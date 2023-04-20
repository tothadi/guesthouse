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
  fileName: string;
}

export interface Room {
  order: number;
  menu: string;
  title: string;
  sections: Section[];
  link: string;
  pics?: Pictures[];
}

export interface Reservation {
  confirmed?: Date;
  name: string;
  phone: string;
  email: string;
  comment: string;
  arrivalAt: Date;
  leaveAt: Date;
  _id?: string;
}

export interface EmailResult {
  success: boolean;
}

export interface ReservationResult {
  _doc: Reservation;
  emailResult: EmailResult;
}
