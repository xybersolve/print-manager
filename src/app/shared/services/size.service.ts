import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CommonService } from './common.service';
import { ISize, IAspectRatio } from '../models/size.model';


@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }

  getAll(): Observable<ISize[]> {
    return this.http.get<ISize[]>(`${this.common.baseRestUrl}/sizes`);
  }

  getApectRatios(): Observable<IAspectRatio[]> {
    return this.http.get<IAspectRatio[]>(`${this.common.baseRestUrl}/sizes/aspect-ratios`);
  }
}
