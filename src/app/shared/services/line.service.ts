import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILine, ILineBrief } from '../models/line.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  locations: ILine[] = [];
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/lines`;
   }

  public getAll(): Observable<ILine[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ILine[]>(url);
  }

  public get(id: any): Observable<ILine> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ILine>(url);
  }

  public getAllBrief(): Observable<ILineBrief[]> {
    const url = `${this.baseUrl}/brief`;
    return this.http.get<ILineBrief[]>(url);
  }

  public add(line: ILine): Observable<ILine> {
    const url = `${this.baseUrl}`;
    return this.http.post<ILine>(url, line, this.common.headers);
  }

  public update(line: ILine): Observable<any> {
    const url = `${this.baseUrl}/${line._id}`;
    console.log('lineService.update');
    return this.http.put<any>(url, line, this.common.headers);
  }
}
