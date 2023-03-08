import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {InventoryInteractionService} from "../../../a-inventory-window/inventory-interaction.service";
import {DoctorOderServices} from "../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service";
import {
  EmailInteractionService
} from "../../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  PharmacistOderServices
} from "../../../show-supplier-inventory-window/pharmacist-shoping-cart-window/PharmacistOderServices.service";
import {
  SupplierInventoryInteractionService
} from "../../../a-inventory-window/supplier-inventory-window/supplier-inventory-window/supplier-inventory-interaction.service";

@Component({
  selector: 'app-verified-user-order-item',
  templateUrl: './verified-user-order-item.component.html',
  styleUrls: ['./verified-user-order-item.component.css']
})
export class VerifiedUserOrderItemComponent implements OnInit {

  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;



  constructor( private inventoryInteractionService: SupplierInventoryInteractionService,
               private doctoderService: PharmacistOderServices,
               private emailInteractionService: EmailInteractionService,
               private sankBar: MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getEmailVerifiedDocOders();
    this.docOderSubs = this.doctoderService.getVerifiedDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }


  async onPickup(name:string,semail:string,email:string,total:number,pickupDate:string,drugId:any[] = [],drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],realQuantity:any[] = [],doctorContact:string,id:string){

    let length = drugName.length;
    let quantity= 0;
    console.log(length, realQuantity);


    for (let count = 0 ; count < length; count++) {

      quantity= +realQuantity[count] - +drugQuantity[count];
      await this.inventoryInteractionService.updateQuantity(drugId[count],quantity);

      console.log(drugId[count],drugQuantity[count],realQuantity[count],quantity);

    }

    this.doctoderService.createPickedUpDoctorOder(name,semail,email,total,pickupDate,drugId,drugName,drugPrice,drugQuantity,doctorContact);



    let user={
      name : name,
      email : email,
      total : total,
      pickupDate : pickupDate,
      drugName : drugName,
      drugPrice : drugPrice,
      drugQuantity : drugQuantity
    }
    console.log(user);

    this.emailInteractionService.sendEmail("http://localhost:4000/api/verifiedUserOder/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 ${user.name} an email has been successfully and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);

      }
    );



    this.doctoderService.deleteVerifiedItem(id);
    this.sankBar.open("Pickedup Email Sent!!", 'Close');
  }

}
