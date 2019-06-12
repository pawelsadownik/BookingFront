import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationDetailComponent } from './reservation-details/reservation-detail/reservation-detail.component';
import { ReservationDetailListComponent } from './reservation-details/reservation-detail-list/reservation-detail-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationDetailsComponent,
    ReservationDetailComponent,
    ReservationDetailListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
