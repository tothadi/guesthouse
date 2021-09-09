import { DatePipe } from "@angular/common";

export class Occupations {
  'Dátumok': Date[];
  _id: string;

  constructor(occupations: ModOccupations) {
    this['Dátumok'] = occupations.dates;
    this._id = occupations._id;
  }
}

export class ModOccupations {
  dates: Date[];
  _id: string;

  constructor(occupations: Occupations) {
    this.dates = occupations['Dátumok'];
    this._id = occupations._id;
  }
}

export class MockReservation {
  confirmed: Date = new Date();
  name: string = '';
  companyName?: string;
  taxNumber?: string;
  placeOfBirth: string = '';
  dateOfBirth: Date = new Date();
  mothersName: string = '';
  idType: string = '';
  idNumber: string = '';
  zip: number = 0;
  city: string = '';
  street: string = '';
  address: number = 1;
  addressMisc?: string;
  phone: string = '';
  email: string = '';
  adults: number = 0;
  infants?: number;
  comment: string = '';
  arrivalAt: Date = new Date();
  leaveAt: Date = new Date();
  currency: string = '';
  paymentMethod: string = '';
  paymentAmount: number = 0;
  paymentPaidAt: Date = new Date();
  paymentProformNumber: string = '';
  paymentInvoiceNumber: string = '';
  paymentFulfilled: boolean = false;
  _id: string = '';
}

export class Reservation {
  'Visszaigazolva': Date;
  'Név': string;
  'Cégnév'?: string;
  'Adószám'?: string;
  'Születési hely': string;
  'Születési idő': Date;
  'Anyja neve': string;
  'Személyeazonosító okmány típusa': string;
  'Személyeazonositó okmány száma': string;
  'Irányítószám': number;
  'Település': string;
  'Utca': string;
  'Házszám': number;
  'Egyéb címadat (pl. emelet, ajtó)': string;
  'Telefonszám': string;
  'Email cím': string;
  '3 évnél idősebb vendégek száma': number;
  '3 évnél fiatalabb vendégek száma': number;
  'Megjegyzés': string;
  'Érkezés': Date;
  'Távozás': Date;
  'Pénznem': string;
  'Fizetés módja': string;
  'Összeg': number;
  'Fizetve': Date;
  'Díjbekérő sorszáma': string;
  'Számla sorszáma': string;
  'Fizetés teljesült': boolean;
  _id: string;

  constructor(reservation: ModReservation) {
    this['Visszaigazolva'] = reservation.confirmed;
    this['Név'] = reservation.name;
    this['Cégnév'] = reservation.companyName;
    this['Adószám'] = reservation.taxNumber;
    this['Születési hely'] = reservation.placeOfBirth;
    this['Születési idő'] = reservation.dateOfBirth;
    this['Anyja neve'] = reservation.mothersName;
    this['Személyeazonosító okmány típusa'] = reservation.idType;
    this['Személyeazonositó okmány száma'] = reservation.idNumber;
    this['Irányítószám'] = reservation.zip;
    this['Település'] = reservation.city;
    this['Utca'] = reservation.street;
    this['Házszám'] = reservation.address;
    this['Egyéb címadat (pl. emelet, ajtó)'] = reservation.addressMisc;
    this['Telefonszám'] = reservation.phone;
    this['Email cím'] = reservation.email;
    this['3 évnél idősebb vendégek száma'] = reservation.adults;
    this['3 évnél fiatalabb vendégek száma'] = reservation.infants;
    this['Megjegyzés'] = reservation.comment;
    this['Érkezés'] = reservation.arrivalAt;
    this['Távozás'] = reservation.leaveAt;
    this['Pénznem'] = reservation.currency;
    this['Fizetés módja'] = reservation.paymentMethod;
    this['Összeg'] = reservation.paymentAmount;
    this['Fizetve'] = reservation.paymentPaidAt;
    this['Díjbekérő sorszáma'] = reservation.paymentProformNumber;
    this['Számla sorszáma'] = reservation.paymentInvoiceNumber;
    this['Fizetés teljesült'] = reservation.paymentFulfilled;
    this._id = reservation._id;
  }
}

export class ModReservation {
  confirmed: Date;
  name: string;
  companyName?: string;
  taxNumber?: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  mothersName: string;
  idType: string;
  idNumber: string;
  zip: number;
  city: string;
  street: string;
  address: number;
  addressMisc: string;
  phone: string;
  email: string;
  adults: number;
  infants: number;
  comment: string;
  arrivalAt: Date;
  leaveAt: Date;
  currency: string;
  paymentMethod: string;
  paymentAmount: number;
  paymentPaidAt: Date;
  paymentProformNumber: string;
  paymentInvoiceNumber: string;
  paymentFulfilled: boolean;
  _id: string;

  constructor(reservation: Reservation) {
    this.confirmed = reservation['Visszaigazolva'];
    this.name = reservation['Név'];
    this.companyName = reservation['Cégnév'];
    this.taxNumber = reservation['Adószám'];
    this.placeOfBirth = reservation['Születési hely'];
    this.dateOfBirth = reservation['Születési idő'];
    this.mothersName = reservation['Anyja neve'];
    this.idType = reservation['Személyeazonosító okmány típusa'];
    this.idNumber = reservation['Személyeazonositó okmány száma'];
    this.zip = reservation['Irányítószám'];
    this.city = reservation['Település'];
    this.street = reservation['Utca'];
    this.address = reservation['Házszám'];
    this.addressMisc = reservation['Egyéb címadat (pl. emelet, ajtó)'];
    this.phone = reservation['Telefonszám'];
    this.email = reservation['Email cím'];
    this.adults = reservation['3 évnél idősebb vendégek száma'];
    this.infants = reservation['3 évnél fiatalabb vendégek száma'];
    this.comment = reservation['Megjegyzés'];
    this.arrivalAt = reservation['Érkezés'];
    this.leaveAt = reservation['Távozás'];
    this.currency = reservation['Pénznem'];
    this.paymentMethod = reservation['Fizetés módja'];
    this.paymentAmount = reservation['Összeg'];
    this.paymentPaidAt = reservation['Fizetve'];
    this.paymentProformNumber = reservation['Díjbekérő sorszáma'];
    this.paymentInvoiceNumber = reservation['Számla sorszáma'];
    this.paymentFulfilled = reservation['Fizetés teljesült'];
    this._id = reservation._id;
  }
}
