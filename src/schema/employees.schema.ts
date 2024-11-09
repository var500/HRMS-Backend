import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
