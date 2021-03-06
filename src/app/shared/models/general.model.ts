import { constants } from "src/config/constants";


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

export interface IReward {
	type : keyof typeof constants.REWARD
}


export interface Pagination {
	totalPage : number,
	page : number,
	pageSize : number,
	next : number,
	prev : number
}