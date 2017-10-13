import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer.model';
import { Address } from '../../addresses/shared/address.model';
import { AddressService } from '../../addresses/shared/address.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerGroup: FormGroup;
  customerCreatedSuccess = false;
  addressesIn: Address[];
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private addressService: AddressService) {
    this.customerGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]]
    });
  }

  ngOnInit() {
    this.addressesIn = [];
  }

  isInvalid(controlName: string) {
    const control = this.customerGroup.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  isValid(controlName: string) {
    const control = this.customerGroup.controls[controlName];
    return !control.invalid && (control.touched || control.dirty);
  }

  back() {
    this.router.navigateByUrl('/customers')
  }

  closeAlert() {
    this.customerCreatedSuccess = false;
  }

  save() {

    const addressIds = [];
    const addressRequests = [];
    const values = this.customerGroup.value;

    this.addressesIn.forEach(address => {
      addressRequests.push(this.addressService.create(address)
        .map(addressBack => {
          addressIds.push(addressBack.id);
        }));
    });
    Observable.forkJoin(addressRequests).switchMap(() =>
      this.customerService.create({
        firstName: values.firstName,
        lastName: values.lastName,
        addressIds: addressIds
      })).subscribe(customer => {
      this.customerGroup.reset();
      this.customerCreatedSuccess = true;
      this.addressesIn = [];
      setTimeout(() => {
        this.customerCreatedSuccess = false;
      }, 1500);
    });
  }
}
