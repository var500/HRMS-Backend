import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

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

  @Prop({ type: Types.ObjectId, ref: 'employees', required: true })
  employeeId: Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
