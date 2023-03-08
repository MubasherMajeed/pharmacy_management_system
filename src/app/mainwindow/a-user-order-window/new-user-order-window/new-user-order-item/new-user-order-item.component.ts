import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DoctorOderServices} from "../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service";
import {
  EmailInteractionService
} from "../../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  PharmacistOderServices
} from "../../../show-supplier-inventory-window/pharmacist-shoping-cart-window/PharmacistOderServices.service";

@Component({
  selector: 'app-new-user-order-item',
  templateUrl: './new-user-order-item.component.html',
  styleUrls: ['./new-user-order-item.component.css']
})
export class NewUserOrderItemComponent implements OnInit {


  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;



  constructor(private doctoderService: PharmacistOderServices,
              private emailInteractionService: EmailInteractionService ,
              private sankBar : MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getemailDocOders();
    this.docOderSubs = this.doctoderService.getDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }

  onOderVerify(name:string,email:string,total:number,pickupDate:string,semail:string,drugId:any[] = [],drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],realQuantity:any[] = [],doctorContact:string,id:string){
    console.log("semail is here");
    console.log(semail);
    this.doctoderService.createVerifiedDoctorOder(name,email,total,pickupDate,semail,drugId,drugName,drugPrice,drugQuantity,realQuantity,doctorContact);


    let user={
      name : name,
      email : email,
      total : total,
      pickupDate : pickupDate,
      drugName : drugName,
      drugPrice : drugPrice,
      drugQuantity : drugQuantity,
    }
    console.log(user);

    this.emailInteractionService.sendEmail("http://localhost:4000/api/supplierOder/sendmail", user).subscribe(
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


    this.doctoderService.deleteItem(id);

    this.sankBar.open("Verification Email Sent!!", 'Close');
  }

}


