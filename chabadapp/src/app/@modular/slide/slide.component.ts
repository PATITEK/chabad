import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { SlideService } from 'src/app/@modular/slide/slide.service';
import { IDataSlide } from '../page-noti/page-noti.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {
  @ViewChild('mySlider', { static: true })
  slides: IonSlides;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
    // private slideService: SlideService,
    private router: Router) {

  }


  public title;
  public image;
  public routerLink = '';
  public label = '';
  clicked = 0;

  ngOnInit() {
    // if(this.clicked == 0) {
    //   this.title = "Service and Event";
    //   this.image = "assets/img/slide1.svg";
    //   this.label = 'NEXT';
    // }
    if (localStorage.getItem('Authorization')) {
      this.router.navigate(['main/chabad']);
    }

  }
  Skip() {
    if (localStorage.getItem('Authorization') == null)
    this.router.navigate(['auth-manager/login']);
    else{
      this.router.navigate(['main']);
    }
  }
  goNext() {
    this.slides.slideNext();
  }

}
