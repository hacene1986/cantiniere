import { MatSnackBar } from '@angular/material';
import { AuthentificationService } from '../../services/authentification.service';
import { InscriptionComponent } from './../inscription/inscription.component';
import { ConnexionComponent } from './../connexion/connexion.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decod from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Attribut connécté au service
  isAuth: boolean;
  userConnected: any;

  user: Object;

  constructor(
    private modalService: NgbModal,
    private auth: AuthentificationService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkConnexion();
    this.getUser();
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

  getUser() {
    let tok = localStorage.getItem('token')
    let decod = jwt_decod(tok);
    console.log(decod.user);
    this.user = decod.user;
    console.log(this.user);

  }

  openMyAccount(id) {
    this.router.navigate(["/my-account", id]);
  }


}
