import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showpass = false;
  public name = 'eye-outline';
  public status='login';
  constructor(private router: Router) { }
  ngOnInit() {
  }
  showPass(){
    this.showpass = !this.showpass;
    if (this.showpass) {
      this.type = 'text';
      this.name = 'eye-off-outline'
    }
    else {
      this.type = 'password';
      this.name = 'eye-outline'
    }
  }
  clickBtnLogin(){
    this.status="login";
  }
  clickBtnSign(){
    this.status="sign";
  }
  clickForgotPassword() {
    this.router.navigate(['auth-manager/forgot-password']);
  }
  loginSuccess(){
    this.router.navigate(['main/synagogue'])
  }

}
