import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CommonService } from '../services/common.service';
import { ISize, IAspectRatio } from '../models/size.model';
import { ConfigurationService } from '../../configs/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigurationService,
    private common: CommonService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/sizes`;
  }

  getAll(): Observable<ISize[]> {
    return this.http.get<ISize[]>(`${this.baseUrl}`);
  }

  getApectRatios(): Observable<IAspectRatio[]> {
    return this.http.get<IAspectRatio[]>(`${this.baseUrl}/aspect-ratios`);
  }

  setDefault(size: ISize): Observable<any> {
    const url = `${this.baseUrl}/default/${size._id}`;
    return this.http.put<any>(url, size, this.common.headers);
  }

}
