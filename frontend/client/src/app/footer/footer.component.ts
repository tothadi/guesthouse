import { Component, OnInit } from '@angular/core';
import { icon, IconName, library } from '@fortawesome/fontawesome-svg-core';
import {
    faEnvelope,
    faGlobeEurope,
    faHome,
    faPencilAlt,
    faPhone,
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
    globe: IconDefinition;
    pencil: IconDefinition;
    home: IconDefinition;

    contacts?: Contact[];

    constructor(private backend: BackendService) {
        library.add(faEnvelope, faPhone, faGlobeEurope, faPencilAlt, faHome);
        this.globe = icon({ prefix: 'fas', iconName: 'globe-europe' });
        this.pencil = icon({prefix: 'fas', iconName: 'pencil-alt'})
        this.home = icon({prefix: 'fas', iconName: 'home'})
    }

    ngOnInit(): void {
        this.backend.getContacts().subscribe(
            (contacts) => {
                this.contacts = contacts.map(c => {
                  c.iconDef = icon({ prefix: "fas", iconName: c.icon as IconName });
                  return c;
                })
              },
            (err) => {
              console.error(err.message);
            }
          );
    }
}
