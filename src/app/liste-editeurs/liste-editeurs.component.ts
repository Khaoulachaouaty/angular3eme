import { Component, OnInit } from '@angular/core';
import { Editeur } from '../model/editeur.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-liste-editeurs',
  templateUrl: './liste-editeurs.component.html',
  styleUrls: ['./liste-editeurs.component.css']
})
export class ListeEditeursComponent implements OnInit {
  editeurs! : Editeur[];
  updatedEd:Editeur = {"idEd":0,"nomEd":""};
  ajout:boolean=true;


  constructor(private livreService : LivreService) { }
  ngOnInit(): void {
  this.livreService.listeEditeurs().
  subscribe(edts => {this.editeurs = edts._embedded.editeurs;
  console.log(edts);
});
} 

chargerEditeurs(){
  this.livreService.listeEditeurs().
  subscribe(edts => {this.editeurs = edts._embedded.editeurs;
  console.log(edts);
  });
  }

editeurUpdated(ed:Editeur){
  console.log("Ed updated event",ed);
  this.livreService.ajouterEditeur(ed).
   subscribe( ()=> this.chargerEditeurs());
  }

  
updateEd(ed:Editeur) {
  this.updatedEd=ed;
  this.ajout=false; 
  }
      
}
