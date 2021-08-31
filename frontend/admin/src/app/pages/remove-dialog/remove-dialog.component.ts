import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    library.add(fas);
  }

  setIcon(name: string): IconDefinition {
    return icon({ prefix: 'fas', iconName: name as IconName })
  }

  ngOnInit(): void {
  }

}
