import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  passwordValue = '444';
  confirmedPasswordValue = '';

  invalidPassword = '';
  invalidConfirmedPassword = '';

  constructor() { }

  ngOnInit() {}

  clearPassword(event) {
    event.target.value = '';
    this.invalidPassword = '';
    this.invalidConfirmedPassword = '';
  }

  saveValue(event) {
    if (event.target.name == 'password') {
      this.passwordValue = event.target.value;
    } else if (event.target.name == 'confirmedPassword') {
      this.confirmedPasswordValue = event.target.value;
    }
  }

  checkValidPassword(name: string, value: string) {
    if (value == '') {
      return `${name} can't not be empty`;
    }
    if (value.length < 8) {
      return `${name} can't not be less than 8 letters`;
    }
    if (name == 'Confirmed password') {
      if (this.passwordValue != this.confirmedPasswordValue) {
        return 'Confirmed password not match with password';
      }
    }
    return '';
  }

  confirmPassword() {
    this.invalidPassword = this.checkValidPassword('Password', this.passwordValue);
    this.invalidConfirmedPassword = this.checkValidPassword('Confirmed password', this.confirmedPasswordValue);
    if (this.invalidPassword == '' && this.invalidConfirmedPassword == '') {
      
    }
  }
}
