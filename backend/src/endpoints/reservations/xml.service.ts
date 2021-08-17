import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReservationDto } from 'src/dto/reservation.dto';

export interface Beallitasok {
    szamlaagentkulcs: string; // this.configService.get<string>('INVOICE_KEY
    eszamla: boolean; // true
    szamlaLetoltes: boolean; // false - nem fontos
    valaszVerzio: number; // 1 - sima szöveg, nem kell xml
}

export interface Fejlec {
    keltDatum: string; // 2020-01-01 - formázott dátum
    teljesitesDatum: string; // 2020-01-01 - formázott dátum
    fizetesiHataridoDatum: string; // 2020-01-01 - formázott dátum
    fizmod: string; // Átutalás, PayPal, Bankkártya - reservationData.paymentMethod-ból
    penznem: string; // HUF, EUR - reservationData.currency
    szamlaNyelve: string; // hu - egyelőre, can  be: de, en, it, hu, fr, ro, sk, hr
    arfolyamBank: string; // MNB
    arfolyam: string; // 0.0
    rendelesSzam: string; // reservationData._id
    dijbekeroSzamlaszam: string; // üres ha proforma, végszámlánál reservationData.paymentProformNumber
    elolegszamla: boolean; // false
    vegszamla: boolean; // false
    helyesbitoszamla: boolean; // false
    dijbekero: boolean; // értelemszerűen
    szamlaszamElotag: string; // AAA - regisztrációnál generált előtag
}

export interface Elado {
    bank: string; // bank neve
    bankszamlaszam: string; // this.configService.get<string>('INVOICE_ACCOUNT
    emailReplyto: string; // this.configService.get<string>('INVOICE_EMAIL
    emailTargy: string; // értesítés díjbekérő/számla elkészültéről
    emailSzoveg: string; // bla bla
}

export interface Vevo {
    nev: string; // reservationData.name/companyName
    irsz: number; // reservationData.zip
    telepules: string; // reservationData.city
    cim: string; // reservationData.street+address
    email: string; // reservationData.email
    sendEmail: boolean; // true
    adoszam: string; // lehet üres
    megjegyzes: string; // reservationData.comment
}

export interface Tetel {
    megnevezes: string;
    mennyiseg: number;
    mennyisegiEgyseg: string;
    bruttoEgysegar: number;
    afakulcs: number;
}

@Injectable()
export class XmlService {

    today = new Date();
    year = this.today.getFullYear();
    month = this.today.getMonth() + 1;
    day = this.today.getDate();
    deadLine = new Date(this.year, this.month - 1, this.day + 8)
    deadLineYear = this.deadLine.getFullYear();
    deadLineMonth = this.deadLine.getMonth() + 1;
    deadLineDay = this.deadLine.getDate();

    constructor(
        private readonly configService: ConfigService
    ) { }

    prepareXML(reservationData: ReservationDto, isProform: boolean): {} {
        const
            beallitasok: Beallitasok = {
                szamlaagentkulcs: this.configService.get<string>('INVOICE_KEY'),
                eszamla: true,
                szamlaLetoltes: false,
                valaszVerzio: 2
            },
            fejlec: Fejlec = {
                keltDatum: `${this.year}-${this.month < 10 ? '0' + this.month : this.month}-${this.day < 10 ? '0' + this.day : this.day}`,
                teljesitesDatum: `${this.year}-${this.month < 10 ? '0' + this.month : this.month}-${this.day < 10 ? '0' + this.day : this.day}`,
                fizetesiHataridoDatum: `${this.deadLineYear}-${this.deadLineMonth < 10 ? '0' + this.deadLineMonth : this.deadLineMonth}-${this.deadLineDay < 10 ? '0' + this.deadLineDay : this.deadLineDay}`,
                fizmod: reservationData.paymentMethod,
                penznem: reservationData.currency,
                szamlaNyelve: 'hu',
                arfolyamBank: 'MNB',
                arfolyam: '0.0',
                rendelesSzam: `${reservationData._id}`,
                dijbekeroSzamlaszam: isProform ? '' : reservationData.paymentProformNumber,
                elolegszamla: false,
                vegszamla: false,
                helyesbitoszamla: false,
                dijbekero: isProform,
                szamlaszamElotag: this.configService.get<string>('INVOICE_PREFIX')
            },
            elado: Elado = {
                bank: this.configService.get<string>('INVOICE_BANK'),
                bankszamlaszam: this.configService.get<string>('INVOICE_ACCOUNT'),
                emailReplyto: this.configService.get<string>('MAILER_EMAIL'),
                emailTargy: `Értesítés új ${isProform ? 'díjbekérő' : 'számla'} kiállításáról`,
                emailSzoveg: `<p>Új ${isProform ? 'díjbekérő' : 'számla'} került kiállításra.</p>
                <p><strong>Vevő:</strong> ${reservationData.name}</p>
                <p><strong>Cím:</strong> ${reservationData.zip} ${reservationData.city}, ${reservationData.street} ${reservationData.addressMisc ? reservationData.address + ', ' + reservationData.addressMisc : reservationData.address}</p>
                <p><strong>Telefon:</strong> ${reservationData.phone}</p>
                <p><strong>Email:</strong> ${reservationData.email}</p>`,
            },
            vevo: Vevo = {
                nev: reservationData.companyName ? reservationData.companyName : reservationData.name,
                irsz: reservationData.zip,
                telepules: reservationData.city,
                cim: `${reservationData.street} ${reservationData.addressMisc ? reservationData.address + ', ' + reservationData.addressMisc : reservationData.address}`,
                email: reservationData.email,
                sendEmail: true,
                adoszam: reservationData.companyName ? reservationData.taxNumber : '',
                megjegyzes: reservationData.comment
            },
            tetel: Tetel = {
                megnevezes: 'vendéglátás',
                mennyiseg: 1,
                mennyisegiEgyseg: 'db',
                afakulcs: 27, // TAHK ha mentes
                bruttoEgysegar: this.configService.get<number>('INVOICE_GROSS'),
            },
            xml = {
                xmlszamla: {
                    beallitasok,
                    fejlec,
                    elado,
                    vevo,
                    tetelek: { tetel }
                    ,
                    $: {
                        xmlns: 'http://www.szamlazz.hu/xmlszamla',
                        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                        'xsi:schemaLocation': 'http://www.szamlazz.hu/xmlszamla https://www.szamlazz.hu/szamla/docs/xsds/agent/xmlszamla.xsd'
                    }
                }
            }
            return xml;
    }

}
