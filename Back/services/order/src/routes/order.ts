import express from 'express';
import OrderController from '../controllers/order';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = express.Router();

router.get('/', auth,verif_user,(req:any, res:any) => {
    const controller = new OrderController();
    controller.getOrder().then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        console.log(e);
        res.send(JSON.stringify({status:'error'}));
    });
});

router.put('/create', auth,verif_user,(req:any, res:any) => {
    const controller = new OrderController();
    controller.createOrder(req.body).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log(e);
        res.send(JSON.stringify({status:'error'}));
    });
});