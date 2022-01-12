import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  Actuality,
  MockActuality,
  ModActuality,
} from './definitions/actualities.class';
import {
  Page,
  Picture,
  UploadProgress,
} from './definitions/common.interfaces';
import { Contact, MockContact, ModContact } from './definitions/contact.class';
import { Greet, MockGreet, ModGreet } from './definitions/greet.class';
import {
  MockReservation,
  ModReservation,
  Reservation,
} from './definitions/reservations.class';
import { MockRoom, ModRoom, Room } from './definitions/rooms.class';
import { Observable, Subject } from 'rxjs';
import { PagesComponent } from './pages.component';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  icons: string[] = [
    'phone',
    'phone-alt',
    'phone-volume',
    'phone-square-alt',
    'phone-square',
    'mobile',
    'mobile-alt',
    'map',
    'map-signs',
    'map-marked',
    'map-marked-alt',
    'directions',
    'route',
    'shoe-prints',
    'globe',
    'globe-asia',
    'globe-americas',
    'globe-africa',
    'globe-europe',
    'info',
    'envelope',
    'envelope-square',
    'envelope-open',
    'envelope-open-text',
    'at',
    'home',
  ];

  pages: Page[] = [
    {
      title: 'Aktualitások',
      link: 'aktualitasok',
      api: 'actualities',
      sort: 'Módosítva',
      Model: Actuality,
      Mock: MockActuality,
      Mod: ModActuality,
    },
    {
      title: 'Kapcsolat',
      link: 'kapcsolat',
      api: 'contact',
      sort: 'ssz.',
      Model: Contact,
      Mock: MockContact,
      Mod: ModContact,
    },
    {
      title: 'Kezdőlap',
      link: 'kezdolap',
      api: 'greet',
      sort: 'ssz.',
      Model: Greet,
      Mock: MockGreet,
      Mod: ModGreet,
    },
    {
      title: 'Foglalások',
      link: 'foglalasok',
      api: 'reservations',
      sort: 'Érkezés',
      Model: Reservation,
      Mock: MockReservation,
      Mod: ModReservation,
    },
    {
      title: 'Szobák',
      link: 'szobak',
      api: 'rooms',
      sort: 'ssz.',
      Model: Room,
      Mock: MockRoom,
      Mod: ModRoom,
    },
  ];

  constructor(private http: HttpClient) {}

  public getAll(api: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<any[]>(`/api/all-${api}`)
        .toPromise()
        .then(
          (item:any) => {
            resolve(item);
          },
          (err:any) => {
            reject(err);
          }
        );
    });
  }

  public getOne(api: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`/api/one-${api}/${id}`)
        .toPromise()
        .then(
          (item:any) => {
            resolve(item);
          },
          (err:any) => {
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
          (item:any) => {
            resolve(item);
          },
          (err:any) => {
            reject(err);
          }
        );
    });
  }

  public updateCaption(
    api: string,
    docId: string,
    picture: Picture
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .patch<any>(`/api/${api}/pics-update/${docId}/${picture._id}`, {
          caption: picture.caption,
        })
        .toPromise()
        .then(
          (item:any) => {
            resolve(item);
          },
          (err:any) => {
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
          (item:any) => {
            resolve(item);
          },
          (err:any) => {
            reject(err);
          }
        );
    });
  }

  public delete(api: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete<any>(`/api/delete-${api}/${id}`)
        .toPromise()
        .then(
          (item:any) => {
            resolve(item);
          },
          (err:any) => {
            reject(err);
          }
        );
    });
  }

  
  public deletePic(api: string, docId: string, picId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .delete<any>(`/api/${api}/rm-pics/${docId}/${picId}`)
        .toPromise()
        .then(
          (doc:any) => {
            resolve({doc, picId});
          },
          (err:any) => {
            reject(err);
          }
        );
    });
  }

  public upload(
    files: Set<File>,
    model: string,
    docID: string,
    cb: any
  ): UploadProgress {
    const status: UploadProgress = {};

    files.forEach((file) => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();

      formData.append('pics', file);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest(
        'PUT',
        `/api/${model}/add-pics/${docID}`,
        formData,
        {
          reportProgress: true,
        }
      );

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe((event:any) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          cb(docID, event.body);
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
      };
    });

    return status;
  }
}
