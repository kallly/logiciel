import express from 'express';
import LoginController from '../controllers/login';
import { default_response, default_error } from '../tools/IResponse';

export let router = express.Router();

router.post('/', (req:any, res:any) => {
    const controller = new LoginController();
    controller.login(req.body.email,req.body.password).then((response) => {
        default_response(res,response);
    }).catch((e) => {
        default_error(res,e);
    });
});