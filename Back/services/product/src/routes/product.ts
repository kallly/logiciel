import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import ProductController from '../controllers/product';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = express.Router();

router.get('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:product", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.getProduct().then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.post('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:product", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.getProductBy(req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.put('/create', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:product/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.createProduct(req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.put('/update/:id', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:product/update", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.updateProduct(req.params.id, req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

router.delete('/delete/:id', auth,verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "delete:product", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.deleteProduct(req.params.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});