import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AccountService } from '../@app-core/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name = localStorage.getItem('fullname') || '';
  avatar = localStorage.getItem('avatar')
  constructor(
    private router: Router,
    private accountService: AccountService,
    private platform: Platform,
    private alertController: AlertController
  ) { }
 
  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/main/chabad') {
        this.presentAlert();
      }
      else {
        return;
      }})

      console.log(this.getImage());
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'logout-alert',
      message: 'Do you want to exit app?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'No',
          handler: () => {
            return;
          }
        },

      ]
    });
    await alert.present();
  }
  ionViewWillEnter() {
    this.accountService.getAccounts().subscribe(result => {
      if(result.app_user.avatar == null || result.app_user.avatar == '') {
        this.avatar = "https://i.imgur.com/edwXSJa.png";
      }
      else {
        this.avatar = result.app_user.avatar;
      }
    })
  }
  
  getImage() {
    return `url(${this.avatar})`;
  }
  
  goToUserInfo() {
    this.router.navigateByUrl('account-setting');
  }
}
