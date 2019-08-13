import { AuthentificationService } from "../../services/authentification.service";
import { InscriptionComponent } from "./../inscription/inscription.component";
import { ConnexionComponent } from "./../connexion/connexion.component";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import jwt_decod from "jwt-decode";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  // Attribut connécté au service
  isAuth: boolean;
  userConnected: any;

  user: Object;

  constructor(
    private modalService: NgbModal,
    private auth: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkConnexion();
    this.getUser();
  }

  openconnection() {
    const modalRef = this.modalService.open(ConnexionComponent, {
      centered: true,
      windowClass: "modalConnection"
    });
    this.ngOnInit();
  }
  openInscription() {
    const modalRef = this.modalService.open(InscriptionComponent, {
      centered: true,
      windowClass: "modalInscription"
    });
  }

  deconnexion() {
    this.auth.logout();
    this.ngOnInit();
  }

  checkConnexion() {
    if (this.auth.isLogged()) {
      this.isAuth = true;
      this.userConnected = this.auth.getUserConnected();
    } else {
      this.isAuth = false;
    }
  }

  getUser() {
    let tok = localStorage.getItem("token");
    let decod = jwt_decod(tok);
    this.user = decod.user;
  }

  openMyAccount(id) {
    this.router.navigate(["/my-account", id]);
  }
}
