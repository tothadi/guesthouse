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
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
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
    private route: ActivatedRoute,
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
      this.pics?.nativeElement.firstChild.firstChild.offsetTop;
    this.currentPicPos.right =
      this.pics?.nativeElement.firstChild.firstChild.offsetLeft + 10;
  }

  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.expandClose = this.fullScreen
      ? icon({ prefix: 'fas', iconName: 'window-close' })
      : icon({ prefix: 'fas', iconName: 'expand' });
    this.setToggle();
  }

  filterRoom(roomName: string) {
    this.room = this.rooms?.filter((r) => r.link === roomName)[0];
    this.multiplePics = this.room!.pics!.length > 1;
  }

  ngOnInit(): void {
    this.Backend.getRooms().subscribe(
      (rooms) => {
        const roomName = this.location.path().split('/')[2] || 'nappali'
        this.rooms = rooms;
        this.filterRoom(roomName);
        console.log(this.room)
        this.loaded = true;
      },
      (err) => {
        console.error(err.message);
      }
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url) {
        this.filterRoom(event.url.split('/')[2]);
      }
    });


  }
}
