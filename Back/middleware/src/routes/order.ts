import { Router } from 'express';
import { default_response, default_error } from '../tools/IResponse';
import OrderController from '../controllers/order';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = Router();

router.get('/', auth, verif_user,(req:any, res:any) => {
    const controller = new OrderController();
    controller.getOrder(parseCookies(req)['jwt']).then((response) => {
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
    controller.createOrder(parseCookies(req)['jwt'],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});
/*
router.put('/update/:id', auth, verif_user, (req:any, res:any) => {
    const controller = new OrderController();
    controller.updateOrder(parseCookies(req)['jwt'],req.params.id,req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});

router.delete('/delete/:id', (req:any, res:any) => {
    const controller = new OrderController();
    controller.deleteOrder(parseCookies(req)['jwt'],req.params.id).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});*/