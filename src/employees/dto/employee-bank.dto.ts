import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BANK_DETAILS_DTO {
  @ApiProperty()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  ifsc: string;

  @ApiProperty()
  @IsNotEmpty()
  branch: string;
}
