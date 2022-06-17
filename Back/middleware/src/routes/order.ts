import { Router } from 'express';
import OrderController from '../controllers/order';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = Router();

router.get('/', auth, verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:order", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1]).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});
/*
router.post('/', (req:any, res:any) => {
    const controller = new OrderController();
    controller.getOrderBy(req.headers['x-request-id'], req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});*/

router.put('/create', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:order/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.createOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});
/*
router.put('/update/:id', auth, verif_user, (req:any, res:any) => {
    const controller = new OrderController();
    controller.updateOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.params.id,req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});

router.delete('/delete/:id', (req:any, res:any) => {
    const controller = new OrderController();
    controller.deleteOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.params.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});*/