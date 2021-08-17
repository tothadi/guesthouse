import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import {
    faBed,
    faHome,
    faEllipsisH,
    faPhone,
    IconDefinition,
    faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
    title: string;
    link: string;
    icon: IconDefinition;
}

interface RoomItem {
    title: string;
    link: string;
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements AfterViewInit, OnInit {
    @ViewChild('menu')
    menu!: ElementRef;
    rooms = false;

    menuIcon: IconDefinition;
    roomsIcon: IconDefinition;
    homeIcon: IconDefinition;
    contactIcon: IconDefinition;
    reserveIcon: IconDefinition;
    rowHeight: number = 0;
    iconSize: number = 0;
    size = document.documentElement.offsetHeight;

    menuItems: MenuItem[];
    roomsItems: RoomItem[];

    constructor(
        private location: Location,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {
        this.router.events.subscribe((event) => {
            if (this.location.path().includes('szobak')) {
                this.rooms = true;
                return;
            }
            this.rooms = false;
        });

        library.add(faBed, faCalendarCheck, faHome, faEllipsisH, faPhone);
        this.contactIcon = icon({ prefix: 'fas', iconName: 'phone' });
        this.homeIcon = icon({ prefix: 'fas', iconName: 'home' });
        this.menuIcon = icon({ prefix: 'fas', iconName: 'ellipsis-h' });
        this.reserveIcon = icon({ prefix: 'fas', iconName: 'calendar-check' });
        this.roomsIcon = icon({ prefix: 'fas', iconName: 'bed' });

        this.menuItems = [
            {
                title: 'Kezdőlap',
                link: '/kezdolap',
                icon: this.homeIcon,
            },
            {
                title: 'Szobák',
                link: '/szobak',
                icon: this.roomsIcon,
            },
            {
                title: 'Foglalás',
                link: '/foglalas',
                icon: this.reserveIcon,
            },
            {
                title: 'Kapcsolat',
                link: '/kapcsolat',
                icon: this.contactIcon,
            },
        ];

        this.roomsItems = [
            {
                title: 'Nappali',
                link: '/szobak/nappali',
            },
            {
                title: 'Fehér Szoba',
                link: '/szobak/feher-szoba',
            },
            {
                title: 'Franciaágyas',
                link: '/szobak/francia-agyas',
            },
            {
                title: 'Két ágyas',
                link: '/szobak/ket-agyas',
            },
            {
                title: 'Kerthelyiség',
                link: '/szobak/kert',
            },
        ];
    }

    setSize(): void {
        this.rowHeight = this.size / 4 / this.menuItems.length;
        this.iconSize = this.rowHeight * 0.5;
    }

    @HostListener('window:resize', ['$event'])
    onresize(event: Event) {
        this.setSize();
        this.cd.detectChanges();
    }

    ngAfterViewInit(): void {
        this.setSize();
        this.cd.detectChanges();
    }

    ngOnInit(): void {}
}
