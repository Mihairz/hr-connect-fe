export class User {
    id?: number;
    firstName: string = '';
    lastName: string = '';
    joinDate?: string;
    phoneNumber: string = '';
    address?: Address;
    department: string = '';
    position:string='';
    loginDetails?: LoginDetails;
    identityCard?: IdentityCard;
}

export class Address {
    id: number = 0;
    country: string = '';
    county: string = '';
    city: string = '';
    addressLine: string = '';
}

export class LoginDetails {
    id: number = 0;
    email: string = '';
    password: string = '';
    role: string = '';
}

export class IdentityCard {
    id: number = 0;
    cnp: string = '';
    number: number = 0;
    series: string = '';
    issuer: string = '';
    issuing_date?: Date;
}
