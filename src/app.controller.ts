import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSome(): string {
    return `Test1`;
  }
  test(): string {
    return `Test2`;
  }
}
