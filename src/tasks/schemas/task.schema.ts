import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document, model } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ default: 'pending' })
  status: string;
  
  @Prop()
  userId: string; // Add userId field to associate task with its creator

}

export const TaskSchema = SchemaFactory.createForClass(Task);
