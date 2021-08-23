import { Document } from 'mongoose';

interface Pictures extends Document {
  readonly base64: string;
  readonly caption?: string;
}

export interface Rooms extends Document {
    readonly order: number;
    readonly menu: string;
    readonly title: string;
    readonly paragraphs: string[];
    readonly link: string;
    readonly pics: Pictures[];
}
