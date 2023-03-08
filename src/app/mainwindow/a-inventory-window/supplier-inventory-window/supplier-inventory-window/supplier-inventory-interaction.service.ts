import { Injectable } from '@angular/core';
import { SupplierInventory } from './supplier-inventory.model';


import { Subject } from 'rxjs';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const supplierInventorySchema = '../../../../backend/models/supplierinventory.js';

@Injectable({
  providedIn: 'root'
})

export class SupplierInventoryInteractionService {

  private inventory: SupplierInventory[] = [];
  private inventoryUpdated = new Subject<SupplierInventory[]>();

  private inventoryi: SupplierInventory[] = [];
  private inventoryUpdatedi = new Subject<SupplierInventory[]>();

  private inventor = [];
  private inventoryUpdate = new Subject<any[]>();

  private inventorex = [];
  private inventoryUpdateex = new Subject<any[]>();

  private inventorot = [];
  private inventoryUpdateot = new Subject<any[]>();

  private inventoraex = [];
  private inventoryUpdateaex = new Subject<any[]>();

  private inventoraot = [];
  private inventoryUpdateaot = new Subject<any[]>();



  constructor(private http: HttpClient, private router : Router){}

  getSupplierInventory(itemsPerPage: number , currentPage:number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, supplierInventorys: any}>('http://localhost:4000/api/supplierinventory' + queryParams)
      .pipe(map(inventoryData => {
          console.log(inventoryData);
        return inventoryData.supplierInventorys.map(inventory=>{
          return{
            email: inventory.email,
            name: inventory.name,
            quantity:inventory.quantity,
            batchId:inventory.batchId,
            expireDate: inventory.expireDate,
            price: inventory.price,
            id: inventory._id,
            imagePath:  inventory.imagePath
          }
        })
      }))
      .subscribe((transformedInventory)=>{
        this.inventory = transformedInventory;
        this.inventoryUpdated.next([...this.inventory])
      });

  }


  getOutofStockSupplierInventory() {

    this.http.get<{message: string, inventorys: any}>('http://localhost:4000/api/supplierinventory/outofstock' )
      .pipe(map(inventoryData => {
        return inventoryData.inventorys.map(inventory=>{
          return{
            email: inventory.email,
            name: inventory.name,
            quantity:inventory.quantity,
            batchId:inventory.batchId,
            expireDate: new Date(inventory.expireDate),
            price: inventory.price,
            id: inventory._id,
            imagePath:  inventory.imagePath
          }
        })
      }))
      .subscribe((transformedInventory)=>{
        this.inventorot = transformedInventory;
        this.inventoryUpdateot.next([...this.inventorot])
      });
  }


  getAboutToOutofStockSupplierInventory() {

    this.http.get<{message: string, inventorys: any}>('http://localhost:4000/api/supplierinventory/abouttooutofstock' )
      .pipe(map(inventoryData => {
        return inventoryData.inventorys.map(inventory=>{
          return{
            email: inventory.email,
            name: inventory.name,
            quantity:inventory.quantity,
            batchId:inventory.batchId,
            expireDate: new Date(inventory.expireDate),
            price: inventory.price,
            id: inventory._id,
            imagePath:  inventory.imagePath
          }
        })
      }))
      .subscribe((transformedInventory)=>{
        this.inventoraot = transformedInventory;
        this.inventoryUpdateaot.next([...this.inventoraot])
      });
  }


  getExpiredSupplierInventory(){
    this.http.get<{message: string, inventorys: any}>('http://localhost:4000/api/supplierinventory/getExpired')
      .pipe(map(inventoryData => {
        return inventoryData.inventorys.map(inventory=>{
          return{
            email: inventory.email,
            name: inventory.name,
            quantity:inventory.quantity,
            batchId:inventory.batchId,
            expireDate:new Date(inventory.expireDate),
            price: inventory.price,
            id: inventory._id,
            imagePath:  inventory.imagePath
          }
        })
      }))
      .subscribe((transformedInventory)=>{
        this.inventorex = transformedInventory;
        this.inventoryUpdateex.next([...this.inventorex])
      });
  }

  getAboutToExpireSupplierInventory(){
    let currentDate = new Date();

    this.http.get<{message: string, inventorys: any}>('http://localhost:4000/api/supplierinventory/getAboutToExpire')
      .pipe(map(inventoryData => {
        return inventoryData.inventorys.map(inventory=>{
          return{
            email: inventory.email,
            name: inventory.name,
            quantity:inventory.quantity,
            batchId:inventory.batchId,
            expireDate:new Date(inventory.expireDate),
            price: inventory.price,
            id: inventory._id,
            imagePath:  inventory.imagePath

          }
        })
      }))
      .subscribe((transformedInventory)=>{
        this.inventoraex = transformedInventory;
        this.inventoryUpdateaex.next([...this.inventoraex])
      });
  }



  // getItemsOfId(id: string){
  //   this.http.get<{message: string, inventorys: any}>('http://localhost:4000/api/inventory/' + id)
  //   .pipe(map(inventoryData => {
  //     return inventoryData.inventorys.map(inventory=>{
  //       return{
  //        name: inventory.name,
  //        quantity:inventory.quantity,
  //        batchId:inventory.batchId,
  //        expireDate: inventory.expireDate,
  //        id: inventory._id,
  //        imagePath:  inventory.imagePath
  //       }
  //     })
  //    }))
  //     .subscribe(() =>{
  //       const inventoryUpdated = this.inventory.filter(inventory => inventory.id !== id);
  //       this.inventory = inventoryUpdated;
  //       this.inventoryUpdated.next([...this.inventory])
  //     });
  //   }

  getSupplierInventoryExUpdateListener() {
    return this.inventoryUpdateex.asObservable();
  }

  getSupplierInventoryOutUpdateListener() {
    return this.inventoryUpdateot.asObservable();
  }

  getSupplierInventoryAExUpdateListener() {
    return this.inventoryUpdateaex.asObservable();
  }

  getSupplierInventoryAOutUpdateListener() {
    return this.inventoryUpdateaot.asObservable();
  }


  getSupplierInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }

  getSupplierInventorys(id: string){
    return this.http.get<{_id: string, email: string  , name: string, quantity: string, batchId: string, expireDate: string, price:string ,imagePath:string}>
    ('http://localhost:4000/api/supplierinventory/' + id);
  }

  addSupplierInventory( email: string, name: string, quantity: string, batchId: string, expireDate: string, price: string , image: File) {
    const inventoryData = new FormData();
    inventoryData.append("email", email);
    inventoryData.append("name", name);
    inventoryData.append("quantity", quantity);
    inventoryData.append("batchId", batchId);
    inventoryData.append("expireDate", expireDate);
    inventoryData.append("price", price);
    inventoryData.append("image", image, name);

    this.http.post<{message: string, inventory: SupplierInventory}>('http://localhost:4000/api/supplierinventory',inventoryData)
      .subscribe((responseData)=>{
        const inventory: SupplierInventory ={id: responseData.inventory.id,
          email:email ,
          name:name ,
          quantity: quantity,
          batchId: batchId ,
          expireDate: expireDate ,
          price: price,
          imagePath : responseData.inventory.imagePath};

        this.inventory.push(inventory);
        this.inventoryUpdated.next([...this.inventory]);
        this.router.navigate(["/supplierinventory/create"]);
      });

  }

  updateSupplierInventory(id: string , email: string ,name: string, quantity: string, batchId: string, expireDate: string, price: string ,image: File | string){

    let inventoryData: SupplierInventory | FormData;

    if (typeof(image)==='object'){
      inventoryData = new FormData();
      inventoryData.append("id", id);
      inventoryData.append("email",email);
      inventoryData.append("name",name);
      inventoryData.append("quantity",quantity);
      inventoryData.append("batchId",batchId);
      inventoryData.append("expireDate",expireDate);
      inventoryData.append("price",price);
      inventoryData.append("image", image, name);

    } else{
      inventoryData  ={id : id ,
        email : email ,
        name : name ,
        quantity : quantity ,
        batchId : batchId ,
        expireDate : expireDate ,
        price: price,
        imagePath: image};
    }
    this.http
      .put('http://localhost:4000/api/supplierinventory/' + id , inventoryData)
      .subscribe(response => {
        const updatedInventorys = [...this.inventory];
        const oldInventoryIndex = updatedInventorys.findIndex(i => i.id === id);

        const inventory : SupplierInventory ={id : id ,
          email : email ,
          name : name ,
          quantity : quantity ,
          batchId : batchId ,
          expireDate : expireDate ,
          price: price,
          imagePath: " "};
        updatedInventorys[oldInventoryIndex] = inventory;
        this.inventoryUpdated.next([...this.inventory]);
        this.router.navigate(["/supplierinventory/create"]);
      });
  }


  updateQuantity(id: string ,quantity: number){
    const inventory   ={id:id ,quantity:quantity };
    this.http
      .put('http://localhost:4000/api/supplierinventory/updateQuantity/' + id , inventory)
      .subscribe(response => {
        const updatedInventory = [...this.inventor];
        const oldInventoryIndex = updatedInventory.findIndex(s => s.id ===inventory.id);
        updatedInventory[oldInventoryIndex] = inventory;
        this.inventoryUpdate.next([...this.inventor]);
        //this.router.navigate(["/suppliers/create"]);
      });
  }

  deleteSupplierInventory(inventoryId: string) {
    this.http.delete('http://localhost:4000/api/supplierinventory/' + inventoryId)
      .subscribe(() =>{
        const inventoryUpdated = this.inventory.filter(inventory => inventory.id !== inventoryId);
        this.inventory = inventoryUpdated;
        this.inventoryUpdated.next([...this.inventory])
      });
  }
}
