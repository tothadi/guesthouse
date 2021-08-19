import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import {
  faBed,
  faHome,
  faEllipsisH,
  faPhone,
  IconDefinition,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { BackendService } from "../backend.service";
import { Room } from "../backend.interfaces";

interface MenuItem {
  title: string;
  link: string;
  icon: IconDefinition;
}

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements AfterViewInit, OnInit {

  showRooms = false;

  motto?: string;

  menuIcon: IconDefinition;
  roomsIcon: IconDefinition;
  homeIcon: IconDefinition;
  contactIcon: IconDefinition;
  reserveIcon: IconDefinition;
  rowHeight: number = 0;
  iconSize: number = 0;
  rowOffset: number = 0;
  size = document.documentElement.offsetHeight;

  menuItems: MenuItem[];
  rooms: Room[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private cd: ChangeDetectorRef,
    private backend: BackendService
  ) {
    this.router.events.subscribe((event) => {
      if (this.location.path().includes("szobak")) {
        this.showRooms = true;
        return;
      }
      this.showRooms = false;
    });

    library.add(faBed, faCalendarCheck, faHome, faEllipsisH, faPhone);
    this.contactIcon = icon({ prefix: "fas", iconName: "phone" });
    this.homeIcon = icon({ prefix: "fas", iconName: "home" });
    this.menuIcon = icon({ prefix: "fas", iconName: "ellipsis-h" });
    this.reserveIcon = icon({ prefix: "fas", iconName: "calendar-check" });
    this.roomsIcon = icon({ prefix: "fas", iconName: "bed" });

    this.menuItems = [
      {
        title: "Kezdőlap",
        link: "/kezdolap",
        icon: this.homeIcon,
      },
      {
        title: "Szobák",
        link: "/szobak",
        icon: this.roomsIcon,
      },
      {
        title: "Foglalás",
        link: "/foglalas",
        icon: this.reserveIcon,
      },
      {
        title: "Kapcsolat",
        link: "/kapcsolat",
        icon: this.contactIcon,
      },
    ];

  }

  setSize(): void {
    this.cd.detectChanges();
    this.rowHeight = this.size / 4 / this.menuItems.length;
    this.iconSize = this.rowHeight * 0.5;
    this.rowOffset = (window.orientation > 0 && window.innerHeight < 500) ? 0 : this.iconSize * 1.5;
    this.cd.detectChanges();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    console.log(event.target);
    this.setSize();
  }

  @HostListener("window:orientationchange", ["$event"])
  onOrientationChange(event: Event) {
    this.setSize();
    
  }

  ngAfterViewInit(): void {
    this.setSize();
  }

  ngOnInit(): void {
    this.backend.getWelcome().subscribe(
      (greet) => {
        this.motto = greet.motto;
      },
      (err) => {
        console.error(err.message);
      }
    );
    this.backend.getRooms().subscribe(
      (rooms) => {
        this.rooms = rooms.map((r) => {
          r.link = `/szobak/${r.link}`;
          return r;
        });
      },
      (err) => {
        console.error(err.message);
      }
    );
  }
}
