
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PharmacistOderServices{
  private docOders:any[] = [];
  private docOdersUpdated = new Subject<any[]>();
  private VerifiedDocOders:any[] = [];
  private VerifiedDocOdersUpdated = new Subject<any[]>();
  private PickedUpDocOders:any[] = [];
  private PickedUpDocOdersUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router){
  }

  createDoctorUser(doctorName: string , doctorContact: string  ,doctorEmail: string ,drugId: Array<any> = [] ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,
                   drugQuantity: Array<any> = [] ,
                   realQuantity: Array<any> = [] ,totalAmount: number,
                   pickupDate: string,sEmail){
    const PharmacistOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorEmail:doctorEmail ,
                            drugId:drugId,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            realQuantity:realQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate,
                            supplierEmail:sEmail
    };
    this.http.post("http://localhost:4000/api/useroder",PharmacistOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }




  createVerifiedDoctorOder(doctorName: string,
                           doctorEmail: string,totalAmount: number,pickupDate: string,semail:string,
                           drugId: Array<any> = [] ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [],realQuantity: Array<any> = [] ,doctorContact: string){
    const VerifiedDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorEmail:doctorEmail ,
                            drugId:drugId,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            realQuantity:realQuantity,
                            totalAmount:totalAmount,
                            supplierEmail: semail,
                            pickupDate:pickupDate,
          };
    this.http.post("http://localhost:4000/api/verifiedUserOrder",VerifiedDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }



  createPickedUpDoctorOder(doctorName: string,semail:string,doctorEmail: string,totalAmount: number,pickupDate: string, drugId: Array<any> = [], drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,doctorContact: string){
    const PickedUpDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorEmail:doctorEmail ,
      supplierEmail:semail,
                            drugId:drugId ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post("http://localhost:4000/api/pickedUpUserOrders",PickedUpDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }

/*
.filter(function (){
    if (docOderData.doctorOders[].supplierEmail==localStorage.getItem("email"))
      return true;
    return false;
  })*/

//   map(docOderData => {
//   return docOderData.doctorOders.map(
//     doctorOder => {
//   return{
//   doctorName : doctorOder.doctorName ,
//   doctorContact : doctorOder.doctorContact ,
//   doctorEmail : doctorOder.doctorEmail ,
//   drugId : doctorOder.drugId ,
//   drugName : doctorOder.drugNames ,
//   drugPrice : doctorOder.drugPrice,
//   drugQuantity : doctorOder.drugQuantity,
//   realQuantity : doctorOder.realQuantity,
//   totalAmount : doctorOder.totalAmount,
//   pickupDate : doctorOder.pickupDate,
//   supplierEmail : doctorOder.supplierEmail,
//   id: doctorOder._id
// }
// })
// }
// )

  //extra route
  // getDocOders() {
  //   this.http.get<{message: string, doctorOders: any}>("http://localhost:4000/api/useroder")
  //   .pipe(map(docOderData => {
  //       return docOderData.doctorOders.map(
  //         doctorOder => {
  //           return{
  //             doctorName : doctorOder.doctorName ,
  //             doctorContact : doctorOder.doctorContact ,
  //             doctorEmail : doctorOder.doctorEmail ,
  //             drugId : doctorOder.drugId ,
  //             drugName : doctorOder.drugNames ,
  //             drugPrice : doctorOder.drugPrice,
  //             drugQuantity : doctorOder.drugQuantity,
  //             realQuantity : doctorOder.realQuantity,
  //             totalAmount : doctorOder.totalAmount,
  //             pickupDate : doctorOder.pickupDate,
  //             supplierEmail : doctorOder.supplierEmail,
  //             id: doctorOder._id
  //           }
  //         })
  //     }
  //   ))
  //   .subscribe((transformedDocOders)=>{
  //     this.docOders = transformedDocOders;
  //     this.docOdersUpdated.next([...this.docOders])
  //   });
  //
  // }
getemailDocOders() {
    this.http.get<{message: string, doctorOders: any}>
    ("http://localhost:4000/api/useroder/enteredemail/"+localStorage.getItem("email"))
    .pipe(map(docOderData => {
        return docOderData.doctorOders.map(
          doctorOder => {
            return{
              doctorName : doctorOder.doctorName ,
              doctorContact : doctorOder.doctorContact ,
              doctorEmail : doctorOder.doctorEmail ,
              drugId : doctorOder.drugId ,
              drugName : doctorOder.drugNames ,
              drugPrice : doctorOder.drugPrice,
              drugQuantity : doctorOder.drugQuantity,
              realQuantity : doctorOder.realQuantity,
              totalAmount : doctorOder.totalAmount,
              pickupDate : doctorOder.pickupDate,
              supplierEmail : doctorOder.supplierEmail,
              id: doctorOder._id
            }
          })
      }
    ))
    .subscribe((transformedDocOders)=>{
      this.docOders = transformedDocOders;
      this.docOdersUpdated.next([...this.docOders])
    });

  }

  getDocOdersUpdateListener() {
    return this.docOdersUpdated.asObservable();
  }




  getVerifiedDocOders() {
    this.http.get<{message: string, doctorOders: any}>("http://localhost:4000/api/verifiedUserOrder")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(
       doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorEmail : doctorOder.doctorEmail ,
        drugId : doctorOder.drugId ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        realQuantity : doctorOder.realQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        id: doctorOder._id
       }
     })
    }))
    .subscribe((transformedDocOders)=>{
      this.VerifiedDocOders = transformedDocOders;
      this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders])
    });
  }
getEmailVerifiedDocOders() {
    this.http.get<{message: string, doctorOders: any}>
    ("http://localhost:4000/api/verifiedUserOrder/enteredemail/"+localStorage.getItem("email"))
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(
       doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorEmail : doctorOder.doctorEmail ,
        drugId : doctorOder.drugId ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        realQuantity : doctorOder.realQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        id: doctorOder._id,
         supplierEmail : doctorOder.supplierEmail,

       }
     })
    }))
    .subscribe((transformedDocOders)=>{
      this.VerifiedDocOders = transformedDocOders;
      this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders])
    });
  }

  getVerifiedDocOdersUpdateListener() {
    return this.VerifiedDocOdersUpdated.asObservable();
  }


  // getPickedUpDocOders() {
  //   this.http.get<{message: string, doctorOders: any}>("http://localhost:4000/api/pickedUpUserOrders")
  //   .pipe(map(docOderData => {
  //    return docOderData.doctorOders.map(doctorOder => {
  //      return{
  //       doctorName : doctorOder.doctorName ,
  //       doctorContact : doctorOder.doctorContact ,
  //       doctorEmail : doctorOder.doctorEmail ,
  //       drugName : doctorOder.drugNames ,
  //       drugPrice : doctorOder.drugPrice,
  //       drugQuantity : doctorOder.drugQuantity,
  //       totalAmount : doctorOder.totalAmount,
  //       pickupDate : doctorOder.pickupDate,
  //       acctualDate : doctorOder.dateTime,
  //       id: doctorOder._id
  //      }
  //    })
  //   }))
  //   .subscribe((transformedPickedUpDocOders)=>{
  //     this.PickedUpDocOders = transformedPickedUpDocOders;
  //     this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders])
  //   });
  // }
 getEmailedPickedUpDocOders() {
    this.http.get<{message: string, doctorOders: any}>
    ("http://localhost:4000/api/pickedUpUserOrders/enteredemail/"+localStorage.getItem("email"))
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorEmail : doctorOder.doctorEmail ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        acctualDate : doctorOder.dateTime,
        id: doctorOder._id,
         supplierEmail : doctorOder.supplierEmail,
       }
     })
    }))
    .subscribe((transformedPickedUpDocOders)=>{
      this.PickedUpDocOders = transformedPickedUpDocOders;
      this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders])
    });
  }

  getPickedUpDocOdersUpdateListener() {
    return this.PickedUpDocOdersUpdated.asObservable();
  }

  deleteItem(oderId: string) {
    this.http.delete('http://localhost:4000/api/useroder/' + oderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOders.filter(order => order.id !== oderId);
        this.docOders = inventoryUpdated;
        this.docOdersUpdated.next([...this.docOders])
      });
  }

  deleteVerifiedItem(oderId: string) {
    this.http.delete('http://localhost:4000/api/verifiedUserOrder/' + oderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOders.filter(order => order.id !== oderId);
        this.docOders = inventoryUpdated;
        this.docOdersUpdated.next([...this.docOders])
      });
  }

}

