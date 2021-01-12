import { Component, OnInit } from '@angular/core';

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

  activeTab = 'ceremony';
  today;
  dateList = []
  activeDateItem;
  hiddenDateList = true;

  constructor() {
    this.today = new Date();
    for (let i = 0; i < 7; i++)  {
      let nextDay = new Date(this.today);
      nextDay.setDate(nextDay.getDate() + i);

      const randomNum: number = Math.floor(Math.random() * 5);
      let meetings = [];
      let meetingColorIndex = 0;

      for (let j = 0; j < randomNum; j++) {
        meetings.push({
          name: 'Meeting Synagogue',
          timeStart: '8am',
          timeEnd: '10am',
          reason: 'The Temple in Jerusalem was any of a series of structures which were located on the Temple Mount in the Old City of Jerusalem, the current site of the Dome of the Rock and Al-Aqsa Mosque. These successive temples stood at this location and functioned as a site of ancient Israelite and later Jewish worship.',
          color: this.MEETING_COLOR[meetingColorIndex],
          joined: false,
        });
        (meetingColorIndex++ >= this.MEETING_COLOR.length - 1) && (meetingColorIndex = 0);
      }

      this.dateList.push({
        id: i,
        day: this.DAY[nextDay.getDay()].substring(0, 3),
        date: nextDay.getDate(),
        meetings: meetings
      })
    }
    this.activeDateItem = this.dateList[0].id;
  }

  ngOnInit() {
  }

  changeTab(name) {
    this.activeTab = name;
  }

  changeDateItem(dateItem) {
    this.activeDateItem = dateItem.id;
    this.hiddenDateList = false;
  }

  joinedAllMeetings(dateItem) {
    return dateItem.meetings.every(meeting => meeting.joined == true);
  }

  toggleJoiningAllMeeting(dateItem) {
    if (this.joinedAllMeetings(dateItem)) {
      dateItem.meetings.forEach(meeting => meeting.joined = false);
    } else {
      dateItem.meetings.forEach(meeting => meeting.joined = true);
    }
  }

  toggleJoiningMeeting(meeting) {
    meeting.joined = !meeting.joined;
  }

  getTodayString() {
    return `${this.DAY[this.today.getDay()]}, ${this.today.getDate()} ${this.MONTH[this.today.getMonth()]} ${this.today.getFullYear()}`;
  }
}
