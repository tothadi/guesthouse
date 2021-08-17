import { Component, OnInit } from '@angular/core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import {
    faEnvelope,
    faHome,
    faPhone,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  envelope: IconDefinition;
    phone: IconDefinition;
    home: IconDefinition;

    constructor() {
        library.add(faEnvelope, faPhone, faHome);
        this.phone = icon({ prefix: 'fas', iconName: 'phone' });
        this.envelope = icon({ prefix: 'fas', iconName: 'envelope' });
        this.home = icon({prefix: 'fas', iconName: 'home'})
    }

  ngOnInit(): void {
  }

}
