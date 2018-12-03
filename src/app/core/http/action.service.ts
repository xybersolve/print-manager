import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IAction } from '../models/action.model';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/actions`;
  }

  public getAll() {
    const url = `${this.baseUrl}/`;
    return this.http.get<IAction[]>(url);
  }

  public get(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IAction>(url);
  }

  public update(action: IAction): Observable<any> {
    const url = `${this.baseUrl}/${action._id}`;
    return this.http.put<any>(url, action, this.common.headers);
  }

  public add(action: IAction): Observable<IAction> {
    const url = `${this.baseUrl}/`;
    return this.http.post<IAction>(url, {action: IAction});
  }
}
