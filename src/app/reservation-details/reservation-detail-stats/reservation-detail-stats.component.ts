import { ReservationStats } from './../../shared/reservation-stats.model';
import { Component, OnInit } from '@angular/core';
import { ReservationDetailService } from 'src/app/shared/reservation-detail.service';
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-reservation-detail-stats',
  templateUrl: './reservation-detail-stats.component.html',
  styles: []
})
export class ReservationDetailStatsComponent implements OnInit {

  constructor(private service: ReservationDetailService) {
  }

  ngOnInit() {
    this.service.getStatistics();
    this.service.getStatisticsByYear2017();
    this.service.getStatisticsByYear2018();
    this.service.getStatisticsByYear2019();
  }

}
