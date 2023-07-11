import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadCSVComponent } from './download-csv/download-csv.component';
import { CompareComponent } from './compare/compare.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', component:  DownloadCSVComponent, 
  ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path: 'download', component:  DownloadCSVComponent,
   ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path: 'compare', component: CompareComponent, 
   ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path: 'graphs', component: GraphsComponent
  , ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path: 'about', component: AboutUsComponent},
  {path: 'documentation', component: DocumentationComponent,
   ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
