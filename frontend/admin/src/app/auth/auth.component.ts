import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { User } from './auth.interfaces';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements AfterViewInit {
  @ViewChild('dialog') template!: TemplateRef<any>;

  floatLabelControl = new FormControl('always');

  loginDialog!: MatDialogRef<any>;

  credentials: User = {
    username: '',
    password: '',
  };

  loginError: boolean = false;
  errorMessage: string = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  submit() {
    this.auth.login(this.credentials).subscribe(
      ($user) => {
        console.log($user);
        this.router.navigate(['/']);
      },
      (err) => {
        this.loginError = true;
        this.errorMessage = err.message;
      }
    );
  }

  ngAfterViewInit() {
    this.loginError = false;
    const loginDialog = this.dialog.open(this.template, {
      width: '350px',
    });

    this.router.events.subscribe(() => {
      loginDialog.close();
    });
  }
}
