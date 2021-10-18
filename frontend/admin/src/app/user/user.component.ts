import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TokenPayload, UserData } from '../auth/auth.interfaces';
import { AuthService } from '../auth/auth.service';
import { MatChipInputEvent } from '@angular/material/chips';

class KeyValue {
  key: string;
  value: any;
  constructor(data: KeyValue) {
    this.key = data.key;
    this.value = data.value;
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnChanges {
  user: any;
  properties: KeyValue[];
  addOnBlur = true;
  removable = true;
  modified = false;
  roleError = '';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private auth: AuthService, private cd: ChangeDetectorRef) {
    this.user = new UserData(this.auth.getUser());
    this.properties = Object.keys(this.user)
      .map((k) => {
        return new KeyValue({ key: k, value: this.user[k] });
      })
      .filter((k) => k.key.includes('_') && !k.key.includes('id'));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.user['array_Szerepkör(ök)'].push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeRole(index: number): void {
    if (this.user['array_Szerepkör(ök)'].length >= 1) {
      this.user['array_Szerepkör(ök)'].splice(index, 1);
      this.removable =
        this.user['array_Szerepkör(ök)'].length < 2 ? false : true;
    }
  }

  throwRoleError(): void {
    if (!this.removable) {
      this.roleError = 'Legalább 1 szerepkör kötelező';
      setTimeout(() => {
        this.roleError = '';
      }, 3000);
    }
  }

  cancelChanges() {
    this.properties = Object.keys(this.user)
      .map((k) => {
        return { key: k, value: this.user[k] };
      })
      .filter((k) => k.key.includes('_') && !k.key.includes('id'));
    this.removable = this.user['array_Szerepkör(ök)'].length < 2 ? false : true;
    console.log(this.user)
    console.log(this.properties)
  }

  saveChanges() {
    this.auth.modUser(new TokenPayload(this.user));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {}
}
