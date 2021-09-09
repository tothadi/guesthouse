import { Picture, Section } from './common.interfaces';

export class MockRoom {
  order: number;
  menu: string = '';
  title: string = '';
  sections: Section[] = [];
  link: string = '';
  pics?: Picture[] = [];
  _id: string = '';

  constructor(order: number) {
    this.order = order;
  }
}

export class ModRoom {
  order: number;
  menu: string;
  title: string;
  sections: Section[];
  link: string;
  pics?: Picture[];
  _id: string;

  constructor(room: Room) {
    this.order = room['ssz.'];
    this.menu = room['Menücím'];
    this.title = room['Cím'];
    this.sections = room['Leírás'];
    this.link = room['Link'];
    this.pics = room['Képek'] || [];
    this._id = room._id;
  }
}

export class Room {
  'ssz.': number;
  'Menücím': string;
  'Cím': string;
  'Leírás': Section[];
  'Link': string;
  'Képek': Picture[];
  _id: string;

  constructor(room: ModRoom) {
    this['ssz.'] = room.order;
    this['Menücím'] = room.menu;
    this['Cím'] = room.title;
    this['Leírás'] = room.sections;
    this['Link'] = room.link;
    this['Képek'] = room.pics || [];
    this._id = room._id;
  }
}
