import {
  Component,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from 'src/app/app.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

import { PageService } from '../pages.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { Contact, MockContact, ModContact } from './contact.class';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../pages.component.css'],
})
export class ContactComponent implements OnInit {
  objectKeys = Object.keys;

  title: string = 'Kapcsolat';
  link: string = 'kapcsolat';
  api: string = 'contact';
  docs: Contact[] = [];
  original!: ModContact;
  newContact!: Contact;
  mockContact!: ModContact;


  loaded = false;

  floatLabelControl = new FormControl('always');

  pageWidth: number = document.body.offsetWidth;
  width: number = 0;

  constructor(
    private pageService: PageService,
    private dialog: MatDialog,
    private app: AppComponent
  ) {
    library.add(fas);

    this.pageService.getAll(this.api).then((docs) => {
      this.docs = docs.map((d) => new Contact(d));
      this.mockContact = new MockContact(this.docs.length + 1);
      this.width =
        (this.pageWidth * 0.85 * 0.9 * 0.95) /
          (Object.keys(this.docs[0]).length - 1) -
        20;
      this.loaded = true;
    });
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName })
  }

  backendResponse(result?: any) {
    this.pageService.getAll(this.api).then((docs) => {
      this.docs = docs.map((d) => new Contact(d));
      this.docs.sort((a, b) => a['Sorszám'] - b['Sorszám']);
      this.loaded = true;
    });
    if (typeof result != 'undefined') {
      console.log(result);
    }
  }

  openDialog(doc: any) {
    const editDialog = this.dialog.open(EditDialogComponent, {
      width: this.pageWidth < 450 ? '350px' : '600px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: {
        doc,
        icons: this.pageService.icons,
      },
    });

    editDialog.afterClosed().subscribe(
      (data) => {
        this.app.blur = '';

        if (typeof data === 'string' && data.length === 0) {
          return;
        }

        if (typeof data === 'string') {
          return this.backendResponse();
        }

        this.loaded = false;
        
        if (data._id) {
          return this.pageService.update(this.api, new ModContact(data)).then(
            (result) => {
              this.backendResponse(result);
            },
            (err) => {
              console.log(err);
            }
          );
        }

        return this.pageService.create(this.api, new ModContact(data)).then(
          (result) => {
            this.backendResponse(result);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  editItem(doc: Contact) {
    this.app.blur = 'blur';
    // Create an instance of original item for possibility of cancelling
    this.original = new ModContact(doc);
    this.openDialog(doc);
  }

  /**
   * todo: ikonok
   */
  addItem() {
    this.app.blur = 'blur';
    // Create a new empty document
    this.newContact = new Contact(this.mockContact);
    this.openDialog(this.newContact);
  }

  removeItem(doc: Contact) {
    this.app.blur = 'blur';
    const removeDialog = this.dialog.open(RemoveDialogComponent, {
      width: '350px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: {
        doc
      },
    });

    removeDialog.afterClosed().subscribe(
      (data) => {
        this.app.blur = '';
        if (data === 'close') {
          return;
        }
        this.loaded = false;
        return this.pageService.delete(this.api, data._id).then(
          (result) => {
            this.backendResponse(result);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  descOrder = (a: any, b: any) => {
    if (a.key < b.key) return b.key;
  };

  ngOnInit(): void {}
}
