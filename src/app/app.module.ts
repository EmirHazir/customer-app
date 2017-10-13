import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { CustomerService } from './customers/shared/customer.service';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { AddressListComponent } from './addresses/address-list/address-list.component';
import { AddressService } from './addresses/shared/address.service';

const appRoutes : Routes = [
  {path:'customer/:id', component: CustomerDetailComponent},
  {path:'customers/create', component: CustomerCreateComponent},
  {path:'customers',component: CustomerListComponent, data:{title:'Customer List'}},
  {path:'', redirectTo:'/customers',pathMatch:'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerCreateComponent,
    AddressListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
  ],
  providers: [CustomerService, 
              AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
