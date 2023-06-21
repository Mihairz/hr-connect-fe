export class UserRequest {
    id?: number = 0;
    requesterID:number = 0;
    type:string = '';
    details:string = '';
    requestDate?:Date;
    finishDate?:Date;
    Status:string = '';
    responderID:number = 0;
}