import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log('Exito en la autenticacion')
        this.router.navigate(['/download']);
      })
      .catch(err => this.openSnackBar('Authentication error. Try Again', 'Close')
      );
  } ;

}

