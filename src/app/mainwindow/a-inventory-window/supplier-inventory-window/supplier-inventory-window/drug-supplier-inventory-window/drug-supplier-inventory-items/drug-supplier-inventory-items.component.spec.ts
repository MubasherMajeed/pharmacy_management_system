import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSupplierInventoryItemsComponent } from './drug-supplier-inventory-items.component';

describe('DrugSupplierInventoryItemsComponent', () => {
  let component: DrugSupplierInventoryItemsComponent;
  let fixture: ComponentFixture<DrugSupplierInventoryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugSupplierInventoryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSupplierInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
