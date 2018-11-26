import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;
  constructor(private messageService: MessageService,
              private router: Router) {
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages']}}]);
  }

  hideMessages(): void {
    this.router.navigate([{outlets: { popup: null}}]);
    this.messageService.isDisplayed = false;
  }
}

