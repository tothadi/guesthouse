import { Type } from '@angular/core';
import { Contact, MockContact, ModContact } from './contact.class';
import { Actuality, MockActuality, ModActuality } from './actualities.class';
import { Greet, MockGreet, ModGreet } from './greet.class';
import {
  MockReservation,
  ModReservation,
  Reservation,
} from './reservations.class';
import { MockRoom, ModRoom, Room } from './rooms.class';
import { Observable } from 'rxjs';

export type ModelType = Actuality | Contact | Greet | Reservation | Room;
export type MockType =
  | MockActuality
  | MockContact
  | MockGreet
  | MockReservation
  | MockRoom;
export type ModType =
  | ModActuality
  | ModContact
  | ModGreet
  | ModReservation
  | ModRoom;

export interface Page {
  title: string;
  link: string;
  api: string;
  sort: string;
  Model: Type<ModelType>;
  Mock: Type<MockType>;
  Mod: Type<ModType>;
}

export interface UploadProgress {
  [key: string]: { progress: Observable<number> };
}

export interface UploadStatus {
  docID: string;
  picIDs: string[];
}

export interface UpdateData {
  doc: ModelType;
  picID: string;
}

export interface Section {
  title: string;
  paragraphs: string[];
  _id: string;
}

export interface Picture {
  caption?: string;
  data: Buffer;
  contentType: string;
  imgSrc: string;
  _id: string;
}
