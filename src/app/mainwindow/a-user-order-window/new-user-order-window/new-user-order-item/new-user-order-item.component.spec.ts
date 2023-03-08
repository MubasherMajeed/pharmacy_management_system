import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserOrderItemComponent } from './new-user-order-item.component';

describe('NewUserOrderItemComponent', () => {
  let component: NewUserOrderItemComponent;
  let fixture: ComponentFixture<NewUserOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
