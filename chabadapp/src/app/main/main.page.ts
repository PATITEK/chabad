import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../@app-core/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = localStorage.getItem('full_name') || '';
  avatar: any;
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }
 
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.accountService.getAccounts().subscribe(result => {
      this.avatar = result.app_user.avatar;
    })
  }
  
  getImage() {
    return `url(${this.avatar})`;
  }
  
  goToUserInfo() {
    this.router.navigateByUrl('account-setting');
  }
}
