import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Editeur } from '../model/editeur.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html', styles: []
})
export class UpdateLivreComponent implements OnInit {
  currentLivre = new Livre();
  editeurs!: Editeur[];
  updatedEdId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private livreService: LivreService) { }

  /*
  ngOnInit(): void{
    this.livreService.listeEditeurs().
    subscribe(edts => {this.editeurs = edts._embedded.editeurs;
    console.log(edts);
    });
  
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).
    subscribe( lvre =>{ this.currentLivre = lvre;
    this.updatedEdId =this.currentLivre.editeur.idEd
  
      this.livreService
        .loadImage(this.currentLivre.image.idImage)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    });
    } */

  ngOnInit(): void {
    this.livreService.listeEditeurs().
      subscribe(edts => {
        this.editeurs = edts._embedded.editeurs;
      });
    this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id'])
      .subscribe(lvre => {
        this.currentLivre = lvre;
        this.updatedEdId = lvre.editeur.idEd;
      });
  }


  /*updateLivre() { //console.log(this.currentLivre);
    this.currentLivre.editeur = this.editeurs.
      find(cat => cat.idEd == this.updatedEdId)!;
    this.livreService.updateLivre(this.currentLivre).subscribe(lvre => {
      this.router.navigate(['livres']);
    }
    );
  }*/

  updateLivre() {
    this.currentLivre.editeur = this.editeurs.find(ed => ed.idEd ==this.updatedEdId)!;
    this.livreService
    .updateLivre(this.currentLivre)
    .subscribe((lvre) => {
    this.router.navigate(['livres']);
    });
    }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }
  

 /* onAddImageLivre() {
    this.livreService
    .uploadImageLvre(this.uploadedImage,this.uploadedImage.name,this.currentLivre.idLivre)
    .subscribe( (img : Image) => {
    this.currentLivre.images.push(img);
    });
    }*/
    onAddImageLivre() {
      if (this.currentLivre && this.currentLivre.idLivre !== undefined) {
        this.livreService
          .uploadImageLvre(this.uploadedImage, this.uploadedImage.name, this.currentLivre.idLivre)
          .subscribe((img: Image) => {
            this.currentLivre.images.push(img);
          });
      }
    }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.livreService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentLivre.images.indexOf(img, 0);
        if (index > -1) {
          this.currentLivre.images.splice(index, 1);
        }
      });
  }

}
