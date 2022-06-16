import { Router } from 'express';
import { default_response, default_error } from '../tools/IResponse';
import OrderController from '../controllers/order';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = Router();

router.get('/', auth, verif_user,(req:any, res:any) => {
    const controller = new OrderController();
    controller.getOrder(req.headers.authorization.split(' ')[1]).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});
/*
router.post('/', (req:any, res:any) => {
    const controller = new OrderController();
    controller.getOrderBy(req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});*/

router.put('/create', auth, verif_user, (req:any, res:any) => {
    const controller = new OrderController();
    controller.createOrder(req.headers.authorization.split(' ')[1],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});
/*
router.put('/update/:id', auth, verif_user, (req:any, res:any) => {
    const controller = new OrderController();
    controller.updateOrder(req.headers.authorization.split(' ')[1],req.params.id,req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});

router.delete('/delete/:id', (req:any, res:any) => {
    const controller = new OrderController();
    controller.deleteOrder(req.headers.authorization.split(' ')[1],req.params.id).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});*/