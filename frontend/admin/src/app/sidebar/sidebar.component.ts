import { Component, HostBinding, OnInit } from '@angular/core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  title: string,
  link: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public hide = '';

  @HostBinding('class') get HeadingClass() {
    return this.hide
  }
  
  menu: IconDefinition;
  menuHeight: number = document.body.offsetHeight * .04;

  menuItems: MenuItem[] = [
    {
      title: 'Aktualitások',
      link: '/oldalak/aktualitasok'
    },
    {
      title: 'Foglalások',
      link: '/oldalak/foglalasok'
    },{
      title: 'Kapcsolat',
      link: '/oldalak/kapcsolat'
    },
    {
      title: 'Kezdőlap',
      link: '/oldalak/kezdolap'
    },{
      title: 'Szobák',
      link: '/oldalak/szobak'
    }
  ]

  constructor() {
    library.add(faBars);
    this.menu = icon({ prefix: 'fas', iconName: 'bars' });
  }

  ngOnInit(): void {}
}
