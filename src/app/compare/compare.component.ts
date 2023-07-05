import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { Chart } from 'highcharts';
import { Options } from 'highcharts';
import { DateAdapter } from '@angular/material/core';
import { API_URLS } from '../api.config';
@Component({
  selector: 'app-trials',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  providers: [DatePipe]
})
export class CompareComponent implements OnInit {
  //Dates to plot the graphs
  startDateRight: Date;
  finishDateRight: Date;
  startDateLeft: Date;
  finishDateLeft: Date;

  constructor(private http: HttpClient, private dateAdapter: DateAdapter<Date>) {    
    this.dateAdapter.setLocale('en-GB'); // dd/MM/yyyy 

    const finishDate2 = new Date();
    const startDate2 = new Date(finishDate2.getFullYear(), finishDate2.getMonth()-1, finishDate2.getDay()); 

    const finishDate1 = startDate2;
    const startDate1 = new Date(finishDate1.getFullYear(), finishDate1.getMonth()-1, finishDate1.getDay());  

    this.startDateLeft = startDate1;
    this.finishDateLeft = finishDate1;
    this.startDateRight = startDate2;
    this.finishDateRight = finishDate2;

  }
  Highcharts = Highcharts;

  chartInverterLeft !: {};
  chartInverterRight !: {};

  chartOptionsData1IrradLeft !: {};
  chartOptionsTempLeft !: {};
  chartOptionsData1IrradRight !: {};
  chartOptionsTempRight !: {};

  chartOptionsDatalogger2IrradRight !: {};
  chartOptionsTemp2Right !: {};
  chartOptionsParticlesRight !: {};
  chartOptionsInclinometroRight !: {};

  chartOptionsDatalogger2IrradLeft  !: {};
  chartOptionsTemp2Left !: {};
  chartOptionsParticlesLeft !: {};
  chartOptionsInclinometroLeft !: {};

 ngOnInit(): void {
  this.getChartInverterLeft(this.startDateLeft, this.finishDateLeft);
  this.getChartInverterRight(this.startDateRight, this.finishDateRight);

  this.getChartDatalog1Right(this.startDateRight, this.finishDateRight);
  this.getChartDatalog1Left(this.startDateLeft, this.finishDateLeft);

  this.getChartDatalog2Right(this.startDateRight, this.finishDateRight);
  this.getChartDatalog2Left(this.startDateLeft, this.finishDateLeft);
}


getChartInverterLeft(startDate: Date, endDate: Date): void {
  const apiUrl = API_URLS.Inverter_Graph; // API URL to fetch the JSON data

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

    this.initializeChartInverterLeft(pair1, pair2, pair3, pair4, pair5, pair6, pair7, pair8, allString);
});
}
getChartInverterRight(startDate: Date, endDate: Date): void {
  const apiUrl = API_URLS.Inverter_Graph; // API URL to fetch the JSON data

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

    this.initializeChartInverterRight(pair1, pair2, pair3, pair4, pair5, pair6, pair7, pair8, allString);
});
}


getChartDatalog1Right(startDate: Date, endDate: Date): void {
  const apiUrl = API_URLS.Datalogger1hlocal_Graph; // API URL to fetch the JSON data

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
    let pair4 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4T_E_P.Rocio_Avg'])
      ];
    });
    this.initializeChartData1Right(pair1, pair2);

    this.initializeChartData1TempRight(pair3, pair4);
});
}
getChartDatalog1Left(startDate: Date, endDate: Date): void {
  const apiUrl = API_URLS.Datalogger1hlocal_Graph; // API URL to fetch the JSON data

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
    let pair4 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4T_E_P.Rocio_Avg'])
      ];
    });
    this.initializeChartData1Left(pair1, pair2);

    this.initializeChartData1TempLeft(pair3, pair4);
});
}
getChartDatalog2Right(startDate: Date, endDate: Date): void {
  const apiUrl = API_URLS.Datalogger2hlocal_Graph // API URL to fetch the JSON data

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
    let pair3 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(), // Convert date to milliseconds for Highcharts
        parseFloat(entry['VM4J_T1_T_Irrad.RT1_Avg'])
      ];
    });
    let pair4 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_SP_IML_Irrad.RT1_Avg'])
      ];
    }
    );
    let pair5 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_SP_IL_Irrad.RT1_Avg'])
      ];
    });
    let pair6 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_J_Irrad.RT1_Avg'])
      ];
    });
    let pair7 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_IDAE_Irrad.RT1_Avg'])
      ];
    });
    let pair8 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_L_Irrad.RT1_Avg'])
      ];
    });
    let pair9 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_A_Irrad.RT1_Avg'])
      ];
    });
    let temp1 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_T1_D_Temp.RT1_Avg'])
      ];
    });
    let temp2 = data.map((entry: any) => { 
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_T1_T_Temp.RT1_Avg'])
      ];
    });
    let temp3 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_Temp.RT1_Avg'])
      ];
    });
    let temp4 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_TI_Temp.RT1_Avg'])
      ];
    });
    let temp5 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_TS_Temp.RT1_Avg'])
      ];
    });
    let pm25 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['PM2.5_Avg'])
      ];
    })
    let pm10 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['PM10_Avg'])
      ];
    })
    let incli = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_T1_Inclinometro_Avg'])
      ];
    })
    this.initializeChartData2IrradRight(pair1, pair2, pair3, pair4, pair5, pair6, pair7, pair8, pair9);
    this.initializeChartData2TempRight(temp1, temp2, temp3, temp4, temp5);
    this.initializeChartData2ParticlesRight(pm25, pm10);
    this.initializeChartData2InclinometroRight(incli);
});
}
getChartDatalog2Left(startDate: Date, endDate: Date): void {
  const apiUrl = API_URLS.Datalogger2hlocal_Graph // API URL to fetch the JSON data

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
    let pair3 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(), // Convert date to milliseconds for Highcharts
        parseFloat(entry['VM4J_T1_T_Irrad.RT1_Avg'])
      ];
    });
    let pair4 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_SP_IML_Irrad.RT1_Avg'])
      ];
    }
    );
    let pair5 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_SP_IL_Irrad.RT1_Avg'])
      ];
    });
    let pair6 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_J_Irrad.RT1_Avg'])
      ];
    });
    let pair7 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_IDAE_Irrad.RT1_Avg'])
      ];
    });
    let pair8 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_L_Irrad.RT1_Avg'])
      ];
    });
    let pair9 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_A_Irrad.RT1_Avg'])
      ];
    });
    let temp1 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_T1_D_Temp.RT1_Avg'])
      ];
    });
    let temp2 = data.map((entry: any) => { 
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_T1_T_Temp.RT1_Avg'])
      ];
    });
    let temp3 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_D_Temp.RT1_Avg'])
      ];
    });
    let temp4 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_TI_Temp.RT1_Avg'])
      ];
    });
    let temp5 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_M1_TS_Temp.RT1_Avg'])
      ];
    });
    let pm25 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['PM2.5_Avg'])
      ];
    })
    let pm10 = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['PM10_Avg'])
      ];
    })
    let incli = data.map((entry: any) => {
      return [
        new Date(entry.Datetime).getTime(),
        parseFloat(entry['VM4J_T1_Inclinometro_Avg'])
      ];
    })
    this.initializeChartData2IrradLeft(pair1, pair2, pair3, pair4, pair5, pair6, pair7, pair8, pair9);
    this.initializeChartData2TempLeft(temp1, temp2, temp3, temp4, temp5);
    this.initializeChartData2ParticlesLeft(pm25, pm10);
    this.initializeChartData2InclinometroLeft(incli);
});
}



initializeChartInverterLeft(values: any[], values2: any[], values3: any[], values4: any[], values5: any[], values6: any[], values7: any[], values8: any[], valuesAll: any[]): void {
  this.chartInverterLeft = {
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
      name: 'E 1.1 [Wh]',
      data: values,
      color: '#FF0000'
    },{
      name: 'E 1.2 [Wh]',
      data: values2,
      color: '#00FF00'
    },
    {
      name: 'E 1.3 [Wh]',
      data: values3,
      color: '#0000FF'
    },
    {
      name: 'E 1.4 [Wh]',
      data: values4,
      color: '#FFFF00'
    },
    {
      name: 'E 1.5 [Wh]',
      data: values5,
      color: '#00FFFF'
    },
    {
      name: 'E 1.6 [Wh]',
      data: values6,
      color: '#FF00FF'
    },
    {
      name: 'E 1.7 [Wh]',
      data: values7,
      color: '#FFA500'
    },
    {
      name: 'E 1.8 [Wh]',
      data: values8,
      color: '#800080'
    },
    {
      name: 'Srt 1.1 [Wh]',
      data: valuesAll,
      color: '#000000'
    }
    ],
  };
}

initializeChartInverterRight(values: any[], values2: any[], values3: any[], values4: any[], values5: any[], values6: any[], values7: any[], values8: any[], valuesAll: any[]): void {
  this.chartInverterRight = {
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
      name: 'E 1.1 [Wh]',
      data: values,
      color: '#FF0000'
    },{
      name: 'E 1.2 [Wh]',
      data: values2,
      color: '#00FF00'
    },
    {
      name: 'E 1.3 [Wh]',
      data: values3,
      color: '#0000FF'
    },
    {
      name: 'E 1.4 [Wh]',
      data: values4,
      color: '#FFFF00'
    },
    {
      name: 'E 1.5 [Wh]',
      data: values5,
      color: '#00FFFF'
    },
    {
      name: 'E 1.6 [Wh]',
      data: values6,
      color: '#FF00FF'
    },
    {
      name: 'E 1.7 [Wh]',
      data: values7,
      color: '#FFA500'
    },
    {
      name: 'E 1.8 [Wh]',
      data: values8,
      color: '#800080'
    },
    {
      name: 'Srt 1.1 [Wh]',
      data: valuesAll,
      color: '#000000'
    }
    ],
  };
}



initializeChartData1Right(values: any[], values2: any[]): void {
  this.chartOptionsData1IrradRight = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 1 Irradiances',
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
        text: 'Wh/m2'
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
      name: 'Irrad. Global Horizontal [Wh/m2]',
      data: values,
      color: '#0FF00F'
    },{
      name: 'Irrad.Difusa Horizontal [Wh/m2]',
      data: values2,
      color: '#0000FF'
    }
    ],
  };
}
initializeChartData1TempRight(values: any[], values2: any[]): void {
  this.chartOptionsTempRight = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 1 Temperatures',
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
      color: '#FF8903'
    },
    {
      name: 'P Rocío ºC',
      data: values2,
      color: '#EEE718'
    }
    ],
  };
}

initializeChartData1Left(values: any[], values2: any[]): void {
  this.chartOptionsData1IrradLeft = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 1 Irradiances',
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
        text: 'Wh/m2'
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
      name: 'Irrad. Global Horizontal [Wh/m2]',
      data: values,
      color: '#0FF00F'
    },{
      name: 'Irrad.Difusa Horizontal [Wh/m2]',
      data: values2,
      color: '#0000FF'
    }
    ],
  };
}
initializeChartData1TempLeft(values: any[], values2: any[]): void {
  this.chartOptionsTempLeft = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 1 Temperatures',
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
      color: '#FF8903'
    },
    {
      name: 'P Rocío ºC',
      data: values2,
      color: '#EEE718'
    }
    ],
  };
}


initializeChartData2IrradRight(values: any[], values2: any[], values3: any[], values4: any[], 
  values5: any[], values6: any[], values7: any[], values8: any[], values9: any[]): void {
  this.chartOptionsDatalogger2IrradRight = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 2 Irradiations',
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
        text: 'Wh/m2'
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
        name: 'Irrad. total Tracker 1, Parte delantera sobre el tracker [Wh/m2]',
        data: values2,
        color: '#0000FF'
      },
      {
        name: 'Irrad. Reflejada [Wh/m2]',
        data: values,
        color: '#0FF00F'
      },
      {
        name: 'Irrad. total Tracker 1, Parte trasera sobre el tracker [Wh/m2]',
        data: values3,
        color: '#FF0000'
      },
      {
        name: 'Irrad. total sistema polar IML [Wh/m2]',
        data: values4,
        color: '#FFFF00'
      },
      {
        name: 'Irrad. total sistema polar IL [Wh/m2]',
        data: values5,
        color: '#F5B625'
      },
      {
        name: 'Irrad. total Mesa1 Jacobson [Wh/m2]',
        data: values6,
        color: '#F525D5'
      },{
        name: 'Irrad. total Mesa1 IDAE [Wh/m2]',
        data: values7,
        color: '#581E4F'
      },{
        name: 'Irrad. total Mesa1, parte delantera Lorenzo [Wh/m2]',
        data: values8,
        color: '#0BFADE'
      },{
        name: 'Irrad. total Mesa1, parte delantera Bayon [Wh/m2]',
        data: values9,
        color: '#14B01E'
      }
    ],
  };
}
initializeChartData2IrradLeft(values: any[], values2: any[], values3: any[], values4: any[], 
  values5: any[], values6: any[], values7: any[], values8: any[], values9: any[]): void {
  this.chartOptionsDatalogger2IrradLeft = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 2 Irradiations',
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
        text: 'Wh/m2'
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
        name: 'Irrad. total Tracker 1, Parte delantera sobre el tracker [Wh/m2]',
        data: values2,
        color: '#0000FF'
      },
      {
        name: 'Irrad. Reflejada [Wh/m2]',
        data: values,
        color: '#0FF00F'
      },
      {
        name: 'Irrad. total Tracker 1, Parte trasera sobre el tracker [Wh/m2]',
        data: values3,
        color: '#FF0000'
      },
      {
        name: 'Irrad. total sistema polar IML [Wh/m2]',
        data: values4,
        color: '#FFFF00'
      },
      {
        name: 'Irrad. total sistema polar IL [Wh/m2]',
        data: values5,
        color: '#F5B625'
      },
      {
        name: 'Irrad. total Mesa1 Jacobson [Wh/m2]',
        data: values6,
        color: '#F525D5'
      },{
        name: 'Irrad. total Mesa1 IDAE [Wh/m2]',
        data: values7,
        color: '#581E4F'
      },{
        name: 'Irrad. total Mesa1, parte delantera Lorenzo [Wh/m2]',
        data: values8,
        color: '#0BFADE'
      },{
        name: 'Irrad. total Mesa1, parte delantera Bayon [Wh/m2]',
        data: values9,
        color: '#14B01E'
      }
    ],
  };
}
initializeChartData2TempRight(values: any[], values2: any[], values3: any[],
   values4: any[], values5: any[]): void {
  this.chartOptionsTemp2Right = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 2 Temperatures',
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
      name: 'Temperature Tracker1 Parte delantera [ºC]',
      data: values,
      color: '#FF8903'
    },
    {
      name: 'Temperature Tracker1 Parte trasera [ºC]',
      data: values2,
      color: '#EEE718'
    },
    {
      name: 'Temperature Mesa1 Parte delantera [°C]',
      data: values3,
      color: '#FF0000'
    },
    {
      name: 'Temperature Mesa1 Parte delantera Inferior [°C]',
      data: values4,
      color: '#00FF00'
    },
    {
      name: 'Temperature Mesa1 Parte delantera Superior  [°C]',
      data: values5,
      color: '#0000FF'
    }
    ],
  };
}

initializeChartData2InclinometroLeft(values: any[]): void {
  this.chartOptionsInclinometroLeft = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 2 Inclinometro',
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
        text: '°'
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
      name: 'Inclinometro',
      data: values,
      color: '#FF8903'
    }
    ],
  };
 }
 initializeChartData2InclinometroRight(values: any[]): void {
  this.chartOptionsInclinometroRight = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 2 Inclinometro',
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
        text: '°'
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
      name: 'Inclinometro',
      data: values,
      color: '#FF8903'
    }
    ],
  };
 }

initializeChartData2ParticlesRight(values: any[], values2: any[]): void {
  this.chartOptionsParticlesRight = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Datalogger 2 Medidor de particulas',
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
        text: 'µg/m³.'
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
      name: 'PM 2.5',
      data: values,
      color: '#FF8903'
    },
    {
      name: 'PM 10',
      data: values2,
      color: '#EEE718'
    }
    ],
  };
}
initializeChartData2TempLeft(values: any[], values2: any[], values3: any[],
  values4: any[], values5: any[]): void {
 this.chartOptionsTemp2Left = {
   chart: {
     zoomType: 'x'
   },
   title: {
     text: 'Datalogger 2 Temperatures',
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
     name: 'Temperature Tracker1 Parte delantera [ºC]',
     data: values,
     color: '#FF8903'
   },
   {
     name: 'Temperature Tracker1 Parte trasera [ºC]',
     data: values2,
     color: '#EEE718'
   },
   {
     name: 'Temperature Mesa1 Parte delantera [°C]',
     data: values3,
     color: '#FF0000'
   },
   {
     name: 'Temperature Mesa1 Parte delantera Inferior [°C]',
     data: values4,
     color: '#00FF00'
   },
   {
     name: 'Temperature Mesa1 Parte delantera Superior  [°C]',
     data: values5,
     color: '#0000FF'
   }
   ],
 };
}
initializeChartData2ParticlesLeft(values: any[], values2: any[]): void {
 this.chartOptionsParticlesLeft = {
   chart: {
     zoomType: 'x'
   },
   title: {
     text: 'Datalogger 2 Medidor de particulas',
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
       text: 'µg/m³.'
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
     name: 'PM 2.5',
     data: values,
     color: '#FF8903'
   },
   {
     name: 'PM 10',
     data: values2,
     color: '#EEE718'
   }
   ],
 };
}

  reDrawLeft(){
    this.getChartDatalog2Left(this.startDateLeft, this.finishDateLeft);

    this.getChartInverterLeft(this.startDateRight, this.finishDateRight);
    this.getChartDatalog1Left(this.startDateLeft, this.finishDateLeft);
  }
  reDrawRight(){
    this.getChartDatalog2Right(this.startDateRight, this.finishDateRight);

    this.getChartInverterRight(this.startDateRight, this.finishDateRight);
    this.getChartDatalog1Right(this.startDateRight, this.finishDateRight);
  }
}

