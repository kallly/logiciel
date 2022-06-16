

import { Router } from 'express';
import { default_response, default_error } from '../tools/IResponse';
import UserController from '../controllers/user';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = Router();

/**
 * @swagger
 * /user:
 *  get:
 *      tags: 
 *          - user
 *      summary: Get user          
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          '200':
 *              description: Great Password      
 */
router.get('/', auth, (req:any, res:any) => {
    const controller = new UserController();
    controller.getUser(req.headers.authorization.split(' ')[1]).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(req.headers.authorization.split(' ')[1],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.put('/update', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.updateUser(req.headers.authorization.split(' ')[1],req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

router.delete('/', auth, verif_user, (req:any, res:any) => {
    const controller = new UserController();
    controller.deleteUser(req.headers.authorization.split(' ')[1]).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});