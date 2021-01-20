import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  public DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public MONTH = [
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

  constructor() { }

  // Thursday, 03 January 2021
  public getDayString(day) {
    return `${this.DAY[day.getDay()]}, ${day.getDate()} ${this.MONTH[day.getMonth()]} ${day.getFullYear()}`;
  }

  // 2021-01-01
  public getDayString2(day) {
    return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
  }
}
