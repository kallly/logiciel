import express from 'express';
import { router as userRouter } from "./routes/user";

const fs = require('fs');
const https = require('https');

const app = express();
const port = 8092;

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

app.use('/user', userRouter);