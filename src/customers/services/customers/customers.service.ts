import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/interfaces/customerInterfaces';
import * as customersData from '../../../data/customers.json';

@Injectable()
export class CustomersService {
  findCustomers() {
    return customersData;
  }
  findCustomerById(id: string) {
    return customersData.filter((customer: Customer) => {
      return id === customer.id;
    });
  }
}
