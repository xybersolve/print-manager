import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IAction } from '../models/action.model';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../../configs/configuration.service';


@Injectable({
  providedIn: 'root'
})
export class ActionService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private config: ConfigurationService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/actions`;
  }

  getAll() {
    const url = `${this.baseUrl}/`;
    return this.http.get<IAction[]>(url);
  }

  get(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IAction>(url);
  }

  update(action: IAction): Observable<any> {
    const url = `${this.baseUrl}/${action._id}`;
    return this.http.put<any>(url, action, this.common.headers);
  }

  setDefault(action: IAction): Observable<any> {
    const url = `${this.baseUrl}/default/${action._id}`;
    return this.http.put<any>(url, action, this.common.headers);
  }

  add(action: IAction): Observable<IAction> {
    const url = `${this.baseUrl}/`;
    return this.http.post<IAction>(url, {action: IAction});
  }
}
