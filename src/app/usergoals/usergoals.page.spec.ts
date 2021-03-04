import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsergoalsPage } from './usergoals.page';

describe('UsergoalsPage', () => {
  let component: UsergoalsPage;
  let fixture: ComponentFixture<UsergoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergoalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsergoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
