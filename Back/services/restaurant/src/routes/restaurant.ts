import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import RestaurantController from '../controllers/restaurant';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = express.Router();

router.get('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:restaurant", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.getRestaurant().then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.post('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:restaurant", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.getRestaurantBy(req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.put('/create', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:restaurant/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.createRestaurant(req.jwt.id,req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.put('/update', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:restaurant/update", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.updateRestaurant(req.jwt.id, req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.delete('/delete', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "delete:restaurant", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.deleteRestaurant(req.jwt.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});