import { ReservationDetailService } from './../../shared/reservation-detail.service';
import { Component, OnInit } from '@angular/core';
import { ReservationDetail } from 'src/app/shared/reservation-detail.model';
import { ToastrService } from 'ngx-toastr';
import { ReservationStats } from 'src/app/shared/reservation-stats.model';

@Component({
  selector: 'app-reservation-detail-list',
  templateUrl: './reservation-detail-list.component.html',
  styles: []
})
export class ReservationDetailListComponent implements OnInit {

  constructor(private service: ReservationDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(p:ReservationDetail){
    this.service.formData = Object.assign({},p);
  }

  onDelete(id){
    this.service.DeleteGuest(id)
    // .subscribe(res=> {
    //   this.toastr.warning('Deleted successfully2', 'Reservation');
    //   this.service.refreshList();
    // },
    // err => {
    //   console.log(err);
    // })
  }

  onInvoice(id){
    this.service.Invoice(id)
    .subscribe(res=> {
      this.service.refreshList();
      this.toastr.warning('Downloaded successfully', 'Invoice');
    },
    err => {
      console.log(err);
    })
  }
}
