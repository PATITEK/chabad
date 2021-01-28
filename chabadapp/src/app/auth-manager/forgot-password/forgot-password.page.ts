import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATTERN } from 'src/app/@app-core/http';
import { ToastService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  input = '';

  constructor(
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  goToVerification() {
    if (PATTERN.PHONE_NUMBER_VIETNAM.test(this.input)) {
      this.router.navigateByUrl('auth-manager/verification');
    } else {
      this.toastService.present('Phone number is invalid!', 'top');
    }
  }
}
