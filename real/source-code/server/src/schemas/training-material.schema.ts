import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TrainingMaterialDocument = HydratedDocument<TrainingMaterial>;

@Schema()
export class TrainingMaterial {
    @Prop({ required: true })
    staff_id: number;

    @Prop()
    file_url: string

    @Prop()
    date: Date
}

export const TrainingMaterialSchema = SchemaFactory.createForClass(TrainingMaterial)