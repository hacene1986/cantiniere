import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthentificationService } from '../../services/authentification.service';
import { InscriptionComponent } from './../inscription/inscription.component';
import { ConnexionComponent } from './../connexion/connexion.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Attribut connécté au service
  isAuth: boolean;
  userConnected: any;

  constructor(
    private modalService: NgbModal,
    private auth: AuthentificationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkConnexion();
  }

  openconnection() {
    const modalRef = this.modalService.open(ConnexionComponent, { centered: true, windowClass: 'modalConnection' });
    this.ngOnInit();
  }
  openInscription() {
    const modalRef = this.modalService.open(InscriptionComponent, { centered: true, windowClass: 'modalInscription' });
  }

  deconnexion() {
    this.auth.logout();
    this.ngOnInit();
  }

  checkConnexion() {
    if (this.auth.isLogged()) {
      this.isAuth = true;
      this.userConnected = this.auth.getUserConnected();
      console.log('userConnected in AppComponent : ');
      console.log(this.userConnected);
      // console.log('userConnected : ' + JSON.stringify(this.userConnected));
    } else {
      this.isAuth = false;
    }
    console.log('user connecté (isAuth) : ' + this.isAuth);
  }

}
