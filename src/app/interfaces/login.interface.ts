interface ResultTokenI{
    status:boolean
    message:string
    token?:string
}
interface LoginI{
    email:string;
    password:string;
}

export{
    ResultTokenI,
    LoginI
}
