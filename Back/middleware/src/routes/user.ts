

import { Router } from 'express';
import UserController from '../controllers/user';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = Router();

/**
 * @swagger
 * components:  
 *  schemas:
 *      response_user:
 *          properties:
 *              status:
 *                  type: string
 *              user: 
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                      last_name:
 *                          type: string
 *                      first_name:
 *                          type: string
 *                      type:
 *                          type: string
 *          example:
 *              status: success
 *              user:
 *                  id: 42
 *                  last_name: test
 *                  first_name: test
 *                  type: livreur
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
 *                          properties:
 *                              status:
 *                                  type: string
 *                              user:
 *                                  $ref: '#/components/schemas/response_user'
 */
router.get('/', auth, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.getUser(req.headers['x-request-id'], req.headers.authorization.split(' ')[1]).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
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
    const log: Logger = new Logger({ name: "put:user/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.createUser(req.headers['x-request-id'], req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
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
 *      security:
 *          - bearerAuth: []
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
    const log: Logger = new Logger({ name: "put:user/update", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.updateUser(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});

/**
 * @swagger
 * /user:
 *  delete:
 *      tags: 
 *          - user
 *      summary: To login     
 *      security:
 *          - bearerAuth: []
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
router.delete('/', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "delete:user", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new UserController();
    controller.deleteUser(req.headers['x-request-id'], req.headers.authorization.split(' ')[1]).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    });
});