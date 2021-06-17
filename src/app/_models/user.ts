export class User {
    id: number;
    firstname: string;
    lastname: string;
    gender: boolean;
    birthday: Date;
    picture: string;
    email: string;
    password: string;
    
    authdata?: string;
}