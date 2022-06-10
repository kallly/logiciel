

import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import UserController from '../controllers/user';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';

export const router = express.Router();

router.use('/',auth);
router.get('/', (req:any, res:any) => {
    const controller = new UserController();
    controller.getUser(parseCookies(req)['jwt']).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});

router.use('/create',auth);
router.put('/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(parseCookies(req)['jwt'],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});