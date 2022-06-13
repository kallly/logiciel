import express from 'express';
import LoginController from '../controllers/api';
import { default_response, default_error } from '../tools/IResponse';

export let router = express.Router();

router.post('/login', (req:any, res:any) => {
    const controller = new LoginController();
    controller.login(req.body.json()).then((response) => {
        default_response(res,response);
    }).catch((e) => {
        default_error(res,e);
    });
});