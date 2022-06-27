import { connect } from 'mongoose';

export async function mongoConnect(): Promise<any> | never{
    try{
        await connect('mongodb://user:Groupe1?!GG@mongo:27017/product?authSource=admin');
    }catch(e){
        throw e;
    }
}