export interface LoginForm{

    email: string;
    password: string;
    
}

export interface CreatePost{

    title: string;
    body: string;
}

export interface RegisterForm{                         
    name: string;                              
    email: string;                              
    password: string;
    password_confirmation: string;
}

export interface user{
    id:number;
    name:string;
    email:string;
}