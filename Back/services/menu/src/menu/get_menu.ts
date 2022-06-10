import { mongoConnect } from '../tools/mongo';
import { Menu } from './menu';

export async function get_menu(): Promise<any> | never{
    return await mongoConnect().then(async() => {
        return await Menu.find().catch((e) => {throw e;})
    }).catch((e) => {throw e;})
}