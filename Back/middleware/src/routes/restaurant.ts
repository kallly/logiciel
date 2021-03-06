import { Router } from 'express'
import RestaurantController from '../controllers/restaurant';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = Router();

/**
 * @swagger
 * components:  
 *  schemas:
 *      response_restaurant:
 *          properties:
 *              status:
 *                  type: string
 *              restaurant: 
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: integer
 *                      restaurant:
 *                          type: string
 *                      name:
 *                          type: string
 *                      text:
 *                          type: string
 *                      price:
 *                          type: integer
 *          example:
 *              status: success
 *              restaurant:
 *                  _id: 42
 *                  restaurant: test
 *                  name: test
 *                  text: test
 *                  price: 42
 * /restaurant:
 *  get:
 *      tags: 
 *          - restaurant
 *      summary: Get restaurant
 *      responses:
 *          '200':
 *              description: Restaurant
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_restaurant'
 */
router.get('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:restaurant", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.getRestaurant(req.headers['x-request-id']).then((response) => {
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
 *      request_get_restaurant:
 *          properties:
 *              restaurant:
 *                  type: string
 *              name:
 *                  type: string
 *              text:
 *                  type: string
 *              price:
 *                  type: integer
 *          example:
 *              restaurant: test
 *              name: test
 *              text: test
 *              price: 42
 * /restaurant:
 *  post:
 *      tags: 
 *          - restaurant
 *      summary: Get restaurant
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/request_get_restaurant'
 *      responses:
 *          '200':
 *              description: Restaurant
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_restaurant'
 */
router.post('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:restaurant", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.getRestaurantBy(req.headers['x-request-id'], req.body).then((response) => {
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
 *      create_restaurant:
 *          properties:
 *              restaurant:
 *                  type: string
 *              name:
 *                  type: string
 *              text:
 *                  type: string
 *              price:
 *                  type: integer
 *          require:
 *              - restaurant
 *              - name
 *              - text
 *              - price
 *          example:
 *              restaurant: test
 *              name: test
 *              text: test
 *              price: 42
 * /restaurant/create:
 *  put:
 *      tags: 
 *          - restaurant
 *      summary: Create restaurant
 *      security:
 *          - bearerAuth: []
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/create_restaurant'
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
    const log: Logger = new Logger({ name: "put:restaurant/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.createRestaurant(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.body).then((response) => {
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
 *      update_restaurant:
 *          properties:
 *              restaurant:
 *                  type: string
 *              name:
 *                  type: string
 *              text:
 *                  type: string
 *              price:
 *                  type: integer
 *          example:
 *              restaurant: test1
 *              name: test1
 *              text: test1
 *              price: 42
 * /restaurant/update/{id}:
 *  put:
 *      tags: 
 *          - restaurant
 *      summary: Update restaurant
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/update_restaurant'
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
 */
router.put('/update', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:restaurant/update", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.updateRestaurant(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});

/**
 * @swagger
 * /restaurant/{id}:
 *  delete:
 *      tags: 
 *          - restaurant
 *      summary: Delete restaurant 
 *      security:
 *          - bearerAuth: []      
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          '200':
 *              description: Deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              status:
 *                                  type: string
 */
router.delete('/delete', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "delete:restaurant", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new RestaurantController();
    controller.deleteRestaurant(req.headers['x-request-id'], req.headers.authorization.split(' ')[1]).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});