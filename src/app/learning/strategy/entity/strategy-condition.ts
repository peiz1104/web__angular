import { Site } from "app/system/entity/site";
import { UserGroup } from "app/system/entity/user-group";
import { User } from "app/system/entity/user";

export class StrategyCondition {
	id:number;
	valueId:number;
	site:Site;
	userGroup:UserGroup; 
	description:string;
	name:string;
	type:string;
	sortOrder:number;
	code:string;
	unitOne:string;
    unitTwo:string;
	valueOne:number;
	valueTwo:number;
	checked: boolean;
}
