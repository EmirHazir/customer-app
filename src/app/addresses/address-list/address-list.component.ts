import { Component, OnInit } from '@angular/core';
import { Address } from '../shared/address.model';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addressGroup: FormGroup;
  addresses: Address[];
  constructor(private fb: FormBuilder) {
    this.addressGroup = fb.group({
      street:'',
      number:'',
      city:''
    })
   }

   delete(i, $event){
     $event.preventDefault();
    this.addresses.splice(i, 1);
   }

   saveAddress(){
     const values = this.addressGroup.value;
     this.addresses.push({
       street:values.street,
       number:values.number,
       city:values.city
     });
     this.addressGroup.reset();
   }
  ngOnInit() {
    this.addresses = [{
        id: 1,
        street: "Etimesgut",
        number: "222d",
        city: "Ankara"
      },{
        id: 2,
        street: "Seyhan",
        number: "222c",
        city: "Adana"
      }];
  }

}
