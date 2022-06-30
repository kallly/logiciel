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

router.put('/update', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:order/update", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.updateOrder(req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.post('/', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:order", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getOrderBy(req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.get('/:id', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:order/:id", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getOrderById(req.params.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.delete('/:id', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "delete:order/:id", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.deleteOrderById(req.params.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});


router.get('/restaurant/:restaurant_id',(req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:order/restaurant/:id", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getStatistics(req.params.restaurant_id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});