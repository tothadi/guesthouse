import { Picture, Section } from "./common.interfaces";


export interface Room {
    _id: string;
    order: number;
    menu: string;
    title: string;
    sections: Section[];
    link: string;
    pics?: Picture[];
  }

  export class Room {
    'Sorszám': number;
    'Menücím': string;
    'Cím': string;
    'Leírás': Section[];
    'Link': string;
    'Képek': Picture[];
  
    constructor(room: Room) {
      this['Sorszám'] = room.order;
      this['Menücím'] = room.menu;
      this['Cím'] = room.title;
      this['Leírás'] = room.sections;
      this['Link'] = room.link;
      this['Képek'] = room.pics || [];
    }
  }