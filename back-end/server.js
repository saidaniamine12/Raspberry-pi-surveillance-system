//import express server package
const express= require('express');
const server = express();
const pagesRoutes = require('./routes/pagesRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


//parses incoming requests with urlencoded payloads and is based on body-parser.
//server.use(express.urlencoded({extended:false}));

//it parses the body into json object and sets req.body
server.use(express.json());
//body-parser combines the 2 above
//Each app.use(middleware) is called every time a request is sent to the server.
server.use(bodyParser.urlencoded({extended: false }));
server.use(cookieParser());
//accept defferent domains cors middleware
server.use(cors());

//userRoutes middleware
server.use(pagesRoutes);




//09:34:30	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'HM99amine99'	0 row(s) affected, 1 warning(s): 4058 1 factor authentication method does not match against authentication policy. Please refer @@authentication_policy system variable.	0.015 sec

//PORT
const port = process.env.PORT || 3000;
//create a http express server
server.listen(port, () => console.log("server started on port http://localhost:"+JSON.stringify(port)));



