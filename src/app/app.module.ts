import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationDetailComponent } from './reservation-details/reservation-detail/reservation-detail.component';
import { ReservationDetailListComponent } from './reservation-details/reservation-detail-list/reservation-detail-list.component';
import { ReservationDetailService } from './shared/reservation-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    ReservationDetailsComponent,
    ReservationDetailComponent,
    ReservationDetailListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ReservationDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
