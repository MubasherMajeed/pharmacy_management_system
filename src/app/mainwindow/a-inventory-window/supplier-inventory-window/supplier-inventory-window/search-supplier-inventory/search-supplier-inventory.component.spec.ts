import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupplierInventoryComponent } from './search-supplier-inventory.component';

describe('SearchSupplierInventoryComponent', () => {
  let component: SearchSupplierInventoryComponent;
  let fixture: ComponentFixture<SearchSupplierInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSupplierInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSupplierInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
