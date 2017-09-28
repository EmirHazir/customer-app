import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../shared/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  @Input()
  customer : Customer
  constructor() {
   
   }

  ngOnInit() {
  }

}
