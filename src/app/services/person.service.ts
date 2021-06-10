import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeneralResponse } from '../models/response/general-response';
import { ConstantServicePerson } from '../util/constants/constants-service-person';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private refresh$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  get refresh(){
    return this.refresh$;
  }

  getPersons(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(ConstantServicePerson.PATH_API).pipe(
      tap(response => {
        if (response.success) {
        }
      }),
      catchError(this.handleError)
    )
  }

  getPerson(idPerson:number): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(ConstantServicePerson.PATH_API + idPerson).pipe(
      tap(response => {
        if(response.success){
        }
      }),
      catchError(this.handleError)
    )
  }

  savePerson(person:Person): Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(ConstantServicePerson.PATH_API, person).pipe(
      tap(response => {
        if (response.success) {
        }
      }),
      catchError(this.handleError)
    )
  }

  updatePerson(personUpdate:Person): Observable<GeneralResponse> {
    return this.http.put<GeneralResponse>(ConstantServicePerson.PATH_API, personUpdate).pipe(
      tap(response => {
        if(response.success){
        }
      }),
      catchError(this.handleError)
    )
  }

  deletePerson(idPerson:number):Observable<GeneralResponse>{
    return this.http.delete<GeneralResponse>(ConstantServicePerson.PATH_API + idPerson).pipe(
      tap(() => {
        this.refresh$.next();
      })
    )
  }

  /**
  * Catch errors on call WS
  * @param error
  */
   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    return throwError(error);
  }
}
