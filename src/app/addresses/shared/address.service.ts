import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address } from './address.model';
import { Observable } from 'rxjs/Observable';


const url = environment.apiEndpoint + '/addresses';
@Injectable()
export class AddressService {

  constructor(private http:HttpClient) { }

  create(address: Address): Observable<Address>{
    return this.http
    .post<Address>(url, address);
  }

  

}
