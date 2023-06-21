import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs'
import { variablesDatalogger1 } from '../download-csv/vars-datalogger1';
import { variablesDatalogger2 } from '../download-csv/vars-datalogger2';
import { InverterFilter } from '../download-csv/inverter-vars';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { Chart } from 'highcharts';
import { Options } from 'highcharts';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
  providers: [DatePipe]
})
export class GraphsComponent implements OnInit{

  //Arrays for graphs
  values!: any[];
  dates!: any[];
  pairs!: any[];

  //Dates to plot the graphs
  startDate: Date;
  finishDate: Date;

  Highcharts = Highcharts;
  chart2Options !: {};
  chartInverter !: {};
  chartOptions !: {};
  chartOptionsTemp !: {};

  constructor(private http: HttpClient, private dateAdapter: DateAdapter<Date>) {    
    this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy 
    const startDate = new Date(2022, 0, 1); // Months are zero-based, so 4 represents May
    const finishDate = new Date(2022, 11, 30);
    
    this.startDate = startDate;
    this.finishDate = finishDate;
  }
   ngOnInit(): void {
    this.getChartInverter(this.startDate, this.finishDate);
    this.getChart2(this.startDate, this.finishDate);
    this.getChart1(this.startDate, this.finishDate);
}


  getChart2(startDate: Date, endDate: Date): void {
    const apiUrl = 'https://localhost:7134/api/Datalogger2Hlocal/Graph'; // API URL to fetch the JSON data

    let params = new HttpParams();
    params = params.append('StartDate', startDate.toDateString());
    params = params.append('EndDate', endDate.toDateString());

    // Make the fetch request to get the JSON response
    this.http.get(apiUrl, { params: params }).subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
        // Create an array of objects with datetime and VM4J_E_Irrad.Reflejada_Avg values
      let pair1 = data.map((entry: any) => {
        return [
          new Date(entry.Datetime).getTime(), // Convert date to milliseconds for Highcharts
          parseFloat(entry['VM4J_E_Irrad.Reflejada_Avg'])
        ];
      });
      let pair2 = data.map((entry: any) => {
        return [
          new Date(entry.Datetime).getTime(), // Convert date to milliseconds for Highcharts
          parseFloat(entry['VM4J_T1_D_Irrad.RT1_Avg'])
        ];
      });

      this.initializeChartData2(pair1, pair2);
  });
  }
  getChartInverter(startDate: Date, endDate: Date): void {
    const apiUrl = 'https://localhost:7134/api/Inverter/Graph'; // API URL to fetch the JSON data

    let params = new HttpParams();
    params = params.append('StartDate', startDate.toDateString());
    params = params.append('EndDate', endDate.toDateString());

    // Make the fetch request to get the JSON response
    this.http.get(apiUrl, { params: params }).subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
        // Create an array of objects with datetime and VM4J_E_Irrad.Reflejada_Avg values
      let pair2 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(), // Convert date to milliseconds for Highcharts
          parseFloat(entry['P1.1.2 E (Wh)'])
        ];
      });
      let pair1 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(), // Convert date to milliseconds for Highcharts
          parseFloat(entry['P1.1.1 E (Wh)'])
        ];
      });
      let pair3 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(), // Convert date to milliseconds for Highcharts
          parseFloat(entry['P1.1.3 E (Wh)'])
        ];
      });
      let pair4 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(),
          parseFloat(entry['P1.1.4 E (Wh)'])
        ];
      });
      let pair5 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(),
          parseFloat(entry['P1.1.5 E (Wh)'])
        ];
      });
      let pair6 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(),
          parseFloat(entry['P1.1.6 E (Wh)'])
        ];
      });
      let pair7 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(), 
          parseFloat(entry['P1.1.7 E (Wh)'])
        ];
      });
      let pair8 = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(), 
          parseFloat(entry['P1.1.8 E (Wh)'])
        ];
      })
      let allString = data.map((entry: any) => {
        return [
          new Date(entry.Time).getTime(), 
          parseFloat(entry['Srt1.1 E (Wh)'])
        ];
      })

      this.initializeChartInverter(pair1, pair2, pair3, pair4, pair5, pair6, pair7, pair8, allString);
  });
  }
  getChart1(startDate: Date, endDate: Date): void {
    const apiUrl = 'https://localhost:7134/api/Datalogger1Hlocal/Graph'; // API URL to fetch the JSON data

    let params = new HttpParams();
    params = params.append('StartDate', startDate.toDateString());
    params = params.append('EndDate', endDate.toDateString());

    // Make the fetch request to get the JSON response
    this.http.get(apiUrl, { params: params }).subscribe((data: any) => {
      if (Array.isArray(data) && data.length === 0) {
        data = [{ ErrorMessage: 'NO DATA AVAILABLE AT THE PICKED DATES' }];
      }
        // Create an array of objects with datetime and VM4J_E_Irrad.Reflejada_Avg values
      let pair1 = data.map((entry: any) => {
        return [
          new Date(entry.Datetime).getTime(), // Convert date to milliseconds for Highcharts
          parseFloat(entry['VM4T_E_Irrad.Global_Avg'])
        ];
      });
      let pair2 = data.map((entry: any) => {
        return [
          new Date(entry.Datetime).getTime(),
          parseFloat(entry['VM4T_E_Irrad.Difusa_Avg'])
        ];
      });
      let pair3 = data.map((entry: any) => {
        return [
          new Date(entry.Datetime).getTime(),
          parseFloat(entry['VM4T_E_T.Amb_Avg'])
        ];
      });

      this.initializeChartData1(pair1, pair2);

      this.initializeChartData1Temp(pair3);
  });
  }

  initializeChartData2(values: any[], values2: any[]): void {
    this.chart2Options = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Datalogger 2 with two irradiations',
        align: 'left'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'W/m2'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },                        
            stops: [
              [0, '#00FF00'], // Start color (green)
              [1, '#00FF22']  // End color (green)
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [
        {
          name: 'Irrad. RT1 [W/m2]',
          data: values2,
          color: '#0000FF'
        },
        {
        name: 'Irrad. Difusa [W/m2]',
        data: values,
        color: '#0FF00F'
        }
      ],
    };
  }
  initializeChartInverter(values: any[], values2: any[], values3: any[], values4: any[], values5: any[], values6: any[], values7: any[], values8: any[], valuesAll: any[]): void {
    this.chartInverter = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Inveter data',
        align: 'left'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Wh'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },                        
            stops: [
              [0, '#00FF00'], // Start color (green)
              [1, '#00FF22']  // End color (green)
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        name: 'E 1.1',
        data: values,
        color: '#FF0000'
      },{
        name: 'E 1.2',
        data: values2,
        color: '#00FF00'
      },
      {
        name: 'E 1.3',
        data: values3,
        color: '#0000FF'
      },
      {
        name: 'E 1.4',
        data: values4,
        color: '#FFFF00'
      },
      {
        name: 'E 1.5',
        data: values5,
        color: '#00FFFF'
      },
      {
        name: 'E 1.6',
        data: values6,
        color: '#FF00FF'
      },
      {
        name: 'E 1.7',
        data: values7,
        color: '#FFA500'
      },
      {
        name: 'E 1.8',
        data: values8,
        color: '#800080'
      },
      {
        name: 'Srt 1.1',
        data: valuesAll,
        color: '#000000'
      }
      ],
    };
  }
  initializeChartData1(values: any[], values2: any[]): void {
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Datalogger 1 with two total irradiations',
        align: 'left'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'W/m2'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },                        
            stops: [
              [0, '#00FF00'], // Start color (green)
              [1, '#00FF22']  // End color (green)
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        name: 'Irrad. Global [W/m2]',
        data: values,
        color: '#0FF00F'
      },{
        name: 'Irrad.Difusa [W/m2]',
        data: values2,
        color: '#0000FF'
      }
      ],
    };
  }
  initializeChartData1Temp(values: any[]): void {
    this.chartOptionsTemp = {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Datalogger 1 Ambient Temperature',
        align: 'left'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'ºC'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },                        
            stops: [
              [0, '#90EE90'], // Start color 
              [1, '#00FF00'], // Middle color
              [2, '#8B0000']  // End color
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [{
        name: 'Temperature Amb. ºC',
        data: values,
        color: '#FFFF00'
      }
      ],
    };
  }

  reDraw(){
    this.getChart2(this.startDate, this.finishDate);
    this.getChart2(this.startDate, this.finishDate);
    this.getChart1(this.startDate, this.finishDate);
  }
}

