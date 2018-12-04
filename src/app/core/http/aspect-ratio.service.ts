import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IAspectRatio } from '../models/aspect-ratio.model';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../../configs/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AspectRatioService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private config: ConfigurationService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/aspect-ratios`;
  }

  getAll() {
    const url = `${this.baseUrl}/`;
    return this.http.get<IAspectRatio[]>(url);
  }

  get(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IAspectRatio>(url);
  }

  update(action: IAspectRatio): Observable<any> {
    const url = `${this.baseUrl}/${action._id}`;
    return this.http.put<any>(url, action, this.common.headers);
  }

  setDefault(action: IAspectRatio): Observable<any> {
    const url = `${this.baseUrl}/default/${action._id}`;
    return this.http.put<any>(url, action, this.common.headers);
  }

  add(action: IAspectRatio): Observable<IAspectRatio> {
    const url = `${this.baseUrl}/`;
    return this.http.post<IAspectRatio>(url, {action: IAspectRatio});
  }
}
