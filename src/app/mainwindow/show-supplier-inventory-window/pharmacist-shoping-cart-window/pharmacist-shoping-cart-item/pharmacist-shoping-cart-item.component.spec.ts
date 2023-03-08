import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistShopingCartItemComponent } from './pharmacist-shoping-cart-item.component';

describe('PharmacistShopingCartItemComponent', () => {
  let component: PharmacistShopingCartItemComponent;
  let fixture: ComponentFixture<PharmacistShopingCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistShopingCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistShopingCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
