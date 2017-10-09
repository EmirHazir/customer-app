import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer.model';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerGroup: FormGroup;
  customerCreatedSuccess = false;
  constructor(private router:Router, 
              private formBuilder: FormBuilder,
              private customerService: CustomerService) { 
    this.customerGroup = this.formBuilder.group({
      firstName : ['', [Validators.required, Validators.minLength(3)]],
      lastName : ['', [Validators.required, Validators.maxLength(40)]]
    });
  }

  ngOnInit() {
  }

  isInvalid(controlName:string) {
    const control = this.customerGroup.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  isValid(controlName:string) {
    const control = this.customerGroup.controls[controlName];
    return !control.invalid && (control.touched || control.dirty);
  }

  back(){
    this.router.navigateByUrl('/customers')
  }

  closeAlert(){
    this.customerCreatedSuccess = false;
  }

  save(){
    const values = this.customerGroup.value;
    const customer : Customer = {
      firstName : values.firstName,
      lastName : values.lastName,
      addresses : []
    };

    this.customerService.create(customer)
    .subscribe(customer => {
      this.customerGroup.reset();
      this.customerCreatedSuccess = true;
      setTimeout(() =>{
        this.customerCreatedSuccess = false;
      },1500);
    });
  }

}
