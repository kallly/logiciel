import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import MenuController from '../controllers/menu';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';

export const router = express.Router();

router.use('/',auth);
router.get('/', (req:any, res:any) => {
    const controller = new MenuController();
    controller.getMenu(parseCookies(req)['jwt']).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});