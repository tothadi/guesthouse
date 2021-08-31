import { PagesService } from '../pages.service';
import { Actualities, Actuality } from './actualities.class';
import { Contact } from '../contact/contact.class';
import { Greet } from './greet.class';
import { Reservation } from './reservations.class';
import { Room } from './rooms.class';

export type Item = Actuality | Contact | Greet | Reservation | Room;



export class Page {
  name: string = '';
  link: string = '';
  api: string = '';
  items!: Promise<any[]>;

  constructor() {}
}
