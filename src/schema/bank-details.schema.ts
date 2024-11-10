import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Employee } from './employees.schema';

export type BankDocument = HydratedDocument<BankDetails>;
@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class BankDetails {
  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  ifsc: string;

  @Prop({ required: true })
  branch: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees',
    required: true,
  })
  employeeId: Employee;
}

export const BankSchema = SchemaFactory.createForClass(BankDetails);
