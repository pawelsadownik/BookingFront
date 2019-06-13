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

  constructor(private service:ReservationDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
    form.form.reset();
    this.service.formData = {
      id: 0,
      firstName :'',
      lastName :'',
      email : '',
      companyName :'',
      nip : null,
      price : null,
      reservationNumber : null,
      checkIn : null,
      checkOut : null
    }
  }

    onSubmit(form:NgForm){
      this.insertRecord(form)

    }

      insertRecord(form:NgForm){
        this.service.CreateGuest().subscribe(
          res => {
            debugger;
            this.resetForm(form);
            this.toastr.success('Success!!', 'Adding new reservation');
            this.service.refreshList();
          },
          err => {
            debugger;
            console.log(err);
          }
       )
      }

      updateRecord(form:NgForm){
        this.service.UpdateGuest().subscribe(
          res => {
            this.resetForm(form);
            this.toastr.info('Success!!', 'Update reservation');
            this.service.refreshList();

          },
          err => {
            console.log(err);
          }
       )
      }
}
