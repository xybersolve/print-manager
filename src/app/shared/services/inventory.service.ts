import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IInventory } from '../models/inventory.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  save() {
    return this.http.post(`${this.commonService.baseRestUrl}/inventory`, {inventory: IInventory});
  }

}
