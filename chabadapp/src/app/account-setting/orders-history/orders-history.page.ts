import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.page.html',
  styleUrls: ['./orders-history.page.scss'],
})
export class OrdersHistoryPage implements OnInit {
  data: any;
  constructor(private orderService: OrderService,
    private loadingService: LoadingService,) { 
      this.init();
    }

  ngOnInit() {
    this.loadingService.present();
    this.getDataOrders();
  }

  init() {
    this.data = {
      orders: {
        pageRequest: {
          page: 1,
          per_page: 5
        },
        array: [],
        loadedData: false
      },
    };
  }

  getDataOrders(func?) {
    let orders = this.data.orders;
    this.orderService.getAll(orders.pageRequest).subscribe(data => {
      orders.array = orders.array.concat(data.orders);
      this.loadingService.dismiss();

      func && func();
      orders.pageRequest.page++;

      if (orders.array.length >= data.meta.pagination.total_objects) {
        orders.loadedData = true;
      }
    })
  }

  loadMoreDataOrders(event) {
    this.getDataOrders(() => {
      event.target.complete();
    })
  }

  doRefresh(event) {
    this.init();

    let count = 0;
    this.getDataOrders(() => {
      count++;
      count == 2 && event.target.complete();
    })
  }

}
