import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class EmployeeAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  landmark: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @MinLength(6)
  pincode: number;
}
