import { Httpinterceptor } from './models/httpinterceptor';
import { AuthentificationService } from './services/authentification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatSnackBarModule,
  MAT_DATE_LOCALE,
  MatRadioModule,
  MatSelectModule,
  MatDividerModule
} from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UserAccountComponent } from './components/backoff-cantiniere/user-account/user-account.component';
import { UserDetailsComponent } from './components/backoff-cantiniere/user-details/user-details.component';
import { MyAccountComponent } from './components/backoff-user/my-account/my-account.component';
import { SearchPipe } from './components/backoff-cantiniere/pipe/search.pipe';
import { PanierComponent } from './components/panier/panier.component';

import { MenuComponent } from './components/menu/menu.component';
import { PlatsComponent } from './components/plats/plats.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { RecapCantiniereComponent } from './components/recap-cantiniere/recap-cantiniere.component';
import { ContactComponent } from './components/contact/contact.component';
import { CantinierePlatComponent } from './components/cantiniere-plat/cantiniere-plat.component';
import { CantiniereMenuComponent } from './components/cantiniere-menu/cantiniere-menu.component';
import { PlatService } from './services/plat.service';
import { PlatDetailComponent } from './plat-detail/plat-detail.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { EditUserComponent } from './components/backoff-user/edit-user/edit-user.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InscriptionComponent,
    ConnexionComponent,
    UserAccountComponent,
    UserDetailsComponent,
    MyAccountComponent,
    SearchPipe,
    PanierComponent,
    MenuComponent,
    PlatsComponent,
    FooterComponent,
    AccueilComponent,
    RecapCantiniereComponent,
    ContactComponent,
    CantinierePlatComponent,
    CantiniereMenuComponent,
    PlatDetailComponent,
    MenuDetailComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    AuthentificationService,
    PlatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Httpinterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
