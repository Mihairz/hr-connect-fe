export class UserRequest {
    id?: number = 0;
    requesterID: number = 0;
    type: string = '';
    details: string = '';
    requestDate?: Date;
    finishDate?: Date;
    status: string = '';
    responderID: number = 0;

    name:string = '';
    country:string = '';
    county:string = '';
    city:string = '';
    addressLine:string = '';
    CNP: string = '';
    series: string = ''
    // idNumber: this.employeeCertificateForm.value.idNumber,
    // issuingAuthority: this.employeeCertificateForm.value.issuingAuthority,
    // idReleaseDate: this.employeeCertificateForm.value.idReleaseDate,
    // joinDate: new Date(), // to modify
    // jobTitle: this.employeeCertificateForm.value.jobTitle,
    // reason: this.employeeCertificateForm.value.reason,
}