import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILine, ILineBrief } from '../models/line.model';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../../configs/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  locations: ILine[] = [];
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigurationService,
    private common: CommonService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/lines`;
   }

  getAll(): Observable<ILine[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ILine[]>(url);
  }

  get(id: any): Observable<ILine> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ILine>(url);
  }

  getAllBrief(): Observable<ILineBrief[]> {
    const url = `${this.baseUrl}/brief`;
    return this.http.get<ILineBrief[]>(url);
  }

  getActiveBrief(): Observable<ILineBrief[]> {
    const url = `${this.baseUrl}/active/brief`;
    return this.http.get<ILineBrief[]>(url);
  }

  add(line: ILine): Observable<ILine> {
    const url = `${this.baseUrl}`;
    return this.http.post<ILine>(url, line, this.common.headers);
  }

  setDefault(line: ILine): Observable<any> {
    const url = `${this.baseUrl}/default/${line._id}`;
    return this.http.put<any>(url, line, this.common.headers);
  }

  update(line: ILine): Observable<any> {
    const url = `${this.baseUrl}/${line._id}`;
    console.log('lineService.update');
    return this.http.put<any>(url, line, this.common.headers);
  }
}
