import { Document } from 'mongoose';

export interface Introduction extends Document {
    readonly title: string;
    readonly text: string;
    readonly pics: string[];
}