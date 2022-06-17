import express from 'express';
import { router as loginRouter } from "./routes/login";
import { router as userRouter } from "./routes/user";
import { router as productRouter } from "./routes/product";
import { router as orderRouter } from "./routes/order";
import { Logger } from "tslog";
import { randomUUID } from 'crypto';

export const app = express();

app.use(express.json(),(req:any, res:any, next:any) => {req.headers['x-request-id'] = randomUUID();next();});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Library API',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                type: 'http',      
                scheme: 'bearer',
                bearerFormat: 'JWT'
              }
            }
          },
          security: [{
            bearerAuth: []
          }]
    },
    apis: ['routes/*.ts']
};

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);