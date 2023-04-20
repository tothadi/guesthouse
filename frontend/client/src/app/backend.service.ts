import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact, Greet, Reservation, ReservationResult, Room } from './backend.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public getWelcome(): Observable<Greet[]> {
    return this.http.get<Greet[]>('/api/all-greet');
  }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/all-contact');
  }

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/all-rooms');
  }

  public reserve(reservation: Reservation): Observable<Boolean> {
    return this.http.put<Boolean>('/api/new-reservations', reservation);
  }

  public confirm(token: string): Observable<ReservationResult> {
    return this.http.get<ReservationResult>(`/api/reservations/confirmation?payload=${token}`)
  }

}
