import { AccueilComponent } from './components/accueil/accueil.component';
import { PlatsComponent } from './components/plats/plats.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './components/backoff-cantiniere/user-details/user-details.component';
import { UserAccountComponent } from './components/backoff-cantiniere/user-account/user-account.component';
import { MyAccountComponent } from './components/backoff-user/my-account/my-account.component';
import { PanierComponent } from './components/panier/panier.component';
import { ContactComponent } from './components/contact/contact.component';
import { CantinierePlatComponent } from './components/cantiniere-plat/cantiniere-plat.component';
import { CantiniereMenuComponent } from './components/cantiniere-menu/cantiniere-menu.component';
import { RecapCantiniereComponent } from './components/recap-cantiniere/recap-cantiniere.component';
import { PlatDetailComponent } from './plat-detail/plat-detail.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { EditUserComponent } from './components/backoff-user/edit-user/edit-user.component'


const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connection', component: ConnexionComponent },
  { path: 'user-account', component: UserAccountComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'panier', component: PanierComponent },
  { path: '', component: AccueilComponent }, // Accueil par default
  { path: 'menu', component: MenuComponent },
  { path: 'plats', component: PlatsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cantinierePlat', component: CantinierePlatComponent },
  { path: 'cantiniereMenu', component: CantiniereMenuComponent },
  { path: 'cantiniereRecap', component: RecapCantiniereComponent },
  { path: 'platDetail/:id', component: PlatDetailComponent },
  { path: 'menuDetail/:id', component: MenuDetailComponent },
  { path: 'edit-user/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
