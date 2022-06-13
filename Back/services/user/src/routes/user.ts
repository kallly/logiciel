import express from 'express';
import { default_error } from '../tools/IResponse';
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
        return next();
    }
    const controller = new UserController();
    controller.getUser(id).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log('get /:id',e);
        res.end(JSON.stringify({status:'error'}));
    });
});

router.get('/verif', auth, (req:any, res:any) => {
    const controller = new UserController();
    controller.verifUser(parseCookies(req)['jwt']).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log('get /verif',e);
        res.end(JSON.stringify({status:'error'}));
    });
});

router.put('/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number, req.body.type).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log('put /create',e);
        res.end(JSON.stringify({status:'error'}));
    });
});

router.put('/update', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.updateUser(req.jwt.id,req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log('put /update',e);
        res.end(JSON.stringify({status:'error'}));
    });
});

router.delete('/', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.deleteUser(req.jwt.id).then((response) => {
        res.send(response.message);
    }).catch((e) => {
        console.log('delete /',e);
        res.end(JSON.stringify({status:'error'}));
    });
});