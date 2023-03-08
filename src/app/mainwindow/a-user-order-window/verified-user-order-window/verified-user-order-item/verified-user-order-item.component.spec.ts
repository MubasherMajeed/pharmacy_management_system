import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedUserOrderItemComponent } from './verified-user-order-item.component';

describe('VerifiedUserOrderItemComponent', () => {
  let component: VerifiedUserOrderItemComponent;
  let fixture: ComponentFixture<VerifiedUserOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedUserOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedUserOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
