import { Section } from "../pages.interfaces";

export class MockGreet {
  order: number;
  motto: string = '';
  sections: Section[] = [];
  _id: string = '';

  constructor(order: number) {
    this.order = order;
  }
}

export class Greet {
  'Sorszám': number;
  'Mottó': string;
  'Leírás': Section[];
  _id: string;

  constructor(greet: ModGreet) {
    this['Sorszám'] = greet.order;
    this['Mottó'] = greet.motto;
    this['Leírás'] = greet.sections;
    this._id = greet._id
  }
}

export class ModGreet {
  order: number;
  motto: string;
  sections: Section[];
  _id: string;

  constructor(greet: Greet) {
    this.order = greet['Sorszám'];
    this.motto = greet['Mottó'];
    this.sections = greet['Leírás'];
    this._id = greet._id;
  }
}
