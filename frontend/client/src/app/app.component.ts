import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Könczevölgyi Vendégház - Nagyrákos - ';

    constructor(private titleService: Title) {
        this.titleService.setTitle(this.title);
        setInterval(() => {
            const firstLetter = this.title.charAt(0);
            const restOfTitle = this.title.substring(1);
            this.title = restOfTitle + firstLetter;
            this.titleService.setTitle(this.title);
          }, 300);
    }

}
