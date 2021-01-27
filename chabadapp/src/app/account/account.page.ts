import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http';
import { PopupComponent } from '../@modular/popup/popup.component';
import {ModalPasswordComponent} from '../@modular/modal-password/modal-password.component'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  activatedInput = false;
  form: FormGroup;
  checkUpdate = false;

  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private passwordModal: ModalController
  ) { }

  ngOnInit() {
    this.addForm();
    this.getItem();

    this.checkFokUpdate();
  }

  ngOnChanges() {
    console.log(this.checkFokUpdate());
  }

  get f() {
    return this.form.controls;
  }

  addForm() {
    this.form = this.fb.group({
      fullName: [{ value: '' }, [Validators.required]],
      dateOfBirth: [{ value: '' }, [Validators.required]],
      phoneNumber: [{ value: '' }, [Validators.required]],
      address: [{ value: '' }, [Validators.required]],
      // email: [{ value: '', disabled: this.activeInput }, [Validators.required, Validators.email]]
    });
  }
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopupComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async openModalPassword(ev: any) {
    const popover = await this.passwordModal.create({
      component: ModalPasswordComponent,
      cssClass: 'modalPassword',
    });
    return await popover.present();
  }

  toggleActivatedInput(value) {
    this.activatedInput = value;
  }

  getItem() {
    this.accountService.getAccounts().subscribe(data => {
      this.form.patchValue({
        fullName: data.app_user.full_name,
        dateOfBirth: data.app_user.birthday,
        phoneNumber: data.app_user.phone_number,
        address: data.app_user.full_address,
        // email: data.app_user.email
      });
    });
  }

  updateInfo() {
    const data = {
      app_user: {
        full_name: this.form.value['fullName'],
        birthday: this.form.value['dateOfBirth'].substring(0, 10),
        phone_number: this.form.value['phoneNumber'],
        full_address: this.form.value['address']
      }
    }
    this.accountService.updateProfile(data).subscribe(data => {
     console.log(data)
    });
  }

  checkFokUpdate(): boolean {
    let tmp;
    this.accountService.getAccounts().subscribe((data: any) => {
      tmp = data.app_user;
    })
    console.log(tmp);
    return tmp === this.form.getRawValue();
  }
}

