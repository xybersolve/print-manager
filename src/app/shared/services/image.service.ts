import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

/*
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
*/

import { IImage } from '../models/image.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  headers = {};
  options = {};
  images: IImage[] = [];
  selected: IImage[] = [];
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.baseUrl = `${this.common.baseRestUrl}/images`;
  }

  private makeFileStubName(name: string) {
    return name.replace(/\s/g, '-').toLocaleLowerCase();
  }

  public getAll(): Observable<IImage[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<IImage[]>(url);
  }

  public get(id: number): Observable<IImage> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IImage>(url);
  }

  public update(image: IImage): Observable<any> {
    const url = `${this.baseUrl}/${image._id}`;
    return this.http.put<any>(url, image, this.common.headers);
  }

  public add(image: IImage): Observable<IImage> {
    const url = `${this.baseUrl}`;
    image.fileStub = this.makeFileStubName(image.name);
    return this.http.post<IImage>(url, image, this.common.headers);
  }

  public delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
}
