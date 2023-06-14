import { Component, OnInit, Inject} from '@angular/core';
import { ConsultasService } from 'src/app/consultas.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { variablesDatalogger1 } from 'src/app/download-csv/vars-datalogger1';
import { variablesDatalogger2 } from 'src/app/download-csv/vars-datalogger2';
import { InverterFilter } from 'src/app/download-csv/inverter-vars';
@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.css'],
  providers: [
    DatePipe,
  ]
})
export class DownloadCSVComponent implements OnInit{
  //Variables to set the source to download from
  datalogger1 = false;
  datalogger2= false;
  inverter = true;
  datalogger24hl = true;
  datalogger24hlestaci = false;

  filterData1: variablesDatalogger1 = new variablesDatalogger1;
  filterData2: variablesDatalogger2 = new variablesDatalogger2;
  filterInverter: InverterFilter = new InverterFilter;

  constructor(private consultasService: ConsultasService, private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy

    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    this.startDate = lastMonth;
    this.finishDate = today;
  }

  ngOnInit() {
  }
  startDate: Date;
  finishDate: Date;
  selectAllEnergy: boolean = false;
  selectAllPower: boolean = false;

selectAllEnergyChanged(value: boolean) {
  if (value) {
    // Set all other checkboxes to true
    this.filterInverter.P1_1_1_E_Wh = true;
    this.filterInverter.P1_1_2_E_Wh = true;
    this.filterInverter.P1_1_3_E_Wh = true;
    this.filterInverter.P1_1_4_E_Wh = true;
    this.filterInverter.P1_1_5_E_Wh = true;
    this.filterInverter.P1_1_6_E_Wh = true;
    this.filterInverter.P1_1_7_E_Wh = true;
    this.filterInverter.P1_1_8_E_Wh = true;
    this.filterInverter.Srt1_1_E_Wh = true;
  }
}
selectAllPowerChanged(value: boolean) {
  if (value) {
    // Set all other checkboxes to true
    this.filterInverter.P1_1_1_P_W = true;
    this.filterInverter.P1_1_2_P_W = true;
    this.filterInverter.P1_1_3_P_W= true;
    this.filterInverter.P1_1_4_P_W = true;
    this.filterInverter.P1_1_5_P_W = true;
    this.filterInverter.P1_1_6_P_W = true;
    this.filterInverter.P1_1_7_P_W = true;
    this.filterInverter.P1_1_8_P_W = true;
    this.filterInverter.Str1_1_P_W = true;
  }
}
  //Function to download the files from the server in csv format
  submitForm() {
    // Perform HTTP request to submit the form data to the server
    if(this.inverter){
      this.downloadInverter()
    }
    if(this.datalogger1){
      this.download1440estaci()
      console.log(this.filterData1)
    }

    if(this.datalogger2){
      this.download1440data()
    }
    if(this.datalogger24hl){
      this.download24data()
    }
    if(this.datalogger24hlestaci){
      this.download24estaci()
    }
  }

  //Functions to send the request to download all files
  async downloadInverter(){
    this.consultasService.downloadInverterData(this.startDate, this.finishDate, this.filterInverter);
  }
  async download1440estaci(){
    this.consultasService.download1440Datalogger1(this.startDate, this.finishDate, this.filterData1);
  }
  async download1440data(){
    this.consultasService.download1440Datalogger2(this.startDate, this.finishDate, this.filterData2);
  }

  async download24data(){

  }
  async download24estaci(){

  }
}