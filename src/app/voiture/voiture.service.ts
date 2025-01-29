import { Injectable } from '@angular/core';
import { Voiture } from './voiture';
import { VOIYURES } from './voiture-list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Reservation } from './reservation';

const API_LINK = 'http://localhost:3000/voitures';
const API_INMEMORY ='api/voitures';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(
    private http: HttpClient
  ) { }

  // getVoitureList(): Voiture[]{
  //   return VOIYURES;
  // }
  getFakeVoitures(): Voiture[]{
       return VOIYURES;
  }

  getVoitureList(): Observable<Voiture[]> {
    return this.http.get<Voiture[] >(API_LINK); 
  }
 
 
  
  // getVoitureById(voiturId : number):Voiture | undefined{
  //   return VOIYURES.find(voiture => voiturId==voiture.id)
  // }

  getVoitureById(voitureId : number): Observable<Voiture | undefined>{
    return this.http.get<Voiture>(API_LINK+`/${voitureId}`).pipe(
      tap((response) => this.log(response)),
      catchError( (error)=>this.handleError(error,undefined))
    );  }

  //************************************************************** */
  getClientById(clientId : number ):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/signupUsers`).pipe(
      tap((response) => this.log(response)),
      catchError( (error)=>this.handleError(error,undefined))
    );
  }
  //************************************************************** */

  updateVoiture(voiture: Voiture): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(API_LINK+`/${voiture.id}`,voiture, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
  
  deleteVoitureById(voitureId :  number): Observable<null>{
    
    return this.http.delete(API_LINK+`/${voitureId}`).pipe(
      tap((response) => this.log(response)),
      catchError( (error)=>this.handleError(error,undefined))
    );
  }

  addVoiture(voiture:Voiture):Observable<Voiture>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Voiture>(API_LINK, voiture, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
  addReservation(reservation:Reservation):Observable<Reservation>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Reservation>('http://localhost:3000/reservation', reservation, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchVoitureList(term: string): Observable<Voiture[]> {
    if(term.length <= 1) {
      return of([]);
    } 

    return this.http.get<Voiture[]>(API_LINK+`/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }
  //***************************************************************/
  getVoitureTypeList(): string[] {
    return [
      'Compacte', 
      'Feu', 
      'Eau', 
    ];
  }

  getVoitureCarburantList(): string[] {
    return [
      'diesel', 
      'essence', 
    ];
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}
