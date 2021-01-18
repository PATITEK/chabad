import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  activeCheck = false;
  
  constructor() { }

  ngOnInit() { }

  clickJoin(value) {
    if (value === "yes") {
      this.activeCheck = true;
    }
    else {
      this.activeCheck = false;
    }
  }
}
