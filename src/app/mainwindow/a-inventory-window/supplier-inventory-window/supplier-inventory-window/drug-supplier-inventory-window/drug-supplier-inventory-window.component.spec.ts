import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSupplierInventoryWindowComponent } from './drug-supplier-inventory-window.component';

describe('DrugSupplierInventoryWindowComponent', () => {
  let component: DrugSupplierInventoryWindowComponent;
  let fixture: ComponentFixture<DrugSupplierInventoryWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugSupplierInventoryWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSupplierInventoryWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
