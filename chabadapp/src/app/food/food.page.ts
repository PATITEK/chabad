import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { find } from 'rxjs/operators';
import { ShoppingPage } from '../main/shopping/shopping.page';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  totalAmount = 0;
  shop = [];
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  listFood = [];
  anmCart = false;
  // amount:number=0 ;
  constructor(public modalController: ModalController, private router: Router) {
    for (let i = 0; i < 10; i++) {
      this.listFood.push(
        {
        url: 'assets/img/food.svg',
        name: 'Food name ' + i,
        desc: "Describing food is not as easy as it would seem. How many ways can you say something was really tasty? Describing food is not as easy as it would seem. How many ways can you say something was really tasty?Describing food is not as easy as it would seem. How many ways can you say something was really tasty?Describing food is not as easy as it would seem. How many ways can you say something was really tasty?",
        price: 30 + i,
        id: i,
        }
      )
    }

  }

  ngOnInit() {
  }
  addItem(item){
    this.anmCart = true;
    this.currentItem = item;
    this.currentItem.amount = 1;
  }
  plusItem() {
    if(this.currentItem.amount < 99) {
      this.currentItem.amount++;
    }
  }
  minusItem(){
    if(this.currentItem.amount > 1)
    this.currentItem.amount--;
  }

  clickButtonAdd(){
    this.anmCart = false;
    let duplicate = false;
    for(let i = 0; i < this.shop.length; i++) {
      if(this.shop[i].id == this.currentItem.id) {
        this.shop[i].amount += this.currentItem.amount;
        duplicate = true;
        break;
      }
    }
    if(duplicate == false) {
      this.shop.push({ id: this.currentItem.id, amount: this.currentItem.amount });
    }
    console.log(this.shop);

    this.totalAmount = 0
    for(let i = 0; i< this.shop.length; i++) {
      this.totalAmount += this.shop[i].amount;
    }

  }
  goToFoodDetail() {
    this.router.navigate(['food/food-basket']);
  }
}
