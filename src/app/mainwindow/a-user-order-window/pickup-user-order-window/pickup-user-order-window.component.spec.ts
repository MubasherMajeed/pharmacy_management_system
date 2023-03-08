import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupUserOrderWindowComponent } from './pickup-user-order-window.component';

describe('PickupUserOrderWindowComponent', () => {
  let component: PickupUserOrderWindowComponent;
  let fixture: ComponentFixture<PickupUserOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupUserOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupUserOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
