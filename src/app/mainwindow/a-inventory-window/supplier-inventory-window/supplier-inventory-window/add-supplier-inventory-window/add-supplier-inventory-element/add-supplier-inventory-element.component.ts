import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {mimeType} from "../../../../add-inventory-window/add-inventory-elements/mime-type.validator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SupplierInventoryInteractionService} from "../../supplier-inventory-interaction.service";
import {SupplierInventory} from "../../supplier-inventory.model";
import {AuthService} from "../../../../../../auth/auth.service";

@Component({
  selector: 'app-add-supplier-inventory-element',
  templateUrl: './add-supplier-inventory-element.component.html',
  styleUrls: ['./add-supplier-inventory-element.component.css']
})
export class AddSupplierInventoryElementComponent implements OnInit {
  enteredEmail = "";
  enteredName = "";
  enteredQuantity = "";
  enteredBatchId = "";
  enteredExpireDate = "";
  enteredPrice = "";

  inventory : SupplierInventory ;
  isLoading = false;
  form: FormGroup;
  imagePreview : string;
  private mode = "create";
  private inventoryId : string;


  constructor(private supplierInventoryInteractionService: SupplierInventoryInteractionService,
              public route: ActivatedRoute ,
              private currentUser: AuthService,
              private snackBar: MatSnackBar){}

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'quantity': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'batchId': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'expireDate': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'price': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'image': new FormControl(null,{validators: [Validators.required],asyncValidators:[mimeType]})

    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('inventoryId')){
        this.mode = "edit";
        this.inventoryId = paramMap.get('inventoryId');
        this.isLoading = true;
        this.supplierInventoryInteractionService.getSupplierInventorys(this.inventoryId).subscribe(supplierinventoryData =>{
          this.isLoading = false;
          this.inventory = {id:supplierinventoryData._id,
            email: supplierinventoryData.email,
            name: supplierinventoryData.name,
            quantity : supplierinventoryData.quantity,
            batchId: supplierinventoryData.batchId,
            expireDate: supplierinventoryData.expireDate,
            price: supplierinventoryData.price,
            imagePath: supplierinventoryData.imagePath
          };
          this.form.setValue({
            'name':this.inventory.name ,
            'quantity':this.inventory.quantity ,
            'batchId':this.inventory.batchId ,
            'expireDate':this.inventory.expireDate,
            'price':this.inventory.price,
            'image':this.inventory.imagePath});
        });
      }else{
        this.mode = "create";
        this.inventoryId = null;
      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddInventory() {
    if (this.form.invalid) {
      return;
    }

    if(this.mode === "create"){
      console.log(this.currentUser.getUserEmail());
      console.log(this.currentUser.getAuthData().email);
      this.supplierInventoryInteractionService.addSupplierInventory(
        this.currentUser.getAuthData().email,
        this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate,
        this.form.value.price,
        this.form.value.image

      );

      this.snackBar.open("Drug Added Successfully", "Close");
    }else{
      this.supplierInventoryInteractionService.updateSupplierInventory(
        this.inventoryId,
        this.form.value.email,
        this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate,
        this.form.value.price,
        this.form.value.image);

      this.snackBar.open("Drug Edited Successfully", "Close");
    }

    this.form.reset();
  }

}
