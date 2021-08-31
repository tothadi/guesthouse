import { PagesService } from '../pages.service';
import { Section } from '../pages.interfaces';

export interface Actuality {
  _id: string;
  title: string;
  sections: Section[];
  pics: string[];
}

export class Actuality {
  'Cím': string;
  'Leírás': Section[];
  'Képek': string[];

  constructor(actuality: Actuality) {
    this['Cím'] = actuality.title;
    this['Leírás'] = actuality.sections;
    this['Képek'] = actuality.pics;
  }
}

export class Actualities {
  name: string = 'Aktualitások';
  link: string = 'aktualitasok';
  api: string = 'actualities';
  items: Promise<Actuality[]>;

  constructor(private pageService: PagesService) {
    this.items = this.getItems(this.api);
  }

  async getItems(api: string): Promise<Actuality[]> {
    return (await this.pageService.apiCall(api)).map((item: Actuality) => {
      return new Actuality(item);
    });
  }
}
