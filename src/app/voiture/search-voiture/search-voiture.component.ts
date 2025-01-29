import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from '../voiture.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Voiture } from '../voiture';

@Component({
  selector: 'app-search-voiture',
  templateUrl: './search-voiture.component.html',
 
})
export class SearchVoitureComponent {
  searchTerms = new Subject<string>();
  voitures$: Observable<Voiture[]>;

  constructor(
    private router: Router,
    private voitureService: VoitureService
    ) { }

  ngOnInit(): void {
    this.voitures$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.voitureService.searchVoitureList(term))
      // {.....pokemonList(ab)............pokemonList(abc)......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(voiture: Voiture) {
    const link = ['/voiture', voiture.id];
    this.router.navigate(link);
  }
}
