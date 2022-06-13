import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import MenuController from '../controllers/menu';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = express.Router();

router.get('/', (req:any, res:any) => {
    const controller = new MenuController();
    controller.getMenu().then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/', auth,verif_user,(req:any, res:any) => {
    const controller = new MenuController();
    controller.createMenu().then(() => {
        res.send('done');
    }).catch((e) => {
        default_error(res, e);
    });
});