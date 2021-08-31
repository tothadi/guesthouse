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
  home: IconDefinition;

  contacts?: Contact[];

  constructor(private backend: BackendService) {
    library.add(fas);
    this.home = icon({ prefix: "fas", iconName: "home" });
  }


  ngOnInit(): void {
    this.backend.getContacts().subscribe(
      (contacts) => {
        this.contacts = contacts
        .map(c => {
          c.iconDef = icon({ prefix: "fas", iconName: c.icon as IconName });
          return c;
        })
        .sort((a, b) => a.order - b.order);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }
}
