import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Editeur } from '../model/editeur.model';

@Component({
  selector: 'app-update-editeur',
  templateUrl: './update-editeur.component.html',
  styleUrls: ['./update-editeur.component.css']
})
export class UpdateEditeurComponent implements OnInit{
  @Input()
  editeur! : Editeur;

  @Input()
  ajout!:boolean;

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateEditeur ",this.editeur);
    }

  @Output()
  editeurUpdated = new EventEmitter<Editeur>();
    
  saveEditeur(){
    this.editeurUpdated.emit(this.editeur);
    }
        

}
