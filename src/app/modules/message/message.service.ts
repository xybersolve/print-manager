import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _messages: string[] = [];
  isDisplayed = false;

  get messages(): string[] {
    return this._messages;
  }

  set messages(msgs: string[]) {
    this._messages = msgs;
  }

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(`${message} at ${currentDate.toLocaleString()}`);
  }

  remove(idx: number) {
    this._messages.slice(idx, idx);
    this.messages = this._messages;
  }
}
