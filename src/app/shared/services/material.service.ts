import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IMaterial } from '../models/material.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  materials: IMaterial[];

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }

  getAll(): Observable<IMaterial[]> {
    return this.http.get<IMaterial[]>(`${this.common.baseRestUrl}/materials`);
  }

}
