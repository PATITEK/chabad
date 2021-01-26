import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { ToastController } from '@ionic/angular';

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
  private dataSignUp = {
    full_name: '',
    email: '',
    sex: '',
    age: 0,
    country_code: '',
    province: '',
    district: '',
    full_address: '',
    phone_number: '',
    password: '',
    

  }
  checkSignUpVar = false;
  confirmPassword = '';
  private dataLogin = {
    email: '',
    password: '',
  }
  countries:any;
  constructor(private router: Router, private authService: AuthService, public toastController: ToastController) { }
  ngOnInit() {
    this.authService.countryCode().subscribe((data:any) => {
      this.countries = data.country_codes;
    })
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

  signUp() {
    if(this.dataSignUp.phone_number.length == 10) {
      this.dataSignUp.phone_number = '+84'+this.dataSignUp.phone_number.slice(1,10);
    } 
    else {
      this.dataSignUp.phone_number = '+84'+this.dataSignUp.phone_number.slice(0,9);
    }
    if(this.dataSignUp.password == this.confirmPassword) {
      this.authService.signup(this.dataSignUp).subscribe((data:any) =>{
        localStorage.setItem('Authorization', data.token);
      })
    } else {
      this.presentToast('Password and confirm password does not match');
    }
  }

  login() {
    // this.dataLogin.email = '+84'+this.dataLogin.email.slice(1,10);
    this.dataLogin.email = this.dataLogin.email;
    this.authService.login(this.dataLogin).subscribe(data =>{
      localStorage.setItem('Authorization', data.token);
      if(this.authService.checkLogin() == true) {
        this.router.navigate(['main/chabad']);
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
  showSelectValue = function(mySelect) {
    console.log(mySelect);
  }

  getFullnameSignup(event) {
    this.dataSignUp.full_name = event.target.value;
  }
  getSexSignup(event) {
    this.dataSignUp.sex = event.target.value;
  }
  getAgeSignup(event) {
    this.dataSignUp.age = event.target.value;
  }
  getProvinceSignup(event) {
    this.dataSignUp.province = event.target.value;
  }
  getDistrictSignup(event) {
    this.dataSignUp.district = event.target.value;
  }
  getFulladdressSignup(event) {
    this.dataSignUp.full_address = event.target.value;
  }
  getPhonenumberSignup(event) {
    this.dataSignUp.phone_number = event.target.value;
    this.dataLogin.email = event.target.value;
  }
  getPasswordSignup(event) {
    this.dataSignUp.password = event.target.value;
    this.dataLogin.password = event.target.value;
  }
  getConfirmPasswordSignup(event) {
    this.confirmPassword = event.target.value;
  }
  getEmailSignup(event) {
    this.dataSignUp.email = event.target.value;
    this.dataLogin.email = event.target.value;
  }
}
