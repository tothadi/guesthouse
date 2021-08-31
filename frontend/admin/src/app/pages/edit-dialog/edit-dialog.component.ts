import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    library.add(fas);
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName })
  }

  ngOnInit(): void {}
}
