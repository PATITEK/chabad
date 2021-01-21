import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ChabadService, IPageRequest } from 'src/app/@app-core/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  chabads = [];
  pageRequest: IPageRequest = {
    page: 1,
    per_page: 3
  }

  constructor(
    private router: Router,
    private chabadService: ChabadService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(func?) {
    this.chabadService.getAll(this.pageRequest).subscribe(data => {
      this.chabads = this.chabads.concat(data.chabads);
      func && func();
      this.pageRequest.page++;

      if (this.chabads.length >= data.meta.pagination.total_objects) {
        this.infiniteScroll.disabled = true;
      }
    })
  }

  goToEvent(chabad) {
    const data = {
      id: chabad.id
    }
    this.router.navigate(['event'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  goToMap() {
    event.stopPropagation();
  }

  doRefresh(event) {
    // reset
    this.chabads = [];
    this.pageRequest.page = 1;
    this.infiniteScroll.disabled = false;

    this.getData(() => {
      event.target.complete();
    });
  }

  getChabadImageString(chabad) {
    return `url(${chabad.thumb_image})`;
  }

  loadMoreData(event) {
    this.getData(() => {
      event.target.complete();
    });
  }
}
