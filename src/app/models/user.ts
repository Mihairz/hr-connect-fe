export class User {
    id?: number;
    firstName: string = '';
    lastName: string = '';
    joinDate?: Date;
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
    street: string = '';
    streetNumber: string = '';
    flatNumber: string = '';
    // apartment: string = '';
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
    issuingDate?: Date;
}
