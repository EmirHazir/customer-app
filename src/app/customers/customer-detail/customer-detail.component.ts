import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchmap';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer : Customer
  constructor(private customerService : CustomerService,
              private router: Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap(params => this.customerService.getById(+params.get('id')))
    .subscribe(customer => this.customer = customer);
  }

}
