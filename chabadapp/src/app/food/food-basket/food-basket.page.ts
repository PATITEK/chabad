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
  isDel = false;
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
  removeItem(food) {
    for(let i = 0; i< this.data.length; i++) {
      if(food.id === this.data[i].id) {
        this.data.splice(i,1);
        break;
      }
    }
    this.isDel = true;
  }
}
