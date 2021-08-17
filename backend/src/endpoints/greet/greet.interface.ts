import { Document } from 'mongoose';

export interface Greet extends Document {
    readonly greet: string;
    readonly motto: string;
    readonly pic: string;
}
