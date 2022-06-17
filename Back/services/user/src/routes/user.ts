import express from 'express';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import UserController from '../controllers/user';
import { Logger } from 'tslog';

export const router = express.Router();

router.get('/', auth, (req:any, res:any, next:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    req.url = req.url.concat(req.jwt.id);
    return next();
});

router.get('/:id', auth, (req:any, res:any, next:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const { id } = req.params;
    if(! parseInt(id,10)){
        return next();
    }
    const controller = new UserController();
    controller.getUser(id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error('get /:id',e);
        res.send({status:'error'});
    });
});

router.get('/verif', auth, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.verifUser(req.headers.authorization.split(' ')[1]).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error('get /verif',e);
        res.send({status:'error'});
    });
});

router.put('/create', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.createUser(req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number, req.body.type).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error('put /create',e);
        res.send({status:'error'});
    });
});

router.put('/update', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.updateUser(req.jwt.id,req.body.last_name, req.body.first_name, req.body.password, req.body.address, req.body.email, req.body.phone_number).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error('put /update',e);
        res.send({status:'error'});
    });
});

router.delete('/', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.deleteUser(req.jwt.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error('delete /',e);
        res.send({status:'error'});
    });
});