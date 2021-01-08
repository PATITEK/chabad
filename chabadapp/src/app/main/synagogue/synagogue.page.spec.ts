import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SynagoguePage } from './synagogue.page';

describe('SynagoguePage', () => {
  let component: SynagoguePage;
  let fixture: ComponentFixture<SynagoguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynagoguePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SynagoguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
