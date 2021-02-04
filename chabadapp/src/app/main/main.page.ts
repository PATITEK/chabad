import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../@app-core/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = localStorage.getItem('fullname') || '';

  constructor(
    private router: Router
  ) { }
  avatar:any;
  ionViewWillEnter() {
    this.avatar = localStorage.getItem('avatar')
  }
  ngOnInit() {
    this.avatar;
  }
  goToUserInfo() {
    this.router.navigateByUrl('account-setting');
  }
}
