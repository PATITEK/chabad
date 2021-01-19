import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@app-core/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  // formGroup: FormGroup
  private dataSignUp = {
    full_name: '',
    sex: '',
    age: 0,
    province: '',
    district: '',
    full_address: '',
    phone_number: '',
    password: '',
  }

  private dataLogin = {
    phone_number: '',
    password: '',
  }
  
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }
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

  signUp() {
    this.authService.signUpUser(this.dataSignUp).subscribe((data:any) =>{
      localStorage.setItem('Authorization', data.token);
      this.router.navigate(['auth-manager/login']);
    })
  }

  login() {
    this.dataLogin.phone_number = '+84'+this.dataLogin.phone_number.slice(1,10);
    // console.log(this.dataLogin.phone_number);
    this.authService.login(this.dataLogin).subscribe(data =>{
      console.log(this.dataLogin);
      localStorage.setItem('Authorization', data.token);
      // console.log(data);
      if(this.authService.checkLogin() == true) {
        this.router.navigate(['main/chabad']);
      }
    });
  }

  // createForm(){
  //   this.formGroup = this.formBuilder.group({
  //     full_name: new FormControl('', [Validators.required]),
  //     sex: new FormControl(0, [Validators.required]),
  //     age: new FormControl('', [Validators.required]),
  //     province: new FormControl('', [Validators.required]),
  //     district: new FormControl('', [Validators.required]),
  //     full_address: new FormControl('', [Validators.required]),
  //     phone_number: new FormControl('', [Validators.required]),
  //     password: new FormControl('', [Validators.required]),
  //   })
  // }

  // signup(){
  //   // console.log('aaa');
  //   if(this.formGroup.valid){
  //     // let convertPhone = this.formGroup.value.phone_number.slice(1,10);
  //     // let defineNumber = "+84";
  //     // let phoneNumber = defineNumber.concat(convertPhone)
  //     const data = {
  //       full_name: this.formGroup.value.full_name,
  //       sex: this.formGroup.value.sex,
  //       age: this.formGroup.value.age,
  //       province: this.formGroup.value.province,
  //       district: this.formGroup.value.district,
  //       full_address: this.formGroup.value.full_address,
  //       phone_number: this.formGroup.value.phone_number,
  //       password: this.formGroup.value.password,
  //     }
  //     this.authService.signup(data).subscribe();
  //   }
  // }

  getFullnameSignup(event) {
    this.dataSignUp.full_name = event.target.value;
    // console.log(this.dataSignUp.full_name);
  }
  getSexSignup(event) {
    this.dataSignUp.sex = event.target.value;
  }
  getAgeSignup(event) {
    this.dataSignUp.age = event.target.value;
    // console.log(this.dataSignUp.age)
  }
  getProvinceSignup(event) {
    this.dataSignUp.province = event.target.value;
  }
  getDistrictSignup(event) {
    this.dataSignUp.district = event.target.value;
  }
  getFulladdressSignup(event) {
    this.dataSignUp.full_address = event.target.value;
    // console.log(this.dataSignUp.full_address)
  }
  getPhonenumberSignup(event) {
    this.dataSignUp.phone_number = event.target.value;
    this.dataLogin.phone_number = event.target.value;
    // console.log(this.dataSignUp.phone_number);
  }
  getPasswordSignup(event) {
    this.dataSignUp.password = event.target.value;
    this.dataLogin.password = event.target.value;
    // console.log(this.dataSignUp.password);
  }
  // signup() {
  //   console.log(this.dataSignUp);
  // }
}
