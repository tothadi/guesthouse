import { PagesService } from "../pages.service";
import { Section } from "./common.interfaces";
import { Page } from "./pages.class";

export interface Greet {
    _id: string;
    motto: string;
    sections: Section[];
  }

export class Greet {
  'Mottó': string;
  'Leírás': Section[];

  constructor(greet: Greet) {
    this['Mottó'] = greet.motto;
    this['Leírás'] = greet.sections;
  }
}

export class Greets {
  name: string = 'Kezdőlap';
  link: string = 'kezdolap';
  api: string = 'greet';
  items: Promise<Greet[]>;

  constructor(private pageService: PagesService) {
    this.items = this.getItems(this.api);
  }

  async getItems(api: string): Promise<Greet[]> {
    return (await this.pageService.apiCall(api)).map((item: Greet) => {
      return new Greet(item);
    });
  }
}
