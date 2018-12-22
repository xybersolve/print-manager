import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../modules/user/auth.service';
import { MessageService } from '../modules/message/message.service';

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

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { 'topbar': ['messages']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{outlets: { 'topbar': null}}]);
    this.messageService.isDisplayed = false;
  }
}
