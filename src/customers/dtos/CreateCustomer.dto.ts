import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './Address.dto';

export class CreateCustomerDto {
  // Validation
  @IsNumberString()
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  // Validate Nested objects, require all 3
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
