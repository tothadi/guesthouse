import { Component, OnInit } from '@angular/core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import {
    faEnvelope,
    faGlobeEurope,
    faHome,
    faPencilAlt,
    faPhone,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    envelope: IconDefinition;
    globe: IconDefinition;
    phone: IconDefinition;
    pencil: IconDefinition;
    home: IconDefinition;

    constructor() {
        library.add(faEnvelope, faPhone, faGlobeEurope, faPencilAlt, faHome);
        this.phone = icon({ prefix: 'fas', iconName: 'phone' });
        this.globe = icon({ prefix: 'fas', iconName: 'globe-europe' });
        this.envelope = icon({ prefix: 'fas', iconName: 'envelope' });
        this.pencil = icon({prefix: 'fas', iconName: 'pencil-alt'})
        this.home = icon({prefix: 'fas', iconName: 'home'})
    }

    ngOnInit(): void {}
}
