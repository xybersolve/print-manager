import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseRestUrl = 'http://localhost:7070/api/v1';

  constructor() { }
}
