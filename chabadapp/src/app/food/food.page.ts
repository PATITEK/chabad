import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FoodService, IPageFood } from '../@app-core/http';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  pageFoodRequest: IPageFood = {
    page: 1,
    per_page: 5,
    chabad_id: ''
  }
  dataBasket: any = [];
  currentItem: any = {
    id: 0,
    amount: 0,
  }
  listFood = [];
  anmCart = false;
  fakeImg = 'assets/img/food.svg';
  constructor(
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {
    // for (let i = 0; i < 10; i++) {
    //   this.listFood.push(
    //     {
    //     url: 'assets/img/food.svg',
    //     name: 'Food name ' + i,
    //     desc: "Describing food is not as easy as it would seem. How many ways can you say something was really tasty? Describing food is not as easy as it would seem. How many ways can you say something was really tasty?Describing food is not as easy as it would seem. How many ways can you say something was really tasty?Describing food is not as easy as it would seem. How many ways can you say something was really tasty?",
    //     price: 30 + i,
    //     id: i,
    //     }
    //   )
    // }
  }
  ngOnInit() {
    this.getData();
    
  }
  ionViewWillEnter() {
    this.getDataBasket();
    this.anmCart = false;
  }
  addItem(item) {
    this.anmCart = true;
    this.currentItem = item;
    this.currentItem.amount = 1;
  }
  plusItem() {
    if (this.currentItem.amount < 99) {
      this.currentItem.amount++;
    }
  }
  minusItem() {
    if (this.currentItem.amount > 1)
      this.currentItem.amount--;
  }

  clickButtonAdd() {
    this.anmCart = false;
    let duplicate = false;
    for (let i = 0; i < this.dataBasket.length; i++) {
      if (this.dataBasket[i].id == this.currentItem.id) {
        this.dataBasket[i].amount += this.currentItem.amount;
        duplicate = true;
        break;
      }
    }
    if (duplicate == false) {
      this.dataBasket.push({ id: this.currentItem.id, amount: this.currentItem.amount, name: this.currentItem.name, price: this.currentItem.price });
    }
    this.setDataBasket();
  }
  goToFoodDetail() {
    this.router.navigate(['food/food-basket']);
  }
  setDataBasket() {
    localStorage.setItem('dataBasket', JSON.stringify(this.dataBasket));
  }
  getDataBasket() {
    this.dataBasket = JSON.parse(localStorage.getItem('dataBasket')) || [];

  }
  calTotalAmount() {
    return this.dataBasket.reduce((acc, cur) => acc + cur.amount, 0);
  }
  getData() {
    this.route.queryParams.subscribe(params => {
      this.pageFoodRequest.chabad_id = JSON.parse(params['data']).id;
      this.foodService.getAll(this.pageFoodRequest).subscribe(data => {
        this.listFood = data.foods;
      })
    }).unsubscribe();
  }
}
