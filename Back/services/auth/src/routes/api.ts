import express from 'express';
import LoginController from '../controllers/api';
import { Logger } from 'tslog';

export let router = express.Router();

router.post('/login', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:login", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new LoginController();
    controller.login(req.body.json()).then((response) => {
        log.info('Send response');
        res.status(response.code);
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});