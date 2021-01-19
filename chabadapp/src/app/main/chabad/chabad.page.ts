import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IPageRequest, ChabadService } from 'src/app/@app-core/http';

@Component({
  selector: 'app-chabad',
  templateUrl: './chabad.page.html',
  styleUrls: ['./chabad.page.scss'],
})
export class ChabadPage implements OnInit {
  // navBar = [
  //   {
  //     name: 'synagogue',
  //     text: 'Synagogue',
  //     iconUrl: 'assets/icon/location.svg'
  //   },
  //   {
  //     name: 'near-you',
  //     text: 'Near you',
  //     iconUrl: 'assets/icon/person.svg'
  //   },
  //   {
  //     name: 'shopping',
  //     text: 'Shopping',
  //     iconUrl: 'assets/icon/shop.svg'
  //   },
  //   {
  //     name: 'news',
  //     text: 'News',
  //     iconUrl: 'assets/icon/newspapers.svg'
  //   },
  // ];

  chabads = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 10
  }

  constructor(
    private router: Router,
    private chabadService: ChabadService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getData();
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

  getData(func?) {
    this.chabadService.getAll(this.pageRequest).subscribe(data => {
      this.chabads = data;
      func && func();
    })
  }

  // goToNavBarItem(navBarItem) {
  //   this.router.navigateByUrl(`main/${navBarItem.name}`);
  // }

  goToChabadDetail(chabad) {
    const data = {
      id: chabad.id
    }
    this.router.navigate(['/main/chabad/detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToMap() {
    event.stopPropagation();
  }

  doRefresh(event) {
    this.getData(() => {
      event.target.complete();
    });
  }

  getChabadImageString(chabad) {
    return `url(${chabad.thumb_image})`;
  }
}
