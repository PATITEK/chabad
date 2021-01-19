import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { IPageEvent, ChabadService, EventsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  chabad = {
    id: '',
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
  EVENT_COLOR = [
    '#D7ADC2',
    '#E7D0AE',
    '#BAD4E3'
  ];

  // activeTab = 'ceremony';
  currentDay;
  dateList = [];
  activeDateItem;
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
        events: []
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
      this.chabad = data.chabad;
      func && func();
      this.loadedChabad = true;
      isDismissLoading && this.loadingService.dismiss();
    })
  }

  getDataEvents() {
    for (let i = 0; i < 7; i++) {
      // reset
      this.dateList[i].events = [];

      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + i);
      this.pageRequestEvent.cal_date = this.getDayString2(nextDay);

      this.eventService.getAll(this.pageRequestEvent).subscribe(data => {
        let eventColorIndex = 0;
        data.events.forEach(d => {
          this.dateList[i].events.push(d);
          this.dateList[i].events[this.dateList[i].events.length - 1].color = this.EVENT_COLOR[eventColorIndex];
          (eventColorIndex++ >= this.EVENT_COLOR.length - 1) && (eventColorIndex = 0);
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

  changeDateItem(dateItem) {
    this.activeDateItem = dateItem.id;
    this.currentDay = dateItem.day;
  }

  joinedAll(dateItem) {
    return dateItem.events.every(event => event.joined == true);
  }

  toggleJoiningAll(dateItem) {
    if (this.joinedAll(dateItem)) {
      dateItem.events.forEach(event => event.joined = false);
    } else {
      dateItem.events.forEach(event => event.joined = true);
    }
  }

  toggleJoiningEvent(eventItem) {
    event.stopPropagation();
    eventItem.joined = !eventItem.joined;
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
    this.router.navigate(['event/detail'], {
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
