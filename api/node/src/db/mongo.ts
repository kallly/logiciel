import { connect } from 'mongoose';

export async function mongoConnect(): Promise<any> | never{
    try{
        await connect('mongodb://user:Groupe1@localhost:27017/menu?authSource=admin');
    }catch(e){
        throw e;
    }
}