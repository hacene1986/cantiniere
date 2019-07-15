import { MatSnackBar } from '@angular/material';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
        // validator: MustMatch('password', 'confirmPassword')
      });
  }

  creerUtilisateur(form: NgForm) {
    const user: User = {
      name: form.value.nom,
      firstname: form.value.prenom,
      sex: null,
      email: form.value.mail,
      phone: form.value.tel,
      password: form.value.password,
      address: form.value.rue,
      postalCode: form.value.cp,
      town: form.value.ville,
      isLunchLady: 0,
      wallet: 0,
      image64: ''
    };

    this.userService.creerUtilisateur(user)
      .subscribe(
        data => {
          form.reset();
          this.closeModal();
        },
        err => {
          console.log(err);
          this.snackBar.open('Problème Serveur !', 'Inscription', {
            duration: 4000,
            horizontalPosition: 'left'
          });
        }
      );
    this.router.navigate(['/']);
    this.snackBar.open('Bienvenue !', 'Inscrit', {
      duration: 4000,
      horizontalPosition: 'left'
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  get name() {
    return this.registerForm.get('name');
  }
  get firstname() {
    return this.registerForm.get('firstname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
