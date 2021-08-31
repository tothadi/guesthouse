import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  pages: any[] = [
    {
      name: 'Aktualitások',
      link: 'aktualitasok',
      api: 'actualities',
    },
    {
      name: 'Kapcsolat',
      link: 'kapcsolat',
      api: 'contact',
    },
    {
      name: 'Kezdőlap',
      link: 'kezdolap',
      api: 'greet',
    },
    {
      name: 'Foglalások',
      link: 'foglalasok',
      api: 'reservations',
    },
    {
      name: 'Szobák',
      link: 'szobak',
      api: 'rooms',
    },
  ];

  constructor(private http: HttpClient) {}

  public getAll(api: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<any[]>(`/api/all-${api}`)
        .toPromise()
        .then(
          (item) => {
            resolve(item);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  public update(api: string, model: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http
        .patch<any[]>(`/api/update-${api}/${model._id}`, model)
        .toPromise()
        .then(
          (item) => {
            resolve(item);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  public create(api: string, item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put<any>(`/api/new-${api}`, item)
        .toPromise()
        .then(
          (item) => {
            resolve(item);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

}
