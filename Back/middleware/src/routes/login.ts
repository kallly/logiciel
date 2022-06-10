

import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import LoginController from '../controllers/login';

export const router = express.Router();

router.post('/', (req:any, res:any) => {
    console.log(req.body);
    const controller = new LoginController();
    controller.login(req.body).then((response) => {
        //res.writeHead(200, {'Content-Type': 'application/json','Set-Cookie': [`jwt=${response.message}`]});
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});