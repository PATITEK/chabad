import { Component, OnInit } from '@angular/core';
import { DateTimeService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people = [];

  constructor(
    public dateTimeService: DateTimeService
  ) { }

  getData(func?) {
    const rand = Math.floor(Math.random() * (10 - 0) + 0);
    for (let i = 0; i < rand; i++) {
      const person = {
        id: i,
        thumb_image: 'assets/img/avatar-people.svg',
        name: `Person ${i + 1}`
      }
      if (i % 3 == 0) {
        this.people.push([person]);
      } else {
        this.people[this.people.length - 1].push(person);
      }
    }

    func && func();
  }

  ngOnInit() {
    this.getData();
  }

  getDateString() {
    return this.dateTimeService.getDayString(new Date());
  }

  doRefresh(event) {
    // reset
    this.people = [];

    this.getData(() => {
      event.target.complete();
    })
  }
}
