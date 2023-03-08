import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistShopingCartWindowComponent } from './pharmacist-shoping-cart-window.component';

describe('PharmacistShopingCartWindowComponent', () => {
  let component: PharmacistShopingCartWindowComponent;
  let fixture: ComponentFixture<PharmacistShopingCartWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistShopingCartWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistShopingCartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
