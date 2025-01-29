import { Injectable } from '@angular/core';
//import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { VOIYURES } from './voiture/voiture-list';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  {

  // implements InMemoryDbService
  constructor() { }
  createDb() {
    const voitures = VOIYURES;
    return { voitures };
}
}
