import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILocation, ILocationBrief } from '../models/location.model';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: ILocation[] = [];
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/locations`;
  }

  getAll(): Observable<ILocation[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ILocation[]>(url);
  }

  getAllBrief(): Observable<ILocationBrief[]> {
    const url = `${this.baseUrl}/brief`;
    return this.http.get<ILocationBrief[]>(url);
  }

  get(id: any): Observable<ILocation> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ILocation>(url);
  }

  add(line: ILocation): Observable<ILocation> {
    const url = `${this.baseUrl}`;
    return this.http.post<ILocation>(url, line, this.common.headers);
  }

  update(location: ILocation): Observable<any> {
    const url = `${this.baseUrl}/${location._id}`;
    return this.http.put<any>(url, location, this.common.headers);
  }

}
