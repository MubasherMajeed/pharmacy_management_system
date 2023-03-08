import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DoctorOderServices} from "../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service";
import {
  EmailInteractionService
} from "../../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service";
import {
  PharmacistOderServices
} from "../../../show-supplier-inventory-window/pharmacist-shoping-cart-window/PharmacistOderServices.service";

@Component({
  selector: 'app-pickup-user-order-item',
  templateUrl: './pickup-user-order-item.component.html',
  styleUrls: ['./pickup-user-order-item.component.css']
})
export class PickupUserOrderItemComponent implements OnInit {

  docPickedUpOders: any[] = [];
  isLoading= false;

  docPickedUpOderSubs: Subscription;



  constructor(private doctoderService: PharmacistOderServices, private emailInteractionService: EmailInteractionService){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getEmailedPickedUpDocOders();
    this.docPickedUpOderSubs = this.doctoderService.getPickedUpDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docPickedUpOders = posts;
      });
  }


}
