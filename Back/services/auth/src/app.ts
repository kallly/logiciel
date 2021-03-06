import { router as userRouter } from "./routes/user";
import express from 'express';
import fs from 'fs';
import https from 'https';
import cookieParser from 'cookie-parser';


const app = express();
const port = 8091;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


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