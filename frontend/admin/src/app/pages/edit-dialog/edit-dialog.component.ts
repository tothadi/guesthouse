import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Section } from '../pages.interfaces';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  objectKeys = Object.keys;
  floatLabelControl = new FormControl('always');
  iconControl = new FormControl('', Validators.required);

  @Input() set selectedIcon(newIcon: string) {
    this.data.doc['Ikon'] = newIcon;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef
  ) {
    library.add(fas);
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName });
  }

  addParagraph(section: Section) {
    section.paragraphs.push('');
  }

  deleteParagraph(section: Section, i: number) {
    section.paragraphs.splice(i);
    this.cd.detectChanges();
  }

  addSection() {
    this.data.doc['Leírás'].push({title: '', paragraphs: ['']})
  }

  trackByFn(index: any, item: any) {
    return index;
 }

  ngOnInit(): void {}
}
