import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';

import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto, EmployeeAddressDto, EmployeeLoginDto } from './dto';

@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

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
