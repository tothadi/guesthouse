import { Document } from 'mongoose';

export interface Actualities extends Document {
    readonly title: string;
    readonly text: string;
    readonly pics: string[];
}