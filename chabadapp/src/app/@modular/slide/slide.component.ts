import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideService } from 'src/app/@modular/slide/slide.service';
import { IDataSlide } from '../page-noti/page-noti.service';

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
   public routerLink = '';
   public label = '';
   clicked = 0;

  ngOnInit() {
    if(this.clicked == 0) {
      this.title = "Service and Event";
      this.image = "assets/img/slide1.svg";
      this.label = 'NEXT';
    }
   
   
  }
  Skip() {
    this.router.navigate(['auth-manager/login']);
  }
  gotoSlide1() {
    console.log('1')
    const slide1 = document.getElementById('slide1')
    const slide2 = document.getElementById('slide2')
    const slide3 = document.getElementById('slide3')
      // slide1.classList.add('swiper-slide');
      
      if(slide1.classList.contains('swiper-slide--none')) {
          slide1.classList.remove('swiper-slide--none');
      }
      else {
        //slide2.classList.add('swiper-slide--none');
        // slide3.classList.add('swiper-slide--none');
      }
      var testClass = slide1.className;
      console.log(testClass);
      // if(testClass.match('swiper-slide')){
      //   slide2.classList.toggle('swiper-slide--none');
      //   slide3.classList.toggle('swiper-slide--none');
      // }
      // else {

      // }
     
  

    // slide1.classList.remove('swiper-slide--none');
   
    this.clicked = 0;
    // const datasending: IDataSlide = {
    //   image: 'assets/img/slide1.svg',
    //    title: 'Service and Event',
    //    label: 'NEXT',
    //    routerLink: '/slide'
    //  }
    //  this.slideService.setdataSlide(datasending);
    //  this.router.navigate(['/slide']);
 
    //  this.slideService.datafrom.subscribe((data: IDataSlide) => {
    //    this.title = data.title;
    //    this.image = data.image;
    //    this.label = data.label;
    //    this.routerLink = data.routerLink;
    //  })
  }
  gotoSlide2() {
    console.log('2');

    const slide1 = document.getElementById('slide1')
    const slide2 = document.getElementById('slide2')
    const slide3 = document.getElementById('slide3')

    if(slide2.classList.contains('swiper-slide--none')) {
      slide2.classList.remove('swiper-slide--none');
    }
    else {
   // slide1.classList.add('swiper-slide--none');
    //slide3.classList.add('swiper-slide--none');
    }
    var testClass = slide2.className;
    console.log(testClass);
    this.clicked = 1;
    // const datasending: IDataSlide = {
    //   image: 'assets/img/slide2.svg',
    //    title: 'Shopping food',
    //    label: 'NEXT',
    //    routerLink: '/slide'
    //  }
    //  this.slideService.setdataSlide(datasending);
    //  this.router.navigate(['/slide']);
 
    //  this.slideService.datafrom.subscribe((data: IDataSlide) => {
    //    this.title = data.title;
    //    this.image = data.image;
    //    this.label = data.label;
    //    this.routerLink = data.routerLink;
    //  })
     
  }
  gotoSlide3() {
    console.log('3');
    const slide1 = document.getElementById('slide1')
    const slide2 = document.getElementById('slide2')
    const slide3 = document.getElementById('slide3')

    if(slide3.classList.contains('swiper-slide--none')) {
      slide3.classList.remove('swiper-slide--none');
    }
    else {
      //slide1.classList.add('swiper-slide--none');
     // slide2.classList.add('swiper-slide--none');
    }
    var testClass = slide3.className;
    console.log(testClass);
    this.clicked = 2;
    // const datasending: IDataSlide = {
    //   image: 'assets/img/slide3.svg',
    //    title: 'Find your Chabad',
    //    label: 'START',
    //    routerLink: '/slide'
    //  }
    //  this.slideService.setdataSlide(datasending);
    //  this.router.navigate(['/slide']);
 
    //  this.slideService.datafrom.subscribe((data: IDataSlide) => {
    //    this.title = data.title;
    //    this.image = data.image;
    //    this.label = data.label;
    //    this.routerLink = data.routerLink;
    //  })
  }
  goNext() {
    if(this.clicked == 0) {
      const datasending: IDataSlide = {
        image: 'assets/img/slide2.svg',
         title: 'Shopping food',
         label: 'NEXT',
         routerLink: '/slide'
       }
       this.slideService.setdataSlide(datasending);
       this.router.navigate(['/slide']);
   
       this.slideService.datafrom.subscribe((data: IDataSlide) => {
         this.title = data.title;
         this.image = data.image;
         this.label = data.label;
         this.routerLink = data.routerLink;
       })
       this.clicked = 1;
    }
    else if(this.clicked == 1) {
      const datasending: IDataSlide = {
        image: 'assets/img/slide3.svg',
         title: 'Find your Chabad',
         label: 'START',
         routerLink: '/slide'

       }
       this.slideService.setdataSlide(datasending);
       this.router.navigate(['/slide']);
   
       this.slideService.datafrom.subscribe((data: IDataSlide) => {
         this.title = data.title;
         this.image = data.image;
         this.label = data.label;
         this.routerLink = data.routerLink;
       })
       this.clicked = 2;
    }
    else {
      this.router.navigate(['auth-manager/login']);
    }
  }

}
