import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Employee } from './employees.schema';

export type AddressDocument = HydratedDocument<Address>;
@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Address {
  @Prop()
  city: string;
  @Prop()
  landmark: string;
  @Prop()
  state: string;
  @Prop()
  pincode: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees',
    required: true,
  })
  employeeId: Employee;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
