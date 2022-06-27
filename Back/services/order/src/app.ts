import { router as orderRouter } from "./routes/order";
const express = require('express');

var fs = require('fs');
var https = require('https');

const app = express();
const port = 8094;

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

app.use('/order',orderRouter);