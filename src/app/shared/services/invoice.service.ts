import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IInvoice } from '../models/invoice.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/invoice`;
  }

  getAll() {
    const url = `${this.baseUrl}/`;
    return this.http.get<IInvoice[]>(url);
  }

  get(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IInvoice>(url);
  }

  save(invoice: IInvoice): Observable<IInvoice> {
    const url = `${this.baseUrl}/`;
    return this.http.post<IInvoice>(url, {invoice: IInvoice});
  }
}
