import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
  ) { }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`http://localhost:3000/signupUsers/${clientId}`);
  }

}
