export class CreateCertificateDTO {
    staff_id: number;
    certificate_type: string
    certificate_url: string
    issue_date: Date
    expiry_date: Date
}