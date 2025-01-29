import { Component, OnInit } from '@angular/core';
import { Voiture } from '../voiture';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from '../voiture.service';

@Component({
  selector: 'app-list-voiture-user',
  templateUrl: './list-voiture-user.component.html',
  styles: [
  ]
})
export class ListVoitureUserComponent implements OnInit{
  voitureList : Voiture[]  ;
  userId : string | null;
  filteredVoitureList : Voiture[];  // Liste filtrée des voitures
  selectedType: string | null;  // Type de voiture sélectionné
  currentPage: number = 1;


  itemsPerPage: number = 12;
  pages: number[] = [];
  constructor(
    private router :Router,
    private voitureService: VoitureService,
    private route : ActivatedRoute,
    
  ){}

  goToVoiture(voiture : Voiture){
   // this.router.navigate([`/clientHome/${this.userId}/voiture`,voiture.id])
   this.router.navigate(['/voitures',voiture.id])
  }


  filterVoituresByType(type: string) {
    this.selectedType = type;  // Mettre à jour le type sélectionné

    if (type === 'tous') {
      this.filteredVoitureList = this.voitureList;
    } else {
      // Filtrer les voitures en fonction du type sélectionné
      this.filteredVoitureList = this.voitureList.filter(voiture => voiture.type === type);
    }

    this.calculatePages();
  }
 
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    const voitureId: string | null = this.route.snapshot.paramMap.get('id');

    this.voitureService.getVoitureList().subscribe(voitureList => {
      this.voitureList = voitureList;
      this.filteredVoitureList = voitureList;  // Initialiser la liste filtrée avec toutes les voitures
      this.calculatePages();
    });
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }

  calculatePages() {
    const totalPages = Math.ceil(this.filteredVoitureList.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }
  }
}
