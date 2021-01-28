import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountService, PATTERN } from '../@app-core/http';
import { PopupComponent } from '../@modular/popup/popup.component';
import { ModalPasswordComponent } from '../@modular/modal-password/modal-password.component'
import { LoadingService, ToastService } from '../@app-core/utils';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  activatedInput = false;
  loadedData = false;
  form: FormGroup;

  lastForm = {};
  isUpdating = false;

  validationMessages = {
    fullName: [
      { type: 'required', message: 'Name is required.' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Phone number is invalid.' },
    ],
    address: [
      { type: 'required', message: 'Address is required.' }
    ]
  }

  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private passwordModal: ModalController,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.initForm();
    this.getData();
  }

  initForm() {
    this.form = this.fb.group({
      fullName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(PATTERN.PHONE_NUMBER_VIETNAM)
      ])),
      address: new FormControl('', Validators.required),
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
  activateInput() {
    this.activatedInput = true;
    this.lastForm = {
      fullName: this.form.value['fullName'],
      dateOfBirth: this.form.value['dateOfBirth'],
      phoneNumber: this.form.value['phoneNumber'],
      address: this.form.value['address']
    }
  }
  deactivateInput() {
    this.activatedInput = false;
    this.form.patchValue(this.lastForm);
  }

  getData() {
    this.accountService.getAccounts().subscribe(data => {
      // console.log(data);
      // if (data.app_user.birthday == null) {
      //   this.form.patchValue({
      //     dateOfBirth: '',
      //   })
      // }
      // else {
      //   this.form.patchValue({
      //     dateOfBirth: data.app_user.birthday.substring(0, 10),
      //   })
      // }
      this.form.patchValue({
        fullName: data.app_user.full_name,
        phoneNumber: data.app_user.phone_number,
        address: data.app_user.full_address,
        // email: data.app_user.email
      });
      this.loadedData = true;
      this.loadingService.dismiss();
    });
    console.log(this.form.value)
  }
  updateInfo() {
    this.loadingService.present();
    const data = {
      app_user: {
        full_name: this.form.value['fullName'],
        birthday: this.form.value['dateOfBirth'],
        phone_number: this.form.value['phoneNumber'],
        full_address: this.form.value['address']
      }
    }
    this.accountService.updateProfile(data).subscribe(() => {
      this.activatedInput = false;
      this.loadingService.dismiss();
      this.toastService.present('Updated successfully!');
    });
  }

  canUpdate() {
    return JSON.stringify(this.lastForm) !== JSON.stringify(this.form.value) && this.form.valid;
  }
}

