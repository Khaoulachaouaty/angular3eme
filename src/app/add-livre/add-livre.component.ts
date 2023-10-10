import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { Editeur } from '../model/editeur.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-livre',
  templateUrl: './add-livre.component.html',
  //styleUrls: ['./add-livre.component.css']
})
export class AddLivreComponent implements OnInit{
  newLivre = new Livre();
  message : String="";

  editeurs! : Editeur[];
  newIdEd! : number;
  newEd! : Editeur;
  newEditeur! : Editeur;
  
  constructor(private livreService: LivreService,
              private router :Router ) {}
  ngOnInit(): void { 
    this.livreService.listeEditeurs().
    subscribe(edts => {this.editeurs = edts._embedded.editeurs;
    console.log(edts);
    });
      }

  addLivre(){
    this.newLivre.editeur = this.editeurs.find(ed => ed.idEd == this.newIdEd)!;
    this.livreService.ajouterLivre(this.newLivre)
    .subscribe(lvre => {
    console.log(lvre);
    this.router.navigate(['livres']);
    });
    }
}
