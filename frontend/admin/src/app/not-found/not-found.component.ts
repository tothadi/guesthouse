import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(private app: AppComponent) {
    this.app.hide = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.app.hide = false;
  }
}
