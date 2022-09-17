import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/interfaces/customerInterfaces';
import * as customersData from '../../../data/customers.json';

@Injectable()
export class CustomersService {
  findCustomers() {
    return customersData;
  }
  async findCustomerById(id: number) {
    return await customersData.find((customer: Customer) => {
      return id === customer.id;
    });
  }
}
