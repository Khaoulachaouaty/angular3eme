import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Editeur } from '../model/editeur.model';
@Component({
selector: 'app-update-livre',
templateUrl: './update-livre.component.html',styles: []
})
export class UpdateLivreComponent implements OnInit {
currentLivre = new Livre();
editeurs! : Editeur[];
updatedEdId! : number;

constructor(private activatedRoute: ActivatedRoute,
  private router :Router,
private livreService: LivreService) { }
ngOnInit() {
  this.livreService.listeEditeurs().
  subscribe(edts => {this.editeurs = edts._embedded.editeurs;
  console.log(edts);
  });
  this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).
  subscribe( lvre =>{ this.currentLivre = lvre;
  this.updatedEdId =this.currentLivre.editeur.idEd;
  } ) ;
} 


updateLivre()
{ //console.log(this.currentLivre);
  this.currentLivre.editeur = this.editeurs.
  find(cat => cat.idEd == this.updatedEdId)!;
  this.livreService.updateLivre(this.currentLivre).subscribe(lvre =>{
  this.router.navigate(['livres']);
  }
  );
}
}
