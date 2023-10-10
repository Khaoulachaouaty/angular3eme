import { Component, OnInit } from '@angular/core';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Editeur } from '../model/editeur.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit{
  livres! : Livre[];
  nomLivre! : string ;
  searchTerm!: string;
  allLivres! : Livre[];

  
  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.livreService.listeLivres().subscribe(lvres => {
      console.log(lvres);
      this.allLivres = lvres;
      });
      
  }

  rechercherLvres(){
    this.livreService.rechercherParNom(this.nomLivre).
    subscribe(lvres => {
    this.livres = lvres;
    console.log(lvres)});
    }

    onKeyUp(filterText : string){
      this.livres = this.allLivres.filter(item =>
        item.nomLivre && item.nomLivre.toLowerCase().includes(filterText));
    }
}
