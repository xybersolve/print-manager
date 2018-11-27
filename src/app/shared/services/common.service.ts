import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public baseRestUrl = 'http://localhost:7070/api/v1';
  public headers = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  constructor() { }
}
