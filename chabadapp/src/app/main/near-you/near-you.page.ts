import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-near-you',
  templateUrl: './near-you.page.html',
  styleUrls: ['./near-you.page.scss'],
})
export class NearYouPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });

    const tabs1 = document.querySelectorAll('ion-header');
    Object.keys(tabs1).map((key) => {
      tabs1[key].style.display = 'block';
    });
  }
}
