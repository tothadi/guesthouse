import { Picture, Section } from './common.interfaces';

export class MockActuality {
  title: string = '';
  sections: Section[] = [];
  pics: Picture[] = [];
  updatedAt: Date = new Date();
  _id: string = '';

  constructor() {}
}

export class Actuality {
  'Cím': string;
  'Leírás': Section[];
  'Képek': Picture[];
  'Módosítva': Date;
  _id: string;

  constructor(actuality: ModActuality) {
    this['Cím'] = actuality.title;
    this['Leírás'] = actuality.sections;
    this['Képek'] = actuality.pics;
    this['Módosítva'] = actuality.updatedAt;
    this._id = actuality._id;
  }
}

export class ModActuality {
  title: string;
  sections: Section[];
  pics: Picture[];
  updatedAt: Date;
  _id: string;

  constructor(actuality: Actuality) {
    this.title = actuality['Cím'];
    this.sections = actuality['Leírás'];
    this.pics = actuality['Képek'];
    this.updatedAt = actuality['Módosítva'];
    this._id = actuality._id;
  }
}

