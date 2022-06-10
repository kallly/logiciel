import jwt_verif from './tools/jwt_verif';
import http_verif_user from './tools/http_verif_user';
import { mongoConnect } from './tools/mongo';
import { router as menuRouter } from "./routes/menu";
import { create_menu } from './menu/create_menu';
const express = require('express');

var fs = require('fs');
var https = require('https');

const app = express();
const port = 8093;

app.use(
    express.urlencoded({
      extended: true,
    })
  );
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

app.use('/menu',menuRouter);