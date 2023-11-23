

export interface TUserName{ 
        firstName: string;
        lastName: string;
}

export interface TUserAddress{
    street: string;
    city: string;
    country: string;
}


export interface TUser{
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies : string[];
    address: TUserAddress;
}