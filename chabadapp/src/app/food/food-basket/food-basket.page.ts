import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-basket',
  templateUrl: './food-basket.page.html',
  styleUrls: ['./food-basket.page.scss'],
})
export class FoodBasketPage implements OnInit {
  data = [];
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  constructor(private router: Router) { }

  ngOnInit() {
    for(let i = 0; i<10; i++) {
      this.data.push({
        name: 'Food name' + i,
        amount: 1 + i,
        price: '$' + (60 + i),
        id: i
      })
    }
  }
  order() {
    this.router.navigate(['food/food-checkout']);
  }
  addItem() {
    this.router.navigate(['food']);
  }
  plusItem(item) {
    this.currentItem = item;
    if(this.currentItem.amount < 99) {
      this.currentItem.amount++;
    }
  }
  minusItem(item) {
    this.currentItem = item;
    if(this.currentItem.amount > 1) {
      this.currentItem.amount--;
    }
  }
  // removeItem(item) {
  //   this.currentItem = item;
  //   this.data.splice(this.currentItem.id, 1);
  //   console.log(this.currentItem.id)
  // }
}
