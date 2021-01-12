import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-synagogue',
  templateUrl: './synagogue.page.html',
  styleUrls: ['./synagogue.page.scss'],
})
export class SynagoguePage implements OnInit {
  navBar = [
    {
      name: 'synagogue',
      text: 'Synagogue',
      iconUrl: 'assets/icon/location.svg',
    },
    {
      name: 'near-you',
      text: 'Near you',
      iconUrl: 'assets/icon/person.svg'
    },
    {
      name: 'shopping',
      text: 'Shopping',
      iconUrl: 'assets/icon/shop.svg'
    },
    {
      name: 'news',
      text: 'News',
      iconUrl: 'assets/icon/newspapers.svg'
    },
  ];

  temples = [
    {
      imgUrl: 'assets/img/temple.jpg',
      distance: '2,4',
      name: 'Chabad of Ho Chi Minh City',
      address: '5a (villa) Nguyen Dinh Chieu, Phuong Dakao, District 1 Thành phố Hồ Chí Minh'
    },
    {
      imgUrl: 'assets/img/temple.jpg',
      distance: '2,4',
      name: 'Chabad of Ho Chi Minh City',
      address: '5a (villa) Nguyen Dinh Chieu, Phuong Dakao, District 1 Thành phố Hồ Chí Minh'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNavBarItem(navBarItem) {
    this.router.navigateByUrl(`main/${navBarItem.name}`);
  }
}
