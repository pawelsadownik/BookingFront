import { ReservationStats } from './reservation-stats.model';
import { ReservationDetail } from './reservation-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ReservationDetailService {
  formData:ReservationDetail;
  statistic:ReservationStats;

  sum: number;
  sum2019: number;
  sum2018: number;
  sum2017: number;

  readonly rootURL = 'https://localhost:5001/api';
  listOfGuests : ReservationDetail[];
  listOfStats : ReservationStats[];

  constructor(private http:HttpClient, private toastr: ToastrService) { }

  CreateGuest(){
  return this.http.post(this.rootURL+'/guest',this.formData);
  }

  UpdateGuest(formData: ReservationDetail){
    return this.http.put(this.rootURL+'/guest/UpdateGuest',this.formData);
    }

  DeleteGuest(id){
    return this.http.delete(this.rootURL + '/guest/DeleteGuest/' + id).subscribe(
      res=>{
        this.toastr.success('Deleted successfully', 'Reservation');
      this.getStatistics();
      this.getStatisticsByYear2017();
      this.getStatisticsByYear2018();
      this.getStatisticsByYear2019();
      this.refreshList();
      }

    )
      }

  Invoice(id){
    window.open(this.rootURL + '/pdfcreator/GetInvoice/' + id);
    this.toastr.warning('Downloaded successfully', 'Invoice');
    return this.http.get(this.rootURL + '/pdfcreator/GetInvoice/' + id);
  }
  refreshList(){
    this.http.get(this.rootURL +'/guest/GetAllGuests')
    .toPromise()
    .then(res => this.listOfGuests = res as ReservationDetail[]);
  }

  getStatisticsByYear2017(){
    return this.http.get(this.rootURL + '/statistic/GetStatistics/2017').subscribe(
      res => {
        this.sum2017 = res as number;
      },
      err => {
        console.log(err);
      }
   )
  }

  getStatisticsByYear2018(){
    return this.http.get(this.rootURL + '/statistic/GetStatistics/2018').subscribe(
      res => {
        this.sum2018 = res as number;
      },
      err => {
        console.log(err);
      }
   )
  }
  getStatisticsByYear2019(){
    return this.http.get(this.rootURL + '/statistic/GetStatistics/2019').subscribe(
      res => {
        this.sum2019 = res as number;
      },
      err => {
        console.log(err);
      }
   )
  }
  getStatistics(){
    this.http.get(this.rootURL + '/statistic/GetStatistics/').subscribe(
      res => {
        this.sum = res as number;
      },
      err => {
        console.log(err);
      }
   )
  }

}
