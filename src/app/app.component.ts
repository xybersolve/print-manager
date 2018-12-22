import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { MessageService } from './modules/message/message.service';
import { slideInAnimation } from './shared/utilities/animations';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  isLoading = true;
  constructor(private messageService: MessageService,
              private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.handleRouterEvent(routerEvent);
    });
  }

  handleRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError ) {
          this.isLoading = false;
        }
  }

}

