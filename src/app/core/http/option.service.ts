// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// 3rd party
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// services
import { CommonService } from '../services/common.service';
import { ConfigurationService } from '../../configs/configuration.service';

// models
import { IOptions } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  baseUrl: string;
  // options: IOptions = {};

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) {
    this.baseUrl = `${this.config.baseRestUrl}/options`;
   }

  getAll() {
    // entity: string, option: string
    // this.options[entity][option]
    return this.http.get<IOptions>(`${this.baseUrl}`);
  }
}
