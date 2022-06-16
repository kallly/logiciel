

import { Router } from 'express';
import { default_response, default_error } from '../tools/IResponse';
import LoginController from '../controllers/login';

export const router = Router();

/**
 * @swagger
 * components:  
 *  schemas:
 *      request_login:
 *          properties:
 *              email:
 *                  type: string
 *                  description: email  
 *              password:
 *                  type: string
 *                  description: the password
 *          example:
 *              email: test
 *              password: test    
 *          required:
 *              - email
 *              - password
 *      response_jwt:
 *          properties:
 *              status:
 *                  type: string
 *                  description: status  
 *              jwt:
 *                  type: string
 *                  description: jwt
 *          example:
 *              status: success
 *              description: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImxhc3RfbmFtZSI6InRlc3QiLCJhZGRyZXNzIjoidGVzdCIsInBob25lX251bWJlciI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJyb2xlIjoibGl2cmV1ciIsImlhdCI6MTY1NTM3MjU3OSwiZXhwIjoxNjU1NDE1Nzc5LCJhdWQiOiJBTEVYSVMiLCJpc3MiOiJNQVJHQVVYIiwic3ViIjoiR0FCUklFTExFIn0.EubRGX0lYACPEhm7KpmFimSH0uehALMQWos3C3ubv56Rnx9Bx-WiCjzAEC2b4WE_DLho3aswFXsLfPf-ylBa3gDqDjilAOwGOk4z1dYtik1oOP3HUXRZLf0EsvPuyd_VBF2hvxiLWCJMATePi7XidOCMfIQe1uJtiuc3AG0MuPbzuttdDNk09O-r2aQWpBR4SNyRwMDv-BUmxCtEiB4-hMJyOp199VDZKY2LCk_Pm7mKEtaikACSyIUv2muO6P4TjGr0zPvcQY2MbEwzfzbTJXUc2QY39qS8lSZwd1NL_VToTU8Zp9vsNHobNOwiE-F2SU6U1SzMOSzmoeU5Y9V8hA    
 *      response_badpass:
 *          properties:
 *              status:
 *                  type: string
 *                  description: status  
 *              message:
 *                  type: string
 *                  description: message
 *          example:
 *              status: success
 *              message: email or password is wrong
 * /login:
 *  post:
 *      tags: 
 *          - auth
 *      summary: To login
 *      requestBody:  
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/request_login'
 *      responses:
 *          '200':
 *              description: Great Password
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_jwt'
 *          '403':
 *              description: Bad Password
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/response_badpass'
 */
router.post('/', (req:any, res:any) => {
    const controller = new LoginController();
    controller.login(req.body).then((response) => {
        res.status(response.code);
        res.send(response.message);
    }).catch((e) => {
        default_error(res, e);
    })
});