import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Notes {
  @Prop()
  note: string;

  @Prop()
  email: string;

  @Prop()
  created_at: number;

  @Prop()
  updated_at: number;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
