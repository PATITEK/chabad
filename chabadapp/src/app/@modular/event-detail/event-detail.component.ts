import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { EventsService } from 'src/app/@app-core/http';
import { DateTimeService, LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  @Input() data;

  event = {
    id: '',
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    cal_time: ''
  }
  btnJoin;
  disabledBtn = false;
  loadedData = false;

  constructor(
    private router: Router,
    private eventService: EventsService,
    private dateTimeService: DateTimeService,
    public modalController: ModalController,
    private loadingService: LoadingService,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.getData(this.data.event.id);
    this.btnJoin = document.querySelectorAll('.btn-join-with-us');
    this.data.event.joined && this.disableButtons();
  }

  disableButtons() {
    this.disabledBtn = true;
    for (let i = 0; i < this.btnJoin.length; i++) {
      this.btnJoin[i].classList.remove('active-effect');
      this.btnJoin[i].classList.add('disabled-btn');
    }
  }

  getData(id) {
    this.eventService.getDetail(id).subscribe(data => {
      this.event = data.event;
      this.loadedData = true;
      this.loadingService.dismiss();
    })
  }

  goToDonate() {
    this.modalController.dismiss(null, 'cancel');
    const data = {
      id: this.data.chabad.id
    }
    this.router.navigate(['/donate'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  getDayString() {
    if (this.event.cal_time == '') {
      return ' ';
    }
    return this.dateTimeService.DAYS[new Date(this.event.cal_time).getDay()].toUpperCase();
  }

  chooseJoinSelection(selection) {
    if (this.disabledBtn) return;
    this.disableButtons();
    if (selection) {
      const result = {
        attention_log: {
          event_id: this.event.id
        }
      }
      this.eventService.joinEvent(result).subscribe();
    }
  }
}
