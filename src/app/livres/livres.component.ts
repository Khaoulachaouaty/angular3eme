import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {
  livres?: Livre[];
  apiurl:string='http://localhost:8080/livres/api';
  
  constructor(private livreService: LivreService,
    public authService: AuthService) {
  }
  ngOnInit(): void {
    this.chargerLivres();
  }

  /*chargerLivres() {
    this.livreService.listeLivres().subscribe((lvres) => {
      //console.log(lvres);
      this.livres = lvres;

      this.livres.forEach((lvre) => {
        this.livreService
          .loadImage(lvre.image.idImage)
          .subscribe((img: Image) => {
            lvre.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    });
  }*/

  /*chargerLivres() {
    this.livreService.listeLivres().subscribe((lvres) => {
      console.log(lvres);
      this.livres = lvres;
  
      this.livres.forEach((lvre) => {
        if (lvre.image && lvre.image.idImage) {
          this.livreService
            .loadImage(lvre.image.idImage)
            .subscribe((img: Image) => {
              lvre.imageStr = 'data:' + img.type + ';base64,' + img.image;
            });
        }
      });
    });
  }*/
  

  /*chargerLivres() {
    this.livreService.listeLivres().subscribe(lvres => {
      this.livres = lvres;
      this.livres.forEach((lvre) => {
        lvre.imageStr = 'data:' + lvre.images[0].type + ';base64,' +
          lvre.images[0].image;
      });
    });
  } */

  chargerLivres() {
    this.livreService.listeLivres().subscribe(lvres => {
      this.livres = lvres;
    });
  }
    


  supprimerLivre(l: Livre) {
    //console.log(l);
    let conf = confirm("Etes-vous sûr ?");
    if (conf && l.idLivre !== undefined) {
      this.livreService.supprimerLivre(l.idLivre).subscribe(() => {
        console.log("livre supprimé");
        this.chargerLivres();
      });
    }
  }
}
