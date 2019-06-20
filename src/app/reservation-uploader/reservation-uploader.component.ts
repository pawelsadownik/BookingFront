import { ReservationExcel } from './../shared/reservation-excel.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as GC from '@grapecity/spread-sheets';
import * as Excel from '@grapecity/spread-excelio';
import '@grapecity/spread-sheets-charts';
import { HttpEventType, HttpClient } from '@angular/common/http';
import {saveAs} from 'file-saver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-reservation-uploader',
  templateUrl: './reservation-uploader.component.html',
  styles: []
})
export class ReservationUploaderComponent {
  excelModel = ReservationExcel;
  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh'
  };


  public progress: number;
  public message: string;

  private spread: GC.Spread.Sheets.Workbook;
  private excelIO;
  @Output() public onUploadFinished = new EventEmitter();


  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.excelIO = new Excel.IO();

  }
  workbookInit(args) {
    const self = this;
    self.spread = args.spread;
    const sheet = self.spread.getActiveSheet();
  }

  onFileChange(args) {
    const self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (self.spread && file) {
      self.excelIO.open(file, (json) => {
        self.spread.fromJSON(json, {});
        setTimeout(() => {
          alert('load successfully');
        }, 0);
      }, (error) => {
        alert('load fail');
      });
    }
  }
    onClickMe(args) {
      const self = this;
      const filename = 'exportExcel.xlsx';
      const excel = JSON.stringify(self.spread.toJSON());

      let c = new ReservationExcel();
      //let asd = Object.values(excell.sheets.data.dataTable).map(record => Object.values(record));
      console.log(excel);

    }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
