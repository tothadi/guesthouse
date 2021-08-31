import {
  Component,
  HostBinding,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from 'src/app/app.component';

import { PageService } from '../pages.service';
import { Contact, ModContact } from './contact.class';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../pages.component.css'],
})
export class ContactComponent implements OnInit {
  @ViewChild('dialog') template!: TemplateRef<any>;
  editDialog!: MatDialogRef<any>;

  objectKeys = Object.keys;

  title: string = 'Kapcsolat';
  link: string = 'kapcsolat';
  api: string = 'contact';
  contacts: Contact[] = [];
  original!: ModContact;
  newContact!: Contact;
  mockContact!: ModContact;

  loaded = false;

  floatLabelControl = new FormControl('always');

  width: number = 0;
  edit: IconDefinition;
  remove: IconDefinition;
  save: IconDefinition;
  add: IconDefinition;
  expandClose: IconDefinition;
  close: IconDefinition;
  left: IconDefinition;
  right: IconDefinition;

  constructor(
    private pageService: PageService,
    private dialog: MatDialog,
    private app: AppComponent
  ) {
    library.add(fas);
    this.edit = icon({ prefix: 'fas', iconName: 'edit' });
    this.remove = icon({ prefix: 'fas', iconName: 'trash-alt' });
    this.save = icon({ prefix: 'fas', iconName: 'save' });
    this.add = icon({ prefix: 'fas', iconName: 'plus-square' });
    this.expandClose = icon({ prefix: 'fas', iconName: 'expand' });
    this.close = icon({ prefix: 'fas', iconName: 'window-close' });
    this.left = icon({ prefix: 'fas', iconName: 'arrow-circle-left' });
    this.right = icon({ prefix: 'fas', iconName: 'arrow-circle-right' });

    this.pageService.getAll(this.api).then((contacts) => {
      this.contacts = contacts.map((c) => new Contact(c));
      this.mockContact = {
        order: this.contacts.length + 1,
        label: '',
        data: '',
        link: '',
        icon: 'home',
        _id: '',
      };
      this.width =
        (document.body.offsetWidth * 0.85 * 0.9 * 0.95) /
          (Object.keys(this.contacts[0]).length - 2) -
        20;
      this.loaded = true;
    });
  }

  editItem(contact: Contact) {
    this.app.blur = 'blur';

    // Create an instance of original item for possibility of cancelling
    this.original = new ModContact(contact);
    this.editDialog = this.dialog.open(this.template, {
      width: '350px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: contact,
    });
  }

  /**
   * todo: ikonok
   */
  addItem() {
    this.app.blur = 'blur';
    this.newContact = new Contact(this.mockContact);
    this.editDialog = this.dialog.open(this.template, {
      width: '350px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: this.newContact,
    });
  }

  submit(data: Contact) {
    this.app.blur = '';
    this.contacts.sort((a, b) => a['Sorszám'] - b['Sorszám']);
    this.editDialog.close();
    this.loaded = false;

    if (data._id) {
      return this.pageService.update(this.api, new ModContact(data)).then(
        (result) => {
          this.pageService.getAll(this.api).then((contacts) => {
            this.contacts = contacts.map((c) => new Contact(c));
            this.contacts.sort((a, b) => a['Sorszám'] - b['Sorszám']);
            this.loaded = true;
          });
          console.log(result);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    return this.pageService.create(this.api, new ModContact(data)).then(
      (result) => {
        this.pageService.getAll(this.api).then((contacts) => {
          this.contacts = contacts.map((c) => new Contact(c));
          this.contacts.sort((a, b) => a['Sorszám'] - b['Sorszám']);
          this.loaded = true;
        });
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeDialog(id?: string) {
    this.app.blur = '';
    if (id?.length) {
      this.contacts = this.contacts.filter((c) => c._id != id);
      this.contacts.push(new Contact(this.original));
      this.contacts.sort((a, b) => a['Sorszám'] - b['Sorszám']);
    }
    this.editDialog.close();
  }

  removeItem(contact: Contact) {}

  descOrder = (a: any, b: any) => {
    if (a.key < b.key) return b.key;
  };

  ngOnInit(): void {}
}
