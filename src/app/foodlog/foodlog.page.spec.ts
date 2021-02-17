import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodlogPage } from './foodlog.page';

describe('FoodlogPage', () => {
  let component: FoodlogPage;
  let fixture: ComponentFixture<FoodlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
