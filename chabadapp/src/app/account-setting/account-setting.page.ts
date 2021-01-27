import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopuplogoutComponent } from '../@modular/popuplogout/popuplogout.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {
  isOpeningModal = false;

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async openModalLogOut() {
    this.isOpeningModal = true;
    const modal = await this.modalController.create({
      component: PopuplogoutComponent,
      swipeToClose: true,
      cssClass: 'modal__logout'
    });
    await modal.present();

    modal.onWillDismiss().then(() => this.isOpeningModal = false);
  }
}
