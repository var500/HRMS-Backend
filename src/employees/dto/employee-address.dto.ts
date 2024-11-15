import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

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
  @Length(6)
  pincode: string;
}
