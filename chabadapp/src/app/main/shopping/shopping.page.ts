import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

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
