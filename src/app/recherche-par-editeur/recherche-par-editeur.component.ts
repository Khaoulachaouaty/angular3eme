import { Component, OnInit } from '@angular/core';
import { Editeur } from '../model/editeur.model';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { LivresComponent } from '../livres/livres.component';


@Component({
  selector: 'app-recherche-par-editeur',
  templateUrl: './recherche-par-editeur.component.html',
  styleUrls: ['./recherche-par-editeur.component.css']
})
export class RechercheParEditeurComponent implements OnInit{
  livres! : Livre[];
  IdEditeur! : number;
  editeurs! : Editeur[];
  constructor(private livreService: LivreService) {}
  ngOnInit(): void {
    this.livreService.listeEditeurs().
    subscribe(edts => {this.editeurs = edts._embedded.editeurs;
    console.log(edts);
});
  }

  onChange() {
    this.livreService.rechercherParEditeur(this.IdEditeur).
    subscribe(lvres =>{this.livres=lvres});
    }
}
