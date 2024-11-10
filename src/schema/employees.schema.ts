import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BankDetails } from './bank-details.schema';
import { Address } from './address.schema';

export type EmployeesDocument = HydratedDocument<Employee>;
@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Employee {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  verified: string;

  @Prop()
  isActive: boolean;

  @Prop()
  dob: string;

  @Prop()
  mobile: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'banks',
  })
  bankDetailsId: BankDetails;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address',
  })
  addressId: Address;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
