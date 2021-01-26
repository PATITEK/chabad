import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-food-checkout',
  templateUrl: './food-checkout.page.html',
  styleUrls: ['./food-checkout.page.scss'],
})
export class FoodCheckoutPage implements OnInit {
  dataBasket = [];
  currentItem: any = {
    id : 0,
    amount : 0,
  }
  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    
    this.getDataBasket();
  }
  confirm() {
    this.router.navigate(['food']);
    this.presentToast('Success');
    localStorage.removeItem('dataBasket');
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      color: 'success',
      duration: 2000
    });
    toast.present();
  }
}
