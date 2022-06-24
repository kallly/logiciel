import { Router } from 'express';
import OrderController from '../controllers/order';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = Router();

/**
 * @swagger
 * components:  
 *  schemas:
 *      response_order:
 *          properties:
 *              status:
 *                  type: string
 *              message: 
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: integer
 *                      date:
 *                          type: date
 *                      user:
 *                          type: integer
 *                      restaurant:
 *                          type: string
 *                      status:
 *                          type: string
 *                      price:
 *                          type: integer
 *                      products:
 *                          type: array
 *                          items:
 *                              type: string
 *                              
 *          example:
 *              status: success
 *              order:
 *                  _id: 42
 *                  date: 2022-06-14T14:46:44.000Z
 *                  user: 1
 *                  restaurant: 629e33b5ce218b10d2d7a257
 *                  status: Order created
 *                  price: 42
 *                  products: [629e33b5ce218b10d2d7a257,629e33b5ce218b10d2d7a257]
 * /order:
 *  get:
 *      tags: 
 *          - order
 *      summary: Get order
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          '200':
 *              description: Order
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_order'
 */
router.get('/', auth, verif_user,(req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:order", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1]).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});

/**
 * @swagger
 * components:  
 *  schemas:
 *      request_get_order:
 *          properties:
 *              user:
 *                  type: integer
 *              restaurant:
 *                  type: string
 *              price:
 *                  type: integer
 *          example:
 *              user: 1
 *              restaurant: 629e33b5ce218b10d2d7a257
 *              price: 42
 * /order:
 *  post:
 *      tags: 
 *          - order
 *      summary: Get order
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/request_get_order'
 *      responses:
 *          '200':
 *              description: Order
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_order'
 */
router.post('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:order", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.getOrderBy(req.headers['x-request-id'], req.headers.authorization.split(' ')[1], req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});

/**
 * @swagger
 * components:  
 *  schemas:
 *      create_order:
 *          properties:
 *              user:
 *                  type: string
 *              restaurant:
 *                  type: string
 *              products:
 *                  type: array
 *                  items:
 *                      type: string
 *          require:
 *              - user
 *              - restaurant
 *              - products
 *          example:
 *              user: 1
 *              restaurant: 629e33b5ce218b10d2d7a257
 *              products: [629e33b5ce218b10d2d7a257,629e33b5ce218b10d2d7a257]
 * /order/create:
 *  put:
 *      tags: 
 *          - order
 *      summary: Create order
 *      security:
 *          - bearerAuth: []
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/create_order'
 *      responses:
 *          '200':
 *              description: Done
 *              content:
 *                  application/json:
 *                      schema:
 *                          status: 
 *                              type: string
 *                          example:
 *                              status: success
 *          
 */
router.put('/create', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:order/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new OrderController();
    controller.createOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});
/*
router.put('/update/:id', auth, verif_user, (req:any, res:any) => {
    const controller = new OrderController();
    controller.updateOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.params.id,req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});

router.delete('/delete/:id', (req:any, res:any) => {
    const controller = new OrderController();
    controller.deleteOrder(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.params.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});*/