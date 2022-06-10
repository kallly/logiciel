import { mongoConnect } from '../tools/mongo';
import { Menu } from './menu';

export async function create_menu(): Promise<any> | never{
    await mongoConnect().then(async() => {

        const menu = new Menu({
            name: 'Bill',
            text: 'text_______________',
        });
        return await menu.save().catch((e) => {throw e;});
    }).catch((e) => {throw e;});
}