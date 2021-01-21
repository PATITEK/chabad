import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodConfirmPage } from './food-confirm.page';

describe('FoodConfirmPage', () => {
  let component: FoodConfirmPage;
  let fixture: ComponentFixture<FoodConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
