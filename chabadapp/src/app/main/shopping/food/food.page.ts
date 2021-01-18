import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  listFood = [
  ]
  amount:number=0 ;
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
}
