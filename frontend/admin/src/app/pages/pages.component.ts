import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Buffer } from 'buffer';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from 'src/app/app.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';

import { PageService } from './pages.service';

import {
  MockType,
  ModelType,
  Page,
  Picture,
  UpdateData,
  UploadStatus,
} from './definitions/common.interfaces';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  objectKeys = Object.keys;
  loaded = false;
  floatLabelControl = new FormControl('always');

  keys: string[] = [];
  toHide = 0;
  pageWidth: number = document.body.offsetWidth;
  columns: number = 1;
  width: number = 0;
  widthRatio: number = 0.85 * 0.9 * 0.9;
  orderWidth: number = 50;

  page: Page;
  docs: any[] = [];
  newModel!: ModelType;
  mock!: MockType;

  constructor(
    private pageService: PageService,
    private dialog: MatDialog,
    private app: AppComponent,
    private location: Location,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    library.add(fas);
    const path = this.location.path().split('/')[2];
    this.page = this.pageService.pages.filter((p) => p.link === path)[0];
  }

  @HostListener('window:resize', ['$event'])
  onresize(event: Event) {
    this.getAllDocs();
  }

  setIcon(name: any): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName });
  }

  setPics(doc: any): ModelType {
      doc['Képek'] = doc['Képek'].map((p: any) => {
        p.imgSrc = `data:${p.contentType};base64,${Buffer.from(
          p.data
        ).toString('base64')}`;
        return p;
      });
      return doc;
  }

  setWidth() {
    this.cd.detectChanges();
    if (this.docs.length) {
      this.columns = this.keys.length - this.toHide;
    }
    this.width = this.keys.includes('ssz.')
      ? (this.pageWidth * this.widthRatio - this.orderWidth) / this.columns
      : (this.pageWidth * this.widthRatio) / this.columns;
    this.cd.detectChanges();
  }

  getAllDocs(result?: any) {
    this.pageService.getAll(this.page.api).then(
      (docs) => {
        if (!docs?.length) {
          this.mock = new this.page.Mock(this.docs.length + 1);
          this.loaded = true;
          this.setWidth();
          return;
        }
        this.docs = docs.map((c) => new this.page.Model(c));
        this.docs.sort((a, b) => a[this.page.sort] - b[this.page.sort]);
        this.mock = new this.page.Mock(this.docs.length + 1);
        this.keys = Object.keys(this.docs[0]);
        this.toHide = this.keys.includes('Link')
          ? this.keys.includes('ssz.')
            ? 3
            : 2
          : this.keys.includes('ssz.')
          ? 2
          : 1;

        if (this.keys.includes('Képek')) {
          this.docs = this.docs.map((doc) => {
            return this.setPics(doc);
          });
        }
        this.loaded = true;
        this.setWidth();
      },
      (err) => {
        console.log(err);
      }
    );
    if (typeof result != 'undefined') {
      console.log(result);
    }
  }

  openDialog(doc: ModelType) {
    const editDialog = this.dialog.open(EditDialogComponent, {
      width: this.pageWidth < 450 ? '350px' : '600px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: {
        doc: doc,
        page: this.page,
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
          return this.getAllDocs();
        }

        this.loaded = false;

        if (data._id) {
          return this.pageService
            .update(this.page.api, new this.page.Mod(data))
            .then(
              (result) => {
                this.getAllDocs(result);
              },
              (err) => {
                console.log(err);
              }
            );
        }

        return this.pageService
          .create(this.page.api, new this.page.Mod(data))
          .then(
            (result) => {
              this.getAllDocs(result);
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

  editItem(doc: ModelType) {
    this.app.blur = 'blur';
    this.openDialog(doc);
  }

  /**
   * todo: ikonok
   */
  addItem() {
    this.app.blur = 'blur';
    this.newModel = new this.page.Model(this.mock);
    this.openDialog(this.newModel);
  }

  removeItem(doc: ModelType) {
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
        return this.pageService.delete(this.page.api, data._id).then(
          (result) => {
            this.getAllDocs(result);
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

  onDocUpdate(docID: string) {
    this.app.first = false;
    this.pageService.getOne(this.page.api, docID).then(
      (doc) => {
        this.docs = this.docs.map((d) => {
          if (d._id === docID) {
            return this.setPics(new this.page.Model(doc));
          }
          return d;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.page = this.pageService.pages.filter(
        (p) => p.link === url[0].path
      )[0];
      this.getAllDocs();
      this.app.first = true;
    });
  }

}
