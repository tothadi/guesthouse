import { Component, OnInit } from "@angular/core";
import { icon, IconName, library } from "@fortawesome/fontawesome-svg-core";
import {
  fas,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Contact } from "../backend.interfaces";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {

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
        this.contacts = contacts.sort((a, b) => a.order - b.order);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }
}
