import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit {
  activeCheck = false;
  constructor() { }

  ngOnInit() { }
  clickJoin(value) {
    if (value === "yes") {
      this.activeCheck = true;
    }
    else{
      this.activeCheck=false;
    }
  }
}

