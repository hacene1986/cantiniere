import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connectionUserData = {};
  connexionForm: FormGroup;
  lostPasswordForm: FormGroup;
  userConnected: User;

  @ViewChild('snackBarTemplate')
  snackBarTemplate: TemplateRef<any>;

  @ViewChild('snackBarTemplateError')
  snackBarTemplateError: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthentificationService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.connexionForm = this.formBuilder.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required],
    });

    this.lostPasswordForm = this.formBuilder.group({
      emailLost: ['', Validators.required],
    });
  }

  // Appel de la méthode de connexion
  connexion() {
    const formValue = this.connexionForm.value;
    const login: string = formValue.login;
    const pwd: string = formValue.pwd;

    this.authService.authentification(login, pwd)
      .subscribe(
        (user) => {
          this.userConnected = this.authService.getUserConnected();
          console.log('userConnected in Connexion :');
          console.log(this.userConnected);

          this.closeModal();
          window.location.reload();
          this.router.navigate(['/']);
          this.openSnackBar();
        },
        err => {
          console.log('Erreur d\'authentification: ' + err);
          if (localStorage.getItem('token') == null) {
            this.openSnackBarError();
          }
        }
      );
  }

  openPasswordOublie(modalPassword) {
    this.closeModal();
    const formValue = this.lostPasswordForm.value;
    const emailLost: string = formValue.emailLost;
    this.modalService.open(modalPassword, { centered: true, windowClass: 'modalPassword' });
    this.authService.forgotPassword(emailLost);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openSnackBar() {
    this.snackBar.openFromTemplate(this.snackBarTemplate, {
      duration: 7000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  openSnackBarError() {
    this.snackBar.openFromTemplate(this.snackBarTemplateError, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }


}
