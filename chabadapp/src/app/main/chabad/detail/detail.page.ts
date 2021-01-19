import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChabadService, EventsService, IPageEvent } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  chabad = {
    id: '',
    name: '',
    address: '',
    thumb_image: ''
  };
  loadedChabad = false;

  DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  SERVICE_COLOR = [
    '#D7ADC2',
    '#E7D0AE',
    '#BAD4E3'
  ];

  // activeTab = 'ceremony';
  currentDay;
  dateList = [];
  activeDateItem;
  hiddenDateList = true;
  pageRequestEvent: IPageEvent = {
    page: 1,
    per_page: 10,
    cal_date: '',
    chabad_id: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chabadService: ChabadService,
    private loadingService: LoadingService,
    public sanitizer: DomSanitizer,
    private eventService: EventsService
  ) {
    this.currentDay = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(this.currentDay);
      nextDay.setDate(nextDay.getDate() + i);

      this.dateList.push({
        id: i,
        day: nextDay,
        services: [],
        events: [],
        hiddenEvents: true
      })
    }
    this.activeDateItem = this.dateList[0].id;
  }

  ngOnInit() {
    this.loadingService.present();
    this.getData(true);
  }

  getDataChabad(id, isDismissLoading?: boolean, func?) {
    this.chabadService.getDetail(id).subscribe(data => {
      this.chabad = data;
      func && func();
      this.loadedChabad = true;
      isDismissLoading && this.loadingService.dismiss();
    })
  }

  getDataEvents() {
    for (let i = 0; i < 7; i++) {
      // reset
      this.dateList[i].services = [];
      this.dateList[i].events = [];
      
      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      this.pageRequestEvent.cal_date = this.getDayString2(nextDay);

      this.eventService.getAll(this.pageRequestEvent).subscribe(data => {
        let serviceColorIndex = 0;
        data.forEach(d => {
          if (d.event_type == 'both') {
            this.dateList[i].events.push(d);
            this.dateList[i].events[this.dateList[i].events.length - 1].color ='#F5F5F5';
          } else {
            this.dateList[i].services.push(d); 
            this.dateList[i].services[this.dateList[i].services.length - 1].color = this.SERVICE_COLOR[serviceColorIndex];
            (serviceColorIndex++ >= this.SERVICE_COLOR.length - 1) && (serviceColorIndex = 0);
          }
        });
      })
    }
  }

  getData(isDismissLoading?: boolean, func?) {
    this.route.queryParams.subscribe(params => {
      this.pageRequestEvent.chabad_id = JSON.parse(params['data']).id;
      this.getDataChabad(JSON.parse(params['data']).id, isDismissLoading, func);
      this.getDataEvents();
    })
  }

  ionViewWillEnter() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });

    const tabs1 = document.querySelectorAll('ion-header');
    Object.keys(tabs1).map((key) => {
      tabs1[key].style.display = 'none';
    });
  }

  // changeTab(name) {
  //   this.activeTab = name;
  // }

  changeDateItem(dateItem) {
    this.activeDateItem = dateItem.id;
    this.hiddenDateList = false;
    this.currentDay = dateItem.day;
  }

  joinedAll(dateItem) {
    return dateItem.services.every(service => service.joined == true) && dateItem.events.every(event => event.joined == true);
  }

  toggleJoiningAll(dateItem) {
    if (this.joinedAll(dateItem)) {
      dateItem.services.forEach(service => service.joined = false);
      dateItem.events.forEach(event => event.joined = false);
    } else {
      dateItem.services.forEach(service => service.joined = true);
      dateItem.events.forEach(event => event.joined = true);
    }
  }

  toggleJoiningService(service) {
    event.stopPropagation();
    service.joined = !service.joined;
  }

  toggleJoiningEvent(eventItem) {
    event.stopPropagation();
    eventItem.joined = !eventItem.joined;
  }

  toggleHiddenEvents(dateItem) {
    dateItem.hiddenEvents = !dateItem.hiddenEvents;
  }

  getDayString(day) {
    return `${this.DAY[day.getDay()]}, ${day.getDate()} ${this.MONTH[day.getMonth()]} ${day.getFullYear()}`;
  }

  getDayString2(day) {
    return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
  }

  goToEventDetail(event) {
    const data = {
      id: event.id,
      joined: event.joined
    }
    this.router.navigate(['/main/event/detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToPray() {
    const data = {
      id: this.chabad.id
    }
    this.router.navigate(['/pray'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToDonate() {
    const data = {
      id: this.chabad.id
    }
    this.router.navigate(['/donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  doRefresh(event) {
    this.getData(false, () => {
      event.target.complete();
    })
  }

  getChabadImageString() {
    return `url(${this.chabad.thumb_image})`;
  }
}
