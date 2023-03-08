import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierInventoryElementComponent } from './add-supplier-inventory-element.component';

describe('AddSupplierInventoryElementComponent', () => {
  let component: AddSupplierInventoryElementComponent;
  let fixture: ComponentFixture<AddSupplierInventoryElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierInventoryElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierInventoryElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
