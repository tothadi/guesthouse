import { Component, OnInit } from '@angular/core';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import {
    fas,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../backend.interfaces';
import { BackendService } from '../backend.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

    contacts?: Contact[];

    constructor(private backend: BackendService) {
        library.add(fas);
    }

    setIcon(name: any): IconDefinition {
      return icon({ prefix: 'fas', iconName: name as IconName });
    }

    ngOnInit(): void {
        this.backend.getContacts().subscribe(
            (contacts) => {
                this.contacts = contacts;
              },
            (err) => {
              console.error(err.message);
            }
          );
    }
}
