import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILocation, ILocationBrief } from '../models/location.model';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../../configs/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: ILocation[] = [];
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigurationService,
    private common: CommonService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/locations`;
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

  delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, this.common.headers);
  }

  setDefault(location: ILocation): Observable<any> {
    const url = `${this.baseUrl}/default/${location._id}`;
    return this.http.put<any>(url, location, this.common.headers);
  }

  update(location: ILocation): Observable<any> {
    const url = `${this.baseUrl}/${location._id}`;
    return this.http.put<any>(url, location, this.common.headers);
  }

}
