import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { Editeur } from '../model/editeur.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-livre',
  templateUrl: './add-livre.component.html',
  //styleUrls: ['./add-livre.component.css']
})
export class AddLivreComponent implements OnInit {
  newLivre = new Livre();
  message: String = "";

  editeurs!: Editeur[];
  newIdEd!: number;
  newEditeur!: Editeur;

  uploadedImage!: File;
  imagePath: any;

  constructor(private livreService: LivreService,
    private router: Router) { }
  ngOnInit(): void {
    this.livreService.listeEditeurs().
      subscribe(edts => {
        this.editeurs = edts._embedded.editeurs;
        console.log(edts);
      });
  }

  /*addLivre(){
    this.newLivre.editeur = this.editeurs.find(ed => ed.idEd == this.newIdEd)!;
    this.livreService.ajouterLivre(this.newLivre)
    .subscribe(lvre => {
    console.log(lvre);
    this.router.navigate(['livres']);
    });
  }*/


  addLivre() {
    if (this.newIdEd !== undefined) {
      this.newLivre.editeur = this.editeurs.find(ed => ed.idEd == this.newIdEd)!;
      this.livreService
        .ajouterLivre(this.newLivre)
        .subscribe((lvre) => {
          if (this.uploadedImage) {
            if (lvre.idLivre !== undefined) {
              this.livreService
                .uploadImageFS(this.uploadedImage, this.uploadedImage.name, lvre.idLivre)
                .subscribe((response: any) => { }
              );
            } else {
              console.error('lvre.idLivre is undefined.');
            }
          }
          this.router.navigate(['livres']);
        });
    } else {
      // Handle the case when newIdEd is undefined
      console.error('newIdEd is undefined.');
    }
  }
  

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}
