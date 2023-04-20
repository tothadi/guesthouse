import { BackendService } from './../backend.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Reservation } from '../backend.interfaces';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
    name: string = 'Tóth Ádám';
    phone: string = '+36305716323';
    email: string = 'tothadam.onp@gmail.com';
    comment: string = '';
    focused: string = '';
    minDateArrival: Date = new Date();
    minDateLeave: Date = new Date();
    arrivalAt: Date = new Date();
    leaveAt: Date = new Date();
    sent_1 = 'Foglalás folyamatban...';
    sent_2 = 'Sikeres igénylés. Kérjük ellenőrizze email fiókját.';
    sent_3 = 'Hiba történt, kérjük próbálja meg újra!';
    status = 1;
    sent: string;
    submitted = false;

    constructor(private backend: BackendService) {
        this.minDateArrival.setDate(this.minDateArrival.getDate() + 7);
        this.minDateLeave.setDate(this.minDateArrival.getDate() + 1);
        this.arrivalAt = this.minDateArrival;
        this.leaveAt = this.minDateLeave;
        this.sent = this.sent_1;
    }

    changeFocus(input?: string) {
        if (input) {
            this.focused = input;
        }
    }

  arrivalChange(event: any, leaveInput: HTMLInputElement) {
      this.minDateLeave.setDate(new Date(event.target.value).getDate() + 1);
      leaveInput.value = this.minDateLeave.toISOString().split('T')[0];
    }

    blur() {
        this.focused = '';
    }

    testEmail() {
        return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email);
    }

    testPhone() {
        return !/^\++[0-9]{10,11}$/i.test(this.phone);
    }

    submit() {
        const reservation: Reservation = {
            name: this.name,
            status: 'pending',
            phone: this.phone,
            email: this.email,
            comment: this.comment,
            arrivalAt: this.arrivalAt,
            leaveAt: this.leaveAt,
        };
        this.submitted = true;
        this.backend.reserve(reservation).subscribe(
            (result) => {
                if (result) {
                    setTimeout(() => {
                        this.sent = this.sent_2;
                        this.status = 2;
                    }, 2000);
                    setTimeout(() => {
                        this.submitted = false;
                        this.status = 1;
                        this.sent = this.sent_1;
                    }, 5000);
                } else {
                    console.log(result);
                    setTimeout(() => {
                        this.sent = this.sent_3;
                        this.status = 3;
                    }, 2000);
                    setTimeout(() => {
                        this.submitted = false;
                        this.sent = this.sent_1;
                        this.status = 1;
                    }, 5000);
                }
            },
            ({ error }) => {
                setTimeout(() => {
                    this.sent =
                        error === 'Overlapping dates.'
                            ? 'Már létezik a megadott intervallummal átfedő foglalás.'
                            : this.sent_3;
                    this.status = 3;
                }, 2000);
                setTimeout(() => {
                    this.submitted = false;
                    this.sent = this.sent_1;
                    this.status = 1;
                }, 5000);
            }
        );
    }

    ngOnInit(): void {}
}
