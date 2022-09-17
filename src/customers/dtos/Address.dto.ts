import { IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  lane1: string;

  lane2?: string;

  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  country: string;
}
