import { Component, OnInit } from "@angular/core";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  paragraphs?: string[];

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.getWelcome().subscribe(
      (greet) => {
        this.paragraphs = greet[0].paragraphs;
      },
      (err) => {
        console.error(err.message);
      }
    );
  }
}
