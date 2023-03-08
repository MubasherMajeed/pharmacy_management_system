import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierInventoryWindowComponent } from './add-supplier-inventory-window.component';

describe('AddSupplierInventoryWindowComponent', () => {
  let component: AddSupplierInventoryWindowComponent;
  let fixture: ComponentFixture<AddSupplierInventoryWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierInventoryWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierInventoryWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
