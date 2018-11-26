import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILine, ILineBrief } from '../models/line.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  locations: ILine[] = [];

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }

  getAll(): Observable<ILine[]> {
    return this.http.get<ILine[]>(`${this.common.baseRestUrl}/lines`);
  }

  getAllBrief(): Observable<ILineBrief[]> {
    return this.http.get<ILineBrief[]>(`${this.common.baseRestUrl}/lines/brief`);
  }
  // getAllBrief(): Observable<ILineBrief[]> {
  //   return this.http.get<ILineBrief[]>(`${this.common.baseRestUrl}/locations/brief`);
  // }
}
