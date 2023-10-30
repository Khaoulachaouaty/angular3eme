import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Editeur } from '../model/editeur.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLEd } from '../config';
import { EditeurWrapper } from '../model/EditeurWrapped';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class LivreService {

    livres: Livre[] = []; //un tableau de Livre
    livre!: Livre;
    editeurs: Editeur[] = [];
    apiURL: string = 'http://localhost:8080/livres/api';
    apiURLEd: string = 'http://localhost:8080/livres/ed';

    constructor(private http: HttpClient,
        private authService: AuthService) {
        /*    this.editeurs = [ {idEd : 1, nomEd : "mohssen"},
                              {idEd : 2, nomEd : "hedy"}];
        this.livres = [
        { idLivre : 1, nomLivre : "Spring Boot", prixLivre : 80.600, datePublication: new Date("01/14/2011"),editeur : {idEd : 1, nomEd : "mohssen"}},
        { idLivre : 2, nomLivre : "JEE", prixLivre : 50, datePublication : new Date("12/17/2010"),editeur : {idEd : 1, nomEd : "mohssen"}},
        { idLivre : 3, nomLivre :"Angular", prixLivre : 90.123, datePublication : new Date("02/20/2020"),editeur : {idEd : 2, nomEd : "hedy"}}
        ];*/
    }

    listeLivres(): Observable<Livre[]> {
        return this.http.get<Livre[]>(apiURL + "/all");
    }

    ajouterLivre(lvre: Livre): Observable<Livre> {
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.post<Livre>(apiURL + "/addlvre", lvre, { headers: httpHeaders });

    }

    supprimerLivre(id: number) {
        const url = `${apiURL}/dellvre/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.delete(url, { headers: httpHeaders });

    }


    consulterLivre(id: number): Observable<Livre> {
        const url = `${apiURL}/getbyid/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.get<Livre>(url, { headers: httpHeaders });
    }

    updateLivre(lvre: Livre): Observable<Livre> {
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.put<Livre>(apiURL + "/updatelvre", lvre, { headers: httpHeaders });
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
    trierLivres() {
        this.livres = this.livres.sort((n1, n2) => {
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

    listeEditeurs(): Observable<EditeurWrapper> {
        let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })
        return this.http.get<EditeurWrapper>(this.apiURLEd, { headers: httpHeaders });
    }


    /* consulterEditeur(id:number): Editeur{
         return this.editeurs.find(ed => ed.idEd == id)!;
     }*/


    rechercherParEditeur(idEd: number): Observable<Livre[]> {
        const url = `${apiURL}/lvresed/${idEd}`;
        return this.http.get<Livre[]>(url);
    }

    rechercherParNom(nom: string): Observable<Livre[]> {
        const url = `${apiURL}/lvresByName/${nom}`;
        return this.http.get<Livre[]>(url);
    }

    ajouterEditeur(ed: Editeur): Observable<Editeur> {
        return this.http.post<Editeur>(apiURLEd, ed, httpOptions);
    }


    uploadImage(file: File, filename: string): Observable<Image> {
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${apiURL + '/image/upload'}`;
        return this.http.post<Image>(url, imageFormData);
    }
    loadImage(id: number): Observable<Image> {
        const url = `${this.apiURL + '/image/get/info'}/${id}`;
        return this.http.get<Image>(url);
    }

    uploadImageLvre(file: File, filename: string, idLvre:number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uplaodImageLvre'}/${idLvre}`;
        return this.http.post(url, imageFormData);
        }

    supprimerImage(id: number) {
        const url = `${this.apiURL}/image/delete/${id}`;
        return this.http.delete(url, httpOptions);
    }

    uploadImageFS(file: File, filename: string, idLvre: number): Observable<any> {
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uploadFS'}/${idLvre}`;
        return this.http.post(url, imageFormData);
    }
}
