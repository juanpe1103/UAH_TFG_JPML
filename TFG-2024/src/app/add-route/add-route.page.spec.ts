import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRoutePage } from './add-route.page';

describe('AddCommandPage', () => {
  let component: AddRoutePage;
  let fixture: ComponentFixture<AddRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
