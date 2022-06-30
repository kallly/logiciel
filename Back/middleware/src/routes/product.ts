import { Router } from 'express'
import ProductController from '../controllers/product';
import auth from '../tools/auth';
import verif_user from '../tools/verif_user';
import { Logger } from 'tslog';

export const router = Router();

/**
 * @swagger
 * components:  
 *  schemas:
 *      response_product:
 *          properties:
 *              status:
 *                  type: string
 *              message: 
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: integer
 *                          restaurant:
 *                              type: string
 *                          name:
 *                              type: string
 *                          text:
 *                              type: string
 *                          price:
 *                              type: integer
 *          example:
 *              status: success
 *              message:
 *                  - _id: 42
 *                    restaurant: test
 *                    name: test
 *                    text: test
 *                    price: 42
 * /product:
 *  get:
 *      tags: 
 *          - product
 *      summary: Get product
 *      responses:
 *          '200':
 *              description: Product
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_product'
 */
router.get('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "get:product", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.getProduct(req.headers['x-request-id']).then((response) => {
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
 *      request_get_product:
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
 * /product:
 *  post:
 *      tags: 
 *          - product
 *      summary: Get product
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/request_get_product'
 *      responses:
 *          '200':
 *              description: Product
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_product'
 */
router.post('/', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "post:product", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.getProductBy(req.headers['x-request-id'], req.body).then((response) => {
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
 *      create_product:
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
 * /product/create:
 *  put:
 *      tags: 
 *          - product
 *      summary: Create product
 *      security:
 *          - bearerAuth: []
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/create_product'
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
    const log: Logger = new Logger({ name: "put:product/create", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.createProduct(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.body).then((response) => {
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
 *      update_product:
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
 * /product/update/{id}:
 *  put:
 *      tags: 
 *          - product
 *      summary: Update product
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
 *                    $ref: '#/components/schemas/update_product'
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
router.put('/update/:id', auth, verif_user, (req:any, res:any) => {
    const log: Logger = new Logger({ name: "put:product/update", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.updateProduct(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.params.id,req.body).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});

/**
 * @swagger
 * /product/{id}:
 *  delete:
 *      tags: 
 *          - product
 *      summary: Delete product 
 *      security:
 *          - bearerAuth: []      
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
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
router.delete('/delete/:id', (req:any, res:any) => {
    const log: Logger = new Logger({ name: "delete:product", requestId:req.headers['x-request-id'] });
    log.info("start");
    const controller = new ProductController();
    controller.deleteProduct(req.headers['x-request-id'], req.headers.authorization.split(' ')[1],req.params.id).then((response) => {
        log.info('Send response');
        res.send(response.message);
    }).catch((e) => {
        log.error(e);
        res.send({status:'error'});
    })
});