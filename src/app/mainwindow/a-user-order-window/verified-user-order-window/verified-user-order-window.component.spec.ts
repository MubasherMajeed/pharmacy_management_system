import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedUserOrderWindowComponent } from './verified-user-order-window.component';

describe('VerifiedUserOrderWindowComponent', () => {
  let component: VerifiedUserOrderWindowComponent;
  let fixture: ComponentFixture<VerifiedUserOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedUserOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedUserOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
