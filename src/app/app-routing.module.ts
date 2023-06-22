import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadCSVComponent } from './download-csv/download-csv.component';
import { TrialsComponent as ComparerComponent } from './trials/trials.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  {path: '', component:  DownloadCSVComponent},
  {path: 'download', component:  DownloadCSVComponent},
  {path: 'compare', component: ComparerComponent},
  {path: 'graphs', component: GraphsComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'documentation', component: DocumentationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
