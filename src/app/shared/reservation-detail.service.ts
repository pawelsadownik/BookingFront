import { ReservationDetail } from './reservation-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationDetailService {
  formData:ReservationDetail;
  readonly rootURL = 'https://localhost:5001/api';
  listOfGuests : ReservationDetail[];

  constructor(private http:HttpClient) { }

  CreateGuest(){
  return this.http.post(this.rootURL+'/guest',this.formData);
  }

  UpdateGuest(){
    return this.http.put(this.rootURL+'/guest/ ',this.formData);
    }

  DeleteGuest(id){
    return this.http.delete(this.rootURL + '/guest/DeleteGuest/' + id);
      }

  Invoice(id){
    window.open(this.rootURL + '/pdfcreator/GetInvoice/' + id);
    return this.http.get(this.rootURL + '/pdfcreator/GetInvoice/' + id);
  }
  refreshList(){
    this.http.get(this.rootURL +'/guest/GetAllGuests')
    .toPromise()
    .then(res => this.listOfGuests = res as ReservationDetail[]);
  }
}
