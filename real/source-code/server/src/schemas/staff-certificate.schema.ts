import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StaffCertificateDocument = HydratedDocument<StaffCertificate>;

@Schema()
export class StaffCertificate {
    @Prop({ required: true })
    staff_id: number;

    @Prop()
    certificate_type: string

    @Prop()
    certificate_url: string

    @Prop()
    issue_date: Date

    @Prop()
    expiry_date: Date
}

export const StaffCertificateSchema = SchemaFactory.createForClass(StaffCertificate)