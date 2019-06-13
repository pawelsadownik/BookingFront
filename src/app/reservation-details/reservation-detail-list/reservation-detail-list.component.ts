import { ReservationDetailService } from './../../shared/reservation-detail.service';
import { Component, OnInit } from '@angular/core';
import { ReservationDetail } from 'src/app/shared/reservation-detail.model';
import { ToastrService } from 'ngx-toastr';

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
    .subscribe(res=> {
      this.service.refreshList();
      this.toastr.warning('Deleted successfully', 'Reservation');
    },
    err => {
      console.log(err);
    })
  }

  onInvoice(id){
    this.service.Invoice(id)
    .subscribe(res=> {
      this.service.refreshList();
      this.toastr.warning('Dwonloaded successfully', 'Invoice');
    },
    err => {
      console.log(err);
    })
  }
}
