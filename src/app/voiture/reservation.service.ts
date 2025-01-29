import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Reservation } from './reservation';
import { Location } from '../admin/model/location';
const API_LINK = 'http://localhost:3000/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService  {

  reservations:Observable<Reservation[]>;

  constructor(
    private http: HttpClient,
    
  ) { }

 

  getReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(API_LINK);
  }
  getReservationById(reservationId:number):Observable<Reservation>{
    return this.http.get<Reservation>(`http://localhost:3000/reservation/${reservationId}`);
  }
  getLocationById(locationId:number):Observable<Location>{
    return this.http.get<Location>(`http://localhost:3000/locations/${locationId}`);
  }
  getReservationClient(clientId:string):Observable<Reservation[]>{
    const url = `${API_LINK}?userId=${clientId}`;
    return this.http.get<Reservation[]>(url);
  } 
  confirmerReservation(reservationId: number): Observable<any> {
    return this.http.patch(`${API_LINK}/${reservationId}`, { status: 'Confirmée' });
  }
  convertirReservation(reservationId: number): Observable<any> {
    return this.http.patch(`${API_LINK}/${reservationId}`, { status: 'transformée' });
  }
  annulerReservation(reservationId: number): Observable<any> {
    return this.http.patch(`${API_LINK}/${reservationId}`, { status: 'Annulée' });
  }
  supprimerReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${API_LINK}/${reservationId}`);
  }

   // Méthode pour récupérer toutes les réservations confirmées pour une voiture spécifique
  getConfirméesByVoitureId(voitureId: number): Observable<any[]> {
    const url = `${API_LINK}?carId=${voitureId}&status=Confirmée`;
    return this.http.get<any[]>(url);
  }  
    
   

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
  //************************************************************** */

}
