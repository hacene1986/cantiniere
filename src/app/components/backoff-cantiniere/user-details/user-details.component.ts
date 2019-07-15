import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id: string;
  user: User;
  amount: number;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.userDetail(this.id);
  }

  openSolder(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-solder' });
  }

  openCrediter(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-crediter' });
  }

  userDetail(id) {
    this.userService.getUtilisateur(id).subscribe((res) => {
      // console.log(res)
      this.user = res;
    });
  }

  crediter(form: NgForm) {
    // let formulaire =
    // console.log(formulaire)
    this.amount = form.value.amount,
      // location.search = "?amount="+this.amount
      console.log(this.amount);

    this.userService.crediterUtilisateur(this.id, this.amount)
      .subscribe(
        walet => {
          console.log('ok');
          form.reset();
          window.location.reload();
        }

      );

  }
  debiter(form: NgForm) {
    // let formulaire =
    // console.log(formulaire)
    this.amount = form.value.amount,
      // location.search = "?amount="+this.amount
      console.log(this.amount);

    this.userService.debiterUtilisateur(this.id, this.amount)
      .subscribe(
        walet => {
          console.log('ok');
          form.reset();
          window.location.reload();
        }

      );

  }
}
