import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
    title = 'Könczevölgyi Vendégház - Nagyrákos';

    constructor(private titleService: Title) {
        this.titleService.setTitle(this.title);
    }

    ngAfterViewInit(): void {}
}
