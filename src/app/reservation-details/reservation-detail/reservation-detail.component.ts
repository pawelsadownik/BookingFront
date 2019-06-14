import { ReservationDetailStatsComponent } from './../reservation-detail-stats/reservation-detail-stats.component';
import { ReservationStats } from './../../shared/reservation-stats.model';
import { ReservationDetailService } from './../../shared/reservation-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styles: []
})
export class ReservationDetailComponent implements OnInit {

  constructor(
    private service:ReservationDetailService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
    form.form.reset();
    this.service.formData = {
      id: 0,
      firstName :null,
      lastName :null,
      email : null,
      companyName :null,
      nip : null,
      price : null,
      reservationNumber : null,
      checkIn : null,
      checkOut : null
    }
  }

    onSubmit(form:NgForm){
    if (this.service.formData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
      insertRecord(form:NgForm){
        this.service.CreateGuest().subscribe(
          res => {
            this.resetForm(form);
            this.toastr.info('Success!!', 'Adding new reservation');
            this.service.refreshList();
            this.service.getStatistics();
            this.service.getStatisticsByYear2017();
            this.service.getStatisticsByYear2018();
            this.service.getStatisticsByYear2019();
          },
          err => {
            console.log(err);
          }
       )
      }

      updateRecord(form:NgForm){
        this.service.UpdateGuest(form.value).subscribe(
          res => {
            this.resetForm(form);
            this.toastr.info('Success!!', 'Update reservation');
            this.service.refreshList();
            this.service.getStatistics();
            this.service.getStatisticsByYear2017();
            this.service.getStatisticsByYear2018();
            this.service.getStatisticsByYear2019();


          },
          err => {
            console.log(err);
            this.service.refreshList();
          }
       )
      }
}
