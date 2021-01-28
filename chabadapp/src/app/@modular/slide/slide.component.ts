import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideService } from 'src/app/@modular/slide/slide.service';
import { IDataNoti } from '../page-noti/page-noti.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  constructor(  
    private slideService: SlideService,
    private router: Router ) {
    
   }
   public title;
   public image;
   public routerLink = ''
   clicked = 0;

  ngOnInit() {
    if(this.clicked == 0) {
      this.title = "Service and Event";
      this.image = "assets/img/slide1.svg";
    }
  }
  Skip() {
    this.router.navigate(['auth-manager/login']);
  }
  gottoSlide1() {
    this.clicked = 0;
    const datasending: IDataNoti = {
      image: 'assets/img/slide1.svg',
       title: 'Service and Event',
       routerLink: '/slide'
     }
     this.slideService.setdataSlide(datasending);
     this.router.navigate(['/slide']);
 
     this.slideService.datafrom.subscribe((data: IDataNoti) => {
       this.title = data.title;
       this.image = data.image;
       this.routerLink = data.routerLink;
     })
  }
  gottoSlide2() {
    this.clicked = 1;
    const datasending: IDataNoti = {
      image: 'assets/img/slide2.svg',
       title: 'Shopping food',
       routerLink: '/slide'
     }
     this.slideService.setdataSlide(datasending);
     this.router.navigate(['/slide']);
 
     this.slideService.datafrom.subscribe((data: IDataNoti) => {
       this.title = data.title;
       this.image = data.image;
       this.routerLink = data.routerLink;
     })
     
  }
  gottoSlide3() {
    this.clicked = 2;
    const datasending: IDataNoti = {
      image: 'assets/img/slide3.svg',
       title: 'Find your Chabad',
       routerLink: '/slide'
     }
     this.slideService.setdataSlide(datasending);
     this.router.navigate(['/slide']);
 
     this.slideService.datafrom.subscribe((data: IDataNoti) => {
       this.title = data.title;
       this.image = data.image;
       this.routerLink = data.routerLink;
     })
  }
  goNext() {
    if(this.clicked == 0) {
      const datasending: IDataNoti = {
        image: 'assets/img/slide2.svg',
         title: 'Shopping food',
         routerLink: '/slide'
       }
       this.slideService.setdataSlide(datasending);
       this.router.navigate(['/slide']);
   
       this.slideService.datafrom.subscribe((data: IDataNoti) => {
         this.title = data.title;
         this.image = data.image;
         this.routerLink = data.routerLink;
       })
       this.clicked = 1;
    }
    else if(this.clicked == 1) {
      const datasending: IDataNoti = {
        image: 'assets/img/slide3.svg',
         title: 'Find your Chabad',
         routerLink: '/slide'
       }
       this.slideService.setdataSlide(datasending);
       this.router.navigate(['/slide']);
   
       this.slideService.datafrom.subscribe((data: IDataNoti) => {
         this.title = data.title;
         this.image = data.image;
         this.routerLink = data.routerLink;
       })
       this.clicked = 2;
    }
    else {
      this.router.navigate(['auth-manager/login']);
    }
  }

}
