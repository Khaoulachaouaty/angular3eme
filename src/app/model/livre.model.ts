import { Editeur } from "./editeur.model";
import { Image } from "./image.model";

export class Livre {
    idLivre? : number;
    nomLivre? : string;
    prixLivre? : number;
    datePublication? : Date ;
    editeur! : Editeur;
    image! : Image;
    imageStr!:string;
    images!: Image[];
    }