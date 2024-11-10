import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';

import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  BANK_DETAILS_DTO,
  CreateEmployeeDto,
  EmployeeAddressDto,
  EmployeeLoginDto,
} from './dto';

@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get(':id')
  getEmployee(@Param(':id') id: string) {
    return this.employeesService.getEmployeeById(id);
  }

  @Post('/signup')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.signUp(createEmployeeDto);
  }

  @Post('/login')
  login(@Body() EmployeeLoginDto: EmployeeLoginDto) {
    return this.employeesService.login(EmployeeLoginDto);
  }

  @Post('/address')
  address(@Body() body: EmployeeAddressDto) {
    return this.employeesService.employeeAddress(body);
  }

  @Post('/bank')
  bank(@Body() body: BANK_DETAILS_DTO) {
    return this.employeesService.employeeBankDetails(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
