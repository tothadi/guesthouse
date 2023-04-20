import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BackendService } from "../backend.service";
import { Reservation } from "../backend.interfaces";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"],
})
export class ConfirmationComponent implements OnInit {
  status = "none";
  reservation: Reservation = {
    _id: '',
    status: '',
    name: '',
    email: '',
    phone: '',
    comment: '',
    arrivalAt: new Date(),
    leaveAt: new Date(),
  };

  constructor(private route: ActivatedRoute, private backend: BackendService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      setTimeout(() => {
        if (params.payload) {
          this.backend.confirm(params.payload).subscribe(
            (result) => {
              if (result) {
                const { emailResult: { success }, _doc } = result;
                this.reservation = _doc;
                this.status = success ? 'success' : 'emailFailed';
              }
            },
            ({ error }) => {
              if (error.message && error.message.includes('jwt expired')) {
                this.status = 'expiry';
              } else if (error.error.includes('duplicate key')) {
                this.status = 'duplicate';
              } else {
                this.status = 'fail';
              }
            }
          );
        }
      }, 3000);
    });
  }
}
