import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/createCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get('')
  getCustomers() {
    return this.customerService.findCustomers();
  }
  // Using express req and res method
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
  // Using nestjs method, only Params and returning data
  @Get('search/:id')
  async searchCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findCustomerById(id);
    if (customer) return customer;
    else {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
  }

  // Post by nestjs method
  @Post('create')
  @UsePipes(ValidationPipe)
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    await this.customerService.createCustomer(createCustomerDto);
    return this.customerService.findCustomers();
  }
}
