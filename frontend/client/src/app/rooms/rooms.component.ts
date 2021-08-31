import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faExpand,
  faWindowClose,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  NavigationEnd,
  Router,
} from '@angular/router';
import { Room } from '../backend.interfaces';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-rooms',
  templateUrl: 'rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  @ViewChild('pics')
  pics?: ElementRef;

  currentPicPos = {
    top: 0,
    right: 0,
  };

  loaded = false;
  left: IconDefinition;
  right: IconDefinition;
  expandClose: IconDefinition;

  rooms?: Room[];
  room?: Room;
  multiplePics = false;
  fullScreen = false;

  constructor(
    private location: Location,
    private cd: ChangeDetectorRef,
    private router: Router,
    private Backend: BackendService
  ) {
    library.add(faArrowCircleLeft, faArrowCircleRight, faExpand, faWindowClose);
    this.left = icon({ prefix: 'fas', iconName: 'arrow-circle-left' });
    this.right = icon({ prefix: 'fas', iconName: 'arrow-circle-right' });
    this.expandClose = icon({ prefix: 'fas', iconName: 'expand' });
  }

  @HostListener('window:resize', ['$event'])
  onresize(event: Event) {
    this.setToggle();
  }

  prevPic() {
    const last = this.room?.pics!.pop();
    this.room?.pics!.unshift(last!);
    this.setToggle();
  }

  nextPic() {
    const first = this.room?.pics!.shift();
    this.room?.pics!.push(first!);
    this.setToggle();
  }

  setToggle() {
    this.cd.detectChanges();
    this.currentPicPos.top =
      this.pics?.nativeElement.previousSibling.offsetTop;
    this.currentPicPos.right =
      this.pics?.nativeElement.previousSibling.offsetLeft + 10;
  }

  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.expandClose = this.fullScreen
      ? icon({ prefix: 'fas', iconName: 'window-close' })
      : icon({ prefix: 'fas', iconName: 'expand' });
    this.setToggle();
  }

  getRooms() {
    this.Backend.getRooms().subscribe(
      (rooms) => {
        this.rooms = rooms;
        const roomName =
          this.location.path().split('/')[2] || this.rooms[0].link;
        this.router.navigateByUrl(`szobak/${roomName}`);
        this.filterRoom(roomName);
        this.loaded = true;
        this.setToggle();
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  filterRoom(roomName: string) {
    this.room = this.rooms?.filter((r) => r.link === roomName)[0];
    this.multiplePics = this.room!.pics!.length > 1;
  }

  ngOnInit(): void {
    this.getRooms();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects) {
        const url = event.urlAfterRedirects.split('/');
        if (url[1] == 'szobak' && url[2]) {
          this.filterRoom(url[2]);
        }
      }
    });
  }
}
