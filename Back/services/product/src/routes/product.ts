import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import ProductController from '../controllers/product';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = express.Router();

router.get('/', (req:any, res:any) => {
    const controller = new ProductController();
    controller.getProduct().then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.post('/', (req:any, res:any) => {
    const controller = new ProductController();
    controller.getProductBy(req.body).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log(e);
        res.send(JSON.stringify({status:'error'}));
    });
});

router.put('/create', auth,verif_user,(req:any, res:any) => {
    const controller = new ProductController();
    controller.createProduct(req.body).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log(e);
        res.send(JSON.stringify({status:'error'}));
    });
});

router.put('/update/:id', auth,verif_user,(req:any, res:any) => {
    const controller = new ProductController();
    controller.updateProduct(req.params.id, req.body).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log(e);
        res.send(JSON.stringify({status:'error'}));
    });
});

router.delete('/delete/:id', auth,verif_user,(req:any, res:any) => {
    const controller = new ProductController();
    controller.deleteProduct(req.params.id).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log(e);
        res.send(JSON.stringify({status:'error'}));
    });
});