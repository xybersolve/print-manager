import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IInvoice } from '../models/invoice.model';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/invoices`;
  }

  getAll() {
    const url = `${this.baseUrl}/`;
    return this.http.get<IInvoice[]>(url);
  }

  get(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IInvoice>(url);
  }

  update(invoice: IInvoice): Observable<any> {
    const url = `${this.baseUrl}/${invoice._id}`;
    return this.http.put<any>(url, invoice, this.common.headers);
  }

  add(invoice: IInvoice): Observable<IInvoice> {
    console.log('invoiceService.add()');
    console.dir(invoice);
    const url = `${this.baseUrl}`;
    return this.http.post<IInvoice>(url, invoice, this.common.headers);
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
