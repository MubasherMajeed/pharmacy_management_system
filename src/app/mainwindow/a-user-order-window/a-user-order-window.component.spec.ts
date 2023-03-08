import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AUserOrderWindowComponent } from './a-user-order-window.component';

describe('AUserOrderWindowComponent', () => {
  let component: AUserOrderWindowComponent;
  let fixture: ComponentFixture<AUserOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AUserOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AUserOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
