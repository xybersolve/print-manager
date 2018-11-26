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

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    // this.options = new RequestOptions({ headers: this.headers });
  }

  makeFileStubName(name: string) {
    return name.replace(/\s/g, '-').toLocaleLowerCase();
  }

  getAll(): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${this.common.baseRestUrl}/images`);
  }

  get(id: number): Observable<IImage> {
    const url = `${this.common.baseRestUrl}/images/${id}`;
    // console.log(url);
    return this.http.get<IImage>(url);
  }

  update(image: IImage): Observable<any> {
    const url = `${this.common.baseRestUrl}/images/${image._id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<any>(url, image, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  add(image: IImage): Observable<IImage> {
    const url = `${this.common.baseRestUrl}/images`;
    image.fileStub = this.makeFileStubName(image.name);
    return this.http.post<IImage>(url, image, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.common.baseRestUrl}/images/${id}`);
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
