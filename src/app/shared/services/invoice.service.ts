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

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  get() {
    return this.http.get<IInvoice[]>(`${this.commonService.baseRestUrl}/invoice`);
  }

  save(invoice: IInvoice): Observable<IInvoice> {
    return this.http.post<IInvoice>(`${this.commonService.baseRestUrl}/invoice`, {invoice: IInvoice});
  }
}
