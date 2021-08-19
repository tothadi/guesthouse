import { Document } from "mongoose";

export interface Contact extends Document {
  readonly order: number;
  readonly label: string;
  readonly data: string;
  readonly link: string;
  readonly icon: string;
}
