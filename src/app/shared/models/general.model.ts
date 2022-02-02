export interface APIResponse<IData = any> {
    status : number,
    success : boolean,
    message : string,
    data : IData
}

export interface ICountry {
    code : string,
    name : string
}