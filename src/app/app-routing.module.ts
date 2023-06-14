import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadCSVComponent } from './download-csv/download-csv.component';
import { TrialsComponent } from './trials/trials.component';

const routes: Routes = [
  {path: 'download', component:  DownloadCSVComponent},
  {path: 'trial', component: TrialsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
