import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  logOut() {
    this.auth.logout();
  }

  ngOnInit(): void {
  }

}
