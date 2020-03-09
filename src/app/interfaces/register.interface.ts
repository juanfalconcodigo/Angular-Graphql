import { UserI } from './user.interface';

interface RegisterResultI{
    status:boolean;
    message:string;
    user?: UserI
}

export{
    RegisterResultI
}