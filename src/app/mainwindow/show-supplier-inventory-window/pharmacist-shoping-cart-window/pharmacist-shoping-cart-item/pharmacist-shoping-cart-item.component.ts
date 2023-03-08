import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthDoctorData} from "../../../../auth/doctorAuth/doctorAuth-model";
import {AuthDoctorUserService} from "../../../../auth/doctorAuth/authDoctorUser.service";
import {DoctorOderServices} from "../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service";
import {NgForm} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {
  SupplierInventoryInteractionService
} from "../../../a-inventory-window/supplier-inventory-window/supplier-inventory-window/supplier-inventory-interaction.service";
import {AuthService} from "../../../../auth/auth.service";
import {AuthData} from "../../../../auth/auth-data.model";
import {
  SupplierInventory
} from "../../../a-inventory-window/supplier-inventory-window/supplier-inventory-window/supplier-inventory.model";
import {PharmacistOderServices} from "../PharmacistOderServices.service";
import {Inventory} from "../../../a-inventory-window/inventory.model";
import {InventoryInteractionService} from "../../../a-inventory-window/inventory-interaction.service";

@Component({
  selector: 'app-pharmacist-shoping-cart-item',
  templateUrl: './pharmacist-shoping-cart-item.component.html',
  styleUrls: ['./pharmacist-shoping-cart-item.component.css']
})
export class PharmacistShopingCartItemComponent implements OnInit {

  email2: string;
  searchTerm: string;
  inventorys: SupplierInventory[] = [];
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

  supplierEmail: string;
  name: string;
  userIsAuthenticated =false;
  private authListenerSubs: Subscription;

  constructor(private inventoryInteractionService: SupplierInventoryInteractionService,
              private authDoctorUserService:AuthService,
              private doctorOderService:PharmacistOderServices) {
    //   this.currentUserSubscription = this.authDoctorUserService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getSupplierInventory(this.itemsPerPage,this.currentPage);
    this.inventorySubs = this.inventoryInteractionService.getSupplierInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });

    this.userIsAuthenticated = this.authDoctorUserService.getIsAuth();
    this.authListenerSubs = this.authDoctorUserService.getAuthStatusListener()
      .subscribe(isAuthenticated =>{
        this.userIsAuthenticated= isAuthenticated;
      });



    this.authDoctorUserService.getUser();

    // console.log("User data here ");
    // console.log( this.authDoctorUserService.getCurrentUsers());
    this.doctors = this.authDoctorUserService.getCurrentUsers();
    this.docArrLength = this.doctors.length;
    this.TrimedDoctors = this.doctors[this.docArrLength-1];
    console.log(this.TrimedDoctors["users"][0]);

  }

  onChangedPage(pageData: PageEvent){
    this.currentPage= pageData.pageIndex + 1;
    this.itemsPerPage=  pageData.pageSize;
    this.inventoryInteractionService.getSupplierInventory(this.itemsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

  onAddToCart(itemId:string, name:string , expireDate:string ,price:string, form:NgForm ,imagePath:string ,
              realQuanntity:string,
              supplierEmail:string
              ){
    this.itemArray.push([itemId,name,expireDate,price,form.value.quantityNumber,imagePath]);
    this.drugNames.push(name);
    this.drugPrices.push(price);
    this.drugId.push(itemId);
    this.supplierEmail=supplierEmail;
    this.realQuantities.push(realQuanntity);
    this.drugQuantities.push(form.value.quantityNumber);
    // this.dataArray.push([name,form.value.quantityNumber]);
    console.log(this.itemArray);
    this.itemNumber = this.itemArray.length;

    let length = this.itemArray.length;
    let x ;
    let z ;
    let sum;
    this.total = 0;

    for (let count = 0 ; count < length; count++) {
      x = this.itemArray[count][3];

      z = this.itemArray[count][4];
      sum = +x * +z ;

      this.total = this.total + sum;

    }
    //  console.log(this.dataArray);
    return this.total;
  }


  onCheckout(checkoutForm:NgForm){
    this.oderDetail.push(this.TrimedDoctors,this.itemArray,this.total,checkoutForm.value.pickupDateInput);
    console.log(this.oderDetail);
    console.log(this.inventorys);
    console.log(this.supplierEmail);

    let drugId = this.drugId;
    let doctorName = this.TrimedDoctors["users"][0]["name"];
    let doctorContact = this.TrimedDoctors["users"][0]["contact"];
    let doctorEmail = this.TrimedDoctors["users"][0]["email"];
    let sEmail = this.supplierEmail;
    let drugName = this.drugNames;
    let drugPrice = this.drugPrices;
    let drugQuantity = this.drugQuantities;
    let realQuantity = this.realQuantities;
    let totalAmount = this.total;
    let pickupDate = checkoutForm.value.pickupDateInput;
    console.log(drugName);
    this.doctorOderService.
    createDoctorUser(doctorName,
      doctorContact,
      doctorEmail,drugId,
      drugName,drugPrice,
      drugQuantity,
      realQuantity,
      totalAmount,
      pickupDate,
      sEmail
      )


  }


  onLogout(){
    this.authDoctorUserService.logout();
  }

  onViewUserEmail(email:string){
    this.email2 = email;
    this.name = name;
    console.log(this.email2, this.name);
    //this.authDoctorUserService.getCurrentDoctor();
    //setInterval(() => this.authDoctorUserService.getDoctors("lalanachamika123@gmail.com"), 5000);
    //this.authDoctorUserService.getDoctors("lalanachamika123@gmail.com");
  }


//    private loadAllUsers() {
//     this.authDoctorUserService.getAll().pipe(first()).subscribe(users => {
//         this.users = users;
//     });
// }


}
