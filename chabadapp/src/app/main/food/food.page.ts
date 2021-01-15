import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  listFood = [
  ]
<<<<<<< HEAD
  amount:number=0 ;
=======

>>>>>>> 7e2c12916d64b30e5a4e0da32ae72bdecbdfcd15
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.listFood.push({
        url: 'assets/img/food.svg',
        name: 'Food name',
        desc: "Describing food is not as easy as it would seem. How many ways can you say something was really tasty? Describing food is not as easy as it would seem. How many ways can you say something was really tasty?Describing food is not as easy as it would seem. How many ways can you say something was really tasty?Describing food is not as easy as it would seem. How many ways can you say something was really tasty?",
        price:30
      })
    }

  }

  ngOnInit() {
  }
<<<<<<< HEAD
  clickAdd(){
    this.amount++;
    
    
  }
  clickRemove(){
    if(this.amount>0)
    this.amount--;
    
    
  }
  clickButtonAdd(){
    document.querySelector<HTMLElement>('.detal-cart').style.display="none";
    document.querySelector<HTMLElement>('.cart-group').style. transform="translateY(0)";
    document.querySelector<HTMLElement>('.btn-add').style.display="none";
    document.querySelector<HTMLElement>('.amount-cart').style.display="flex";
  }
=======

>>>>>>> 7e2c12916d64b30e5a4e0da32ae72bdecbdfcd15
}
