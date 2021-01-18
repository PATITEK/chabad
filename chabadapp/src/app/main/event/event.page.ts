import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService, IPageRequest } from 'src/app/@app-core/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public pageReuest: IPageRequest = {
    page: 1,
    per_page: 10,
    total_objects: 0,
  }
  temples = [
    {
      id: 1,
      imgUrl: 'assets/img/temple.jpg',
      distance: '2,4',
      name: 'Chabad of Ho Chi Minh City',
      address: '5a (villa) Nguyen Dinh Chieu, Phuong Dakao, District 1 Thành phố Hồ Chí Minh',
    },
    {
      id: 2,
      imgUrl: 'assets/img/temple.jpg',
      distance: '2,4',
      name: 'Chabad of Ho Chi Minh City',
      address: '5a (villa) Nguyen Dinh Chieu, Phuong Dakao, District 1 Thành phố Hồ Chí Minh',
    }
  ]
  constructor(
    private router: Router,
    private eventService:EventsService
    
    ) { }

  ngOnInit() {
    this.getItems();
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

  goToNavBarItem(navBarItem) {
    this.router.navigateByUrl(`main/${navBarItem.name}`);
  }

  goToTemple(temple) {
    const data = {
      id: temple.id
    }
    this.router.navigate(['/main/synagogue/temple'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  getItems(){
    this.eventService.getEventes(this.pageReuest).subscribe(data => {
      console.log(data);
      
    })
  }
  goToOrderDetail(item) {
    const data = {
      id: item.id
    }
    this.router.navigate(['main/event/detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
