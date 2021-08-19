import { Document } from 'mongoose';

export interface Rooms extends Document {
    readonly order: number;
    readonly menu: string;
    readonly title: string;
    readonly paragraphs: string[];
    readonly link: string;
    readonly pics: string[];
}
