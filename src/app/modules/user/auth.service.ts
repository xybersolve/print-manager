import { Injectable } from '@angular/core';

import { IUser } from './user.interface';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser;
  redirectUrl: string;
  constructor(private messageService: MessageService) { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(name: string, password: string): void {
    if (!name || !password) {
      this.messageService.addMessage('Username and password are required');
      return;
    }
    if (name === 'admin') {
      this.currentUser = {
        id: 1,
        name: name,
        isAdmin: true
      };
      this.messageService.addMessage('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      name: name,
      isAdmin: false
    };
    this.messageService.addMessage(`User: ${this.currentUser.name} logged in`);
  }
  logout(): void {
    this.currentUser = null;
  }
}
