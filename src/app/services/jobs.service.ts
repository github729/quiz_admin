import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ENV } from '../env.config';
import { catchError } from 'rxjs/operators';
import { JobsModel } from '../models/jobs.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'quiz'
    })
  };

  constructor(private _http: HttpClient) { }

  // POST new event
  postEvent$(event) {
    return this._http
      .post(`${ENV.BASE_API}job`, event, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  editEvent$(id: number, event: JobsModel) {
    return this._http.put(`${ENV.BASE_API}job/${id}`, event, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteJobById$(id: number) {
    return this._http
      .delete<any>(`${ENV.BASE_API}job/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getJobById$(id: number) {
    return this._http
      .get<any>(`${ENV.BASE_API}job/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET new event
  getJobs$() {
    return this._http
      .get<any>(`${ENV.BASE_API}jobs`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Error: Unable to complete request. please try again later.');
  };
}
