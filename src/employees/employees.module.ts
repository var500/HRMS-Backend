import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from 'src/schema/employees.schema';
import { AddressSchema } from 'src/schema/address.schema';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    MongooseModule.forFeature([{ name: 'employees', schema: EmployeeSchema }]),
    MongooseModule.forFeature([{ name: 'address', schema: AddressSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'employees', schema: EmployeeSchema }]),
    MongooseModule.forFeature([{ name: 'address', schema: AddressSchema }]),
  ],
})
export class EmployeesModule {}
