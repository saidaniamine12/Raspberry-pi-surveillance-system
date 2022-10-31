const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mysqldb = require('../mysql');
const { query } = require('../mysql');
const mqp = require('mysql-query-placeholders');
const { notify } = require('../routes/pagesRoutes');
const dotenv = require("dotenv");
// Importing Utilities module
const {promisify} = require('util');

dotenv.config({path: './.env'});



exports.registerUser = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        address: req.body.address
    };

    mysqldb.execute('SELECT * FROM Users WHERE email =?;',[user.email], async (error,results,fields) => {
        try {
            if (error){
                throw new Error;
            }
        }catch (error) {
            console.log(error.message,"probem in SELECT * FROM Users WHERE email =;");

            return;
        };
        if(results.length>0){
            return res.json('email already in use');
        };

        mysqldb.execute('INSERT INTO Users(`firstName`,`lastName`,`address`,`email`,`password`) VALUES (?,?,?,?,?);',
        [user.firstName,user.lastName,user.address,user.email,user.password], async (error,results,fields) => {
            try {
                if (error){

                    throw new Error;}
            }catch(error) {
                console.log(error.message);
                res.send("problem in INSERT INTO Users");
                return;
            };
            res.status(200).json('user registred you may login');
        });
    });
    next();
};


exports.authenticateUser =  async (req, res, next) => {
    const email = req.body.email;
    const password  = req.body.password;
    try {
        if(!email || !password){
            throw new Error('email or password is not given');
        }
    }catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }


    mysqldb.execute('SELECT password,id FROM Users WHERE email = ?;',[email], async (error,results,fields) => {

        try {
            if (error){
                throw new Error("bad request to db");
            }
        }catch (error){
            console.log(error);
            return res.status(400).json(error);
        };
        
        if (!results){
            return res.status(401).json('Email  is incorrect');
        } else if( !(await bcrypt.compare(password,results[0].password))){
            return res.status(401).json('password is incorrect');
        } else {
            const id = results[0].id

            const token = jwt.sign({id:id},  process.env.JWT_SECRET ,{expiresIn: process.env.JWT_EXPIRES_IN});
            
            console.log("the token is: "+ token);

            const cookieOptions =  {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                ),
                httpOnly:true
            };

            res.cookie('jwt', token, cookieOptions );
            res.status(200).redirect("/");
            
        };
        next();

    });
};

exports.isLoggedIn =  async (req, res, next) => {
    console.log(req.cookies.jwt);
    console.log('im here');
    //check for the validation of the token
    if(req.cookies.jwt) {
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);

                console.log(decoded);
        } catch (error){
            console.log(error);
            return res.status(400).json('token is not valid');

        }
    };

    //check if the user still exists
    mysqldb.execute('SELECT * FROM Users WHERE id =?;',[decoded.id], async (error,results,fields) => {
        console.log(results);
    });

    next();
    




};



