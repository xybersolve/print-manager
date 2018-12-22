import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message.service';

@Component({
  // selector: 'pm-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  get messages() {
    return this.messageService.messages;
  }

  constructor(private messageService: MessageService,
              private router: Router) { }

    close(): void {
      this.router.navigate([{ outlets: { 'topbar': null } }]);
      this.messageService.isDisplayed = false;
    }

    remove(idx): void {
      console.log(`got remove message: ${idx}`);
      this.messageService.remove(idx);
    }
}
