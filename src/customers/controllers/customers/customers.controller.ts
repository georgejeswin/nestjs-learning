import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get('')
  getCustomers() {
    return this.customerService.findCustomers();
  }
  @Get('customer/:id')
  async getCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = await this.customerService.findCustomerById(id);
    if (customer) res.send(customer);
    else res.status(HttpStatus.NOT_FOUND).json({ error: 'Customer not found' });
  }
  @Get('search/:id')
  async searchCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findCustomerById(id);
    if (customer) return customer;
    else {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }
}
