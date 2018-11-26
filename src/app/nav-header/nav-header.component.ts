import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'pm-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent {
  brandTitle = 'Print Manager';
  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages']}}]);
  }

  hideMessages(): void {
    this.router.navigate([{outlets: { popup: null}}]);
    this.messageService.isDisplayed = false;
  }
}
