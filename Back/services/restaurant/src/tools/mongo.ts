import { connect } from 'mongoose';

export async function mongoConnect(): Promise<any> | never{
    try{
        await connect('mongodb://user:'+encodeURIComponent('Groupe1!GG')+'@mongo:27017/restaurant?authSource=admin');
    }catch(e){
        throw e;
    }
}