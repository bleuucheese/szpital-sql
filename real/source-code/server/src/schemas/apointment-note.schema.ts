import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AppointmentNoteDocument = HydratedDocument<AppointmentNote>;

@Schema()
export class AppointmentNote {
    @Prop({ required: true })
    appointment_id: number;

    @Prop()
    content: string;

    @Prop()
    note_type: string;

    @Prop()
    date: Date;
}

export const AppointmentNoteSchema = SchemaFactory.createForClass(AppointmentNote);