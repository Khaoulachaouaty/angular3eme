import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Editeur } from '../model/editeur.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLEd } from '../config';
import { EditeurWrapper } from '../model/EditeurWrapped';

const httpOptions = {
    headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
providedIn: 'root'
})
export class LivreService {
    
livres : Livre[]= []; //un tableau de Livre
livre! :Livre;
editeurs: Editeur[]= [];
constructor(private http : HttpClient) {
/*    this.editeurs = [ {idEd : 1, nomEd : "mohssen"},
                      {idEd : 2, nomEd : "hedy"}];
this.livres = [
{ idLivre : 1, nomLivre : "Spring Boot", prixLivre : 80.600, datePublication: new Date("01/14/2011"),editeur : {idEd : 1, nomEd : "mohssen"}},
{ idLivre : 2, nomLivre : "JEE", prixLivre : 50, datePublication : new Date("12/17/2010"),editeur : {idEd : 1, nomEd : "mohssen"}},
{ idLivre : 3, nomLivre :"Angular", prixLivre : 90.123, datePublication : new Date("02/20/2020"),editeur : {idEd : 2, nomEd : "hedy"}}
];*/
}

listeLivres(): Observable<Livre[]>{
    return this.http.get<Livre[]>(apiURL);
    }
    
ajouterLivre( lvre: Livre):Observable<Livre>{
    //this.livres.push(lvre);
    return this.http.post<Livre>(apiURL, lvre, httpOptions);

}

supprimerLivre(id : number){
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);    

}




consulterLivre(id:number):Observable <Livre>{
    const url = `${apiURL}/${id}`;
    return this.http.get<Livre>(url);
    }

updateLivre(lvre :Livre) : Observable<Livre>

{
    return this.http.put<Livre>(apiURL, lvre, httpOptions);
}

/*trierLivres(){
    this.livres = this.livres.sort((n1,n2) => {
    if (n1.idLivre> n2.idLivre) {
    return 1;
    }
    if (n1.idLivre < n2.idLivre) {
    return -1;
    }
    return 0;
    });
    }*/
    trierLivres(){
        this.livres = this.livres.sort((n1,n2) => {
            if (n1?.idLivre && n2?.idLivre) {
                if (n1.idLivre > n2.idLivre) {
                    return 1;
                }
                if (n1.idLivre < n2.idLivre) {
                    return -1;
                }
            }
            return 0;
        });
    }

    listeEditeurs():Observable<EditeurWrapper> {
        return this.http.get<EditeurWrapper>(apiURLEd);
    }
        

   /* consulterEditeur(id:number): Editeur{
        return this.editeurs.find(ed => ed.idEd == id)!;
    }*/

    rechercherParEditeur(idEd: number):Observable< Livre[]> {
        const url = `${apiURL}/lvresed/${idEd}`;
        return this.http.get<Livre[]>(url);
        }

    rechercherParNom(nom: string):Observable< Livre[]> {
        const url = `${apiURL}/lvresByName/${nom}`;
        return this.http.get<Livre[]>(url);
        }

    ajouterEditeur( ed: Editeur):Observable<Editeur>{
        return this.http.post<Editeur>(apiURLEd, ed, httpOptions);
        }
            
            
}
