export class MockContact {
  order: number;
  label: string = '';
  data: string = '';
  link: string = '';
  icon: string = '';
  _id: string = '';

  constructor(order: number) {
    this.order = order;
  }
}

export class Contact {
  'Sorszám': number;
  'Felirat': string;
  'Adat': string;
  'Link': string;
  'Ikon': string;
  _id: string;

  constructor(contact: ModContact) {
    this['Sorszám'] = contact.order;
    this['Felirat'] = contact.label;
    this['Adat'] = contact.data;
    this['Link'] = contact.link;
    this['Ikon'] = contact.icon;
    this._id = contact._id;
  }
}

export class ModContact {
  _id: string;
  order: number;
  label: string;
  data: string;
  link: string;
  icon: string;

  constructor(contact: Contact) {
    this.order = contact['Sorszám'];
    this.label = contact['Felirat'];
    this.data = contact['Adat'];
    this.link = contact['Link'];
    this.icon = contact['Ikon'];
    this._id = contact._id;
  }
}
