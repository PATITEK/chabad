import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {
  data = [];
  constructor(private router: Router) { }

  ngOnInit() {
    for(let i = 0; i<10; i++) {
      this.data.push({
        name: 'Food name' + i,
        amount: 1 + i,
        price: '$' + (60 + i),
      })
    }
  }
  order() {
    this.router.navigate(['food/food-confirm']);
  }
}
