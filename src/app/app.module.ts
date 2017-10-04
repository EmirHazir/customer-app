import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerService } from './customers/shared/customer.service';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes : Routes = [
  {path:'customer/:id', component: CustomerDetailComponent},
  {path:'customers',component: CustomerListComponent, data:{title:'Customer List'}},
  {path:'', redirectTo:'/customers',pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerListComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
