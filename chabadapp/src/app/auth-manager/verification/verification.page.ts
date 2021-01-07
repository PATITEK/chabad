import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  wrongCode = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  resendCode() {

  }

  confirmCode() {
    this.router.navigateByUrl('main/auth-manager/new-password')
  }
}
