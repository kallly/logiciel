import express from 'express';
import { router as loginRouter } from "./routes/login";
import { router as userRouter } from "./routes/user";
import { router as menuRouter } from "./routes/menu";

export const app = express();

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['middleware.ts']
};

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/menu', menuRouter);