import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivresComponent } from './livres/livres.component';
import { AddLivreComponent } from './add-livre/add-livre.component';
import { UpdateLivreComponent } from './update-livre/update-livre.component';
import { RechercheParEditeurComponent } from './recherche-par-editeur/recherche-par-editeur.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeEditeursComponent } from './liste-editeurs/liste-editeurs.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LivreGuard } from './livre.guard';


const routes: Routes = [
  {path: "livres", component : LivresComponent},
  { path: "add-livre", component: AddLivreComponent, canActivate: [LivreGuard] },
  {path: "", redirectTo: "livres", pathMatch: "full" },
  {path: "updateLivre/:id", component: UpdateLivreComponent},
  {path: "rechercheParEditeur", component : RechercheParEditeurComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeEditeurs", component : ListeEditeursComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
