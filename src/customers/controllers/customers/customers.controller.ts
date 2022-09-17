import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get('')
  getCustomer() {
    return this.customerService.findCustomers();
  }
  @Get('customer/:id')
  getCustomerById(@Param('id') id: string) {
    return this.customerService.findCustomerById(id);
  }
}
