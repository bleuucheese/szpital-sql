import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DiagnosticImageDocument = HydratedDocument<DiagnosticImage>;

@Schema()
export class DiagnosticImage {
    @Prop({ required: true })
    procedure_id: number;

    @Prop()
    image_type: string

    @Prop()
    image_url: string

    @Prop()
    date_taken: Date
}

export const DiagnosticImageSchema = SchemaFactory.createForClass(DiagnosticImage)