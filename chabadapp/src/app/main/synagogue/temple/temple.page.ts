import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.page.html',
  styleUrls: ['./temple.page.scss'],
})
export class TemplePage implements OnInit {
  temple = {
    id: 1,
    imgUrl: 'assets/img/temple.jpg',
    distance: '2,4',
    name: 'Chabad of Ho Chi Minh City',
    address: '5a (villa) Nguyen Dinh Chieu, Phuong Dakao, District 1 Thành phố Hồ Chí Minh',
    introduction: 'The Temple in Jerusalem was any of a series of structures which were located on the Temple Mount in the Old City of Jerusalem, the current site of the Dome of the Rock and Al-Aqsa Mosque. These successive temples stood at this location and functioned as a site of ancient Israelite and later Jewish worship. The Temple in Jerusalem was any of a series of structures which were located on the Temple Mount in the Old City of Jerusalem, the current site of the Dome of the Rock and Al-Aqsa Mosque. These successive temples stood at this location and functioned as a site of ancient Israelite and later Jewish worship.'
  }

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
  MEETING_COLOR = [
    '#D7ADC2',
    '#E7D0AE',
    '#BAD4E3'
  ];

  // activeTab = 'ceremony';
  today;
  dateList = [];
  activeDateItem;
  hiddenDateList = true;

  constructor(
    private router: Router
  ) {
    this.today = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(this.today);
      nextDay.setDate(nextDay.getDate() + i);

      const randomNumMeetings: number = Math.floor(Math.random() * 5);
      let meetings = [];
      let meetingColorIndex = 0;

      for (let j = 0; j < randomNumMeetings; j++) {
        meetings.push({
          id: j,
          name: `Service ${j + 1}`,
          timeStart: '8am',
          timeEnd: '10am',
          reason: 'The Temple in Jerusalem was any of a series of structures which were located on the Temple Mount in the Old City of Jerusalem, the current site of the Dome of the Rock and Al-Aqsa Mosque. These successive temples stood at this location and functioned as a site of ancient Israelite and later Jewish worship.',
          color: this.MEETING_COLOR[meetingColorIndex],
          joined: false,
        });
        (meetingColorIndex++ >= this.MEETING_COLOR.length - 1) && (meetingColorIndex = 0);
      }

      const randomNumEvents: number = Math.floor(Math.random() * 5);
      let events = [];
      let eventColorIndex = 0;

      for (let j = 0; j < randomNumEvents; j++) {
        events.push({
          id: j,
          name: `Event ${j + 1}`,
          timeStart: '8am',
          timeEnd: '10am',
          reason: 'The Temple in Jerusalem was any of a series of structures which were located on the Temple Mount in the Old City of Jerusalem, the current site of the Dome of the Rock and Al-Aqsa Mosque. These successive temples stood at this location and functioned as a site of ancient Israelite and later Jewish worship.',
          color: '#F5F5F5',
          joined: false,
        });
        (eventColorIndex++ >= this.MEETING_COLOR.length - 1) && (eventColorIndex = 0);
      }

      this.dateList.push({
        id: i,
        day: this.DAY[nextDay.getDay()].substring(0, 3),
        date: nextDay.getDate(),
        meetings: meetings,
        events: events,
        hiddenEvents: true
      })
    }
    this.activeDateItem = this.dateList[0].id;
  }

  ngOnInit() {
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
  }

  joinedAll(dateItem) {
    return dateItem.meetings.every(meeting => meeting.joined == true) && dateItem.events.every(event => event.joined == true);
  }

  toggleJoiningAll(dateItem) {
    if (this.joinedAll(dateItem)) {
      dateItem.meetings.forEach(meeting => meeting.joined = false);
      dateItem.events.forEach(meeting => meeting.joined = false);
    } else {
      dateItem.meetings.forEach(meeting => meeting.joined = true);
      dateItem.events.forEach(meeting => meeting.joined = true);
    }
  }

  toggleJoiningMeeting(meeting) {
    event.stopPropagation();
    meeting.joined = !meeting.joined;
  }

  toggleJoiningEvent(eventItem) {
    event.stopPropagation();
    eventItem.joined = !eventItem.joined;
  }

  toggleHiddenEvents(dateItem) {
    dateItem.hiddenEvents = !dateItem.hiddenEvents;
  }

  getTodayString() {
    return `${this.DAY[this.today.getDay()]}, ${this.today.getDate()} ${this.MONTH[this.today.getMonth()]} ${this.today.getFullYear()}`;
  }

  goToServiceDetail(meeting) {
    const data = {
      id: meeting.id,
      joined: meeting.joined
    }
    this.router.navigate(['/main/synagogue/meeting'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToEventDetail(event) {
    const data = {
      id: event.id,
      joined: event.joined
    }
    this.router.navigate(['/main/event/event-detail'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToDonate() {
    const data = {
      id: this.temple.id
    }
    this.router.navigate(['/donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
}
