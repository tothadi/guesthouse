import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PageService } from '../pages.service';

import { AppComponent } from 'src/app/app.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';

import { Greet, MockGreet, ModGreet } from './greet.class';

@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['../pages.component.css'],
})
export class GreetComponent implements OnInit {
  objectKeys = Object.keys;

  title: string = 'Kezdőlap';
  link: string = 'kezdolap';
  api: string = 'greet';
  docs: Greet[] = [];
  original!: ModGreet;
  newGreet!: Greet;
  mockGreet!: ModGreet;

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
      this.docs = docs.map((c) => new Greet(c));
      this.mockGreet = new MockGreet(this.docs.length + 1);
      this.width =
        (this.pageWidth * 0.85 * 0.9 * 0.90) /
          (Object.keys(this.docs[0]).length - 1) -
        20;
      this.loaded = true;
    });
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName });
  }

  backendResponse(result?: any) {
    this.pageService.getAll(this.api).then((docs) => {
      this.docs = docs.map((c) => new Greet(c));
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

    console.log(this.original)

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
          return this.pageService.update(this.api, new ModGreet(data)).then(
            (result) => {
              this.backendResponse(result);
            },
            (err) => {
              console.log(err);
            }
          );
        }

        return this.pageService.create(this.api, new ModGreet(data)).then(
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

  editItem(doc: Greet) {
    this.app.blur = 'blur';
    // Create an instance of original item for possibility of cancelling
    this.original = new ModGreet(doc);
    this.openDialog(doc);
  }

  /**
   * todo: ikonok
   */
  addItem() {
    this.app.blur = 'blur';
    // Create a new empty document
    this.newGreet = new Greet(this.mockGreet);
    this.openDialog(this.newGreet);
  }

  removeItem(doc: Greet) {
    this.app.blur = 'blur';
    const removeDialog = this.dialog.open(RemoveDialogComponent, {
      width: '350px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: {
        doc,
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
