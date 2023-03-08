import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {SupplierInventory} from "../../supplier-inventory.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SupplierInventoryInteractionService} from "../../supplier-inventory-interaction.service";

@Component({
  selector: 'app-drug-supplier-inventory-items',
  templateUrl: './drug-supplier-inventory-items.component.html',
  styleUrls: ['./drug-supplier-inventory-items.component.css']
})
export class DrugSupplierInventoryItemsComponent implements OnInit {
  searchTerm : string;
  inventorys : SupplierInventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private supplierInventoryInteractionService: SupplierInventoryInteractionService,
              private snackBar :MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;
    this.supplierInventoryInteractionService.getSupplierInventory(null,null);
    this.inventorySubs = this.supplierInventoryInteractionService.getSupplierInventoryUpdateListener()
      .subscribe((posts: SupplierInventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });



  }


  onDelete(supplierId: string) {
    this.supplierInventoryInteractionService.deleteSupplierInventory(supplierId);
    this.snackBar.open("Drug Deleted Successfully", "Close");
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

}
