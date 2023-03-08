import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupUserOrderItemComponent } from './pickup-user-order-item.component';

describe('PickupUserOrderItemComponent', () => {
  let component: PickupUserOrderItemComponent;
  let fixture: ComponentFixture<PickupUserOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupUserOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupUserOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
