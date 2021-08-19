import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact, Greet, Room } from './backend.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public getWelcome(): Observable<Greet> {
    return this.http.get<Greet>('/api/greet');
  }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/contact');
  }

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/rooms');
  }

}
