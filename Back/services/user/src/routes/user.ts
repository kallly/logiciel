import express from 'express';
import { default_response, default_error } from '../tools/IResponse';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import UserController from '../controllers/user';
import parseCookies from '../tools/parseCookies';

export const router = express.Router();

router.get('/', auth, (req:any, res:any, next:any) => {
    req.url = req.url.concat(req.jwt.id);
    return next();
});

router.get('/:id', auth, (req:any, res:any, next:any) => {
    const { id } = req.params;
    if(! parseInt(id,10)){
        console.log(new Error('Error'));
        return next();
    }
    const controller = new UserController();
    controller.getUser(id).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.get('/verif', auth, (req:any, res:any) => {
    const controller = new UserController();
    controller.verifUser(parseCookies(req)['jwt']).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number, req.body.type).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/update', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.updateUser(req.data.id,req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.delete('/', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.deleteUser(req.data.id).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});