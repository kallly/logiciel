import express from 'express';
import { Logger } from 'tslog';
import OrderController from '../controllers/order';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = express.Router();

router.get('/', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:order", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getOrder().then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.put('/create', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:order/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.createOrder(req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});