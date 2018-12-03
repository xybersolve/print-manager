import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IMaterial } from '../models/material.model';
import { CommonService } from '../services/common.service';
import { ConfigurationService } from 'src/app/configs/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  materials: IMaterial[];
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private config: ConfigurationService,
    private common: CommonService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/materials`;
  }

  getAll(): Observable<IMaterial[]> {
    return this.http.get<IMaterial[]>(`${this.baseUrl}`);
  }

  setDefault(material: IMaterial): Observable<any> {
    const url = `${this.baseUrl}/default/${material._id}`;
    return this.http.put<any>(url, material, this.common.headers);
  }

}
