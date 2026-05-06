import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact, Greet, Room } from './backend.interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getWelcome(): Observable<Greet[]> {
    return this.http.get<Greet[]>(`${this.apiUrl}/api/all-greet`);
  }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/api/all-contact`);
  }

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/api/all-rooms`);
  }

}
