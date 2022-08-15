import { BackendService } from "./../backend.service";
import { Component, OnInit } from "@angular/core";
import { Reservation } from "../backend.interfaces";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  name: string = "";
  phone: string = "";
  email: string = "";
  comment: string = "";
  arrivalAt: Date = new Date();
  leaveAt: Date = new Date();
  sent_1 = "Foglalás folyamatban...";
  sent_2 = "Sikeres foglalás.";
  sent_3 = "Hiba történt, kérjük próbálja meg újra!";
  status = 1;
  sent: string = "";
  submitted = false;

  constructor(private backend: BackendService) {
    this.arrivalAt.setDate(this.arrivalAt.getDate() + 7);
    this.leaveAt.setDate(this.leaveAt.getDate() + 8);
  }

  submit() {
    const reservation: Reservation = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      comment: this.comment,
      arrivalAt: this.arrivalAt,
      leaveAt: this.leaveAt,
    };
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
          }, 5000);
        } else {
          setTimeout(() => {
            this.sent = this.sent_3;
            this.status = 3;
          }, 2000);
          setTimeout(() => {
            this.submitted = false;
            this.status = 1;
          }, 5000);
        }
      },
      (err) => {
        setTimeout(() => {
          this.sent = this.sent_3;
          this.status = 3;
        }, 2000);
        setTimeout(() => {
          this.submitted = false;
          this.status = 1;
        }, 5000);
        console.error(err.message);
      }
    );
  }

  ngOnInit(): void {}
}
