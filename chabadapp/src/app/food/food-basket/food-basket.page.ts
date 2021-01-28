import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-basket',
  templateUrl: './food-basket.page.html',
  styleUrls: ['./food-basket.page.scss'],
})
export class FoodBasketPage implements OnInit {
  dataBasket = [];
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  note = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.getDataBasket();
  }
  // ionViewWillEnter() {
  //   localStorage.setItem('note', this.note);
  // }
  ionViewWillEnter() {
    // localStorage.setItem('note', JSON.stringify(this.note));
  }
  order() {
    const data = {
      note: this.note
    }
    this.router.navigate(['food/food-checkout'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  addItem() {
    this.router.navigate(['food']);
  }
  plusItem(item) {
    if(item.amount < 99) {
      item.amount++;
    }
    this.setDataBasket();
  }
  minusItem(item) {
    if(item.amount > 1) {
      item.amount--;
    }
    this.setDataBasket();
  }
  removeItem(food) {
    for(let i = 0; i< this.dataBasket.length; i++) {
      if(food.id === this.dataBasket[i].id) {
        this.dataBasket.splice(i,1);
        break;
      }
    }
    this.setDataBasket();
  }

  setDataBasket() {
    localStorage.setItem('dataBasket', JSON.stringify(this.dataBasket));
  }
  getDataBasket() {
    this.dataBasket = JSON.parse(localStorage.getItem('dataBasket')) || [];
  }

  calTotalPrice() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount*cur.price , 0)
  }
  calTotalAmount() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount, 0);
  }
  // getNote(event) {
  //   this.note = event.target.value;
  // }
}
