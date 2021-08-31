export interface Occupations {
  _id: string;
  dates: Date[];
}

export class Occupations {
  'Dátumok': Date[];

  constructor(occupations: Occupations) {
    this['Dátumok'] = occupations.dates;
  }
}

export interface Reservation {
  _id: string;
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

  constructor(reservation: Reservation) {
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
  }
}
