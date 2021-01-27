import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {

  constructor(private camera: Camera) { }

  ngOnInit() {}
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