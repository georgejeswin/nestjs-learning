import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/createCustomer.dto';
import { Customer } from 'src/customers/types/customer.types';
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
  async createCustomer(createCustomerDto: CreateCustomerDto) {
    return await customersData.push(createCustomerDto);
  }
}
