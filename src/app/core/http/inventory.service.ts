import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IInventory, IInventoryItem } from '../models/inventory.model';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../../configs/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/inventory`;
   }

  getAll() {
    const url = `${this.baseUrl}/`;
    return this.http.get<IInventoryItem[]>(url);
  }

  get(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IInventoryItem>(url);
  }

  update(inventory: IInventoryItem): Observable<any> {
    const url = `${this.baseUrl}/${inventory._id}`;
    return this.http.put<any>(url, inventory, this.common.headers);
  }

  add(inventory: IInventoryItem): Observable<IInventoryItem> {
    console.log('inventoryService.add()');
    console.dir(inventory);
    const url = `${this.baseUrl}`;
    return this.http.post<IInventoryItem>(url, inventory, this.common.headers);
  }

  delete(id: any): Observable<void> {
    console.log(`inventoryService.delete() - id: ${id}`);
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
