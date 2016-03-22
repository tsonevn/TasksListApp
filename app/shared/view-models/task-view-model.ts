import {VirtualArray} from "data/virtual-array";
import {Observable} from "data/observable";
import {Config} from "../config";

var newConfig = new Config();

export interface Item{
    Content:string,
    Id:string
}
export class Task extends Observable{
    private _content:string;
    private _id:string;
    private _source:Item;
    
    constructor(source:Item){
        super();
        // this._content = tmpContent;
        // this._id = tmpId;
        this._source = source;
        
        if(this._source){
            var property: string;
            for(property in this._source){
                this.set(property, this._source[property]);
            }
        }
    }
    
    get source():Item{
        return this._source;
    }
    //  get content(): string{
    //     return this._content;
    // }
    
    // set content(value: string){
    //     this._content = value;
    //     super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "title", value: value })
    // }
    // get id(): string{
    //     return this._id;
    // }
    
    // set id(value: string){
    //     this._id = value;
    //     super.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "id", value: value })
    // }
}


