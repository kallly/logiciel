
import { get_user } from "./get_user";
import { create_user } from "./create_user";
import { update_user } from "./update_user";
import { delete_user } from "./delete_user";
import { verif_user } from "./verif_user";

export class User {
	id: number
	last_name: string
	first_name: string
	password: string
	address: string
	email: string
	phone_number: string
	type?: string

	constructor(id:number|null, last_name: string, first_name: string, password: string, address: string, email: string, phone_number: string, type: string);
	constructor(id:number, last_name: string, first_name: string, password: string, address: string, email: string, phone_number: string);
	constructor(id:number, last_name: string, first_name: string, password: string, address: string, email: string, phone_number: string, type?: string) {
		this.id = id;
		this.last_name = last_name;
		this.first_name = first_name;
		this.password = password;
		this.address = address;
		this.email = email;
		this.phone_number = phone_number;
		this.type = type;
	}

	full(): boolean {
		if(this.last_name == undefined || this.first_name == undefined || this.password == undefined || this.address == undefined || this.email == undefined || this.phone_number == undefined || this.type == undefined){
				return false;
		}
		else{
				return true;
		}
	}

	empty(): boolean {
		if(this.last_name == undefined && this.first_name == undefined && this.password == undefined && this.address == undefined && this.email == undefined && this.phone_number == undefined && this.type == undefined){
				return false;
		}
		else{
				return true;
		}
	}

	static async create_user(user:User){						return await create_user(	user);	}
	static async delete_user(id:number){						return await delete_user(	id);	}
	static async get_user(id:number): Promise<any> | never{		return await get_user(		id);	}
	static async update_user(user:User){						return await update_user(	user);	}
	static async verif_user(jwt:string): Promise<any> | never{	return await verif_user(		jwt);	}

	async create_user(){						return await create_user(	this);		}
	async delete_user(){						return await delete_user(	this.id);	}
	async get_user(): Promise<any> | never{		return await get_user(		this.id);	}
	async update_user(){						return await update_user(	this);		}
}