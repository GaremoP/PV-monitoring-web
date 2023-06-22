import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs'
import { variablesDatalogger1 } from './download-csv/vars-datalogger1';
import { variablesDatalogger2 } from './download-csv/vars-datalogger2';
import { InverterFilter } from './download-csv/inverter-vars';
import { API_URLS } from './api.config';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  private loading$ = new Subject<boolean>();

  getLoadingObservable(): Observable<boolean> {
    return this.loading$.asObservable();
  }
  //Function to download the files from the server in csv format 
  //Make a call to this api and download the data in csv format
  downloadInverterData(startDate: Date, endDate: Date, filters: InverterFilter): void {
    const apiUrl = API_URLS.InverterFilters; // API URL to fetch the JSON data

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
      const fileName = `InverterData_from_${startDate.toDateString()}_to_${endDate.toDateString()}.csv`;
      this.downloadFile(csvData, fileName); // Trigger the file download. 
    });
  }

  download1440Datalogger1(startDate: Date, endDate: Date, filters: variablesDatalogger1){
    const apiUrl = API_URLS.Datalogger1UTCFilters; // API URL to fetch the JSON data

    let params = new HttpParams();
    params = params.append('StartDate', startDate.toDateString());
    params = params.append('EndDate', endDate.toDateString());

    this.loading$.next(true); // Show the spinner
    // Append the selected variables to the request parameters
    for (const [variableName, variableValue] of Object.entries(filters)) {
      if (variableValue) {
        params = params.append(variableName, 'true');
      }
    }
    // Make the fetch request to get the JSON response
    this.http.get(apiUrl, { params: params }).pipe(
      catchError(error => {
        console.error('Failed to fetch data:', error);
        return of([{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }]);
      })
    ).subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrroMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
      const csvData = this.convertToCSV(data); // Convert JSON to CSV format.
      const fileName = `UTC_Datalogger1_from_${startDate.toDateString()}_to_${endDate.toDateString()}.csv`;
      this.downloadFile(csvData, fileName); // Trigger the file download.
      this.loading$.next(false); // Hide the spinner
    });
    
  }

  download1440Datalogger2(startDate: Date, endDate: Date, filters: variablesDatalogger2): void{
    const apiUrl = API_URLS.Datalogger2UTCFilters;
  
    let params = new HttpParams()
      .append('StartDate', startDate.toDateString())
      .append('EndDate', endDate.toDateString());

    this.loading$.next(true); // Show the spinner
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
      this.loading$.next(false); // Hide the spinner
    });
  }

  download24Datalogger1(startDate: Date, endDate: Date, filters: variablesDatalogger1){
    const apiUrl = API_URLS.Datalogger1hlocal; // API URL to fetch the JSON data

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
    this.http.get(apiUrl, { params: params }).pipe(
      catchError(error => {
        console.error('Failed to fetch data:', error);
        return of([{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }]);
      })
    ).subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrroMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
      const csvData = this.convertToCSV(data); // Convert JSON to CSV format.
      const fileName = `HLocal_Datalogger1Estaci_from_${startDate.toDateString()}_to_${endDate.toDateString()}.csv`;
      this.downloadFile(csvData, fileName); // Trigger the file download.
    });
  }

  download24Datalogger2(startDate: Date, endDate: Date, filters: variablesDatalogger2): void{
    const apiUrl = API_URLS.Datalogger2hlocal;
  
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
      const fileName = `HLocal_Datalogger2_from_${startDate.toDateString()}_to_${endDate.toDateString()}.csv`;
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
