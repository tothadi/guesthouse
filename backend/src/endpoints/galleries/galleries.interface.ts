import { Document } from 'mongoose';

export interface Picture {
    readonly filename: string;
    readonly caption: string;
}

export interface Galleries extends Document {
    readonly title: string;
    readonly folder: string;
    readonly text: string;
    readonly pics: Picture[];
}