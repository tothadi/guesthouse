import { Component, HostBinding, OnInit } from '@angular/core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faEllipsisH,
  IconDefinition,
  faSignOutAlt,
  faUserCog,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public hide = '';

  @HostBinding('class') get HeadingClass() {
    return this.hide
  }
  menu: IconDefinition;
  home: IconDefinition;
  signout: IconDefinition;
  settings: IconDefinition;
  user: IconDefinition;

  menuHeight: number = document.body.offsetHeight * .05;
  logoSize: number;

  constructor(private auth: AuthService) {
    library.add(faCog, faUserCog, faHome, faEllipsisH, faSignOutAlt);
    this.home = icon({ prefix: 'fas', iconName: 'home' });
    this.menu = icon({ prefix: 'fas', iconName: 'ellipsis-h' });
    this.signout = icon({ prefix: 'fas', iconName: 'sign-out-alt' });
    this.settings = icon({ prefix: 'fas', iconName: 'cog' });
    this.user = icon({ prefix: 'fas', iconName: 'user-cog' });

    this.logoSize = this.menuHeight * .8
  }


  signOut() {
    this.auth.logout();
  }

  ngOnInit(): void {}
}
