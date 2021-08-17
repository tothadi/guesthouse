import { ObjectId } from "mongoose";

export class ReservationDto {
    readonly _id: string;
    readonly confirmed: boolean;
    readonly name: string;
    readonly companyName: string;
    readonly taxNumber: string;
    readonly placeOfBirth: string;
    readonly dateOfBirth: Date;
    readonly mothersName: string;
    readonly idType: string;
    readonly idNumber: string;
    readonly zip: number;
    readonly city: string;
    readonly street: string;
    readonly address: number;
    readonly addressMisc: string;
    readonly phone: string;
    readonly email: string;
    readonly adults: number;
    readonly infants: number;
    readonly comment: string;
    readonly arrivalAt: Date;
    readonly leaveAt: Date;
    readonly currency: string;
    readonly paymentMethod: string;
    readonly paymentAmount: number;
    readonly paymentPaidAt: Date;
    readonly paymentProformNumber: string;
    readonly paymentInvoiceNumber: string;
    readonly paymentFulfilled: boolean;
}

export class IpnDto {
    readonly szlahu_szamlaszam: string;
    readonly szlahu_rendelesszam: ObjectId;
    readonly szlahu_bruttovegosszeg: string;
    readonly szlahu_kifizetettbrutto: string;
    readonly szlahu_fizetesmod: string;
}

export class OccupationDto {
    readonly dates: Date[];
}