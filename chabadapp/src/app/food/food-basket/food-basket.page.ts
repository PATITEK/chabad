import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-basket',
  templateUrl: './food-basket.page.html',
  styleUrls: ['./food-basket.page.scss'],
})
export class FoodBasketPage implements OnInit {
  dataBasket = [];
  totalItem = 0;
  totalPrice = 0;

  currentItem: any = {
    id : 0,
    amount : 0,
  }
  isDel = false;
  constructor(private router: Router) { }

  ngOnInit() {
    // for(let i = 0; i<10; i++) {
    //   this.data.push({
    //     name: 'Food name' + i,
    //     amount: 1 + i,
    //     price: '$' + (60 + i),
    //     id: i
    //   })
    // }
    this.dataBasket = JSON.parse(localStorage["dataBasket"]);
    this.totalItem = this.dataBasket.length;
    console.log(this.dataBasket);
  }
  order() {
    this.router.navigate(['food/food-checkout']);
    localStorage["dataBasket"] = JSON.stringify(this.dataBasket);
  }
  addItem() {
    this.router.navigate(['food']);
  }
  plusItem(item) {
    this.currentItem = item;
    if(this.currentItem.amount < 99) {
      this.currentItem.amount++;
    }
    this.totalPrice = 0;
    for(let i = 0; i< this.dataBasket.length; i++) {
      this.totalPrice += this.dataBasket[i].price;
    }
  }
  minusItem(item) {
    this.currentItem = item;
    if(this.currentItem.amount > 1) {
      this.currentItem.amount--;
    }
    this.totalPrice = 0;
    for(let i = 0; i< this.dataBasket.length; i++) {
      this.totalPrice += this.dataBasket[i].price;
    }
  }
  removeItem(food) {
    for(let i = 0; i< this.dataBasket.length; i++) {
      if(food.id === this.dataBasket[i].id) {
        this.dataBasket.splice(i,1);
        break;
      }
    }
    this.isDel = true;
  }

}
