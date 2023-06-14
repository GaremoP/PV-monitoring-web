import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'
import { variablesDatalogger1 } from './download-csv/vars-datalogger1';
import { variablesDatalogger2 } from './download-csv/vars-datalogger2';
import { InverterFilter } from './download-csv/inverter-vars';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  //Function to download the files from the server in csv format 
  //Make a call to this api and download the data in csv format
  downloadInverterData(startDate: Date, endDate: Date, filters: InverterFilter) {
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

      const csvData = this.convertToCSV(data); // Convert JSON to CSV format.
      this.downloadFile(csvData, 'InverterData.csv'); // Trigger the file download. 
    });
  }

  download1440Datalogger1(startDate: Date, endDate: Date, filters: variablesDatalogger1){
    const apiUrl = 'https://localhost:7134/api/Datalogger1UTC'; // API URL to fetch the JSON data

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
      const csvData = this.convertToCSV(data); // Convert JSON to CSV format.
      this.downloadFile(csvData, 'UTC_Datalogger1.csv'); // Trigger the file download.
    });
  }

  download1440Datalogger2(startDate: Date, endDate: Date, filters: variablesDatalogger2){
    const apiUrl = 'https://localhost:7134/api/Datalogger2UTC';
  
    let params = new HttpParams()
      .append('StartDate', startDate.toDateString())
      .append('EndDate', endDate.toDateString());
  
    // Append the selected variables to the request parameters
    for (const [variableName, variableValue] of Object.entries(filters)) {
      if (variableValue) {
        params = params.append(variableName, 'true');
      }
    }
    this.http.get<any[]>(apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Failed to fetch data:', error);
        return of([{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }]);
      })
    ).subscribe(data => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
      const csvData = this.convertToCSV(data);
      const fileName = `UTC_Datalogger2_from_${startDate.toDateString()}_to_${endDate.toDateString()}.csv`;
      this.downloadFile(csvData, fileName);
    });
  }




  // Function to convert JSON to CSV format
  convertToCSV(jsonData: any[]): string {
    if (!jsonData || jsonData.length === 0) {
      return '';
    }
  
    const csvArray = [];
    const headers = Object.keys(jsonData[0]);
    csvArray.push(headers.join(','));
  
    jsonData.forEach(item => {
      const values = headers.map(header => item[header]);
      csvArray.push(values.join(','));
    });
  
    return csvArray.join('\n');
  }

// Function to trigger file download
downloadFile(data: string, filename: string) {
  const blob = new Blob([data], { type: 'text/csv' });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
  }

}
