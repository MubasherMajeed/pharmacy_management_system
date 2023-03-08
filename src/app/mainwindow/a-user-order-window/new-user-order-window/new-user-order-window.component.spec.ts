import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserOrderWindowComponent } from './new-user-order-window.component';

describe('NewUserOrderWindowComponent', () => {
  let component: NewUserOrderWindowComponent;
  let fixture: ComponentFixture<NewUserOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
