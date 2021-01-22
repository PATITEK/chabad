import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkAvailability } from '@ionic-native/core';
import { PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http';
import {PopupComponent} from '../@modular/popup/popup.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  activeInput = false;
  public form: FormGroup;
  checkUpdate=false;
  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accoutService: AccountService
  ) { }

  ngOnInit() {
    this.addForm();
    this.getItem();

    this.checfokUpdate();
  }
  ngOnChanges(){
    console.log("ahuhu");
    
    console.log(this.checfokUpdate());
    
  }
  get f() {
    return this.form.controls;
  }
  addForm() {
    this.form = this.fb.group({
      full_name: [{value: '', disabled: this.activeInput}, [Validators.required]],
      birthday: [{value: '', disabled: this.activeInput}, [Validators.required]],
      phone_number: [{value: '', disabled: this.activeInput}, [Validators.required]],
      full_address: [{value: '', disabled: this.activeInput}, [Validators.required]],
      email: [{value: '', disabled: this.activeInput}, [Validators.required,Validators.email]]

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

  clickEdit() {
    this.activeInput = true;
  }
  getItem() {
    this.accoutService.getAccounts().subscribe((data:any) => {
      
      this.form.patchValue({
        full_name: data.app_user.full_name,
        birthday: data.app_user.birthday,
        phone_number: data.app_user.phone_number,
        full_address: data.app_user.full_address,
        email:data.app_user.email

      });
     
      
    });
  }
  updadeInfo() {
    // const data = this.formatData();
    // const formData = this.objectJsonToFormData(data);
    this.accoutService.updateProfile(this.form.getRawValue()).subscribe((data: any) => {
      this.getItem();
    });
  }
  checfokUpdate():boolean
 {
   let tmp;
  this.accoutService.getAccounts().subscribe((data:any)=>{
     tmp=data.app_user;
  })
  console.log(tmp);
  if(tmp === this.form.getRawValue()){
   
    
    return true;
    
  }
  else{
    return false;
    
  }
 }
 dosth(){
   
 }
}

