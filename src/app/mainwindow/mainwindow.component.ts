import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.css']
})
export class MainwindowComponent implements OnInit {
  PharamacistRole = false;
  ApharmacistRole = false;
  CashierRole = false;
  SupplierRole = false;
  defaultUser = false;
  role: string;

  userIsAuthenticated =false;
  private authListenerSubs: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated =>{
        this.userIsAuthenticated= isAuthenticated;
      });

    this.role = this.authService.getUserRole();
    console.log(this.role);
    if(this.role === "pharmacist"){
      this.PharamacistRole = true;
    }
    else if(this.role === "cashier"){
      this.CashierRole = true;
    }
    else if(this.role === "assistantPharmacist" ){
      this.ApharmacistRole = true;
    }else if(this.role === "supplier" ){
      this.SupplierRole = true;
    }

  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
