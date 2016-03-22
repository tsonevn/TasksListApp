export class Config{
    static _UserToken: string;
    private _AppID:string;
    constructor(){
        this._AppID = "iam6bndxrued7vy0";
    }
    invalidateToken(){
		Config._UserToken = "";
	}
    get userToken():string{
        return Config._UserToken;
    }
    set userToken(tmpToken:string){
        Config._UserToken = tmpToken;
    }
    
    get appID():string{
        return this._AppID;
    }  
};
