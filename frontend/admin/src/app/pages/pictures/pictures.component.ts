import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from 'src/app/app.component';
import { Page } from '../definitions/common.interfaces';
import { PageService } from '../pages.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css'],
})
export class PicturesComponent implements OnChanges {
  @Input() page!: Page;
  @Input() doc: any;

  @Output('docUpdate')
  docEmitter = new EventEmitter<string>();

  @ViewChild('pics')
  pics?: ElementRef;

  floatLabelControl = new FormControl('always');

  pageWidth: number = document.body.offsetWidth;
  currentPicPos = {
    bottom: 0,
    top: 0,
    right: 0,
  };

  fullScreen = false;
  multiplePics = false;
  confirm = false;
  captionInput = false;

  expandClose: IconDefinition;

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private app: AppComponent,
    private pageService: PageService
  ) {
    library.add(fas);
    this.expandClose = this.setIcon('expand');
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName });
  }

  @HostListener('window:resize', ['$event'])
  onresize(event: Event) {
    this.setToggle();
  }

  prevPic() {
    const last = this.doc['Képek'].pop();
    this.doc['Képek'].unshift(last!);
    this.setToggle();
  }

  nextPic() {
    const first = this.doc['Képek'].shift();
    this.doc['Képek'].push(first!);
    this.setToggle();
  }

  setToggle() {
    this.cd.detectChanges();
    if (this.doc['Képek'].length > 1) {
      this.multiplePics = true;
    } else {
      this.multiplePics = false;
    }
    this.currentPicPos.bottom =
      this.pics?.nativeElement.previousSibling.offsetTop;
    this.currentPicPos.top = this.pics?.nativeElement.previousSibling.offsetTop;
    this.currentPicPos.right =
      this.pics?.nativeElement.previousSibling.offsetLeft;
  }

  toggleFullScreen() {
    this.captionInput = false;
    this.fullScreen = !this.fullScreen;
    this.expandClose = this.fullScreen
      ? this.setIcon('window-close')
      : this.setIcon('expand');
    this.setToggle();
  }

  openDialog() {
    this.app.blur = 'blur';
    const uploadDialog = this.dialog.open(UploadComponent, {
      width: this.pageWidth < 450 ? '350px' : '600px',
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'overlay',
      data: { page: this.page, docId: this.doc._id },
    });

    uploadDialog.afterClosed().subscribe(
      (data) => {
        this.docEmitter.emit(this.doc._id);
        this.app.blur = '';
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  editCaption() {
    if (this.captionInput) {
      this.pageService
        .updateCaption(this.page.api, this.doc._id, this.doc['Képek'][0])
        .then(
          (result) => {
            this.docEmitter.emit(this.doc._id);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    this.captionInput = !this.captionInput;
  }

  confirmDelete() {
    this.confirm = true;
  }

  deletePicture(confirm: boolean) {
    if (confirm) {
      this.pageService
        .deletePic(this.page.api, this.doc._id, this.doc['Képek'][0]._id)
        .then(
          (result) => {
            this.docEmitter.emit(this.doc._id);
            this.confirm = false;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
     if (!this.app.first) {
       this.toggleFullScreen();
     }
  }
}
