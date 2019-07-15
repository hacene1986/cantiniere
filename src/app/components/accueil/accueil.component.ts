import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';

import Typed from 'typed.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  constructor(private auth: AuthentificationService) { }

  currentTime = new Date();
  hours = this.currentTime.getHours();
  minutes = this.currentTime.getMinutes();
  t = this.currentTime.getHours() + ':' + this.currentTime.getMinutes();

  isAuth: boolean;
  userConnected: any;


  ngOnInit() {
    if (this.auth.isLogged()) {
      this.isAuth = true;
      this.userConnected = this.auth.getUserConnected();
      console.log('userConnected in Accueil : ');
      console.log(this.userConnected);

    } else {
      this.userConnected = '';
      this.isAuth = false;
    }
    console.log('user connecté (isAuth) : ' + this.isAuth);

    const slogan = {
      strings: ['Mangez frais, Mangez prêt'],
      typeSpeed: 40,
      showCursor: false,
      loop: false
    };

    const time = {
      strings: ['Commandez avant 10h30'],
      typeSpeed: 40,
      showCursor: false,
      startDelay: 1800,
      loop: false
    };

    const showSlogan = new Typed('.slogan', slogan);
    const showTime = new Typed('.time', time);
  }
}
