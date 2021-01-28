import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFoodComponent } from 'src/app/@modular/modal-food/modal-food.component';
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
  note = '';
  constructor(private router: Router, private modalCtrl: ModalController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(JSON.parse(params['data']).note )
      this.note = JSON.parse(params['data']).note;
    })
    this.getDataBasket();
  }
  confirm() {
    localStorage.removeItem('dataBasket');
    this.openModalSuccess();
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
  async openModalSuccess() {
    const popover = await this.modalCtrl.create({
      component: ModalFoodComponent,
      cssClass: 'modalFood',
    });
    return await popover.present();
  }
}
