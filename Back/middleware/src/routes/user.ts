

import { Router } from 'express';
import { default_response, default_error } from '../tools/IResponse';
import UserController from '../controllers/user';
import parseCookies from '../tools/parseCookies';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';

export const router = Router();

/**
 * @swagger
 * components:  
 *  schemas:
 *      response_user:
 *          properties:
 *              id:
 *                  type: integer
 *              last_name:
 *                  type: string
 *              first_name:
 *                  type: string
 *              type:
 *                  type: string
 *          example:
 *              id: 42
 *              last_name: test
 *              first_name: test
 *              type: livreur
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
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_user'
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

/**
 * @swagger
 * components:  
 *  schemas:
 *      request_create:
 *          properties:
 *              last_name:
 *                  type: string
 *              first_name:
 *                  type: string
 *              password:
 *                  type: string
 *              address:
 *                  type: string
 *              email:
 *                  type: string
 *              phone_number:
 *                  type: string
 *              type:
 *                  type: string
 *          example:
 *              last_name: test
 *              first_name: test
 *              password: test
 *              address: test
 *              email: test
 *              phone_number: 0666666666
 *              type: livreur
 *          required:
 *              - last_name
 *              - first_name
 *              - password
 *              - address
 *              - email
 *              - phone_number
 *              - type
 * /user/create:
 *  put:
 *      tags: 
 *          - user
 *      summary: To login
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/request_create'
 *      responses:
 *          '200':
 *              description: Created
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              status:
 *                                  type: string
 */
router.put('/create', (req:any, res:any) => {
    const controller = new UserController();
    controller.createUser(req.body).then((response) => {
        //res.writeHead(response.code, response.header);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    });
});

/**
 * @swagger
 * components:  
 *  schemas:
 *      request_create:
 *          properties:
 *              last_name:
 *                  type: string
 *              first_name:
 *                  type: string
 *              password:
 *                  type: string
 *              address:
 *                  type: string
 *              phone_number:
 *                  type: string
 *          example:
 *              first_name: test_changed
 * /user/update:
 *  put:
 *      tags: 
 *          - user
 *      summary: To login
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/request_create'
 *      responses:
 *          '200':
 *              description: Created
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              status:
 *                                  type: string
 */
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