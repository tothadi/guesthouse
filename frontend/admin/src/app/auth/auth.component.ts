import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
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
  @ViewChild('usernameInput') usernameInput!: NgModel;
  @ViewChild('passwordInput') passwordInput!: NgModel;

  floatLabelControl = new FormControl('always');

  loginDialog!: MatDialogRef<any>;

  userPlaceHolder: string = 'Add meg a felhasználóneved!';
  pwPlaceHolder: string = 'Add meg a jelszavad!';

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
      ($res) => {
        if ($res.info?.message) {
          console.log($res.info?.message);
          if ($res.info?.message === 'Nem létező felhasználó') {
            this.userPlaceHolder = $res.info?.message;
            this.usernameInput.reset('');
            return;
          }
          this.pwPlaceHolder = $res.info?.message;
          this.passwordInput.reset('');
          return;
        }
        this.userPlaceHolder = 'Add meg a felhasználóneved!';
        this.pwPlaceHolder = 'Add meg a jelszavad!';
        this.router.navigateByUrl('/');
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
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
    });

    this.router.events.subscribe(() => {
      loginDialog.close();
    });
  }
}
