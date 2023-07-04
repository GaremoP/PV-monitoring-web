import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './login/login.component';
import { GraphsComponent } from './graphs/graphs.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DownloadCSVComponent } from './download-csv/download-csv.component';
import { CompareComponent } from './compare/compare.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    DownloadCSVComponent,
    CompareComponent,
    NavigationBarComponent,
    GraphsComponent,
    DocumentationComponent,
    AboutUsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
