import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderItem} from "../../shared/models/order-item";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn: EventEmitter<void> = new EventEmitter();
  @ViewChild('loginForm') loginForm: NgForm | undefined

  errorMessage = ''
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm) {
      this.authService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe(
        (response) => {
          this.loggedIn.emit()
        },
        (error) => {
          this.errorMessage = 'User with the given email and password does not exist.'
        }
      )
    }
  }

}
