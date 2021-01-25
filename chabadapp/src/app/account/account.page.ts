import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkAvailability } from '@ionic-native/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { AccountService } from '../@app-core/http';
import {PopupComponent} from '../@modular/popup/popup.component';
import { Camera } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  activeInput = false;
  image_url: any = '../assets/img/user.png';
  public form: FormGroup;
  checkUpdate=false;
  constructor(
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private accoutService: AccountService,
    private alertCtrl: AlertController,
    private camera: Camera
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
  checfokUpdate():boolean {
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

 async changeInfoUser(){
  let alert = await this.alertCtrl.create({
      message: 'Change info',
      buttons: [
        {
          text: 'View Profile Picture',
          handler: () => {
          }
        },
        {
          text: 'Choose from Library',
          handler: () => {
            this.uploadAvatar();
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            this.takephoto();
          }
        },
        {
          text: 'Remove Current Photo',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
}

  uploadAvatar(){
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl) => {
      if (dataUrl) {
        var dataUri = "data:image/jpeg;base64," + dataUrl;

        var image = dataURItoBlob(dataUri);
        let formData = new FormData;
        formData.append('avatar', image);
          // this.userservice.uploadphoto(formData).then((data)=>{
          //   // console.log(data)

          //   this.image_url = data['user']['avatar'];
          //   // console.log(this.image_url);
          // })
      }
    }).catch(() => {
      setTimeout(() => {
      }, 500);
    })
  }

  takephoto() {
    const options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl) => {

      if (dataUrl) {
        var dataUri = "data:image/jpeg;base64," + dataUrl;
        var image = dataURItoBlob(dataUri);
        let formData = new FormData;
        formData.append('avatar', image);
        // this.userservice.uploadphoto(formData).then(data =>{
        //   this.image_url = data['user']['avatar'];
        // })
      }
    }).catch(() => {
      setTimeout(() => {
        
      }, 500);
    })
  }

}

function dataURItoBlob(dataURI) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  }
  else {
    byteString = encodeURI(dataURI.split(',')[1]);
  }

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

