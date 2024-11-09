import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeesDocument } from 'src/schema/employees.schema';
import { Messages } from 'src/utils/messages';
import { getHash } from 'src/utils';
import { CreateEmployeeDto, EmployeeAddressDto, EmployeeLoginDto } from './dto';
import { verifyHash } from 'src/utils/helpers';
import { AddressDocument } from 'src/schema/address.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('employees')
    private readonly employeeModel: Model<EmployeesDocument>,
    @InjectModel('address')
    private readonly addressModel: Model<AddressDocument>,
  ) {}
  async signUp(data: CreateEmployeeDto) {
    try {
      const { name, avatar, email, password } = data;

      if (!name || !email || !password || !avatar) {
        throw new BadRequestException(Messages.MISSING_PARAMETER);
      }

      const checkEmployee = await this.employeeModel.findOne({ email });
      if (checkEmployee) {
        return {
          id: checkEmployee.id,
          name: checkEmployee.name,
          email: checkEmployee.email,
          avatar: checkEmployee.avatar,
        };
      }

      const passHash = await getHash(password);

      const emp = await this.employeeModel.create({
        ...data,
        password: passHash,
      });

      return {
        id: emp.id,
        name: emp.name,
        email: emp.email,
        avatar: emp.avatar,
      };
    } catch (err) {
      throw err;
    }
  }

  async login(data: EmployeeLoginDto) {
    try {
      const { email, password } = data;

      if (!email || !password) {
        throw new BadRequestException(Messages.MISSING_PARAMETER);
      }

      const employee = await this.employeeModel
        .findOne({
          email,
        })
        .select('+password');

      if (!employee) {
        throw new UnauthorizedException(Messages.EMPLOYEE_NOT_FOUND);
      }

      const verifyPass = await verifyHash(employee.password, password);

      if (!verifyPass) {
        throw new BadRequestException(Messages.INVALID_PASSWORD);
      }

      return {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        avatar: employee.avatar,
      };
    } catch (err) {
      throw new HttpException((err as Error).message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, {
        new: true,
        runValidators: true,
      })
      .select('-password, -__v')
      .exec();

    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return updatedEmployee;
  }

  async employeeAddress(data: EmployeeAddressDto) {
    const { employeeId, city, landmark, state, pincode } = data;
    const employee = await this.employeeModel.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const address = await this.addressModel.findOneAndUpdate(
      { employeeId }, // Find address by employeeId
      { $set: { city, landmark, state, pincode } },
      { upsert: true, new: true, runValidators: true }, // Create if not exists, return the updated doc
    );

    return address;
  }

  async remove(id: string) {
    const resp = await this.employeeModel.findByIdAndDelete(id);
    if (!resp) {
      throw new NotFoundException(Messages.EMPLOYEE_NOT_FOUND);
    }

    return {
      error: false,
      message: 'User Deleted Succfully',
    };
  }
}
