

import { Router } from 'express';
import { default_response, default_error } from '../tools/IResponse';
import UserController from '../controllers/user';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = Router();

router.get('/', auth, (req:any, res:any) => {
    const controller = new UserController();
    controller.getUser(parseCookies(req)['jwt']).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(parseCookies(req)['jwt'],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/update', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.updateUser(parseCookies(req)['jwt'],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.delete('/', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.deleteUser(parseCookies(req)['jwt']).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});