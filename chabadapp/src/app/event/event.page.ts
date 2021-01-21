import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IPageEvent, ChabadService, EventsService } from '../@app-core/http';
import { DateTimeService, LoadingService } from '../@app-core/utils';
import { EventDetailComponent } from '../@modular/event-detail/event-detail.component';

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
    private route: ActivatedRoute,
    private chabadService: ChabadService,
    private loadingService: LoadingService,
    public sanitizer: DomSanitizer,
    private eventService: EventsService,
    public dateTimeService: DateTimeService,
    public modalController: ModalController
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
      this.pageRequestEvent.cal_date = this.dateTimeService.getDateString2(nextDay);

      this.eventService.getAll(this.pageRequestEvent).subscribe(data => {
        let eventColorIndex = 0;
        data.events.forEach(d => {
          this.dateList[i].events.push(d);
          this.dateList[i].events[this.dateList[i].events.length - 1].color = this.EVENT_COLOR[eventColorIndex];
          this.dateList[i].events[this.dateList[i].events.length - 1].isLoading = false;
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
    dateItem.events.forEach(event => event.isLoading = true);
    if (this.joinedAll(dateItem)) {
      dateItem.events.forEach(event => {
        event.joined && this.eventService.cancelEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
    } else {
      dateItem.events.forEach(event => {
        if (event.joined) {
          event.isLoading = false;
        } else this.eventService.joinEvent(event).subscribe(() => {
          event.joined = !event.joined;
          event.isLoading = false;
        });
      });
    }
  }

  toggleJoiningEvent(eventItem) {
    event.stopPropagation();
    eventItem.isLoading = true;
    this.toggleJoinedApi(eventItem);
  }

  toggleJoinedApi(event) {
    if (event.joined) {
      this.eventService.cancelEvent(event).subscribe(() => {
        event.joined = !event.joined;
        event.isLoading = false;
      });
    } else {
      this.eventService.joinEvent(event).subscribe(() => {
        event.joined = !event.joined;
        event.isLoading = false;
      });
    }
  }

  isSomeLoading(dateItem) {
    return dateItem.events.some(event => event.isLoading == true);
  }

  doRefresh(event) {
    this.getData(false, () => {
      event.target.complete();
    })
  }

  getChabadImageString() {
    return `url(${this.chabad.thumb_image})`;
  }

  async openEventDetailModal(event) {
    const modal = await this.modalController.create({
      component: EventDetailComponent,
      cssClass: 'event-detail-modal',
      componentProps: {
        data: {
          event: {
            id: event.id,
            joined: event.joined
          },
          chabad: {
            id: this.chabad.id
          }
        }
      }
    });
    await modal.present();
  }
}
