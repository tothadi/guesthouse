import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PageService } from '../pages.service';
import { forkJoin } from 'rxjs';
import { UpdateData, UploadStatus } from '../definitions/common.interfaces';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) file!: ElementRef;
  public files: Set<File> = new Set();

  progress: any;
  status: any;
  canBeClosed = true;
  uploading = false;
  uploadSuccessful = false;
  result: UploadStatus = { docID: '', picIDs: [] };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pageService: PageService
  ) {
    library.add(fas);
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName });
  }

  onFilesSelected(event: any) {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    this.uploading = true;

    // start the upload and save the progress map

    this.progress = this.pageService.upload(
      this.files,
      this.data.page.api,
      this.data.docId,
      (result: UploadStatus) => {
        this.result = result;
        // ... the upload was successful...
        this.uploadSuccessful = true;
      }
    );
    for (const key in this.progress) {
      this.progress[key].progress.subscribe((val: number) => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // The dialog should not be closed while uploading
    this.canBeClosed = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe((end) => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

  ngOnInit(): void {}
}
