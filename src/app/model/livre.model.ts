import { Editeur } from "./editeur.model";

export class Livre {
    idLivre? : number;
    nomLivre? : string;
    prixLivre? : number;
    datePublication? : Date ;
    editeur! : Editeur;

    }