import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventDetailComponent } from '../@modular/event-detail/event-detail.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  currentSegmentValue = 'service';
  data = {
    services: [
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
    ],
    events: [
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
      {
        name: 'name name name name name name name name name ',
        start_time: '10:100000003333333',
        end_time: '10:100000003333333',
        description: 'abcd'
      },
    ]
  }

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  changedSegment(value) {
    this.currentSegmentValue = value;
  }

  async openEventDetailModal(event) {
    const modal = await this.modalController.create({
      component: EventDetailComponent,
      cssClass: 'event-detail-modal',
      swipeToClose: true,
      componentProps: {
        data: {
          event: {
            id: 1
          }
        }
      }
    });
    await modal.present();
  }
}
