import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILocation, ILocationBrief } from '../models/location.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: ILocation[] = [];

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }

  getAll(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(`${this.common.baseRestUrl}/locations`);
  }
  getAllBrief(): Observable<ILocationBrief[]> {
    return this.http.get<ILocationBrief[]>(`${this.common.baseRestUrl}/locations/brief`);
  }
}
