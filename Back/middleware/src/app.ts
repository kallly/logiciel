import express from 'express';
import { router as loginRouter } from "./routes/login";
import { router as userRouter } from "./routes/user";
import { router as menuRouter } from "./routes/menu";

var fs = require('fs');
var https = require('https');

const app = express();
const port = 443;

app.use(express.json());

const httpsServer = https.createServer({
    key: fs.readFileSync("../ssl/key.pem"),
    cert: fs.readFileSync("../ssl/cert.pem"),
  },
  app
);
httpsServer.listen(port, () => {
    console.log(`Application écoute sur le port ${port}!`);
});

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


