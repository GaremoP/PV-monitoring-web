import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs'
import { variablesDatalogger1 } from '../download-csv/vars-datalogger1';
import { variablesDatalogger2 } from '../download-csv/vars-datalogger2';
import { InverterFilter } from '../download-csv/inverter-vars';

@Component({
  selector: 'graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent {
  constructor(private http: HttpClient) { }

  getInverterData(startDate: Date, endDate: Date, filters: InverterFilter) {
    const apiUrl = 'https://localhost:7134/api/Inverter'; // API URL to fetch the JSON data

    let params = new HttpParams();
    params = params.append('StartDate', startDate.toDateString());
    params = params.append('EndDate', endDate.toDateString());
    // Append the selected variables to the request parameters
    for (const [variableName, variableValue] of Object.entries(filters)) {
      if (variableValue) {
        params = params.append(variableName, 'true');
      }
    }
    // Make the fetch request to get the JSON response
    this.http.get(apiUrl, { params: params }).subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrroMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
     let dates = data.Time;
     let values = data.Values;
    });
  }
}
