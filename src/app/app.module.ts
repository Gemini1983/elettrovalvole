import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListvalvesComponent } from './listvalves/listvalves.component';
import { ValveComponent } from './valve/valve.component';
import { TaskComponent } from './task/task.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'valves', component: ListvalvesComponent },
  { path: 'valve', component: ValveComponent },
  { path: '',   redirectTo: '/valves', pathMatch: 'full' }   //start page configurata anche in app.component.ts
  //{ path: '**', redirectTo: '/application', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListvalvesComponent,
    ValveComponent,
    TaskComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
