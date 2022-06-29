import express from 'express';
import LoginController from '../controllers/user';
import { Logger } from 'tslog';
import auth from '../tools/auth'

export let router = express.Router();

router.post('/login', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:login", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new LoginController();
    controller.login(req.body.email,req.body.password).then((response) => {
        log.info('Send response');
        res.status(response.code);
        res.send(response.message);
    }).catch((e) => {
        log.info(req);
        log.error(e);
        res.send({status:'error'});
    });
});

router.get('/refresh', auth, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:refresh", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new LoginController();
    controller.refresh(req.jwt.email,req.jwt.refresh_token).then((response) => {
        log.info('Send response');
        res.status(response.code);
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});