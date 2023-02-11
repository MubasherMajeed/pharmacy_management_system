import { Component, OnInit } from '@angular/core';
import {Inventory} from "../../a-inventory-window/inventory.model";
import {Subscription} from "rxjs";
import {AuthDoctorData} from "../../../auth/doctorAuth/doctorAuth-model";
import {InventoryInteractionService} from "../../a-inventory-window/inventory-interaction.service";
import {AuthDoctorUserService} from "../../../auth/doctorAuth/authDoctorUser.service";
import {DoctorOderServices} from "../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service";
import {NgForm} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home-page-item',
  templateUrl: './home-page-item.component.html',
  styleUrls: ['./home-page-item.component.css']
})
export class HomePageItemComponent implements OnInit {
  email2: string;
  searchTerm: string;
  inventorys: Inventory[] = [];
  itemArray: Array<any> =[];
  isLoading= false;
  currentPage= 1;
  totalItems= 10;
  total : number;
  itemsPerPage = 8;
  pageSizeOptions =[8,12,16,20,24];
  private inventorySubs: Subscription;
  itemNumber: number;
  dataArray: Array<any> =[];
  details: AuthDoctorData;
  doc: string;
  currentUser: AuthDoctorData;
  currentUserSubscription: Subscription;
  users: AuthDoctorData[] = [];
  doctors: Array<any> = [];
  TrimedDoctors: Array<any> = [];
  docArrLength: number;
  oderDetail: Array<any> = [];
  drugNames: Array<any> = [];
  drugId: Array<any> = [];
  drugPrices: Array<any> = [];
  drugQuantities: Array<any> = [];
  realQuantities: Array<any> = [];

  name: string;

  constructor(private inventoryInteractionService: InventoryInteractionService) {
    //   this.currentUserSubscription = this.authDoctorUserService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });

    console.log( this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage))
    console.log("Mubasher");
    console.log(this.inventorys)



    console.log(this.TrimedDoctors);

  }

  onChangedPage(pageData: PageEvent){
    this.currentPage= pageData.pageIndex + 1;
    this.itemsPerPage=  pageData.pageSize;
    this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }








}
