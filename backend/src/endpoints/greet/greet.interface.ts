import { Document } from 'mongoose';

export interface Greet extends Document {
    readonly motto: string;
    readonly paragraphs: string[];
}
