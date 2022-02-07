export interface IBasicUser {
    _id : string,
    fn : string,
    ln : string,
    email : string,
    gndr? : boolean,
    yob ?: number, 
    cntry? : string,
}

export interface IRegister extends Omit<IBasicUser, '_id'>{
    pswd : string,
    cnfm_pswd : string,
    recaptcha : boolean
    prvcyPlcy : boolean,
}

export interface ILogin {
    email : string,
    pswd : string,
    recaptcha : boolean
}


export interface IFullUser extends IBasicUser {
    type: string,
    em_verified : boolean,
    ttl_reward : string,
}



class User implements IBasicUser {
    constructor(public _id = "", public fn ="", public ln ="", public email="") {}

    get nm() : string {
        return (this.fn + this.ln? " " + this.ln : "") || "";
    }
}