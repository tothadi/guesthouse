import { Component, OnInit } from "@angular/core";
import { Section } from "../backend.interfaces";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  sections?: Section[];

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.getWelcome().subscribe(
      (greet) => {
        this.sections = greet[0].sections;
      },
      (err) => {
        console.error(err.message);
      }
    );
  }
}
