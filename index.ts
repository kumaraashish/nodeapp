"use strict";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Request as IRequest, Response as IResponse } from 'express';
import * as logger from "morgan";
import * as path from "path";
import * as jsf from "json-schema-faker";
import report_schema from './fake_call_report_schema'; // for faking call report objects
import * as times from "./lib/times";
import * as randInt from "./lib/rand_int";
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import * as download from 'download';
import * as dotenv from 'dotenv';
//import * as http from 'http';
import * as Request from 'request';
import * as fs from 'fs';
import * as Bandwidth from 'node-bandwidth';
import * as Crossbar from 'crossbar';
import * as Multer from 'multer';
import * as AWS from 'aws-sdk';
import * as MulterS3 from 'multer-s3';
import * as uuid from 'uuid/v4';
import * as moment  from 'moment-timezone';
import*  as elasticsearch from 'elasticsearch';
import * as d3 from "d3";
import * as d3c from "d3-collection";
import { configure, getLogger } from "log4js";
import { z } from "zod";
import * as crypto from 'crypto';
import * as amqplib from 'amqplib';


configure("./log4js.config");
const log4jslogger = getLogger();
const log4jsexceptionlogger = getLogger("exception");
const AWS_SDK = require('aws-sdk')


const esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_SEARCH_HOST,
    log: "error"
});
//Elastic Search - Search Function
const search = async function search(index, body) {
    return await esClient.search({ index: index, body: body });
};

//  
import { RSA_PKCS1_OAEP_PADDING } from "constants";
import { setTimeout } from "timers";
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();
import * as nodemailer from 'nodemailer';
const BandwidthMessaging = require('@bandwidth/messaging');
dotenv.config();


// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: process.env.ELASTIC_APM_APP_NAME,
    // Use if APM Server requires a token
    secretToken: '1PnxWcyR5tpF3eQLVA',
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'https://ceb1532f91f3426d8fc8f8864224aba3.apm.us-east-1.aws.cloud.es.io:443'

});

const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN);
const NOTIFY_VOICEMAIL_EMAIL_HISTORY_DB = "notify_voicemail_email_history";

const app: express.Express = express();
const nano = require('nano')(process.env.COUCHBASE_DB)
import * as newNanoClient from 'nano-new'
import { AccountDb } from "./src/type-interfaces";
import axios, { AxiosInstance } from 'axios';
const newNano = newNanoClient(process.env.COUCHBASE_DB);
const realPageNano = newNanoClient(process.env.REALPAGE_COUCH_DB_URL);
const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });
AWS.config.loadFromPath('./aws_config.json');
const s3 = new AWS.S3({});
var cron = require('node-cron');

var temp_reports = [];
const s3_storage = {
    storage: MulterS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'spoke-mms',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${uuid()}.${file.originalname.split('.').pop()}`);

        }
    })
};

const NOTIFY_REALPAGE_MAPPING_DB = "notify_realpage_mappings";
newNano.db.get(NOTIFY_REALPAGE_MAPPING_DB).then(async (data) => {
    if (!data) {
        try {
            await newNano.db.create(NOTIFY_REALPAGE_MAPPING_DB);
        } catch (e) {
            console.error(e)
        }
    }
});
const notificationdata = {
    data: [
        {
            "didnumber": "5656558558",
            "propertyid": "13610b8c468fc2557f1a7d40d33c4a42",
            "type": "notify",
            "data": {
                "escalation": [
                    {
                        "name": "Mr Bossman",
                        "waittime": 1000,
                        "callingnumber": "+15024663992",
                        "type": "sms"
                    }
                ],
                "notify": [

                    {
                        "name": "ScottGoogle",
                        "data": [
                            {
                                "callingnumber": "+15028226244",
                                "type": "sms",
                                "pin": 1234,
                                "waittime": 30
                            },
                            {
                                "callingnumber": "+15028226244",
                                "type": "phone",
                                "pin": 1234,
                                "waittime": 45
                            }
                        ]
                    },
                    {
                        "name": "CallHippo",
                        "data": [
                            {
                                "callingnumber": "+16502739177",
                                "type": "sms",
                                "pin": 1234,
                                "waittime": 30
                            },
                            {
                                "callingnumber": "+16502739177",
                                "type": "phone",
                                "pin": 1234,
                                "waittime": 45
                            }
                        ]
                    }
                ]
            }
        }
    ]

};
const livereplydata = {
    data: [
        {
            "didnumber": "5656558558",
            "propertyid": "13610b8c468fc2557f1a7d40d33c4a42",
            "type": "live",
            "maxonholdtime": 60,
            "data": [

                {
                    "name": "ScottGoogle",
                    "pin": 1234,
                    "phones": [
                        {
                            "callingnumber": "+15028226244",
                            "ring": 30
                        }
                    ]
                },
                {
                    "name": "CallHippo",
                    "pin": 1234,
                    "phones": [
                        {
                            "callingnumber": "+16502739177",
                            "ring": 30
                        }
                    ]
                }
            ]
        }

    ]
};
const s3_upload = Multer(s3_storage);
// const avatar_upload = Multer({ avatarStorage });
const https = require('https');
var http = require("http");
// const fs = require('fs');
const privateKey = fs.readFileSync('./certs/key.key', 'utf8');
const certificate = fs.readFileSync('./certs/cert.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

const getMonthDbName = (dbname, nextmonth = true) => {
    var dateutc = moment().utc();
   // if (nextmonth)
     //   dateutc = dateutc.add("1", "months");
    const month = dateutc.format("MM");
    const year = dateutc.format("YYYY");

    dbname = `${dbname}_${month}-${year}`;
    return dbname
}

const getOldMonthDbName = (dbname, nextmonth = true) => {
    var dateutc = moment().add(-2, "months").utc();
   // if (nextmonth)
     //   dateutc = dateutc.add("1", "months");
    const month = dateutc.format("MM");
    const year = dateutc.format("YYYY");

    dbname = `${dbname}_${month}-${year}`;
    return dbname
}

declare interface DecodedJWT {
    kazoo_api_key: string;
    logged_in: boolean;
    user_id: number;
    timezone: string;
    account_id: string;
}


app.use(logger("dev"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000,
    limit: '50mb',
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());
app.set('superSecret', 'SuperDuperSecretDoNotTellAnyone');
app.use(function (req, res, next) {
    res.on('finish', function () {
        // Do whatever based on status code
        if (res.statusCode === 500) {
            console.error(`Error at: ${req.url}`, req.body);
        }
    });
    next();
});

// Lifted from the index_sms.js on Teamwork
const client = new Bandwidth({
    userId: process.env.BANDWIDTH_USERID, // <-- note, this is not the same as the username you used to login to the portal
    apiToken: process.env.BANDWIDTH_API_TOKEN,
    apiSecret: process.env.BANDWIDTH_API_SECRET
});


const insertSendingEmailKey = (messageid,now) => {
    
     const payload = {
        "timestamp": now,
        "messageid":messageid,
        "pvt_type":"emailsendingdata"

    }

    const options = {
        method: 'POST',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/hsemailkey/_doc`,
        headers:
        {

            'Content-Type': 'application/json',
        },
        body: payload,

        json: true
    };
    Request(options, function (error, response, body) {
        if (error) {
            console.log(error + '//' + 'error');
        }
        else {
            console.log("log sucuessfully inserted");
            //console.log (body)
        }
    });

}

const serverlog = (level, message, methodname, errormessage = undefined) => {
    console.log('serverlog');
    console.log(process.env.ELASTIC_SEARCH_SERVER);;
    const now = moment().utc().format();

    const now_uinix = moment().utc().unix();
    const payload = {
        "timestamp": now,
        "level": level,
        "message": message,
        "servernode": "node server",
        "methodname": methodname,
        "timestampunix": now_uinix,
        "errormessage": errormessage ? errormessage : ''

    }

    const options = {
        method: 'POST',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/hpsapperrorlog/_doc`,
        headers:
        {

            'Content-Type': 'application/json',
        },
        body: payload,

        json: true
    };
    Request(options, function (error, response, body) {
        if (error) {
            console.log(error + '//' + 'error');
        }
        else {
            console.log("log sucuessfully inserted");
            //console.log (body)
        }
    });

}
const debugMessage = (logger, message) => {

    try {
        var log_message = `could not be assigned ${typeof message}`

        if (typeof message === 'string') {
            log_message = message

        }
        else if (typeof message === 'object') {
            log_message = JSON.stringify(message);
        }
        //console.log(process.env.LOCAL_DEBUGING);
        if (process.env.LOCAL_DEBUGING === "true") {
            console.log(message)
        }
        else {
            logger.level = "debug";
            var count = (log_message.match(/,/g) || []).length;
            if (count < 2)
                logger.debug(message);
        }
    }
    catch (ex) {

    }
}

debugMessage(log4jslogger, "server started");
const getkazooaccountinfo = async (req, accountid) => {
    var apiKey = null;
    apiKey = await loginwithcred();

    var accountpromiss = new Promise((resolve, reject) => {
        getKazooRequest(req, apiKey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountid}`, async (err, response, body) => {
                if (err) {
                    debugMessage(log4jslogger, err);
                    resolve(err)
                    return;
                }
                var account = JSON.parse(body);
                //  console.log("\n\n\n accounts\n", account);

                resolve(account);
            });
    });

    var result = await accountpromiss;
    return result;

}
const sendemail_later = async (payload) => {
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    const accountname = payload.data.primarykazooaccount.name;
    debugMessage(log4jslogger, `accountname  ${accountname}`);
    let mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: payload.data.username, // Recepient email address. Multiple emails can send separated by commas
        subject: ' NOTIFY Account activation ',
        text: 'This is the email regarding NOTIFY account activation.',


        html: `<!DOCTYPE html>
          <html>
          
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                  table { 
                      border-collapse: collapse; 
                      width: 100%; 
                  } 
                    
                  th, td { 
                      text-align: left; 
                     
                  } 
                    
                  tr:nth-child(odd) { 
                      background-color: #F8F8F8; 
                  } 
				.info{
				color:#003a5d;
				}
                  .login { fill: #ffffff;  } 
                  .head1
                  {
                     
                      width: 117px;
                      height: 46px;   
                      background-position: center;
                      background-repeat: no-repeat;
                  }
                  .loginimg
                  {                     
                      height: 31px;   
                      background-position: center;
                      background-repeat: no-repeat;
                      width:138px;
                  }
                  .heading
                  {
                      width: 226px;
                      height:55px;
                  }
                  .no-margin
                  {
                      margin-left:0px;
                      margin-right:0px;
                  }
              </style>
          </head>
          
          <body>
              <div style=" height:670px;margin:0px auto; font-family: sans-serif; color: #003a5d ;width:700px">
                  <div style="height:100%; padding-left: 45px; padding-top:37px; background-color: #d3d3d342; color: #003a5d;">
                    
                      <div class="row no-margin" >
                            <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1"/></div>
                      </div>
                      <div class="row heading no-margin" style="margin-top:20px;width: 576px !important;">
                          <p style="font-size: 14px;  color:#003A5D;margin-bottom: 20px; ">Welcome to Notify!</p>
                          <p style="font-size: 14px; color:#003A5D ">You’ve been added as a ${accountname} user in the Notify system. This means you are either on or need to edit the on-call list, or need access to view reports.</p>
                          <p style="font-size: 14px; color:#003A5D ;padding-top: 20px;"> Below are your log in credentials. Please log in now for a tour of the system.</p>
                      </div>
                     
                      <div style="padding-top: 99px; "> 
                        <div class="row info no-margin"> 
                            <a target="_blank" href=${process.env.WEB_SERVER}>                        
                            <div class="loginimg"><img src="${process.env.WEB_SERVER}img/login.png"/></div>
                            </div>
                              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="138" height="31" viewBox="0 0 138 31"><defs><style></style></defs><g transform="translate(-596 -522)"><path class="a" d="M15.5,0h107a15.5,15.5,0,0,1,0,31H15.5a15.5,15.5,0,0,1,0-31Z" transform="translate(596 522)"/><text class="login" transform="translate(664 544)"><tspan x="-54.062" y="0" style="cursor: pointer;">LOG IN NOW</tspan></text></g></svg> -->
                      <div class="row info no-margin">
                          <p style="font-size: 10px;width:500px;height:14px;color:#003A5D ">Or copy and paste this link into your browser:<a style="text-decoration:underline;color:#4BBBFF" target="_blank" href=${process.env.WEB_SERVER}>${process.env.WEB_SERVER}</a></p></div>
                      </div>
                      <div class="row info no-margin">
                          <p style="font-size: 14px;color:#003A5D ;   margin-top:25px;width:603px;">You will be asked to change your password and set up your user profile when you first log in.</p>
                      </div>
                      <div class="row no-margin" style="padding-top:21px">
                          <table class="table" style="font-size: 13px;   width: 386px;">
                              <tbody>
                                  <tr class="active">
                                      <td
                                          style="background-color: #F8F8F8; color: #95989A; padding: 10px;  border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;">
                                          First Name</td>
                                      <td
                                          style=" background-color: #F8F8F8; text-align: left ;color:#003A5D ;  border: 1px solid #f4f4f4; padding: 10px;     font-size: 14px;   height: 29px; ">
                                          ${payload.data.first_name}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style="color: #95989A; padding: 10px;border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;">
                                          Last Name</td>
                                      <td
                                          style="text-align: left ; padding: 10px; border: 1px solid #f4f4f4; color:#003A5D ;    font-size: 14px;   height: 29px;  ">
                                          ${payload.data.last_name}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style=" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4; width: 115px;     font-size: 14px;   height: 29px;">
                                          User Name</td>
                                      <td
                                          style=" background-color: #F8F8F8 ;text-align: left ;color:#003A5D ;padding: 10px;  border: 1px solid #f4f4f4;     font-size: 14px;   height: 29px;  ">
                                          ${payload.data.username}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style="color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;   font-size: 14px;   height: 29px;">
                                          Password</td>
                                      <td
                                          style="text-align: left ;  border: 1px solid #f4f4f4;  color:#003A5D ; padding: 10px;   font-size: 14px;   height: 29px;  ">
                                          ${payload.data.password}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style=" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;    font-size: 14px;   height: 29px;   ">
                                          Account Name</td>
                                      <td
                                          style=" background-color: #F8F8F8; border: 1px solid #f4f4f4;  padding: 10px;    font-size: 14px;   height: 29px;color:#003A5D  ">
                                          ${accountname}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                     
              </div>
              </div>
          </body>
          
          </html>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

const sendemail = async (payload) => {
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    const accountname = payload.data.primarykazooaccount.name;
    debugMessage(log4jslogger, `accountname  ${accountname}`);
    let mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: payload.data.username, // Recepient email address. Multiple emails can send separated by commas
        subject: ' NOTIFY Account activation ',
        text: 'This is the email regarding NOTIFY account activation.',


        html: `<!DOCTYPE html>
          <html>
          
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                  table { 
                      border-collapse: collapse; 
                      width: 100%; 
                  } 
                    
                  th, td { 
                      text-align: left; 
                     
                  } 
                    
                  tr:nth-child(odd) { 
                      background-color: #F8F8F8; 
                  } 
				.info{
				color:#003a5d;
				}
                  .login { fill: #ffffff;  } 
                  .head1
                  {
                     
                      width: 117px;
                      height: 46px;   
                      background-position: center;
                      background-repeat: no-repeat;
                  }
                  .loginimg
                  {                     
                      height: 31px;   
                      background-position: center;
                      background-repeat: no-repeat;
                      width:138px;
                  }
                  .heading
                  {
                      width: 226px;
                      height:55px;
                  }
                  .no-margin
                  {
                      margin-left:0px;
                      margin-right:0px;
                  }
              </style>
          </head>
          
          <body>
              <div style=" height:670px;margin:0px auto; font-family: sans-serif; color: #003a5d ;width:700px">
                  <div style="height:100%; padding-left: 45px; padding-top:37px; background-color: #d3d3d342; color: #003a5d;">
                    
                      <div class="row no-margin" >
                            <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1"/></div>
                      </div>
                      <div class="row heading no-margin" style="margin-top:20px;width: 576px !important;">
                          <p style="font-size: 14px;  color:#003A5D;margin-bottom: 20px; ">Welcome to Notify!</p>
                          <p style="font-size: 14px; color:#003A5D ">  To get ${accountname} set up and running, we need you to log in using the credentials below. You’ll answer a few questions about your on-call maintenance schedule, then tada! you’re ready to make the switch.</p>
                      </div>
                     
                      <div style="padding-top: 99px; "> 
                        <div class="row info no-margin"> 
                            <a target="_blank" href=${process.env.WEB_SERVER}>                        
                            <div class="loginimg"><img src="${process.env.WEB_SERVER}img/login.png"/></div>
                            </div>
                              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="138" height="31" viewBox="0 0 138 31"><defs><style></style></defs><g transform="translate(-596 -522)"><path class="a" d="M15.5,0h107a15.5,15.5,0,0,1,0,31H15.5a15.5,15.5,0,0,1,0-31Z" transform="translate(596 522)"/><text class="login" transform="translate(664 544)"><tspan x="-54.062" y="0" style="cursor: pointer;">LOG IN NOW</tspan></text></g></svg> -->
                      <div class="row info no-margin">
                          <p style="font-size: 10px;width:500px;height:14px;color:#003A5D ">Or copy and paste this link into your browser:<a style="text-decoration:underline;color:#4BBBFF" target="_blank" href=${process.env.WEB_SERVER}>${process.env.WEB_SERVER}</a></p></div>
                      </div>
                      <div class="row info no-margin">
                          <p style="font-size: 14px;color:#003A5D ;   margin-top:25px;width:603px;">You will be asked to change your password and set up your user profile when you first log in.</p>
                      </div>
                      <div class="row no-margin" style="padding-top:21px">
                          <table class="table" style="font-size: 13px;   width: 386px;">
                              <tbody>
                                  <tr class="active">
                                      <td
                                          style="background-color: #F8F8F8; color: #95989A; padding: 10px;  border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;">
                                          First Name</td>
                                      <td
                                          style=" background-color: #F8F8F8; text-align: left ;color:#003A5D ;  border: 1px solid #f4f4f4; padding: 10px;     font-size: 14px;   height: 29px; ">
                                          ${payload.data.first_name}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style="color: #95989A; padding: 10px;border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;">
                                          Last Name</td>
                                      <td
                                          style="text-align: left ; padding: 10px; border: 1px solid #f4f4f4; color:#003A5D ;    font-size: 14px;   height: 29px;  ">
                                          ${payload.data.last_name}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style=" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4; width: 115px;     font-size: 14px;   height: 29px;">
                                          User Name</td>
                                      <td
                                          style=" background-color: #F8F8F8 ;text-align: left ;color:#003A5D ;padding: 10px;  border: 1px solid #f4f4f4;     font-size: 14px;   height: 29px;  ">
                                          ${payload.data.username}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style="color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;   font-size: 14px;   height: 29px;">
                                          Password</td>
                                      <td
                                          style="text-align: left ;  border: 1px solid #f4f4f4;  color:#003A5D ; padding: 10px;   font-size: 14px;   height: 29px;  ">
                                          ${payload.data.password}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style=" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;    font-size: 14px;   height: 29px;   ">
                                          Account Name</td>
                                      <td
                                          style=" background-color: #F8F8F8; border: 1px solid #f4f4f4;  padding: 10px;    font-size: 14px;   height: 29px;color:#003A5D  ">
                                          ${accountname}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                     
              </div>
              </div>
          </body>
          
          </html>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
        console.log('Message sent: %s', info.messageId);
    });
}



const sendCustomscheduleemail = async (payload) => {
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    payload=JSON.parse(payload);
    console.log('payload==============', payload);

    let mailOptions = {
       //from: process.env.SMTP_MAIL_SERVER_FROM,
       from: payload.propertymanager,
        //to:'kumaraashish@facileconsulting.com',
        to: 'a.t.156092069.u-10705723.6e06ec06-40b6-4772-b7c9-ca92acc6cf8f@tasks.clickup.com', // Recepient email address. Multiple emails can send separated by commas
        subject: 'Schedule training with ' + '' + payload.propertyname,
        text: 'Custom Schedule.',


        html: `<!DOCTYPE html>
          <html>
          
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                  table { 
                      border-collapse: collapse; 
                      width: 100%; 
                  } 
                    
                  th, td { 
                      text-align: left; 
                     
                  } 
                    
                  tr:nth-child(odd) { 
                      background-color: #F8F8F8; 
                  } 
				.info{
				color:#003a5d;
				}
                  .login { fill: #ffffff;  } 
                  .head1
                  {
                     
                      width: 117px;
                      height: 46px;   
                      background-position: center;
                      background-repeat: no-repeat;
                  }
                  .loginimg
                  {                     
                      height: 31px;   
                      background-position: center;
                      background-repeat: no-repeat;
                      width:138px;
                  }
                  .heading
                  {
                      width: 226px;
                      height:55px;
                  }
                  .no-margin
                  {
                      margin-left:0px;
                      margin-right:0px;
                  }
              </style>
          </head>
          
          <body>
              <div style=" height:670px;margin:0px auto; font-family: sans-serif; color: #003a5d ;width:700px">
                  <div style="height:100%; padding-left: 45px; padding-top:37px; background-color: #d3d3d342; color: #003a5d;">
                    
                    <div class="row no-margin" >
                        <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1"/></div>
                    </div>
                    <div class="row heading no-margin" style="margin-top:20px;">
                        <p style="font-size: 14px;  color:#003A5D ">Hi there!</p>
                    </div>
                    <div class="row info no-margin">
                        <p style="font-size: 16px; color:#003A5D ">Property Name :${payload.propertyname}</p>
                        <p style="font-size: 16px; color:#003A5D ">Property Manager email id :${payload.propertymanager}.</p> 
                    </div>
                   <!-- <div class="row info no-margin">    
                        <a target="_blank" href=${process.env.WEB_SERVER}>                        
                        <div class="loginimg"><img src="${process.env.WEB_SERVER}img/login.png"/></div>
                    </div>-->
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="138" height="31" viewBox="0 0 138 31"><defs><style></style></defs><g transform="translate(-596 -522)"><path class="a" d="M15.5,0h107a15.5,15.5,0,0,1,0,31H15.5a15.5,15.5,0,0,1,0-31Z" transform="translate(596 522)"/><text class="login" transform="translate(664 544)"><tspan x="-54.062" y="0" style="cursor: pointer;">LOG IN NOW</tspan></text></g></svg> -->
                    <div class="row info no-margin">
                        <p style="font-size: 10px;width:500px;height:14px;color:#003A5D ">Or copy and paste this link into your browser:<a style="text-decoration:underline;color:#4BBBFF" target="_blank" href=${process.env.WEB_SERVER}>${process.env.WEB_SERVER}</a></p></div>
                    </div>
              </div>
          </body>
          
          </html>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
const sendResetViewMail = async (payload) => {
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    const accountname = payload.data.primarykazooaccount.name;
    debugMessage(log4jslogger, `accountname  ${accountname}`);
    let mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: payload.data.username, // Recepient email address. Multiple emails can send separated by commas
        subject: ' NOTIFY Reset View ',
        text: 'This is the email regarding NOTIFY reset view.',


        html: `<!DOCTYPE html>
          <html>
          
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                  table { 
                      border-collapse: collapse; 
                      width: 100%; 
                  } 
                    
                  th, td { 
                      text-align: left; 
                     
                  } 
                    
                  tr:nth-child(odd) { 
                      background-color: #F8F8F8; 
                  } 
				.info{
				color:#003a5d;
				}
                  .login { fill: #ffffff;  } 
                  .head1
                  {
                     
                      width: 117px;
                      height: 46px;   
                      background-position: center;
                      background-repeat: no-repeat;
                  }
                  .loginimg
                  {                     
                      height: 31px;   
                      background-position: center;
                      background-repeat: no-repeat;
                      width:138px;
                  }
                  .heading
                  {
                      width: 226px;
                      height:55px;
                  }
                  .no-margin
                  {
                      margin-left:0px;
                      margin-right:0px;
                  }
              </style>
          </head>
          
          <body>
              <div style=" height:670px;margin:0px auto; font-family: sans-serif; color: #003a5d ;width:700px">
                  <div style="height:100%; padding-left: 45px; padding-top:37px; background-color: #d3d3d342; color: #003a5d;">
                    
                    <div class="row no-margin" >
                        <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1"/></div>
                    </div>
                    <div class="row heading no-margin" style="margin-top:20px;">
                        <p style="font-size: 14px;  color:#003A5D ">Hi there!</p>
                    </div>
                    <div class="row info no-margin">
                        <p style="font-size: 14px; color:#003A5D ">We've made some improvements to Notify that we really think you're going to enjoy.</p>
                        <p style="font-size: 14px; color:#003A5D ">If you have the same people on call every day, all day ... or your maintenance staff rotates 
                        every other week – your on-call maintenance schedule will now be filled out automatically 
                        for you. The only time you'll need to touch your schedule is for vacations or staff changes.</p>
                        <p style="font-size: 14px; color:#003A5D ">To update your system – log in now, answer a couple of questions, and your schedule will 
                        be filled out indefinitely.</p>  
                    </div>
                    <div class="row info no-margin">    
                        <a target="_blank" href=${process.env.WEB_SERVER}>                        
                        <div class="loginimg"><img src="${process.env.WEB_SERVER}img/login.png"/></div>
                    </div>
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="138" height="31" viewBox="0 0 138 31"><defs><style></style></defs><g transform="translate(-596 -522)"><path class="a" d="M15.5,0h107a15.5,15.5,0,0,1,0,31H15.5a15.5,15.5,0,0,1,0-31Z" transform="translate(596 522)"/><text class="login" transform="translate(664 544)"><tspan x="-54.062" y="0" style="cursor: pointer;">LOG IN NOW</tspan></text></g></svg> -->
                    <div class="row info no-margin">
                        <p style="font-size: 10px;width:500px;height:14px;color:#003A5D ">Or copy and paste this link into your browser:<a style="text-decoration:underline;color:#4BBBFF" target="_blank" href=${process.env.WEB_SERVER}>${process.env.WEB_SERVER}</a></p></div>
                    </div>
              </div>
          </body>
          
          </html>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
const validateJWT = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token.replace('Bearer ', ''), app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
            } else {
                const newToken = jwt.sign({
                    'kazoo_api_key': decoded.kazoo_api_key,
                    'logged_in': true,
                    'user_id': decoded.user_id,
                    'timezone': decoded.timezone,
                    'account_id': decoded.account_id
                }, app.get('superSecret'), {
                    'expiresIn': '1h'
                })
                // if everything is good, save to request for use in other routes
                res.append('token', newToken);
                res.append('Access-Control-Expose-Headers', 'token');
                req.decoded = decoded;
                req.headers['X-AUTH-TOKEN'] = jwt.decode(decoded.kazoo_api_key)
                next();
            }
        });

    } else {

        // if there is no token
        //console.log("logout");
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

const getKazooAxiosRequest = (req: any, apiKey = null): AxiosInstance => {
    const headers = {
      'X-AUTH-TOKEN':
        apiKey || (req['decoded'] && req['decoded'].kazoo_api_key) || null,
    };
    return axios.create({ headers });
  };

const getKazooRequest = (req, apiKey = null) => {

    return Request.defaults({
        headers: {
            'X-AUTH-TOKEN': (apiKey || req['decoded'] && req['decoded'].kazoo_api_key) || null
        }
    });
}

const getFreeSwitchAxiosRequest = (token: string) => {
    let headers = { Token: token };
    return axios.create({headers, baseURL: process.env.FREE_SWITCH_SERVER });
  };
const getFreeSwitchRequest = (token) => {

    return Request.defaults({
        headers: {
            'Token': token
        }
    });
}

function parseAccountToDatabaseName(accountName) {
    if (accountName && accountName != undefined && accountName != "undefined") {
        const notifytext = process.env.ISPRODUCTION === "true" ? "nt_" : "";
        return [`${notifytext}account`, accountName.substr(0, 2), accountName.substr(2, 2), accountName.substr(4)].join('/');
    }
    else
        return accountName;
}


function getDabaseNameRegx() {
    return process.env.ISPRODUCTION === "true" ? "nt_account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$" : "account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$";
}
function parseDatabaseNameToAccount(dbnmae) {
    var arr = dbnmae.split("/");
    arr = arr.splice(1, arr.length - 1);
    return arr.join('');
}

/**
 * Call Reports API Routes
 */


const doCdrSearch = (accountName, my, bookmark = null, req, cdrLimit) => {
    const accountDb = nano.use(`${accountName}-${my}`);

    // Build Lucene Query
    const query = [
        //'main_leg:true',

    ];
    if (req.query.startTime && req.query.endTime) {
        const uToG = (u) => {
            return (+u / 1000) + 62167219200;
        }
        const startTime = uToG(req.query.startTime);
        const endDate = new Date(+req.query.endTime);
        endDate.setDate(endDate.getDate() + 1);
        const endTime = uToG(endDate.getTime());
        query.push(`timestamp:[${startTime} TO ${endTime}]`);
    }

    if (req.query.call_direction) {
        switch (req.query.call_direction) {
            case ('inbound'):
                query.push(`call_direction:inbound`);
                break;
            case ('outbound'):
                query.push(`call_direction:outbound`);
                break;
            case ('both'):
                query.push(`(call_direction:inbound OR call_direction:outbound)`);
                break;
        }
    }

    if (req.query.answered) {
        switch (req.query.answered) {
            case ('yes'):
                query.push("hangup_cause:normal_clearing");
                break;
            case ('no'):
                query.push("(hangup_cause:NO_ANSWER OR hangup_cause:ORIGINATOR_CANCEL)");
                break;
        }
    }
    if (req.query.answered === undefined) {
        query.push("(hangup_cause:normal_clearing OR hangup_cause:NO_ANSWER OR hangup_cause:ORIGINATOR_CANCEL)");
    }

    if (req.query.owner_id) {
        query.push(`owner_id:${req.query.owner_id}`);
    }
    else if (req.query.extensions) {
        var extensions = req.query.extensions.split(',')
            .map(function (e) { return "owner_id:\"" + e + "\""; })
            .join(' OR ');
        query.push("(" + extensions + ")");
    }
    else {
        query.push(`owner_id:__no_owner_id`);
    }

    if (req.query.search) {
        query.push(`(${[
            `callee_id_number:${req.query.search}*`,
            `callee_id_number:1${req.query.search}*`,
            `caller_id_number:${req.query.search}*`,
            `caller_id_number:1${req.query.search}*`,
            `to:${req.query.search}*`,
            // `caller_id_number:+1${req.query.search}*`,
            // `to:+1${req.query.search}*`,

            `to:1${req.query.search}*`,
            `callee_id_name:${req.query.search}*`,
            `caller_id_name:${req.query.search}*`
        ].join(' OR ')})`)
    }

    const params = {
        q: query.join(" AND "),
        include_docs: true,
        limit: cdrLimit,
        sort: '-timestamp'
    };

    if (bookmark) {
        params['bookmark'] = bookmark;
    }

    // Execute db Query

    return new Promise<{}>((resolve, reject) => {
        function cdr_post_search(callback) {
            nano.request({ db: accountName + "-" + my, path: '_design/search/_search/cdrs', method: 'POST', body: params }, callback);
        }
        const callReports = [];
        cdr_post_search(cdr_post_search_callback);


        function cdr_post_search_callback(err, result) {
            if (err) {
                resolve({
                    callReports: [],
                    bookmark: '',
                    my: my,
                    totalRecords: 0
                });
            }
            if (result && result.rows) {
                const callReport = result.rows.map(r => r.doc).map(cdrMapping);
                callReports.push(...callReport);
                params['bookmark'] = result.bookmark;

                if (result.rows.length < cdrLimit || !req.query.download) {
                    resolve({
                        callReports,
                        bookmark: result.bookmark,
                        my,
                        totalRecords: result.total_rows
                    });
                }
                else {

                    cdr_post_search(cdr_post_search_callback);
                }
            }

        }
    });
}

const getNumber = (cdrTo) => {
    return cdrTo ? cdrTo.indexOf('@') > 0 ? cdrTo.split('@')[0] : cdrTo : cdrTo;
}
const calldirection = function (direction) {
    if (direction === "outbound") {
        return "inbound";
    };
    if (direction === "inbound") {
        return "outbound";
    };
};

const callrecording = function (direction, account_id, call_id) { //Adds an additional "." to the file extension for outbound calls. Bug in Kazoo.
    if (direction === "outbound") {
        return "https://s3-us-west-2.amazonaws.com/spokerecordings/" + account_id + "/call_recording_" + call_id + ".wav"
    };
    if (direction === "inbound") {
        return "https://s3-us-west-2.amazonaws.com/spokerecordings/" + account_id + "/call_recording_" + call_id + ".wav"
    };
};

const to_num = function (direction, num, to) { //Cleans up redundancy.
    if (direction === "outbound") {
        return getNumber(num);
    };
    if ((direction === "inbound") && (num === getNumber(to))) {
        return " ";
    }
    else {
        return getNumber(num);
    }
};

const cdrMapping = (cdr) => {
    const resultdata = [];
    //Sample data for "cdr.custom_channel_vars.media_names" need to work
    var media_nameslist =
    {
        "media_name": "7ad1c467369388de6e0be4536125595a.mp3",
        "media_names": [
            "7ad1c467369388de6e0be4536125595a.mp3",
            "7a17b50e1aa4ceb84a1076aeb15d81e0.mp3",
            "7f36ddcdeacb58578629fecee03d0289.mp3"
        ],
    };
    if (media_nameslist.media_names.length > 0) {
        for (var i = 0; i < media_nameslist.media_names.length; i++) {
            resultdata.push(
                {
                    media: callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id),
                    Id: 0
                });
        }
    };
    return {
        id: cdr._id,
        from_number: cdr.caller_id_number.split("+1").pop(),
        to_number: getNumber(cdr.to).split("+1").pop(),
        duration: cdr.duration_seconds,
        timestamp: (cdr.timestamp - 62167219200) * 1000,
        dialed_number: cdr.custom_channel_vars.inception ? to_num(cdr.call_direction, cdr.custom_channel_vars.inception, cdr.to).split("+1").pop() : null || cdr.callee_id_number ? to_num(cdr.call_direction, cdr.callee_id_number, cdr.to).split("+1").pop() : null,
        to_name: cdr.callee_id_name ? to_num(cdr.call_direction, cdr.callee_id_name, cdr.to) : null,
        from_name: cdr.caller_id_name || '',
        call_recording: cdr.custom_channel_vars.media_name ? callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id) : null,
        call_recording_medias: cdr.custom_channel_vars.media_names ? resultdata : '',
        call_direction: calldirection(cdr.call_direction)
    };
};

const maybePad = (month) => {
    return `${month.toString().length === 1 ? `0${month}` : month}`;
}

// This is similiar but not *quite* identical.
// For starters this doesn't send back a response,
// It also has a different rv/send value. This returns
// an array rather than an object.




app.get('/verifyJWT', validateJWT, (req, res) => {
    var u_id = req['decoded'].user_id;
    var a_id = req['decoded'].account_id;
    getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${a_id}/users/${u_id}`, (err, resp3, body) => {
        if (err) {
            //    console.log("token error ", err);
            res.send(err);
            return;
        }
        // console.log("\n user\n",body);
        res.send(body);
    });

});

function parseMessage(message) {
    try {
      return JSON.parse(message);
    } catch (e) {
      return null;
    }
  }

app.all('/webhook/transcribe-request',bodyParser.text(),async(req,res)=>{
    console.log(req.body)
    debugMessage(log4jslogger, `Transcribe Notify Request`);
    try{
        const reqData = parseMessage(req.body);
        if (!reqData) {
            console.warn('Unable to parse req.body');
            throw new Error('BAD_REQUEST');
        }
    const message = reqData['Message'];
    if (!message || typeof message != 'string') {
        console.warn('Message was not provided in body');
        throw new Error('BAD_REQUEST');
    }
    const parsedMessage = parseMessage(message);
    if (!parsedMessage) {
        console.warn('Message was not json in body');
        throw new Error('BAD_REQUEST');
    }
    let records = parsedMessage['Records'];
    if (!Array.isArray(records)) {
      console.warn('Records was not Message');
      throw new Error('BAD_REQUEST');
    }
    records.forEach(async(record)=>{
        let key = String(record?.s3?.object?.key);
        let bucketName = String(record?.s3?.bucket?.name); 
        console.log("Key is ",key);
        console.log("Bucketname is ",bucketName);

        let callType = key.split('_')[1].toLowerCase();
        const keySplit= key.split('/');
        const fileName = keySplit[keySplit.length-1];

        keySplit.pop() // Remove last part ( file name ) 

        const folderName = keySplit.join('/');
        const fileNameSplit = fileName.split('.');

        fileNameSplit.pop(); // Remove File Extension

        const STT_API_ENDPOINT = process.env.STT_API_ENDPOINT;
        const STT_TOKEN = process.env.STT_TOKEN;

        const fileNameWithoutExtension = fileNameSplit.join('.');

        // console.log("FlowType is ", callType);
        // console.log("FileName is ", fileName)
        // console.log("FileName without extension is ", fileNameWithoutExtension)
        // console.log("Folder name is ",folderName)
        debugMessage(log4jslogger, `FlowType is ${callType}`);
        debugMessage(log4jslogger, `FileName is ${fileName}`)
        debugMessage(log4jslogger, `FileName without extension is ${fileNameWithoutExtension}`)
        debugMessage(log4jslogger, `Folder name is ${folderName}`,)

        callType = ["emergency","leasing","general","courtesy"].includes(callType) ? callType : "other";

        debugMessage(log4jslogger, `CallType is ${callType}`)

        const url = `${STT_API_ENDPOINT}/speech2text-${callType}`
        const bodyData = {
            storage: {
                driver: {
                    bucket_name: process.env.STT_TRANSCRIPTION_BUCKET,
                    access_id: process.env.AWS_ACCESS_KEY_ID,
                    access_key: process.env.AWS_SECRET_ACCESS_KEY
                },
                folder: decodeURI(`transcribe-results/${folderName}`),
                store_name : fileNameWithoutExtension
            },
            audio:{
                driver:  {
                    bucket_name: process.env.AWS_MESSAGE_RECORDING_URL,
                    access_id: process.env.AWS_ACCESS_KEY_ID,
                    access_key: process.env.AWS_SECRET_ACCESS_KEY
                },
                folder: decodeURI(folderName),
                id: fileName
            },
            escalation_id: fileName
        };
        console.log("calling STT api with following data",bodyData,url);
        Request.post({
            url,
            headers:{authorization:`Bearer ${STT_TOKEN}`},
            json:true,
            body:bodyData
        },(err,response,body)=>{
            if(err){
                console.error(err);
            }
            console.log(JSON.stringify(body));
        });
    })
    }catch(e){
        if (e.message == 'BAD_REQUEST') {
            return res.status(400).json({
              status: 400,
              message: e.message
            });
        }
        console.log(e)
    }
    return res.status(200).json({ status:200 });
})



app.get("/reportdocs/search", (req, res) => {
    console.log("reportdocs");
    let body = {
        size: 20,
        from: 0,
        query: {
            "match_all": {}
        }
    };
    search('reportdocs', body)
        .then(results => {
            var hits = results.hits.hits

            let result1 = hits.map(a => a._source);
            res.send({
                "Status": "200",

                reportdocs: result1

            })
        })
});



app.post('/uploadAvatar', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const payload = { ...req.body };
    accountDb.attachment.insert(payload.id, payload.fd.file.filename, new Buffer(payload.fd.file.filename, "binary"), payload.fd.file.mimetype,
        { rev: payload.rev }, (err, body) => {
            if (err) {
                res.send(err);
            }
            else {
                accountDb.attachment.get(payload.id, payload.fd.file.filename).then((body) => {
                    res.send(body);
                });
            }
        });
});
app.post("/mixpanel/:type", validateJWT, (req, res) => {
    var type = req.params.type;
    let userId = req.body.data.id ? req.body.data.id : '';
    console.log(req.body.data);
    console.log("------------  Mixpnel  -----------------")
    console.log(type);
    console.log(req.body.data.username);
    console.log(req.body.data.id);
    console.log("------------  Mixpnel  -----------------")
    var body = {
        type: type,
        userId: userId,
        distinct_id: Math.floor(Date.now() / 1000),
        username: req.body.data.username ? req.body.data.username : '',
        email: req.body.data.username ? req.body.data.username : '',
        timestamp: moment().toISOString()
    };
    if (userId && req.body.data.username) {
        try {
            body.distinct_id = userId;
            if (req.body.data.first_name || req.body.data.last_name) {
                mixpanel.people.set(userId, {
                    $first_name: req.body.data.first_name,
                    $last_name: req.body.data.last_name,
                    $email: req.body.data.username,
                    $created: (new Date()).toISOString(),
                    $user_type: req.body.data.user_type ? req.body.data.user_type : '',
                    $property: req.body.data.primarykazooaccount && req.body.data.primarykazooaccount.name ? req.body.data.primarykazooaccount.name : '',
                    $management_company: req.body.data.accountname ? req.body.data.accountname : ''
                });
                // mixpanel.people.append(userId, body);
                body['url'] = req.body.config.url ? req.body.config.url : '';
                body['first_name'] = req.body.data.first_name ? req.body.data.first_name : '';
                body['last_name'] = req.body.data.last_name ? req.body.data.last_name : '';
            }
            console.log("mixpanel body ---- ", body);
            mixpanel.track(type, body, (err) => { if (err) { console.log("mixpanel error", err); } });

        }
        catch (e) {
            console.log("Mixpnel Error --- ", e);
            mixpanel.track(type, body, (err) => { if (err) { console.log("mixpanel error", err); } });
        }
    }
    else {
        mixpanel.track(type, body, (err) => { if (err) { console.log("mixpanel error", err); } });
    }
    res.send('success');
});

app.get('/residents/:pmcid/:siteid', async (req, res) => {

    const pmcid =req.params.pmcid;
    const siteid =req.params.siteid;
   
    let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
    const selector ={
        "selector": {
           "pmcid": pmcid
        },
        "fields": [
           "_id",
           `sites.${siteid}.residents`
        ],
        "use_index":"pmcid_index",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
     }
    
  var  docs = await getalldocumentsbyproperty(realPageDb,selector);

     if (docs && docs.length>0)
     {
        docs = docs.map(r=>r.sites[siteid].residents);
        // @ts-ignore
        docs= Object.values(docs[0]);
        docs = docs.map(r1 => {
            return { firstname:r1.firstname, lastname: r1.lastname,homephone:r1.homephone,
                workphone:r1.workphone, cellphone: r1.cellphone,faxnumber:r1.faxnumber,
                email:r1.email,
            unitid:r1.unitid,
            unitnumber:r1.unitnumber,
        billingname:r1.billingname};
         })  ;
         docs.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (obj[key] === null) {
                  delete obj[key];
                }
                else if (key!="email" && key!="firstname" && key!="lastname")
                {
                   obj[key]=obj[key].replace("+1","").replace(/[^a-zA-Z0-9]/g, "").replace(" ","");
                }
              })
         });
        
         }
  //console.log(docs);
  res.send(docs);

});

app.get('/devices', validateJWT, (req, res) => {
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/devices/status`, (err, response, body) => {
                resolve(body);
            });
    });
    const promise2 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}/devices`, (err, response, body) => {
                resolve(body);
            });
    });
    const promise3 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/devices/fc5ae4217d1e71b63f3da8125143a14e`, (err, response, body) => {
                resolve(body);
            });
    });
    Promise.all([promise1, promise2, promise3]).then(([device_status, devices, tmp]) => {
        const rv = {
            device_status: device_status,
            devices: devices,
            tmp
        }
        res.send(rv);
    });
});



app.post('/downloadfile/', (req, res) => {
    console.log('downloadfile');
    console.log(req.body);
    var fileurl = req.body.fileurl;
    //  const fileurl=  encodeURIComponent('http://www.africau.edu/images/default/sample.pdf');
    // const attachementurl ='http://www.africau.edu/images/default/sample.pdf';// `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
    console.log(fileurl);

    download(fileurl)
        .then(data => {

            res.statusCode = 200;
            res.send(data);
        })
});



app.get('/getTemplate', (req, res) => {
    res.download(__dirname + '/hellospoke_contact_import.csv');
});


app.post('/uploadContactImage', validateJWT, s3_upload.single('file'), (req, res) => {


    const resposne = {
        imageurl: `https://s3-us-west-2.amazonaws.com/spoke-mms/${req['file'].key}`
    }

    res.statusCode = 200;
    res.send(JSON.stringify(resposne));
});




app.post('/updateMasterUser/:id', validateJWT, (req, res) => {
    const payload = req.body.payload;
    console.log(payload);
    const id = req.params.id;
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(id, (err, _userobj) => {
        if (err) {
            res.send(err);
        }
        else {
            _userobj.first_name = payload.first_name;
            _userobj.last_name = payload.last_name;
            _userobj.email = payload.email;
            accountDb.insert(_userobj, (update_err, update_body) => {
                if (update_err) {
                    res.send(update_err);
                    console.log(update_err);
                }
                else {
                    res.send("sucsess");
                }
            })
        }

    });
});





app.get('/presence11:username', validateJWT, (req, res) => {
    //console.log("here is the user object 11111111111");
    const payload = req.body.payload;


});


app.get('/tmp_users', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users`, (err, response, body) => {
            res.send(body);
        });
});





app.get('/scheduledReports', validateJWT, async(req, res) => {
    // Get the real scheduled reports for this user
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    //check here 
    const scheduledReportSelector = {
        'selector': {
            'pvt_type': 'scheduled_report',
            'user_id': req['decoded'].user_id
            
        },
        "use_index":"pvt_type_user_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }

  var  docs = await getalldocumentsbyproperty(accountDb,scheduledReportSelector)
    var result={
        docs:docs
    };
   
    res.statusCode = 200;
    res.send(JSON.stringify(result));
});

app.get('/scheduledReports/:id', validateJWT, (req, res) => {
    const reqUrl = `${process.env.COUCHBASE_DB}/${encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id))}/${req.params.id}`;
    // console.log(reqUrl);
    const couchbaseRequest = Request.get(reqUrl,
        (error: Error, response: Request.RequestResponse, body: any) => {
            if (error) {
                res.statusCode = response.statusCode;
                res.send(error);
            }
            res.statusCode = 200;
            res.send(body);
        })
});

app.delete('/scheduledReports/:id/:rev', validateJWT, (req, res) => {
    // Actually delete the scheduled report from the database
    const couchbaseRequest = Request.del(`${process.env.COUCHBASE_DB}/${encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id))}/${req.params.id}?rev=${req.params.rev}`,
        (error: Error, response: Request.RequestResponse, body: any) => {
            if (error) {
                res.statusCode = response.statusCode;
                res.send(error);
            }
            res.statusCode = 200;
            res.send(body);
        })
});

app.get('/getUser/:id', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req.params.id}`, (err, response, body) => {
            res.send(body);
        });
})

app.post('/login', (req, res) => {

    const { creds, account_name } = req.body;
    const responseData: any = {
        success: false
    };
    ///console.log(creds);
        
    console.log('testing QA Jenkins+++++++++++++++++++++++++');
    //  creds 36b9c8368832d97173a6bb9911dc951f
    //creaccount_nameds morit
    const putData = {
        data: {
            credentials: creds,
            account_name
        },
        verb: "PUT"
    };
    const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
        body: JSON.stringify(putData)
    }, (err: Error, response: Request.RequestResponse, body: any) => {
        if (err) {
            console.error(err);
            serverlog("warning", err, "login");
        }
        if (response && response.statusCode === 201) {
            // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);

            body = JSON.parse(body);

            const accountRequest = getKazooRequest(req, body.auth_token).get(`${process.env.KAZOO_SERVER}/v2/accounts/${body.data.account_id}/`, (err2, response2, body2) => {
                body2 = JSON.parse(body2);
                const token = jwt.sign({
                    'kazoo_api_key': body.auth_token,
                    'logged_in': true,
                    'user_id': body.data.owner_id,
                    'timezone': body2.data.timezone,
                    'account_id': body.data.account_id
                }, app.get('superSecret'), {
                    'expiresIn': '1h'
                });
                responseData.success = true;
                responseData.token = token;
                responseData.account_id = body.data.account_id;
                res.send(responseData);
            })
        } else {
            serverlog("warning", "login fail", "login");
            res.send({"message":"Login failed."});
        }
    });
});

app.post('/saveScheduledReport', validateJWT, (req, res) => {
    if (!req.body.account_id && !req.body.user_id) {
        req.body.account_id = req['decoded'].account_id;
        req.body.user_id = req['decoded'].user_id;
    }
    const couchRequest = Request.post({
        json: true,
        url: `${process.env.COUCHBASE_DB}/${encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id))}/`,
        body: req.body
    }, (err: Error, response: Request.RequestResponse, body: any) => {
        if (response.statusCode === 201) {
            res.statusCode = 201;
            res.send();
        }
    }).on('error', e => {
        console.error(e);
    });
});



app.get('/error', (req, res) => {
    res.status(500);
    res.send(`test`);
});
app.get('/status', (req, res) => {
    res.status(200);
    res.send(`ok`);
});
app.get('/elasticLog/:page', (req, res) => {
    // let reqUrl = "https://elastic:6XOjEWBf7OzTYgdlnKQHEM3N@6c572ba545cc45609161790ba6dbc7d8.us-west-1.aws.found.io:9243/couchdblogs/_search?size=100";
    let reqUrl = "https://elastic:6XOjEWBf7OzTYgdlnKQHEM3N@6c572ba545cc45609161790ba6dbc7d8.us-west-1.aws.found.io:9243/couchdblogs/_search";
    let size = 100
    let from = 100 * parseInt(req.params.page);
    let search_query = {
        query: { query_string: { query: "live_*" } },
        from: from,
        size: size,
        sort: [
            {
                "inserted_on": { "order": "desc" }
            }]
    }

    const searchoptions = {
        method: 'POST',
        url: reqUrl,
        headers:
        {
            'Content-Type': 'application/json',
        },
        body: search_query,

        json: true
    };
    Request.post(
        searchoptions,
        (error, response, body) => {
            if (error) {
                // res.statusCode = response.statusCode;
                res.statusCode = 500;
                res.send(error);
            }
            // res.statusCode = response.statusCode;
            // console.log(response);
            // console.log("---------------------");
            //    console.log(body);
            let resp = body;

            // console.log(resp);
            res.statusCode = 200;
            res.send(resp);
        })

});
function getHelloSpokeDbName() {
    return process.env.COUCHBASE_DB_ADMIN;// 'http://internal-hs-dashboard-db-1088269106.us-west-2.elb.amazonaws.com:5984';
}

function getAdminNano() {
    const adminNano = require('nano')(getHelloSpokeDbName());

    //https://github.com/apache/nano#using-cookie-authentication
    return adminNano;
}

function getAccountNameFromId(account_id) {
    return `account/${account_id[0]}${account_id[1]}/${account_id[2]}${account_id[3]}/${account_id.substring(4)}`;
}



/**
 * Call Dashboard API Routes
 */

app.get('/admin/accounts', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/`, (e, r, b1) => {
            if (e) {
                reject(e); ``
            }
            b1 = JSON.parse(b1);
            const self = {
                id: accountId,
                name: b1.data.name,
                realm: b1.data.realm,
                timezone: b1.timezone,
                tree: []
            }
            resolve(self);
        });
    });
    const promise2 = new Promise((resolve, reject) => {
        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/descendants?paginate=false`, (err, response, body) => {
            if (err) {
                // res.statusCode = 500;
                // res.send(err);
                // reject(err);
                reject(err);
                return;
            } else {
                // console.log("\n\naccounts: ",body )
                const b = JSON.parse(body);
                if (b.error === "401") {
                    reject(b);
                    return;
                }
                const data = b.data;
                resolve(data);
                return;
            }
        });
    });
    Promise.all([promise1, promise2]).then(values => {
        if (values[1] === 'invalid creds') {
            res.send('oh no!');
        }
        let data = [values[0]];
        data = data.concat(values[1]);
        // This is dumb, but the store.ts file expects a response.data.data
        const body = { data: null };
        body.data = data;
        res.send(body);
    }).catch(e => {
        res.send(e);
    });

});









//notify code start from here


//functions


var userSelector = {
    "selector": {
        "pvt_type": "user",
        "username": "testpass@facileconsulting.com",
        "notify_enabled": true
    },
    "fields": [
        "_id",
        "username",
        "id",
        "primarykazooaccount",
        "first_name"
    ],
 "use_index":"pvt_type_username_notify_enabled",
 "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
}
//check this
var optinPropertyIdSelector: any = {
    "selector": {
        "pvt_type": "property",

        "enabled": true


    },
    "fields": [
        "_id",
        "companyid",
        "propertyname",
        "companyname",
        "propertyid"
    ],
    "use_index":"pvt_type_enabled",
     "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
};
//check this
var optinUserIdSelector = {
    "selector": {
        "pvt_type": "user",

        "smssettings.settings": {
            "$elemMatch": {
                "$or": [{
                    "number": "5023520197"
                },
                {
                    "number": "5023520197"
                }
                ]
            }
        }
    },
    "use_index":"pvt_type_smssettings",
    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
}
const getMasterUsers = async (account_id, companyid) => {
    const accountDb = nano.use(account_id);

    const contactsSelector = {
        'selector': {
            'pvt_type': 'user'
        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

  var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
   var result={
       docs:docs
   };
   return {statusCode : 200,
       result
   };
}


const getAddedProperty = async  (account_id, companyid) => {
    const accountDb = nano.use(account_id);

    const contactsSelector = {
        'selector': {
            'pvt_type': 'property'
        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
    var result={
        docs:docs
    };
    return {statusCode : 200,
        result
    };
}
const Execution_stats_log= async(apiname,result)=>
 {     
        console.log('Execution_stats_log execution_time_ms-----result----------',result.execution_time_ms);
        var result=result;
        if(result.execution_time_ms>100 || result.total_docs_examined>2500){
        let date_ob = new Date();
        var txtfile=process.env.SERVERNAME+"-"+'Execution_stats_log-'+ date_ob.getFullYear() + "-"+ (date_ob.getMonth()+1)+ "-" + date_ob.getDate()+'.txt'
        var logfile_name = './execution_stats_logs/'+txtfile;
       
        // console.log('logfile_name-----------',logfile_name);
        // console.log('txtfile-----------',txtfile);

      
        const statsFolder = './execution_stats_logs/';
        if (!fs.existsSync(statsFolder)){
            fs.mkdirSync(statsFolder);
        }
        
       
        fs.readdir(statsFolder, (err, files) => {
            // console.log('files-----------------',files);

            if(files.indexOf(txtfile) !== -1){

                // console.log("logfile_name  exists!");

                let log = date_ob+':--'+apiname+'------'+JSON.stringify(result,null, "  ");

                var stats = fs.statSync('./execution_stats_logs/'+files[0])
                var fileSizeInBytes = stats.size;
                var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);

                console.log('fileSizeInMegabytes----------------',fileSizeInMegabytes);

                if(fileSizeInMegabytes>500){
                    fs.writeFileSync(logfile_name," ");
                    let log = date_ob+':--'+apiname+'------'+JSON.stringify(result,null, "  ");
                    var write = fs.writeFile(logfile_name,"\n"+ log,{ flag: 'a' }, (err) =>{
                        if (err){
                            throw err 
                            console.log(write);
                        }else{
                            if(files[0]){
                                upload_log_file(files[0]);                       
                            }else{
                                console.log('No Execution log file to upload-----------');
                            }
                        }
                    })

                }else{
                    var write = fs.writeFile(logfile_name,"\n"+ log,{ flag: 'a' }, (err) =>{
                        if (err) throw err 
                        console.log(write)
                    })
                }
                
            } else{
                console.log("logfile_name  dont exists!");
                fs.writeFileSync(logfile_name," ");
                let log = date_ob+':--'+apiname+'------'+JSON.stringify(result,null, "  ");
                var write = fs.writeFile(logfile_name,"\n"+ log,{ flag: 'a' }, (err) =>{
                     if (err){
                        throw err 
                        console.log(write);
                    }else{
                        console.log('txtfile-----------',files[0]);
                        if(files[0]){
                            upload_log_file(files[0]);                       
                        }else{
                            console.log('No Execution log file to upload-----------');
                        }
                    }
                })
            }
        });         
    }
 }
 

 const upload_log_file=async(filename)=>{
     var AWS = require('aws-sdk');
      var fs =  require('fs'); 

      var s3 = new AWS.S3({
            accessKeyId: AWS.config.accessKeyId,
            signatureVersion: AWS.config.signatureVersion,
            region: AWS.config.region,
            secretAccessKey: AWS.config.secretAccessKey
      }
      );
       
      let date_ob = new Date(); 
      var file_name:any;
      var file_name=filename.split('.').slice(0, -1).join('.');
      console.log('file_name--------------------',file_name);
      file_name=file_name+ "-"+ date_ob.getTime()+'.txt';
      console.log('file_name=============',file_name);
    
      var myBucket = process.env.EXECUTION_LOG_BUCKET;
      var myKey = file_name;
      var filepath ='./execution_stats_logs/'+filename;

       fs.readFile(filepath, function (err, data) {
        if (err) { throw err; } 
         var  params = {Bucket: myBucket, Key: myKey, Body: data }; 
           s3.putObject(params, function(err, data) {
               if (err) {           
                   console.log(err);    
               } else {             
                   console.log("Successfully uploaded data to myBucket/myKey"); 
                   fs.unlink(filepath,function(err){
                           if(err) return console.log(err);
                           console.log('file deleted successfully');
                   });        
                }        
            });
    
        }); 
 }

const insertUser = async (usr, accountdbname) => {
    console.log("\naccountdbname ", accountdbname);
    usr.pvt_type=usr.pvt_type ?  usr.pvt_type:"user" ;
    var result =await insertObjectToDB(accountdbname,usr);
    return result;


}
const getCallReportData = async (propertydbname) => {
    //console.log("\getComapnyUsers ", propertydbname);
    const propertydbwithmonthname = getMonthDbName(propertydbname);
    const propertydb = nano.use(propertydbwithmonthname);
    var userdocspromise = new Promise(async (resolve, reject) => {
        //check this
        const contactsSelector = {
            "selector": {
                "pvt_type": "user",
                "notify_enabled": true,
                "scheduleemailreport": {
                    "$exists": true
                },
                "$or": [
                    {
                        "scheduleemailreport.daily.is_active": true
                    },
                    {
                        "scheduleemailreport.weekely.is_active": true
                    },
                    {
                        "scheduleemailreport.monthaly.is_active": true
                    }
                ]
            },
            "limit": 30000,
            "fields": [
                "_id",
                "id",
                "first_name",
                "last_name",
                "propertylist",
                "scheduleemailreport",
                "msteruser",
                "user_type",
                "timezone"
            ],
             "use_index":"pvt_type_scheduleemailreport",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        };


        var userdocs = await getalldocumentsbyproperty(propertydb, contactsSelector);
        resolve(userdocs)
    });

    var result = await userdocspromise;
    return result;


}
const getCallActivityReportData = async (companydbname) => {
    console.log("\getCallActivityReportData1 ", companydbname);
    const companydb = nano.use(companydbname);
    var callActivityReportDataPromise = new Promise(async (resolve, reject) => {
        //check this
        const contactsSelector = {
            "selector": {
                "pvt_type": "callactivityreport",

                "enabled": true,
                "$or": [
                    {
                        "daily.is_active": true
                    },
                    {
                        "weekely.is_active": true
                    },
                    {
                        "monthly.is_active": true
                    }
                ]
            },
            "limit": 30000,
            "use_index":"pvt_type_enabled",
             "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,

        };


        var userdocs = await getalldocumentsbyproperty(companydb, contactsSelector);
        resolve(userdocs)
    });

    var result = await callActivityReportDataPromise;
    return result;


}
const getComapnyUsers = async (companydbname) => {
    // console.log("\getComapnyUsers ", companydbname);
    const companydb = nano.use(companydbname);
    var userdocspromise = new Promise(async (resolve, reject) => {
        //check this
        const contactsSelector = {
            "selector": {
                "pvt_type": "user",
                "notify_enabled": true,
                "scheduleemailreport": {
                    "$exists": true
                },
                "$or": [
                    {
                        "scheduleemailreport.daily.is_active": true
                    },
                    {
                        "scheduleemailreport.weekely.is_active": true
                    },
                    {
                        "scheduleemailreport.monthaly.is_active": true
                    }
                ]
            },
            "limit": 30000,
            "fields": [
                "_id",
                "id",
                "first_name",
                "last_name",
                "propertylist",
                "scheduleemailreport",
                "msteruser",
                "user_type",
                "email",
                "timezone"
            ],
            "use_index":"pvt_type_scheduleemailreport",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
        };


        var userdocs = await getalldocumentsbyproperty(companydb, contactsSelector);
        resolve(userdocs)
    });

    var result = await userdocspromise;
    return result;


}
const insertusersettings = async(usrsettings, accountdbname) => {
    console.log("\naccountdbname ", accountdbname);
    usrsettings.pvt_type = "usersetting";
    return await insertObjectToDB(accountdbname,usrsettings)

}
const getemrtdata = async () => {
    const globaldb = nano.use("globaldb");
    //check here
    const contactsSelector = {
        'selector': {
            "pvt_type": "emrtavg",
        },
        "use_index":"pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var emrtdata = await getdocumentbyproperty(globaldb, contactsSelector);

    return emrtdata;

}

const getcallsummerydata = async (companydbname) => {
    const companydb = nano.use(companydbname);
    const contactsSelector = {
        'selector': {
            "pvt_type": "callsummery",

        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
    }
    var callsummeryforcompany = await getdocumentbyproperty(companydb, contactsSelector);

    return callsummeryforcompany;

}
const get_call_activity_data = async (companyid) => {
    const start_date_local = moment().add(-30, "days").startOf('day');
    var start_date_utc = moment(start_date_local.clone()).utc();
    var start_date_utc_unix = start_date_utc.unix();

    const end_date_local = moment().endOf('day');
    var end_date_utc = moment(end_date_local.clone()).utc();
    var end_date_utc_unix = end_date_utc.unix();
    const querystring = `(companyid:${companyid})`;

    const payload = {
        querystring: querystring,
        starttime: start_date_utc_unix,
        endtime: end_date_utc_unix
    }

    const callActivityData = await getelasticsearchdata(payload);
    return callActivityData;
}
const send_callactivity_report= async()=>
{
   var dbnames:any=await getcompanyaccountdbnamesforcron();   
    for (var dbindex=0;dbindex<dbnames.length;dbindex++)
    {
        var account= dbnames[dbindex];
        const company = account.type==="company";
        const companyid =account.accountid;
        if (company)
        {
            // console.log("company")
            const dbname =parseAccountToDatabaseName( companyid);

            var scheduleemailreport = await getSechdulereportData(dbname, "callactivitydailyreport");
            const callActivityData:any=  await get_call_activity_data(companyid);
            for (var i=0;i<scheduleemailreport.length;i++) 
            { 
                if (scheduleemailreport[i] && scheduleemailreport[i]!='' && scheduleemailreport[i].data && scheduleemailreport[i].data.length)
                { 
                    //console.log(scheduleemailreport[0]);
                    var emails =scheduleemailreport[i].data.join();
                    var filename = (scheduleemailreport[i].filename!='' && scheduleemailreport[i].filename!=undefined) ? scheduleemailreport[i].filename : 'call_activity';
                   sendCallActivityScheduleReport(callActivityData, emails,filename);
                   scheduleemailreport[i].processed=true;
                   await insert_dailyemaillist(dbname,scheduleemailreport[i])
                }
            }

        }
    }
    //
}
const callactivity_report = async () => {
   var dbnames:any=await getcompanyaccountdbnamesforcron();   
     for (var dbindex=0;dbindex<dbnames.length;dbindex++)
    {
        var account= dbnames[dbindex];
        const companyid =account.accountid;
        
        const reportrunningUTCTime= moment().utc();
        const company = account.type==="company";
        if (company)
        {
            const dbname =parseAccountToDatabaseName( companyid);
            const callActivityScheduleData: any = await getCallActivityReportData(dbname);
            if (callActivityScheduleData && Array.isArray(callActivityScheduleData) &&callActivityScheduleData.length>0 )
            {

                const companyschedulereportinfo = {
                    companyid: companyid,
                    companydbname: dbname,
                    callActivityScheduleData: callActivityScheduleData,
                    reportrunningUTCTime
                }
                await build_callactivity_report(companyschedulereportinfo);
            }


        }
    };


}
const send_callsummery_report=async ()=>
{
        var dbnames:any=await getcompanyaccountdbnamesforcron();
   for (var i=0;i<dbnames.length;i++)
    
    {
        var account= dbnames[i];
        const company = account.type==="company";
        if (company)
        {
            // console.log("company")
            const dbname =parseAccountToDatabaseName( account.accountid);
            var schedulereportdatalist= await getSechdulereportData(dbname,"dailyreport");
           if (schedulereportdatalist && Array.isArray(schedulereportdatalist) && schedulereportdatalist.length>0)
            {
                var callsummeryData = await getcallsummerydata(dbname);
                for (var s=0; s<schedulereportdatalist.length;s++)
                {
                    const schedulereportdata=schedulereportdatalist[s];
                
                    if (schedulereportdata.data && schedulereportdata.data.length)
                    {
                        var emails = schedulereportdata.data.join();
                        console.log(emails);
                        await sendScheduleReport(callsummeryData, emails);

                    }
                    schedulereportdata.processed = true;
                    await insert_dailyemaillist(dbname, schedulereportdata)
                }

            }
        }
    }

}
const callsummery_report = async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getcompanyaccountdbnamesforcron();
    
    const reportrunningUTCTime= moment().utc();
    for (var i=0;i<dbnames.length;i++)
    
    {
        var account= dbnames[i];
        
        var companyid= parseDatabaseNameToAccount(account.accountid);
        const company = account.type==="company";
        if (company)
        {
            //console.log(account)
            // console.log("company")
            const dbname =parseAccountToDatabaseName( account.accountid);
            const companyuserlist:any=  await  getComapnyUsers(dbname);
            if (companyuserlist && Array.isArray(companyuserlist) &&companyuserlist.length>0 )
            {

                const companyschedulereportinfo = {
                    companyid: companyid,
                    companydbname: dbname,
                    users: companyuserlist,
                    reportrunningUTCTime
                }
               await send_callsumery_report(companyschedulereportinfo);
            }


        }
    }


}
const send_callsumery_report= async (companyScheduleReportInfo )=>
{

    const companydbname = companyScheduleReportInfo.companydbname;
    var users = companyScheduleReportInfo.users;

    const reportrunningUTCTime = companyScheduleReportInfo.reportrunningUTCTime;
    var dailyemaillist = [];
    var weeklyemaillist = [];
    var monthlyeamillist = [];
    for (var userindex = 0; userindex < users.length; userindex++) {
        try
        {

            var user = users[userindex];
            const timezone = user.timezone ? user.timezone : "America/New_York";
            var now_date_time = reportrunningUTCTime.tz(timezone);
            var next_run_report_time = now_date_time.clone().add(30, 'minutes');

            var user_schedule_report_time_string;
            const scheduleemailreport = user.scheduleemailreport;
            const dayname = now_date_time.format('dddd');
            const monthday = now_date_time.format('DD');
            const endOfMonth = moment().endOf('month').format('DD');
            var timing;
            if (scheduleemailreport.daily.is_active)
            {
                const daily = scheduleemailreport.daily;
                timing = daily.timing;

                //   user_schedule_report_time_string= `${dailytiming.hh}:${dailytiming.mm} ${dailytiming.a}`;
                //user_schedule_report_time=  moment(from_time_1 ,"hh:mm a");
            }
            else if (scheduleemailreport.weekely.is_active && scheduleemailreport.days[ dayname])
            {
                const weekely = scheduleemailreport.weekely;
                timing = weekely.timing;
                // user_schedule_report_time_string= `${weekelytiming.hh}:${weekelytiming.mm} ${weekelytiming.a}`;;
            }
            else if (scheduleemailreport.monthaly.is_active)
            {

                const monthaly = scheduleemailreport.monthaly;
                const reporttype = parseInt(monthaly.report_type);


                if ((reporttype === 0 && monthday === 1) || (reporttype === 2 && monthday === 15)
                    || (endOfMonth===monthday))
                    {
                    timing = monthaly.timing;
                    //user_schedule_report_time_string= `${monthalytiming.hh}:${monthalytiming.mm} ${monthalytiming.a}`;;
                }
            }
            //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
            {

                const hh = parseInt(timing.hh);
                if (timing.a === "pm" && hh != 12)
                    timing.hh = hh + 12;
                else if (hh === 12 && timing.a === "am")
                    timing.hh = 0;
                const user_schedule_report_Date_time = moment.tz(timezone);
                user_schedule_report_Date_time.set({
                    hour: timing.hh,
                    minute: timing.mm,
                    second: timing.ss

                })

                /* console.log("user_schedule_report_Date_time");
                 console.log(user_schedule_report_Date_time.format("DD-MM-YY hh mm ss A z"));
              */
                /// 
                if (user_schedule_report_Date_time.isBetween(now_date_time,next_run_report_time))
                {
                    console.log("I am here ");

                    const emaillist = scheduleemailreport.emails;
                    dailyemaillist.push(emaillist);

                }
            }
        }
        catch(error)
        {
            //console.log(error);
        }
    };
    if (dailyemaillist.length>0)
    {
        const data = {
            "pvt_type": "dailyreport",
            "data": dailyemaillist,
            "processed": false
        }
        await insert_dailyemaillist(companydbname, data)
    }
}

const build_callactivity_report= async (companyScheduleReportInfo )=>
{

    const companyid = companyScheduleReportInfo.companyid;
    const companydbname = companyScheduleReportInfo.companydbname;
    var callActivitySchdData = companyScheduleReportInfo.callActivityScheduleData;
    const timezone = "America/New_York";
    const reportrunningUTCTime = companyScheduleReportInfo.reportrunningUTCTime;
    var now_date_time = reportrunningUTCTime.tz(timezone);
    console.log('current time',now_date_time);
    var next_run_report_time = now_date_time.clone().add(30, 'minutes');
    
    for (var _index=0;_index< callActivitySchdData.length;_index++)
    {
        try
        {
            var dailyemaillist = [];
            let filename='';
            var data = callActivitySchdData[_index];
            var user_schedule_report_time_string;
            const scheduleemailreport = data;
            filename = scheduleemailreport.filename;
           console.log('scheduleemailreport',scheduleemailreport);
            const dayname = now_date_time.format('dddd');
            const monthday = now_date_time.format('DD');
            console.log('dayname',dayname);
            
            const endOfMonth = moment().endOf('month').format('DD');
            console.log('endOfMonth',endOfMonth);
            var timing;
            let foundCron=false;
            if (scheduleemailreport.daily.is_active)
            {
                const daily = scheduleemailreport.daily;
                timing = daily.timing;
                let dailyTiming = setTiming(timing);
                if (dailyTiming.isBetween(now_date_time,next_run_report_time))
                {
                    foundCron = true;
                    console.log('dailyTiming',dailyTiming);
                }
            }
              if (scheduleemailreport.weekely.is_active && scheduleemailreport.weekely.days[dayname])
            {
                const weekely = scheduleemailreport.weekely;
                timing = weekely.timing;
                let weeklyTiming = setTiming(timing);
                if (weeklyTiming.isBetween(now_date_time,next_run_report_time))
                {
                    foundCron = true;
                    console.log('weekly timng',weeklyTiming);
                }
                
                // user_schedule_report_time_string= `${weekelytiming.hh}:${weekelytiming.mm} ${weekelytiming.a}`;;
            }
              if (scheduleemailreport.monthly.is_active)
            {

                const monthly = scheduleemailreport.monthly;
                const reporttype = parseInt(monthly.report_type);
                //timing = monthly.timing;//after testing remove it
                //console.log('monthly timng',timing);
                if ((reporttype===0 &&monthday===1) ||(  reporttype===1&& monthday==15)
                    || (reporttype===2 && endOfMonth==monthday))
                    {

                    timing = monthly.timing;
                    let monthlyTiming = setTiming(timing);
                    if (monthlyTiming.isBetween(now_date_time,next_run_report_time))
                    {
                        foundCron = true;
                        console.log('monthly timng',monthlyTiming);
                    }
                    //user_schedule_report_time_string= `${monthalytiming.hh}:${monthalytiming.mm} ${monthalytiming.a}`;;
                }
            }
            //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
            {
                /*const hh = parseInt(timing.hh);
                if (timing.a === "pm" && hh != 12)
                    timing.hh = hh + 12;
                else if (hh === 12 && timing.a === "am")
                    timing.hh = 0;
                const user_schedule_report_Date_time = moment.tz(timezone);
                user_schedule_report_Date_time.set({
                    hour: timing.hh,
                    minute: timing.mm,
                    second: timing.ss

                })*/
                console.log("user_schedule_report_Date_time");
                console.log('next_run_report_time',next_run_report_time);
                if (foundCron)
                {
                    const emaillist = scheduleemailreport.emails;
                    dailyemaillist.push(emaillist);
                    //sendCallActivityScheduleReport(callActivityData, scheduleemailreport)

                }
            }

            console.log('dailyemaillist',dailyemaillist);
            if (dailyemaillist.length>0 && filename!=''  && filename!=undefined && filename!=null)
            {
                const data = {
                    "pvt_type": "callactivitydailyreport",
                    "data": dailyemaillist,
                    'filename': filename,
                    "processed": false
                }
                await insert_dailyemaillist(companydbname, data)
            }
        }
        catch(error)
        {
            //console.log(error);
        }
    };
}

const setTiming = (timing) => {
    const timezone = "America/New_York";
    const hh = parseInt(timing.hh);
    if (timing.a === "pm" && hh != 12)
        timing.hh = hh + 12;
    else if (hh === 12 && timing.a === "am")
        timing.hh = 0;
        
    let user_schedule_report_Date_time = moment.tz(timezone);
    user_schedule_report_Date_time.set({
        hour: timing.hh,
        minute: timing.mm,
        second: timing.ss

    })

    return user_schedule_report_Date_time;

}
const formaReportTime = (value) => {
    if (isNaN(value) || !value) return '';
    const time = parseInt(value);
    var hour = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) - (hour * 60);
    const sconds = (time % 60);
    const minutes_str = minutes.toString();
    const sconds_str = sconds.toString();
    const hour_str = hour.toString();
    if (hour > 0)
        return `${hour}h ${minutes_str}m`;
    else if (minutes > 0)
        return `${minutes}m ${sconds_str}s`;
    else
        return `0m ${sconds_str}s`;
}
const sendCallActivityScheduleReport = (reportdata, emails,filename) => {

    const header = ["Company Name", "Property Name", "Date", "Time", "Bussiness Hour", "Call Duration", "Type", "LIVE",
        "Caller Name", "Caller Number", "Respondent", "Response Time"];

    const csv = [];
    csv.push(header.join());
    console.log("reportdata");
    reportdata.forEach(cdr => {

        const cdrString = [];
        const duringbussinesshours = cdr.duringbussinesshours === "true" ? 'yes' : 'no'
        const timezone = cdr.propertytimezone ? cdr.propertytimezone : "America/New_York";
        const incidentdate = moment.unix(cdr.incidentdate).tz(timezone).format('M/D/YY');
        const incidentime = moment.unix(cdr.incidentdate).tz(timezone).format('h:mma');
        console.log(cdr.when)
        console.log(cdr.callduration)
        cdrString.push(
            cdr.companyname,
            cdr.propertyname,
            incidentdate,
            incidentime,
            duringbussinesshours,
            formaReportTime(cdr.callduration),
            cdr.type,
            cdr.when,
            cdr.callername,
            cdr.fromd,
            cdr.respondent,
            formaReportTime(cdr.responsetime),


        );
        csv.push(cdrString.join(','));
    });
    console.log("csv");
    const emaillist = emails;
    console.log(emaillist);

    const emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: emaillist,
        subject: 'Notify call activity report',
        text: `Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .`,
        html: `<img src="http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png" width="150" height="63" title="HelloSpoke Logo" alt="HelloSpoke">
        <div>
            <h1>Thank you for using HelloSpoke!  </h1>
            <p>Attached you will find your scheduled HelloSpoke call report.</p>
        </div>`,

        attachments: [
            {
                filename: filename+'.csv',
                content: csv.join('\n')
            }
        ]
    }
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(emailMessage, (err, info) => {
        if (err) {
            console.log(`kkkkkkkkkkkkkkkk erorr: `, err);

            // callback(err, null);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
    });
}
const sendScheduleReport = (reportdata, emails) => {

    const header = reportdata.data.header;
    header.unshift('TOTAL CALLS');
    header.unshift('PROPERTY NAME');
    header.push("AVG EMRT");
    const csv = [];
    csv.push(header.join());//['PROPERTY NAME,TOTAL CALLS,LEASING,GENERAL,COURTESY ,EMERGENCY ,OTHER , AVG EMRT']; 

    reportdata.data.data.forEach(cdr => {
        const duration = moment.duration(+cdr.avg_emrt, 'seconds');
        var convert_durt = moment.utc(duration.asMilliseconds()).format("mm:s")
        var durtn = convert_durt.split(':');
        var final_durtn = durtn[0] + 'm' + ' ' + durtn[1] + 's';
        var _avgemrt = isNaN(cdr.avg_emrt) ? "-" : final_durtn;
        const cdrString = [];
        cdrString.push(
            cdr.propertyname,
            cdr.total_call,
            cdr[header[2].toLowerCase()],
            cdr[header[3].toLowerCase()],
            cdr[header[4].toLowerCase()],
            cdr[header[5].toLowerCase()],
            cdr[header[6].toLowerCase()],
            _avgemrt//   final_durtn 
        );
        csv.push(cdrString.join(','));
    });
    console.log("csv");
    console.log(csv);
    const emaillist = emails;
    console.log(emaillist);
    const emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: emaillist,
        subject: 'Notify property report',
        text: `Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .`,
        html: `<img src="http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png" width="150" height="63" title="HelloSpoke Logo" alt="HelloSpoke">
        <div>
            <h1>Thank you for using HelloSpoke!  </h1>
            <p>Attached you will find your scheduled HelloSpoke call report, .</p>
        </div>`,

        attachments: [
            {
                filename: `Notify_Schedule.csv`,
                content: csv.join('\n')
            }
        ]
    }
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(emailMessage, (err, info) => {
        if (err) {
            console.log(`kkkkkkkkkkkkkkkk erorr: `, err);

            // callback(err, null);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
    });
}
const update_call_summery_data= async()=>
{
    var dbnames:any=await getcompanyaccountdbnamesforcron();
    var result=[];
   // console.log(dbnames);
    for (var i =0;i<dbnames.length;i++)
    {
        var account= dbnames[i];
        const company = account.type==="company";
        const companyid =account.accountid;
        if (company)
        {
             const dbname =parseAccountToDatabaseName( companyid);
            var call_summery_result_data=await calculate_company_callsummery(companyid,account.industry);
            var inserresult = insertcallsummerydata(dbname, call_summery_result_data);
            result.push(inserresult);
        }
    }
    return result;

}
const calculate_company_callsummery= async (companyid,industry)=>
{
    console.log("calculate_company_callsummery")
    const companydbname = parseAccountToDatabaseName(companyid);
    const comapanydb = nano.use(companydbname);
   
    const reportdocs: any = await getmonthreportdata(companyid);    
    const emrgency_reportdocs = reportdocs.filter(r => r.type 
        && r.type.toLowerCase() === "emergency" && !isNaN(r.responsetime) && r.responsetime > 0)
    const companypropertylist = await getcompanypropertylsit(companyid);
    var propertyData = d3c.nest()
        .key(function (d) { return d.propertyid; })

        .rollup(function (v) {
            return {
                total: v.length,
            }
        })
        .entries(reportdocs);

    var emergency_propertyData = d3c.nest()
        .key(function (d) { return d.propertyid; })

        .rollup(function (v) {
            return {

                avg_emrt: d3.mean(v, function (d) { return isNaN(d.responsetime) ? 0 : d.responsetime>=86400?86400:d.responsetime; })
            }
        })
        .entries(emrgency_reportdocs);

    var emergency_property_Response_Data_Count = d3c.nest()
        .key(function (d) { return d.propertyid; })

        .rollup(function (v) {
            return {
                total: v.length,
            }
        })
        .entries(emrgency_reportdocs);


    var calloptionData = d3c.nest()
        .key(function (d) { return d.propertyid; })

        .key(function (d) { return d.type; })
        .rollup(function (v) { return v.length; })
        .entries(reportdocs);
    const multifamilycalloptions = ["Leasing", "General", "Emergency", "Courtesy", "Other"];
    const heatingandaircalloptions = ["Plumbing", "Electrical", "General", "Emergency", "Other"]
    const header= industry==="Multifamily" ?
        multifamilycalloptions
        : heatingandaircalloptions;
    var callsummery = [];
    companypropertylist.forEach(p => {
        const propertydata = propertyData.find(pd => pd.key === p.propertyid);
        const emergency_propertydata = emergency_propertyData.find(pd => pd.key === p.propertyid);
        const emergency_property_response_data_count = emergency_property_Response_Data_Count.find(pd => pd.key === p.propertyid);
        var rowdata: any = {
            propertyname: p.propertyname,
            propertyid: p.propertyid,
        }
        const calloptionRows = calloptionData.find(cl => cl.key === p.propertyid);
        // console.log(propertydata);
        if (propertydata) {
            rowdata["total_call"] = propertydata.value.total;

        }
        else {
            rowdata["total_call"] = 0;
            ;
        }
        rowdata["avg_emrt"] = emergency_propertydata &&
            emergency_propertydata.value &&
            emergency_propertydata.value.avg_emrt ?
            parseInt(emergency_propertydata.value.avg_emrt) :
            "-";
        rowdata["avg_emrt_data_count"] = emergency_property_response_data_count &&
            emergency_property_response_data_count.value &&
            emergency_property_response_data_count.value.total ?
            parseInt(emergency_property_response_data_count.value.total) :
            0;

        // if (calloptionRows) {
        header.forEach(calloption => {
            const calloptionRowData = calloptionRows && calloptionRows.values ?
                calloptionRows.values.find(clpr => clpr.key === calloption) : undefined;
            //  console.log(calloptionRowData);
            if (calloptionRowData)
                rowdata[calloption.toLowerCase()] = calloptionRowData.value;
            else
                rowdata[calloption.toLowerCase()] = 0;
        });

        callsummery.push(rowdata);

    });
    var result = {
        data: {
            header: header,
            data: callsummery,
        }
    }
    console.log( JSON.stringify(result));
    return result;
}

async function calculate_company_callsummery2(companyid, industry) {
    const multifamilycalloptions = [
        "Leasing",
        "General",
        "Emergency",
        "Courtesy",
        "Other",
    ];
    const heatingandaircalloptions = [
        "Plumbing",
        "Electrical",
        "General",
        "Emergency",
        "Other",
    ];
    const header =
        industry === "Multifamily"
            ? multifamilycalloptions
            : heatingandaircalloptions;
    const companydbname = parseAccountToDatabaseName(companyid);
    // const comapanydb = nano.use(companydbname);
    const companypropertylist = await getcompanypropertylsit(companyid);
    const reportdocs: any = await getmonthreportdata2(companyid);
    let result = [];
    reportdocs.forEach((data) => {
        let obj: any = {};
        obj.propertyid = data.key;
        // obj.propertyname = data.propertyname.buckets[0].key;
        data.times.averages.average_emrt.value != null
            ? (obj.avg_emrt = Math.floor(
                  data.times.averages.average_emrt.value
              ))
            : (obj.avg_emrt = "-");
        obj.avg_emrt_data_count = data.times.averages.doc_count;
        header.forEach((calloption) => {
            const calloptionRowData = data.types.buckets
                ? data.types.buckets.find((clpr) => clpr.key === calloption)
                : undefined;
            obj["total_call"] = data.doc_count;
            if (calloptionRowData)
                obj[calloption.toLowerCase()] = calloptionRowData.doc_count;
            else obj[calloption.toLowerCase()] = 0;
        });
        result.push(obj);
    });
    let reportdata = [];
    companypropertylist.forEach((element) => {
        let push_data = result.find(
            (data) => data.propertyid == element.propertyid
        );
        if (push_data) {
            push_data.propertyname = element.propertyname;
        } else {
            push_data = {
                propertyname: element.propertyname,
                propertyid: element.propertyid,
                total_call: 0,
                avg_emrt: "-",
                avg_emrt_data_count: 0,
            };
            header.forEach((header_value) => {
                push_data[header_value.toLowerCase()] = 0;
            });
        }
        reportdata.push(push_data);
    });
    return { header: header, data: reportdata };
}

const insertcallsummerydata = async (companydbname, callsummurydata) => {
    
    var _storeddata = await getcallsummerydata(companydbname);

    callsummurydata.pvt_type = "callsummery";
    if (_storeddata) {
        callsummurydata._id = _storeddata._id;
        callsummurydata._rev = _storeddata._rev;
    }
    var result= await insertObjectToDB(companydbname,callsummurydata);
    return result;
}


const getSechdulereportData = async (companydbname, pvt_type) => {

    const companydb = nano.use(companydbname);
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": pvt_type,
            "processed": false

        },
        "use_index":"pvt_type_processed",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };

    var schedulereports = await getalldocumentsbyproperty(companydb, contactsSelector);

    return schedulereports;
}


const removeOptinFromCompany =  async (companyid,phonenumber)=>
{
        
        const companydbname = parseAccountToDatabaseName(companyid);
        var users= await  getusers(companyid);
        console.log(users.length)
        var filtered_users= users.filter(u=>u.phonesettings&& u.phonesettings.settings && u.phonesettings.settings
                            .find(ph=>ph.number===phonenumber && ph.optin));
        console.log(filtered_users.length)
        for (var i=0; i< filtered_users.length ;i++)
        {
            var user= filtered_users[i];
            console.log(user.first_name)
            console.log(user.phonesettings)
            var setting = user.phonesettings.settings.filter(ph=>ph.number===phonenumber && ph.optin);
            for (var s=0 ;s<setting.length; s++)
            {
                var phsetting=  user.phonesettings.settings.find(ph=>ph.number===phonenumber && ph.optin);
                console.log(phsetting)
                phsetting.optin= false;
                console.log(phsetting)
            }
            console.log(user.phonesettings)
            var result= await insertObjectToDB(companydbname,user);
        }   
}

const insertIntoOptin=async(companyid,phonenumber , isopting)=>
{
    console.log("insertIntoOptin");
    const globalSmsDb= nano.use("globaldb_optin");
    const contactsSelector = {
        "selector": {
            "pvt_type": "optinnumber",
            "phonenumber":phonenumber,
            "companyid":companyid
         },
         "use_index":"pvt_type_phonenumber",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
       
    }
    var insert_object:any= {
        "phonenumber":phonenumber,
        "companyid":companyid,
        "pvt_type":"optinnumber",
        "isopting":isopting
    }
    var stored_obj=await getdocumentbyproperty(globalSmsDb,contactsSelector); 
    var insertrequires:boolean= true;
    var errorOccured=false;
    if (stored_obj&& stored_obj._id)
    {
      
        insert_object._id=stored_obj._id,
        insert_object._rev=stored_obj._rev
        insertrequires=stored_obj.isopting!=isopting;
    }
    if (insertrequires)
    {
        const insertIntoOptinpromise = new Promise<any>((resolve, reject) => {
            globalSmsDb.insert(insert_object, function (err, result) {
            if (err) {
                      console.log("err insert object ",err);
                      errorOccured=true;
                      resolve( err);;
                  }
                  else {
                    insertrequires=true;
                    console.log("insertrequires222");
                    console.log(insertrequires);
    
                    resolve( insertrequires);
                  }
              });
        });
         await   insertIntoOptinpromise;
    }
    console.log("insertrequires3333");
    console.log(insertrequires);
    
   return {error:errorOccured,needtosendmessage:insertrequires}
    
}

const insert_dailyemaillist = async (companydbname, data) => {

    var result= await insertObjectToDB(companydbname,data);
    return result;
}
const insertemrtdata = async (i_emrtdata) => {
    const globaldb = nano.use("globaldb");
    var emrtdata = await getemrtdata();

    i_emrtdata.pvt_type = "emrtavg";
    if (emrtdata) {
        i_emrtdata._id = emrtdata._id;
        i_emrtdata._rev = emrtdata._rev;
    }
    var result= await insertObjectToDB("globaldb",i_emrtdata);
    return result;
}


const insertcompany = async (company, req): Promise<any> => {

    return new Promise(async (resolve, reject) => {
        // accountdevice
        var tree = company.tree;
        tree.push(company.kazooid);
        company.pvt_type = "company";
        tree = tree.reverse();
        var index = 1;
        var dbnames: any = await getaccountdbnames();

        console.log("inserting company");
        var accountinsertpromise = [];
        tree.forEach(accid => {
            accountinsertpromise.push(new Promise(async (resolve, reject) => {

                const _accountdbname = parseAccountToDatabaseName(accid);
                const isCompanyDBAvailable = dbnames.find(d => d === _accountdbname);
                if (!isCompanyDBAvailable) {
                    const accountdbwithmonthname = getMonthDbName(_accountdbname);
                    var creation_result = await createaccountdb(_accountdbname);
                    creation_result = createaccountdb(accountdbwithmonthname);


                    await setKazooAccountEmailNotification(req, accid);
                    await deletekazoostorage(req, accid)
                    const result = await creteKazooStorageAttachments(req, accid);

                }
                // console.log("\n  accountname ", _accountdbname);
                const accountDb = nano.use(_accountdbname);
                const stored_company = await getcompanyInfo(company.companyid, accountDb);
                if (stored_company && stored_company._id && stored_company._rev) {
                    company._id = stored_company._id;
                    company._rev = stored_company._rev;
                }
                else if (company._id) {
                    delete company._id;
                    delete company._rev;

                }

                accountDb.insert(company, (err, body) => {
                    if (err) {
                        console.log("err ", err);
                        resolve(err);;
                    }
                    else {
                        console.log(" company inserted succefully");
                        insertaccountinfo(company.companyid, company,"company",company.name);
                        resolve(body);

                    }
                });

            }))
        });
        Promise.all(accountinsertpromise).then(results => {
            resolve("succefully inserted company");
        }).catch(err => {
            reject(err);
        });
    })


}
const sendNotifySMS = async (payload) => {
    BandwidthMessaging.Configuration.basicAuthUserName = "notify_api";;
    BandwidthMessaging.Configuration.basicAuthPassword = "Th1s1s@L0ngP@55W0rd!";
    const messagingController = BandwidthMessaging.APIController;
    const app_id = process.env.BANDWIDTH_APP_ID;

    var body = new BandwidthMessaging.MessageRequest({
        "applicationId": app_id,
        "to": payload.to,
        "from": payload.from,
        "text": payload.messagetext,
        "tag": "web hook outbound"
    });
    console.log(body);
    var response = await messagingController.createMessage("5000040", body).catch(function (err) {
        console.log("rejet")
        console.log(err)
    });

    return response;
}
const sendMessage = async (payload) => {

    const sendMessagePromise = new Promise<any>((resolve, reject) => {
        // console.log("sendsms2\n", payload);
        client.Message.send({
            from: payload.from,
            to: payload.to,
            text: payload.messagetext,
            callbackUrl: `${process.env.BANDWIDTH_MESSAGE_SERVER}`,
            receiptRequested: 'all',

        })
            .then(function (message) {
                resolve(JSON.stringify(message));
            })
            .catch(function (err) {

                resolve(JSON.stringify(err));
            });

    });

    const result = await sendMessagePromise;
    return result;

}

const updatecompany = async (company, accountid) => {

    var accid = company.companyid;

    const _accountdbname = parseAccountToDatabaseName(accid);
    company.pvt_type = "company";
    console.log("\n  accountname ", _accountdbname);
    var result= await insertObjectToDB(_accountdbname,company);

    return true;
}

const getproperties = async (companyid) => {
    return new Promise(async (resolve, reject) => {
        const accountDbName = parseAccountToDatabaseName(companyid);
        const accountDb = nano.use(accountDbName);
        const contactsSelector = {
            'selector': {
                'pvt_type': 'property',
                'enabled': true
            },
            "use_index": "pvt_type_enabled",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit: 30000
        }
        var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
        var result={
            docs:docs 
        };
       resolve( (result));
        
    });
}

 



const updateNOtifySchedule= async(propertyid, didnumber)=> 
{
    var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
    const property = await getpropertyInfo(propertyid);
    const companydbname = parseAccountToDatabaseName(property.companyid);
    const companydb = nano.use(companydbname);
    const company = await getcompanyInfo(property.companyid);
    const property_schedule_type = property.schedule_type;

    var isCustomProperty = !property_schedule_type || property_schedule_type.toLowerCase() === "custom";
  
    ///notify

    var schedule = await findSchedule(accountDb, false, didnumber, property, company, isCustomProperty);
    var userIds = schedule  ? await findDayScheduleUsers(accountDb, schedule, false, company, property, isCustomProperty) : [];
    if (userIds.length == 0) {
        userIds = await findAnyNotifyDayScheduleUsers(accountDb, didnumber, false, company, property);
    }
    var userdocs = await findDayScheduleuserlist(userIds, property);
     var escalationList=await findNotifyEscalationSettings(property,userdocs);
    userdocs= userdocs.filter(u=> userIds.find(u1=>u1=== u.id));

    var ntresult = await generateNoticationreply(userIds, userdocs);




    var callflowsoptiontype;
    if (schedule)
        callflowsoptiontype = schedule.callflowsoptiontype


    var result: any = {
        "didnumber": didnumber,
        "propertyid": propertyid,
        "type": "notify",
        "label": callflowsoptiontype,
        "data": {
            "escalation": escalationList,
            "notify": ntresult
        }

    }
    // insertNotifySchedule(result);

    return result;
}

const getNOtifySchedule = async (propertyid, didnumber) => {
    const prpertydbname = parseAccountToDatabaseName(propertyid);
    const propertydb = nano.use(prpertydbname);
    const contactsSelector = {
        "selector": {
            "pvt_type": "notify",
            "didnumber": didnumber
        },
        "use_index": "pvttypedidnumber",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    console.log(JSON.stringify(contactsSelector))
    var current_schedule = await getdocumentbyproperty(propertydb, contactsSelector);
    return current_schedule;
}
const insertNotifySchedule = async (schedule) => {
    const propertyid = schedule.propertyid;
    schedule.pvt_type = "notify";
    const prpertydbname = parseAccountToDatabaseName(propertyid);
    const stored_schedule = await getNOtifySchedule(schedule.propertyid, schedule.didnumber);
    if (stored_schedule && stored_schedule._id) {
        schedule._id = stored_schedule._id;
        schedule._rev = stored_schedule._rev;

    }

    const result = await insertObjectToDB(prpertydbname,schedule);
    return result;

}
const insertproperty = async (property, accountid, req) => {

    const accountdbname = parseAccountToDatabaseName(accountid);
    var dbnames: any = await getaccountdbnames();

    const propertydbname = parseAccountToDatabaseName(property.propertyid);
    const isPropertyDbAvailable = dbnames.find(d => d === propertydbname);
    if (!isPropertyDbAvailable) {
        const propertydbwithmonthname = getMonthDbName(propertydbname);
        var creation_result = await createaccountdb(propertydbname);
        creation_result = createaccountdb(propertydbwithmonthname);



        const accountid = property.propertyid;
        await deletekazoostorage(req, accountid)
        const result = await creteKazooStorageAttachments(req, accountid);
    }
    property.pvt_type = "property";
    property.enabled = true;
    const accountDb = nano.use(accountdbname);
    const stored_property = await getpropertyInfo(property.propertyid, accountDb);

    if (stored_property && stored_property._id && stored_property._rev) {
        property._id = stored_property._id;
        property._rev = stored_property._rev;
    }
    const propertyInsertPromise = new Promise<any>(async (resolve, reject) => {
        accountDb.insert(property, (err, body) => {
            if (err) {
                console.log("err ", err);
                resolve(err);;
            }
            else {
                insertaccountinfo (property.propertyid,property,"property",property.kazoopropertyname)
                console.log(" property inserted succefully");
                resolve(body);

            }
        });
    });
    var result = await propertyInsertPromise;
    return result;

}
const removeemailsFromList = async (property, deletedemailids) => {
    removeEmailFromEscalationList(property.propertyid, deletedemailids);
    removeEmailAddressFromVoiceMaiilBox(property, deletedemailids);
}
const removeEmailFromEscalationList = async (propertyid, emailids) => {
    const accountdbname = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountdbname);
    console.log("removeEmailFromEscalationList");
    const contactsSelector = {
        'selector': {
            "pvt_type": "escalationemaillist",

        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false

    }
    var escalationemailobjlist = await getalldocumentsbyproperty(accountDb, contactsSelector);

    escalationemailobjlist.forEach(escalationemailobj => {
        var emaillist = escalationemailobj.emaillist;

        emaillist = emaillist.filter(e => !emailids.find((e1) => e1.email === e.email));

        escalationemailobj.emaillist = emaillist;
        updateescalationemaillist(accountdbname, escalationemailobj);
    });

}
const updateescalationemaillist = async (accountDbName, escalationemailobj) => {
    var result = await insertObjectToDB(accountDbName,escalationemailobj);
    return result;

}
const insertescalationemaillist = async (payload, callflowoption, userid) => {
    // console.log ("payload  insertescalationemaillist ", payload);
    const accountdbname = parseAccountToDatabaseName(payload.propertyid);
    const accountDb = nano.use(accountdbname);
    //check here
    const contactsSelector = {
        'selector': {
            "pvt_type": "escalationemaillist",
            "callflowoption": callflowoption
        },
        "use_index":"pvt_type_callflowoption",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var escalationemailobj = await getdocumentbyproperty(accountDb, contactsSelector);
    var emaillist = [];
    if (escalationemailobj) {
        emaillist = escalationemailobj.emaillist
    }
    else {
        escalationemailobj = {
            "pvt_type": "escalationemaillist",
            "callflowoption": callflowoption
        };
    }

    //       console.log ("emaillist1111 ",emaillist)
    if (!emaillist) emaillist = [];
    //     console.log ("emaillist 2222 ",emaillist)


    if (payload.checked && payload.email) {
        var emailobj = {
            email: payload.email,
            userid: userid
        }
        emaillist.push(emailobj);

    }
    else if (!payload.checked && payload.email) {

        emaillist = emaillist.filter(e => e.email != payload.email || e.userid != userid);
    }

    escalationemailobj.emaillist = emaillist;
    //   console.log ("escalationemailobj ",escalationemailobj)
    var result = await insertObjectToDB(accountdbname,escalationemailobj);
    return result;

}
const insertschedule = async (schedule, accountdbname) => {
    schedule.pvt_type = "schedule";
    schedule.enabled = true;
    var result = await insertObjectToDB(accountdbname,schedule );
    return result;

}

const insertadjustschedule = async (schedule, accountdbname) => {
    schedule.pvt_type = "adjustschedule";
    schedule.enabled = true;
    const accountDb = nano.use(accountdbname);
    // check here
    if (schedule._id) {
        const contactsSelector = {
            'selector': {
                "enabled": true,
                "pvt_type": "adjustschedule",
                "_id": schedule._id
            },
            "use_index":"_id",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000
        }
        var stored_schedule = await getdocumentbyproperty(accountDb, contactsSelector);
        if (stored_schedule && stored_schedule._id) {
            schedule._rev = stored_schedule._rev;
        }
    }
    return await insertObjectToDB(accountdbname,schedule);

}

const undoneoncalllist = async (_id, accountdbname) => {
    
    const accountDb = nano.use(accountdbname);
    //check here
    if (_id) {
        const contactsSelector = {
            'selector': {
                 "_id":_id
                },
                "use_index":"_id",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
        }
        var stored_object = await getdocumentbyproperty(accountDb, contactsSelector);
        if (stored_object && stored_object._id) {
            stored_object.enabled = false;
            stored_object.pvt_type =  `delete_${stored_object.pvt_type}`;

            return await insertObjectToDB(accountdbname,stored_object);
        }
        
    }

        
    //}

}
const unadjustschedule = async (_id, accountdbname) => {
    
    const accountDb = nano.use(accountdbname);
    //check here
    if (_id) {
        const contactsSelector = {
            'selector': {
                 "_id":_id
                },
                "use_index":"_id",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
        }
        var stored_schedule = await getdocumentbyproperty(accountDb, contactsSelector);
        if (stored_schedule && stored_schedule._id) {
            stored_schedule.enabled = false;
            return await insertObjectToDB(accountdbname,stored_schedule);
        }
        
    }

        
    //}

}
const removeEmailAddressFromVoiceMaiilBox = async (property, removedEmails) => {
    const apikey = await loginwithcred();
    const callflowdata = property.callflowdata.filter(cl => cl.callflowoptiontype === "FWD Message" && cl.deviceid)
    const propertyid = property.propertyid;
    if (callflowdata) {
        callflowdata.forEach(async (cl) => {
            var vmbox = await getVoiceMailBoxForId(apikey, propertyid, cl.deviceid);
            var emaillist = vmbox.data.notify_email_addresses;
            console.log(removedEmails);
            console.log(emaillist);
            if (emaillist) {
                emaillist = emaillist.filter(e => !removedEmails.find(e1 => e1.email === e));
                vmbox.data.notify_email_addresses = emaillist;
                console.log(emaillist);
                vmbox = await updateVoiceMailBoxForId(apikey, propertyid, cl.deviceid, vmbox);

            }
        });
    }

}
const updatefwdmessagevoicemaileemailsettings = async (apiKey, payload) => {
    var vmbox = await getVoiceMailBoxForId(apiKey, payload.propertyid, payload.callflowdata.deviceid);
    var emaillist = vmbox.data.notify_email_addresses;

    if (!emaillist) emaillist = [];
    if (payload.checked && payload.email) {
        emaillist.push(payload.email);

    }
    else if (!payload.checked && payload.email) {

        emaillist = emaillist.filter(e => e != payload.email);
    }
    vmbox.data.notify_email_addresses = emaillist;

    vmbox = await updateVoiceMailBoxForId(apiKey, payload.propertyid, payload.callflowdata.deviceid, vmbox);

}

const getVoiceMailBoxForId = async (apikey, accountId, vid) => {
    const kazooupdatepromise = new Promise<any>((resolve, reject) => {

        const kRequest = getKazooRequest(null, apikey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}`
                ,
                (e, r, b) => {
                    if (e) {
                        console.log(e);

                        resolve(e);
                    }
                    else {


                        resolve(JSON.parse(b));
                    }
                }
            );
    });


    const result = await kazooupdatepromise;
    return result;
}
const deleteVoiceMessages = async (accountId, vmbox_id) => {
    debugMessage(log4jslogger, `deleting voice mail for accountid  ${accountId} and voice mail box ${vmbox_id}`);
    const apiKey = await loginwithcred();
    const kazooupdatepromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(null, apiKey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vmbox_id}/messages?paginate=false`
                ,
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                        debugMessage(log4jslogger, `deleting voice mail error for accountid  ${accountId} and voice mail box ${vmbox_id} error ${JSON.stringify(e)}`);

                        resolve(e);
                    }
                    else {

                        const messages = JSON.parse(b);

                        if (messages && messages.data && messages.data.length > 50) {
                            const oldest_message = messages.data[messages.data.length - 1];

                            const mesageid = oldest_message.media_id;
                            const kRequest = getKazooRequest(null, apiKey)
                                .del(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vmbox_id}/messages/${mesageid}`
                                    , (err, response, body) => {
                                        debugMessage(log4jslogger, `deleting voice mail error for accountid  ${accountId} and voice mail box ${vmbox_id} error ${JSON.stringify(err)}`);

                                        console.log(body)
                                    });

                        }
                        resolve(JSON.parse(b));
                    }
                }
            );
    });


    const result = await kazooupdatepromise;
    return result;
}
const updateVoiceMailBoxForId = async (apikey, accountId, vid, vbox) => {

    //    console.log("\n updateVoiceMailBoxForId vbox ", vbox);
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {

        const kRequest = getKazooRequest(null, apikey)
            .post({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}`,
                body: vbox,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);

                        resolve(e);
                    }
                    else {
                        //  console.log("\nvoice mail box updated succesfully", b);
                        resolve(b);
                    }
                }
            );
    })
    const result = await kazooupdatepromiss;
    return result;
}

const checkResultExecution = (accountDb, contactsSelector, result) => {
    if (result.execution_stats && result && result.execution_stats && result.execution_stats.total_docs_examined > 10000) {
        //log here 
    }
}
const getdocumentbyproperty = async (accountDb, contactsSelector) => {

    const documentPromise = new Promise<any>((resolve, reject) => {

        accountDb.find(contactsSelector, function (err, result) {
            if (err) {
                console.log("err ", err);
                debugMessage(log4jsexceptionlogger, "getdocumentbyproperty--accountdb=" + JSON.stringify(err));
                resolve(err);;
            }
            else {

                var document;
                if (result.execution_stats) {
                  const dbname=accountDb.config.db;
                          Execution_stats_log(`Dbname:- ${dbname} ${JSON.stringify(contactsSelector)}`,result.execution_stats);
                 }
                if (result && result.docs) {
                    document = result.docs.length > 0 ? result.docs[result.docs.length - 1] : document;
                }
                else {
                    debugMessage(log4jslogger, `did not get result for ${JSON.stringify(contactsSelector)}`)
                    debugMessage(log4jslogger, `did not get result for ${JSON.stringify(accountDb)}`)

                }
                resolve(document);
            }
        });
    });

    const result = await documentPromise;
    return result;

}


const getalldocumentsbyproperty = async (accountDb, contactsSelector) => {

    const dbname=accountDb.config.db;
    const documentPromise = new Promise<any>((resolve, reject) => {

        accountDb.find(contactsSelector, function (err, result) {
            if (err) {
                console.log("err ", err);
                debugMessage(log4jslogger, `*getalldocumentsbyproperty* error for ${JSON.stringify(contactsSelector)}`)
                debugMessage(log4jslogger, `*getalldocumentsbyproperty* error  ${JSON.stringify(err)}`)

                resolve(err);;
            }
            else {

                var documents = [];
                if(result && result.execution_stats){
                    Execution_stats_log(`Dbname:- ${dbname} ${JSON.stringify(contactsSelector)}`,result.execution_stats);
                }
                if (result && result.docs) {

                    documents = result.docs.length > 0 ? result.docs : [];
                }
                else {
                    debugMessage(log4jslogger, `*getalldocumentsbyproperty* did not get result for ${JSON.stringify(contactsSelector)}`)
                }


                //   console.log("got document  " ,result);
                resolve(documents);
            }
        });
    });

    const result = await documentPromise;
    return result;

}



const insertObjectToDB=async (dbname,insertObjetc) => {
    const db =nano.use(dbname);
    const promise = new Promise(async (resolve, reject) => {
        db.insert(insertObjetc, (err, body) => {
            if (err) {
                console.log(`error inserting  in ${dbname} object ${JSON.stringify(insertObjetc)}`);
                console.log(JSON.stringify(err));
                reject( err);;
            }
            else {
                console.log(`${insertObjetc.pvt_type} is inserted successfully in ${dbname}` );
                resolve(body);

            }
        });
    });
    var result = await promise;
    return result;
}
const inserts3notification= async(s3notification)=>
{
   // if(typeof message === 'string') {
    console.log(s3notification)
    const globaldb=nano.use("globaldb");
    var insertdata={
       data:s3notification,
        pvt_type:"s3notification",
         notifytimestamp:moment().utc().unix()
    }
    var result= await insertObjectToDB("globaldb", insertdata);;
    return result;
}

const insertaccountinfo =async (id,obj,type,name)=>
{
    const globaldb = nano.use("globaldb");
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "accountinfo",
            "accountid": id

        }, 
        "use_index":"pvt_type_accountid",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 1
    }
    var stored_info = await getdocumentbyproperty(globaldb, contactsSelector);

    var insertdata:any={
        accountid:id,
        name:name,
        pvt_type:"accountinfo",
        industry:obj.industry,
        "type":type
    }
    if (stored_info && typeof(stored_info)!=undefined&& stored_info.accountid)
    {   
        insertdata._id=stored_info._id;
        insertdata._rev=stored_info._rev;
        insertdata.industry=stored_info.industry;
        insertdata.type=stored_info.type;

    }
     var result= await insertObjectToDB("globaldb", insertdata);;
     return result;;

}
const updatekazoousersettings = async (payload, req, companyid, id) => {
    const livereplysetting = payload.livereplysetting === 'undefined' ? [] : payload.livereplysetting;
    const notificationrulessetting = payload.notificationrulessetting === 'undefined' ? [] : payload.notificationrulessetting;
    const handoffrulessettings = payload.handoffrulessettings === 'undefined' ? [] : payload.handoffrulessettings;
    const escalationsettings = payload.escalationsettings === 'undefined' ? [] : payload.escalationsettings;
    const smsagreement = payload.smsagreement

    var userdata: any = {
        data: {
            title: payload.title,
            timezone: payload.timezone,
            phonesettings: payload.phonesettings,
            smssettings: payload.smssettings,
            emailsettings: payload.emailsettings,
            pin: payload.pin,
            livereplysetting: livereplysetting,
            notificationrulessetting: notificationrulessetting,
            handoffrulessettings: handoffrulessettings,
            escalationsettings: escalationsettings,
            smsagreement: smsagreement
        }
    };
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {

        const kRequest = getKazooRequest(req)
            .patch({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${companyid}/users/${id}`,
                body: userdata,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);

                        resolve(e);
                    }
                    else {
                        console.log("\n kazoo updated successfull");
                        resolve(payload);
                    }
                }
            );
    })
    const result = await kazooupdatepromiss;
    return result;
}

const updatekazoouseremailsettings = async (payload, req, companyid, id) => {

    var userdata: any = {
        data: {

            emailsettings: payload.emailsettings,

        }
    };
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {

        const kRequest = getKazooRequest(req)
            .patch({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${companyid}/users/${id}`,
                body: userdata,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);

                        resolve(e);
                    }
                    else {
                        console.log("\n kazoo updated email setting successfull");
                        resolve(payload);
                    }
                }
            );
    })
    const result = await kazooupdatepromiss;
    return result;
}
const updateScheduleReport = async (accountDbName, _userobj) => {

    var result= await insertObjectToDB(accountDbName, _userobj);;
    return result;

}
const check_user_log = (_userobj, temp_user) => {
    if (_userobj.pin != temp_user.pin) {
        console.log("update pin");
    }


}


const updateOptinStatus= async(messaging_number,phonenumber)=>
{
    var isOptin:boolean= false ;
    var optinlist=await getOptinStatus(phonenumber);
    
    optinlist= optinlist.filter(a=> a.companyid);
    for (var i=0;i<optinlist.length;i++)
     {
         var optinObj= optinlist[i];
         var companyid = optinObj.companyid;
        var phonenumber = optinObj.phonenumber;
        if (optinObj.isopting)
            await insertIntoOptin(companyid,phonenumber , false);
         await removeOptinFromCompany (companyid,phonenumber);
     }
     const opt_out_messagetext = "You have unsubscribed from HelloSpoke Notify SMS messages. To resubscribe you must opt in again via the Notify portal.";
     const payload = {
               to:phonenumber,
               from:messaging_number,
                "messagetext":opt_out_messagetext  
            };
     const response= await sendNotifySMS(payload);      
}

const getOptinStatus = async (phoneNumber=undefined) => 
{
    const globalSmsDb= nano.use("globaldb_optin");
    var selector:any= {
                "pvt_type": "optinnumber"
            }
     var contactsSelector = {
                "selector":selector ,
                "fields":["phonenumber","companyid"],
         "limit":5000,
         "use_index":"pvt_type_isopting",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
         
        }
        if (phoneNumber)
            contactsSelector.selector.phonenumber=phoneNumber; 
        var optinnumbers=await getalldocumentsbyproperty(globalSmsDb,contactsSelector); 
        return optinnumbers;
}
// const insertIntoOptin= async(companyid,phonenumber , isopting)=>
// {
//     console.log("insertIntoOptin");
//     const globalSmsDb= nano.use("globaldb_optin");
//     const contactsSelector = {
//         "selector": {
//             "pvt_type": "optinnumber",
//             "phonenumber":phonenumber
//          },
//          "use_index":"pvt_type_phonenumber",
//          "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
       
//     }
//     var insert_object:any= {
//         "phonenumber":phonenumber,
//         "pvt_type":"optinnumber",
//         "isopting":isopting
//     }
//     var stored_obj=await getdocumentbyproperty(globalSmsDb,contactsSelector); 
//     var insertrequires:boolean= true;
//     var errorOccured=false;
//     if (stored_obj&& stored_obj._id)
//     {
      
//         insert_object._id=stored_obj._id,
//         insert_object._rev=stored_obj._rev
//         insertrequires=stored_obj.isopting!=isopting;
//     }
//     if (insertrequires)
//     {
//           var result= await insertObjectToDB("globaldb_optin", insert_object);;
       
//     }
//     console.log("insertrequires3333");
//     console.log(insertrequires);
    
//    return {error:errorOccured,needtosendmessage:insertrequires}
    
// }


const updatenotifyusersettings = async (accountDbName, _userobj, payload, property) => {
    //console.log("updatenotifyusersettings");
    const temp_user = JSON.parse(JSON.stringify(_userobj));
    
        _userobj.timezone = payload.timezone;
        _userobj.phonesettings = payload.phonesettings;
        _userobj.title = payload.title;
        if (payload.firstName) {
            _userobj.first_name = payload.firstName;
            _userobj.last_name = payload.lastName;
        }

        _userobj.smssettings = payload.smssettings;
        const deletedemailids = _userobj.emailsettings.settings.filter((_em) => !payload.emailsettings.settings.find((pem) => pem.email === _em.email))
        _userobj.emailsettings = payload.emailsettings;
        _userobj.pin = payload.pin;
        _userobj.livereplysetting = payload.livereplysetting;

        _userobj.notificationrulessetting = payload.notificationrulessetting;
        _userobj.handoffrulessettings = payload.handoffrulessettings;
        _userobj.handoffrulessettings = payload.handoffrulessettings;
        _userobj.escalationsettings = payload.escalationsettings;

        _userobj.user_imager = payload.user_imager;
        _userobj.member_image = payload.member_image;

        _userobj.monthlyReport = payload.monthlyReport == false ? false : true; 
        _userobj.weeklyReport = payload.weeklyReport == false ? false : true;

        _userobj.smsagreement = payload.smsagreement
       var response= await insertObjectToDB(accountDbName, _userobj);;
       check_user_log(_userobj, temp_user);
       if (deletedemailids && deletedemailids.length>0)
       {
           const propertyid= property ? property.propertyid:undefined;
           removeEmailFromEscalationList(propertyid,deletedemailids);
           removeEmailAddressFromVoiceMaiilBox(property,deletedemailids);
       }
    
    return response;


}


     const createindexes=async (_accountdbname)=>
     {
         try{
            var index_creation_result1= await createindex(_accountdbname,["datetime"],"datetime");
            var index_creation_result2= await createindex(_accountdbname,["incidentdate"],"incidentdate_index");
            var index_creation_result3= await createindex(_accountdbname,["_id"],"_id");
            var index_creation_result4= await createindex(_accountdbname,["pvt_type", "callflowsoptiontype","enabled"],"pvt_type_callflowsoptiontype_enabled");
            var index_creation_result5= await createindex(_accountdbname,["pvt_type", "callflowsoptiontype"],"pvt_type_callflowsoptiontype");
            var index_creation_result6= await createindex(_accountdbname,["pvt_type", "callflowsoptiontype","scheduleid","datetime"],"pvt_type_callflowsoptiontype_scheduleid");
            var index_creation_result7= await createindex(_accountdbname,["pvt_type","type","callernumber","notifytimestamp"],"initialcallrecord_callernumber");
           // var index_creation_result8= await createindex(_accountdbname,["pvt_type","companyid","enabled"],"pvt_type_companyid_enabled");
            var index_creation_result9= await createindex(_accountdbname,["pvt_type","propertyid","enabled"],"pvt_type_propertyid_enabled");
            var index_creation_result10= await createindex(_accountdbname,["pvt_type", "guid"],"pvt_type_guid");
            var index_creation_result11= await createindex(_accountdbname,["email"],"email");
            var index_creation_result12= await createindex(_accountdbname,["pvt_type", "enabled"],"pvt_type_enabled");
            var index_creation_result13= await createindex(_accountdbname,["pvt_type", "incidentid"],"pvt_type_incidentid");
            var index_creation_result14= await createindex(_accountdbname,["pvt_type"],"pvt_type");
            var index_creation_result15= await createindex(_accountdbname,["notifytimestamp"],"notifytimestamp");
            var index_creation_result16= await createindex(_accountdbname,["pvt_type","id"],"pvt_type_id");
            var index_creation_result17= await createindex(_accountdbname,["pvt_type","notify_enabled","pin"],"pvt_type_notify_enabled_pin");
            var index_creation_result18= await createindex(_accountdbname,["pvt_type","type","guid"],"pvt_type_type_guid");
           // var index_creation_result181= await createindex(_accountdbname,["pvt_type","elasticid"],"pvt_type_elasticid");
            var index_creation_result19= await createindex(_accountdbname,["escalationsettings","notify_enabled","pvt_type"],"escalationsettings_notify_enabled");
            var index_creation_result20= await createindex(_accountdbname,["pvt_type","didnumber"],"pvttypedidnumber");
            var index_creation_result21= await createindex(_accountdbname,["pvt_type","adjustdate_unix"],"pvt_typeadjustdate_unix-index");
            var index_creation_result22= await createindex(_accountdbname,["kazooid"],"kazooid_index");
            var index_creation_result23= await createindex(_accountdbname,["user_type","msteruser","notify_enabled"],"user_master_enable-index");
            var index_creation_result23= await createindex(_accountdbname,["username"],"username-index");
            var index_creation_result25= await createindex(_accountdbname,["pvt_type", "when","type","notifytimestamp"],"notify_callLog");
            var index_creation_result27=  createindex(_accountdbname,["pvt_type","voicemailid"],"voicemailid");
            var index_creation_result28=  createindex(_accountdbname,["messageid"],"messageid");
            var index_creation_result29=await createindex(_accountdbname,["pvt_type","notifytimestamp","callflowoption"],"callflowoption_callflowoption");
            var index_creation_result30=await createindex(_accountdbname,["pvt_type","callflowoption"],"pvt_type_callflowoption");
            var index_creation_result31=await createindex(_accountdbname,["pvt_type","incidentdate","elasticid"],"elasticid_exists");
			//new 
			var index_creation_result32=await createindex(_accountdbname,["pvt_type","user_id"],"pvt_type_user_id");
			var index_creation_result33=await createindex(_accountdbname,["pvt_type","username","notify_enabled"],"pvt_type_username_notify_enabled");
			var index_creation_result33=await createindex(_accountdbname,["pvt_type","username","notify_enabled"],"pvt_type_username_notify_enabled");
			var index_creation_result34=await createindex(_accountdbname,["pvt_type","smssettings"],"pvt_type_smssettings");
			var index_creation_result35=await createindex(_accountdbname,["pvt_type","notify_enabled","scheduleemailreport"],"pvt_type_scheduleemailreport");
			var index_creation_result36= await createindex(_accountdbname,["pvt_type", "processed"],"pvt_type_processed");
			var index_creation_result37=await createindex(_accountdbname,["pvt_type","phonenumber","isopting"],"pvt_type_isopting");
			var index_creation_result38=await createindex(_accountdbname,["pvt_type","phonenumber"],"pvt_type_phonenumber");
			var index_creation_result39= await createindex(_accountdbname,["pvt_type","propertyid"],"pvt_type_propertyid");
			var index_creation_result40= await createindex(_accountdbname,["pvt_type","companyid"],"pvt_type_companyid");
			var index_creation_result41= await createindex(_accountdbname,["pvt_type","scheduleid","datetime"],"pvt_type_scheduleid");
			var index_creation_result42= await createindex(_accountdbname,["pvt_type","accountid"],"pvt_type_accountid");
			var index_creation_result43= await createindex(_accountdbname,["pvt_type","name"],"pvt_type_name");
			var index_creation_result44=await createindex(_accountdbname,["pvt_type","username"],"pvt_type_username");
			var index_creation_result45=await createindex(_accountdbname,["pvt_type","userid"],"pvt_type_userid");
			var index_creation_result46=await createindex(_accountdbname,["pvt_type","notify_enabled","propertylist","user_type"],"user_propertylist_user_type-index");
			var index_creation_result47=await createindex(_accountdbname,["pvt_type","notify_enabled","propertylist"],"user_propertylist-index");
			var index_creation_result48=await createindex(_accountdbname,["pvt_type","notify_enabled","user_type"],"pvt_type_user_type");
			 var index_creation_result49= await createindex(_accountdbname,["callflowsoptiontype","pvt_type","enabled","adjustdate_unix"],"pvttype_callflowsoptiontype");
			 var index_creation_result50= await createindex(_accountdbname,["callflowsoptiontype","pvt_type","enabled","datetime"],"pvttype_callflowsoptiontype_datetime");


        }
         catch(ex)
         {
             console.log(ex);
         }    
     }
const createnewindexesnew=async(_accountdbname)=>
{
    var index_creation_result32=await createindex(_accountdbname,["pvt_type","user_id"],"pvt_type_user_id");
			var index_creation_result33=await createindex(_accountdbname,["pvt_type","username","notify_enabled"],"pvt_type_username_notify_enabled");
			var index_creation_result33=await createindex(_accountdbname,["pvt_type","username","notify_enabled"],"pvt_type_username_notify_enabled");
			var index_creation_result34=await createindex(_accountdbname,["pvt_type","smssettings"],"pvt_type_smssettings");
			var index_creation_result35=await createindex(_accountdbname,["pvt_type","notify_enabled","scheduleemailreport"],"pvt_type_scheduleemailreport");
			var index_creation_result36= await createindex(_accountdbname,["pvt_type", "processed"],"pvt_type_processed");
			var index_creation_result37=await createindex(_accountdbname,["pvt_type","phonenumber","isopting"],"pvt_type_isopting");
			var index_creation_result38=await createindex(_accountdbname,["pvt_type","phonenumber"],"pvt_type_phonenumber");
			var index_creation_result39= await createindex(_accountdbname,["pvt_type","propertyid"],"pvt_type_propertyid");
			var index_creation_result40= await createindex(_accountdbname,["pvt_type","companyid"],"pvt_type_companyid");
			var index_creation_result41= await createindex(_accountdbname,["pvt_type","scheduleid","datetime"],"pvt_type_scheduleid");
			var index_creation_result42= await createindex(_accountdbname,["pvt_type","accountid"],"pvt_type_accountid");
			var index_creation_result43= await createindex(_accountdbname,["pvt_type","name"],"pvt_type_name");
			var index_creation_result44=await createindex(_accountdbname,["pvt_type","username"],"pvt_type_username");
			var index_creation_result45=await createindex(_accountdbname,["pvt_type","userid"],"pvt_type_userid");
			var index_creation_result47=await createindex(_accountdbname,["pvt_type","notify_enabled","propertylist"],"user_propertylist-index");
			var index_creation_result48=await createindex(_accountdbname,["pvt_type","notify_enabled","user_type"],"pvt_type_user_type");
			 var index_creation_result49= await createindex(_accountdbname,["callflowsoptiontype","pvt_type","enabled","adjustdate_unix"],"pvttype_callflowsoptiontype");
			 var index_creation_result50= await createindex(_accountdbname,["callflowsoptiontype","pvt_type","enabled","datetime"],"pvttype_callflowsoptiontype_datetime");

}
const createindex = async (dbname, fields, name) => {

    console.log("fields ", fields);

    const indexDef = {
        index: { fields: fields },
        ddoc: name,
        name: name
    };
    var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
    var nano1 = require('nano')(hellospoke_db);
    const db = nano1.use(dbname);
    const creatindexpromise = new Promise((resolve, reject) => {

        const indexDef = {
            index: { fields: fields },
            ddoc: name,
            name: name
        };
        db.createIndex(indexDef, (err, body) => {
            if (err) {
                console.log("err ", err);
                resolve(err);;
            }
            else {
                console.log("index created ", body);
                resolve(body);

            }
        });
    });



    var result = await creatindexpromise;
    return result;
}
const insertdayschedule = async (schedule, accountdbname) => {
    schedule.pvt_type = "dayschedule";
    schedule.enabled = true;
    const accountDb = nano.use(accountdbname);
    const stored_schedule = await getdayscheduleInfo(accountDb, schedule);
    if (stored_schedule && stored_schedule._id) {
        schedule._rev = stored_schedule._rev;
        schedule._id = stored_schedule._id;
    }
   const result = await insertObjectToDB(accountdbname,schedule);;
    return result;
}
const updatenotifyusercolorindex = async (accountdbname, _userobj) => {

    const result = await insertObjectToDB(accountdbname,_userobj);
    return   result;

}
const updatenotifyuseremailsettings = async (accountDbName, _userobj, payload) => {

    _userobj.emailsettings=payload.emailsettings;
    const result = await insertObjectToDB(accountDbName,_userobj);

}

const insertescalationuserlist = async (schedule, accountdbname) => {
    schedule.pvt_type = "escalationuserlist";
    schedule.enabled = true;
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
        "selector": {
            "pvt_type": "escalationuserlist"

        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var stored_list = await getdocumentbyproperty(accountDb, contactsSelector);
    console.log("escalationuserlist");
    if (stored_list && stored_list._id && stored_list._rev) {
        schedule._id = stored_list._id;
        schedule._rev = stored_list._rev;
    }


    const result = await insertObjectToDB(accountdbname,schedule);
    return result;
}


const insertcallactivityreportinfo = async (callactivityinfo, accountdbname) => {
    callactivityinfo.pvt_type = "callactivityreport";


    const result = await insertObjectToDB(accountdbname,callactivityinfo);
     return result;

}

const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
        return null;
    }
    if (typeof phoneNumber === 'number') {
        phoneNumber = phoneNumber.toString();
    }
    phoneNumber = phoneNumber.replace(/\(/g, '').replace(/\)/g, '')
        .replace(/ /g, '').replace(/-/g, '').replace(/\+/);

    const re = /(?:1)?(\d{3})(\d{3})(\d{4})/;

    const matches = phoneNumber.match(re);

    if (matches === null) {
        return phoneNumber;
    }

    return `${matches[1]}-${matches[2]}-${matches[3]}`;
}

const getReportDocumentFromTemp = (guid) => {
    console.log("getReportDocumentFromTemp" + guid);
    const reportdoc = temp_reports.find(c=> c.guid===guid) ;
    //const reportdoc = temp_reports[reportdocindex];
    //console.log(reportdoc);
    return reportdoc;
}
const removeReportDocumentFromTemp = (guid) => {
    temp_reports= temp_reports.filter(r => r.guid != guid);
   

}

const getreportdatadocument = async (accountDb, callinfo) => {
    const guid = callinfo.incidentid ? callinfo.incidentid : callinfo.guid;

    const contactsSelector = {
        'selector': {
            "pvt_type": "reportdata",
            "guid": guid

        },
        "use_index": "pvt_type_guid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var reportdata = await getdocumentbyproperty(accountDb, contactsSelector);
    return reportdata;
}

const isduplicatedocument = async (accountDb, guid) => {
    const contactsSelector = {
        'selector': {
            "pvt_type": "reportdata",
            "guid": guid

        },
        "use_index": "pvt_type_guid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var reportdata = await getalldocumentsbyproperty(accountDb, contactsSelector);
    return reportdata && reportdata.length > 1;
}

const getcallinfologformessagerecording = async (accountDb, guid) => {
    const contactsSelector = {
        "selector": {
            "pvt_type": "callinfolog",
            "type": "messagerecordingstart",
            "guid": guid

        },
        "use_index": "pvt_type_type_guid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var callinfo = await getdocumentbyproperty(accountDb, contactsSelector);
    return callinfo
}
const getreportdatadocumentfrommessagid = async (accountDb, callinfo) => {

    const contactsSelector = {
        'selector': {

            "messageid": callinfo.messageid
        },
        "use_index": "messageid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var reportdatalist: any = await getalldocumentsbyproperty(accountDb, contactsSelector);
    var reportdata = reportdatalist ? reportdatalist.find(r => r.pvt_type === "reportdata") : undefined;
    return reportdata
}


const getreportdatadocumentfromvoicemailid = async (accountDb, callinfo) => {

    const contactsSelector = {
        'selector': {
            "pvt_type": "reportdata",
            "voicemailid": callinfo.voicemailid
        },
        "use_index": "voicemailid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    console.log(JSON.stringify(contactsSelector));
    var reportdata = await getdocumentbyproperty(accountDb, contactsSelector);
    return reportdata
}
const updateWork_Order_status_InReport= async(guid ,orderStatus)=>
{
    var reportdata=await getelasticsearchreportdatabyguid (guid);
    const param= 
                {
                    orderStatus:orderStatus
                }
                console.log('updateWork_Order_status_InReport-------------------', param);
    await updatereportdatatoelasticwithguidforworkorder(param,reportdata.guid);
}

const updateWorkOrderInReport= async(guid)=>
{
    var reportdata=await getelasticsearchreportdatabyguid (guid);
    const param= 
                {
                    workordercreated:true
                }
    await updatereportdatatoelasticwithguidforworkorder(param,reportdata.guid);
}

const parseincidenttimeout= async(accountDb,callinfo)=>
{
    console.log("parseincidenttimeout")
    if (callinfo.muid)
        callinfo.guid = callinfo.muid
    var reportdata=await getelasticsearchreportdatabyguid (callinfo.muid);
    
    if (reportdata && !reportdata.timedout) {
        const now_unix = callinfo.notifytimestamp;
        const callinfodescription = "Maximum number of attempts exceeded";
        var calldetailsinfo: any = {
            "time": now_unix,
            "discription": callinfodescription,
            "callrecording": false,

        };
        reportdata.calldetailsinfolist.push(calldetailsinfo);
        reportdata.timedout = true;
        console.log("inserting timed out");
        await insertreportdata(reportdata, accountDb);
        const param= 
                {
                    calldetailsinfo:calldetailsinfo
                }
        //update elastic search 
        
        await updatereportdatatoelasticwithguidfortimeout(param,reportdata.guid);

    }
    return reportdata;
}
const updatereportdatatoelasticforagentaction=async(param,guid )=>
{
    
    const sourceString= `ctx._source.calldetailsinfolist.add(params.calldetailsinfo );ctx._source.respondent=params.respondent;ctx._source.respondentphone=params.respondentphone;ctx._source.respondentat=params.respondentat;ctx._source.responsetime=params.responsetime;ctx._source.notifyresponsetime=params.notifyresponsetime;ctx._source.resolved=params.resolved;ctx._source.filename=params.filename;ctx._source.agentresponsetype=params.agentresponsetype;`
    var body = {
        "script": {
            "source": sourceString,
            "lang": "painless",
            "params": param

        },
        "query": {
            "bool": {

                "must": [
                    { "match": { "pvt_type": "reportdata" } },
                    { "match": { "removefromreport": false } },
                    { "match": { "guid.keyword": guid } }
                ]
            }

        }
    }

    const result = await updatereportdatatoelastic_new(body);
    return result;

}
const getelasticsearchreportdatabymessageidforresoleve = async (messageid) => {
    const query = {
        "bool": {
            "must": [

                { "match": { "messageid.keyword": messageid } },
                { "match": { "pvt_type": "reportdata" } }

            ]
        }
    }

    var elasticsearchreportdocs: any = await getReportdataFromElasticSearch(query)

    var reportdoc;
    // console.log(elasticsearchreportdocs)
    console.log(elasticsearchreportdocs.length)
    if (elasticsearchreportdocs && elasticsearchreportdocs.length > 0) {
        reportdoc = elasticsearchreportdocs[0];
    }
    return reportdoc
}
const getelasticsearchescalationemaildata = async (messageid) => {
    const query = {
        "bool": {
            "must": [

                { "match": { "messageid.keyword": messageid } },
                { "match": { "pvt_type": "emailsendingdata" } }

            ]
        }
    }

    var datalist: any = await getemailsendingdataforelasticsearch(query, [
        {"timestamp": {"order" : "desc"}}],1);

    var reportdoc;
     console.log(datalist)
    console.log(datalist.length)
    if (datalist && datalist.length > 0) {
        reportdoc = datalist[0];
    }
    return reportdoc
}


const getelasticsearchreportdatabyvoicemailid = async (vid) => {
    const query = {
        "bool": {
            "must": [

                { "match": { "voicemailid.keyword": vid } },
                { "match": { "pvt_type": "reportdata" } }

            ]
        }
    }

    var elasticsearchreportdocs: any = await getReportdataFromElasticSearch(query)

    var reportdoc;
    // console.log(elasticsearchreportdocs)
    console.log(elasticsearchreportdocs.length)
    if (elasticsearchreportdocs && elasticsearchreportdocs.length > 0) {
        reportdoc = elasticsearchreportdocs[0];
    }
    return reportdoc
}
const getelasticsearchreportdatabyguid = async (guid) => {
    const query = {
        "bool": {
            "must": [

                { "match": { "guid.keyword": guid } },
                { "match": { "pvt_type": "reportdata" } }

            ]
        }
    }

    var elasticsearchreportdocs: any = await getReportdataFromElasticSearch(query)

    var reportdoc;
    // console.log(elasticsearchreportdocs)
    console.log(elasticsearchreportdocs.length)
    if (elasticsearchreportdocs && elasticsearchreportdocs.length > 0) {
        reportdoc = elasticsearchreportdocs[0];
    }
    return reportdoc
}
const parseagentaction= async(accountDb,callinfo, attempt=0)=>
{
 
    var agentaction = callinfo.action;
    var agentResponseType="";
    if (agentaction==="2" || agentaction==="3" || agentaction==="7"|| agentaction==="4")
    {
        
        var  reportdata = await getelasticsearchreportdatabymessageidforresoleve(callinfo.messageid);
       
        if (reportdata)
        {
            const now_unix= callinfo.notifytimestamp;
            if (!reportdata.calldetailsinfolist.find(r=>r.time===now_unix&& r.resolved===true))
            {
                
                var agentaction = callinfo.action;
                var messagetype=callinfo.messagetype;
                var callinfodescription= `${callinfo.agentname  ? callinfo.agentname :'unknown'} `;
                var callrecording=false;
                const customernumber= reportdata.fromd;
                var straction= "";
                var filename="";
                var generatereport=false;
                if (agentaction==="2")
                {
                    straction+=`called back ${formatPhoneNumber(customernumber)}`;
                    callrecording=true;
                    // filename= `notify_call_${callinfo.guid}_${callinfo.messageid}`;
                    filename= callinfo.callbackRecordingFile;
                    generatereport=true;
                    agentResponseType="Call Back";

                }
                else if (agentaction==="3")
                {
                    agentResponseType="A-OMW";
                    // straction+=`acknowledged message from ${formatPhoneNumber(customernumber)}`;
                    generatereport=true;
                    if (messagetype == "old"){
                        straction+=` re-saved message`
                    }else{
                    straction+= ` acknowledged they’re on the way`;
                    }
                }
                    
                else if (agentaction==="4")
                {
                    agentResponseType= "A-NME";
                // straction+=`acknowledged message from ${formatPhoneNumber(customernumber)}`;
                straction+= ` acknowledged message as a non-emergency`;
                generatereport=true;
                    
                }
                else if (agentaction==="7")
                {
                    agentResponseType= "Delete";
                    straction+=`deleted this message`;
                    generatereport=true;
                    
                }
                if(generatereport)
                {
                const now_unix= callinfo.notifytimestamp;
            
                const savedstr= messagetype==="old" && agentaction != "3" ? "from saved message":"";
                if (messagetype==="new" &&  straction.length>0)
                {
                    reportdata.respondent=callinfo.agentname.substring(0, 1).toUpperCase() + callinfo.agentname.substring(1).toLowerCase();
                    reportdata.respondentphone=callinfo.agentphonenumber;
                    reportdata.respondentat=now_unix ;
                    reportdata.responsetime= now_unix- reportdata.incidentdate;
                    reportdata.notifyresponsetime=reportdata.responsetime;
                    reportdata.resolved=true;
                    reportdata.agentresponsetype=agentResponseType;
                    reportdata.filename= filename;
                    reportdata.respondent_lastname=callinfo.lastname ?callinfo.lastname.substring(0, 1).toUpperCase() + callinfo.lastname.substring(1).toLowerCase():'';
                    

                }
                callinfodescription+=`${straction} ${savedstr}`;
                
                var calldetailsinfo:any= {
                        "time":now_unix,
                        "discription":callinfodescription,
                        "callrecording":callrecording,
                                "guid":callinfo.guid,
                                "resolved":true
                    
                    };
                    console.log("file name is ",filename);
                if(filename.length>0)
                {
                    calldetailsinfo.filename=filename;
                    
                } 
                if (reportdata.calldetailsinfolist)
                    reportdata.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting agent action report");
                await insertreportdata(reportdata, accountDb);
                //update elastic search 
                var param = {
                    calldetailsinfo: calldetailsinfo,
                    respondent: reportdata.respondent.substring(0, 1).toUpperCase() + reportdata.respondent.substring(1).toLowerCase(),
                    respondentphone: reportdata.respondentphone,
                    respondentat: reportdata.respondentat,
                    responsetime: reportdata.responsetime,
                    notifyresponsetime: reportdata.responsetime,
                    resolved: reportdata.resolved,
                    filename: reportdata.filename,
                    agentresponsetype:reportdata.agentresponsetype,
                    respondent_lastname: reportdata.respondent_lastname ? reportdata.respondent_lastname : ''

                }


                await updatereportdatatoelasticforagentaction(param, reportdata.guid);
                       
            }
                
        return reportdata;
    }
        }
        else if (attempt<6)
        {
            setTimeout(() => {
                parseagentaction(accountDb,callinfo,++attempt);
           }, 30000);
           
        }
    }

}
const parsemessagerecordingstart= async(callinfo)=>
{
    var obj = {
        guid: callinfo.guid,
        notifytimestamp: callinfo.notifytimestamp
    }
   
    return obj;
}
const parsemessagerecordingend= async(callinfo,callinfologs)=>
{
    var reportdata = await getReportDocumentFromTemp(callinfo.guid);
    try
    {
        const customernumber = reportdata.fromd;
        var callinfodescription = `Message received from ${formatPhoneNumber(customernumber)} `;
        const now_unix = callinfo.notifytimestamp;

        const time_obj = callinfologs.find(r => r.type === "messagerecordingend");
        const callduration = now_unix -( time_obj ? time_obj.notifytimestamp:now_unix);
        if (callduration)
            reportdata.callduration = callduration;
        var calldetailsinfo = {
            "time": now_unix,
            "discription": callinfodescription,
            "callrecording": true,
            "filename": callinfo.messageid,
            "voicemessage": true,
            "messageurl": callinfo.url,
            "callduration": reportdata.callduration
        };
        reportdata.calldetailsinfolist = reportdata.calldetailsinfolist.filter(rd => !rd.messageurl);

        reportdata.calldetailsinfolist.push(calldetailsinfo);
        reportdata.messageid = callinfo.messageid;
        reportdata.messageurl = callinfo.url;
        reportdata.notifymessage=true;
        reportdata.messagerecordingendtime=moment().utc().unix();
        setTimeout(() => {
            removeOldReportForReRecording(callinfo.guid,reportdata.messagerecordingendtime);
        }, 50000);
       
        console.log("inserting messagerecordingen report");
        
        return parsecallend(reportdata);;
    }
    catch (ex) {
        debugMessage(log4jslogger, "error droping report");
        debugMessage(log4jslogger, ex);


    }

}
const removeOldReportForReRecording=(guid,messagerecordingendtime)=>
{
    updatereportdatatoelasticwithguidforrereocrding(guid, messagerecordingendtime);
}
const parseVoiceMessage= async(accountDb,callinfo,property, attempt=0)=>
{
    debugMessage(log4jslogger,"******parseVoiceMessage******");
    var reportdata=await getelasticsearchreportdatabyguid (callinfo.guid);   
     const now_unix= callinfo.notifytimestamp;

    const type=reportdata? reportdata.type:""  ;
    if (reportdata) {
        debugMessage(log4jslogger,`updating report for ${reportdata.guid}`);
        var description= `Caller selected ${callinfo.callflowoption} `;
        var calldetailsinfo:any;
        if (type!=callinfo.callflowoption)
        {
            debugMessage(log4jslogger,"******emergency to general******");
            calldetailsinfo= {
                "time":now_unix,
                "discription":description,
                "callrecording":false
                                    
            }
            reportdata.calldetailsinfolist.push(calldetailsinfo); 
            reportdata.type=callinfo.callflowoption;  
        }
       
        reportdata.voicemailid=callinfo.voicemail_id;
        reportdata.removefromreport=false;
        console.log("inserting voice message to report");
        
        
        
        var calldetailsinfolist= reportdata.calldetailsinfolist;
    
        //update elastic search 
        var fields = {
            calldetailsinfo:calldetailsinfo,
            type:reportdata.type,
            removefromreport:false,
            voicemailid: reportdata.voicemailid,
            "voicetest":true
        }
        await updatereportdatatoelasticwithguidforparseVM(fields,reportdata.guid);
        insertreportdata(reportdata,accountDb);
        return reportdata;
    }
    else if (attempt<4)
    {
        setTimeout(() => {
            parseVoiceMessage(accountDb,callinfo,property, ++attempt)
        }, 10000);
        
    }
        
}

var tmp_messageidlist=[];
const insertescalationemailguid= async(messageid,now)=>
{
   
    const index=tmp_messageidlist.findIndex(c=>c===messageid);
    if (index<0 )
    {

        tmp_messageidlist.push(messageid);
        insertSendingEmailKey(messageid,now);
    }
     return index<0
}
const getTrancriptjson=async (key)=>
{
    const filename= key;
    const myBucket = process.env.STT_TRANSCRIPTION_BUCKET;
  const myKey = filename;
  const s3 = new AWS.S3({
    accessKeyId: AWS.config.accessKeyId,
    signatureVersion: AWS.config.signatureVersion,
    region: AWS.config.region,
    secretAccessKey: AWS.config.secretAccessKey
  });

  const params = {
    Bucket: myBucket,  /* required */        
    Key: filename         /* required */       
  };
  var promise1= new Promise (async (resolve, reject)=>{
    s3.getObject(params, function(err, data) {
        if (err)  
        {
                console.log(err, err.stack)
                 reject (err)
        } // an error occurred
        else { 
            console.log("sucess");   
            const bodyString=data.Body.toString('utf-8');
            console.log(bodyString);  
            resolve(JSON.parse(bodyString))
        }         // successful response
      });
  });

  return await promise1;
 
}
const parseTranscribeSNS =(messagebody)=>{
        const message= JSON.parse(messagebody );
        console.log("parseTranscribeSNS")
     
          if (message.Records) {
                    message.Records.forEach(async(record) => {
                        console.log("record")
                        console.log(record);
                        if (record.s3 && record.s3.object)
                        {
                            var s3= record.s3;
                            const s3Onje3ct= s3.object;
                            await parseTranscribe(s3Onje3ct);
                        }
                    });
                }
}
const parseTranscribe= async(callinfo)=>
{
    if (callinfo.key)
    {
        const key =callinfo.key;
        
        const decodedKey= decodeURI(key);
      
        const trancriptjson:any= await getTrancriptjson(decodedKey)
        if (trancriptjson){
            var messageid=trancriptjson.escalation_id;
            var isVoiceMail=false;
            if (messageid.indexOf("msg")<0)
            {
                var msgArray= messageid.split("_");
                messageid =msgArray[0];
                isVoiceMail= true;               
            }

            updatereportandsendemail(trancriptjson,isVoiceMail,messageid,callinfo.propertyid,callinfo,0);
                     
    }
    }
}

const updatereportandsendemail=async (trancriptjson,isVoiceMail,messageid,propertyid,callinfo,attempt=0)=>
{
    let elasticsearchreportdocs:any=isVoiceMail?
                                    await getelasticsearchreportdatabyvoicemailid(messageid)
                                    : await getelasticsearchreportdatabymessageid(messageid,undefined);
           
    let reportdata=elasticsearchreportdocs;
    if (reportdata)
    {

            const keyword_obj= trancriptjson.transcript?.keywords?.keywords;
            const keyword_arr=   keyword_obj ? Object.keys ( keyword_obj): [];
            const keywords=   keyword_arr.join(", ");
            var param = {
                transcript:trancriptjson.transcript?.processed,
                keywords:{keywords:keywords},
                category:trancriptjson.transcript?.keywords?.category
            }
            reportdata.transcript=param.transcript;
            reportdata.keywords=param.keywords;
            reportdata.category=param.category;
            await updatereportdatatoelasticwithguidforkeyword(param,reportdata.guid);
            const now_uinix = moment().utc().unix();
            reportdata.emailmessageid= messageid;
            reportdata.emailtime= now_uinix;
            let inserted = await insertescalationemailguid(messageid,now_uinix );
            if (inserted){
                // RabbitMQ should remove this 2 min wait time.
            //    setTimeout(async() => {
                    await updateEmailSent(reportdata);
                // }, 120000);

            }
                 
    }
    else if (attempt<5)
    {
        updatereportandsendemail(trancriptjson,isVoiceMail,messageid,callinfo,++attempt)
    }
    else{
        const errormessage= `${messageid}`;
        serverlog("error",callinfo , "updatereportandsendemail",errormessage);
    }
}

const parseS3Notifcation= async(callinfo,time)=>
{
    console.log("s3Onje3ct");
    console.log(callinfo);
    

    debugMessage(log4jslogger, `parseS3Notifcation`);
    const key =callinfo.key;
    if (key)
    {
        const keyparts= key.split("/");
     
        if (keyparts.length>1)
        {
            try {
                const keyparts_account= keyparts[0];
                const account= keyparts_account.split("-")[0];
                var propertydbname=  account.split("%252F").join("/");

                const propertyid=  parseDatabaseNameToAccount(propertydbname);
                const property= await getpropertyInfo(propertyid);
                 propertydbname=  parseAccountToDatabaseName(propertyid)

                const propertydbwithmonthname=getMonthDbName(propertydbname);

                const accountDb= nano.use(propertydbwithmonthname);

                const keyparts_voicemailid= keyparts[1];
                const voicemailid= keyparts_voicemailid.split("_")[0];
            
                callinfo.voicemailid=voicemailid;
               await updateVoicemailReport(accountDb,callinfo,property)
        }
            catch(ex)
            {
                    debugMessage(log4jsexceptionlogger, JSON.stringify(ex));
                    debugMessage (log4jsexceptionlogger,`parseS3Notifcation error ${JSON.stringify(callinfo)}`);
            }
        }
        
    }
    
  
}

eventEmitter.on('s3-forward-type-uploaded',(data)=>{
    debugMessage(log4jslogger, `s3-forward-type-uploaded event is called`);
    console.log("event was emitted with ",data);
    let key = data.fileKey;
    let bucketName = process.env.FORWARD_TYPE_MESSAGE_BUCKET_DRIVER;
    console.log("Key is ",key);
    console.log("Bucketname is ",bucketName);

    let callType = String(data.callType).toLowerCase();
    const keySplit= key.split('/');
    const fileName = keySplit[keySplit.length-1];

    keySplit.pop() // Remove last part ( file name ) 

    const folderName = keySplit.join('/');
    const fileNameSplit = fileName.split('.');

    fileNameSplit.pop(); // Remove File Extension

    const STT_API_ENDPOINT = process.env.STT_API_ENDPOINT;
    const STT_TOKEN = process.env.STT_TOKEN;

    const fileNameWithoutExtension = fileNameSplit.join('.');

    // console.log("FlowType is ", callType);
    // console.log("FileName is ", fileName)
    // console.log("FileName without extension is ", fileNameWithoutExtension)
    // console.log("Folder name is ",folderName)
    debugMessage(log4jslogger, `FlowType is ${callType}`);
    debugMessage(log4jslogger, `FileName is ${fileName}`)
    debugMessage(log4jslogger, `FileName without extension is ${fileNameWithoutExtension}`)
    debugMessage(log4jslogger, `Folder name is ${folderName}`,)

    callType = ["emergency","leasing","general","courtesy"].includes(callType) ? callType : "other";

    debugMessage(log4jslogger, `CallType is ${callType}`)

    const url = `${STT_API_ENDPOINT}/speech2text-${callType}`;
    const bodyData = {
        storage: {
            driver: {
                bucket_name: process.env.STT_TRANSCRIPTION_BUCKET,
                access_id: process.env.AWS_ACCESS_KEY_ID,
                access_key: process.env.AWS_SECRET_ACCESS_KEY
            },
            folder: decodeURI(`transcribe-results/${folderName}`),
            store_name : fileNameWithoutExtension
        },
        audio:{
            driver: {
                bucket_name: process.env.AWS_STORAGE_BUCKET,
                access_id: process.env.AWS_ACCESS_KEY_ID,
                access_key: process.env.AWS_SECRET_ACCESS_KEY
            },
            folder: decodeURI(folderName),
            id: fileName
        },
        escalation_id: fileName
    };
    console.log("calling STT api with following data",bodyData,url);
    Request.post({
        url,
        headers:{authorization:`Bearer ${STT_TOKEN}`},
        json:true,
        body:bodyData
    },(err,response,body)=>{
        if(err){
            console.error(err);
        }
        console.log(body);
    });
})
const getVoiceMailSaveLog= async(voicemail_id,db)=>
{
    //"voicemail_id": "202209-54565136e572bee1f896ae27a152393d"
      //check here
      const contactsSelector = {
        'selector': {
            voicemail_id:voicemail_id

        },
        "use_index":"pvt_type_scheduleid",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

    var voicemaillog = await getdocumentbyproperty(db, contactsSelector);
    return voicemaillog;
}
const updateVoicemailReport=async(accountDb,callinfo,property,attempt=0)=>
{
                var reportdata=await getelasticsearchreportdatabyvoicemailid(callinfo.voicemailid);
                if (!reportdata)
                {
                    var voicemaillog= await getVoiceMailSaveLog(callinfo.voicemailid,accountDb);
                    if (voicemaillog)
                        reportdata=  await parseVoiceMessage(accountDb,voicemaillog,property);
                }
                if (reportdata && reportdata.voicemailid)
                {
                    eventEmitter.emit('s3-forward-type-uploaded',{ callType:reportdata.type, fileKey:callinfo.key });
                    debugMessage(log4jslogger, "s3-forward-type-uploaded event is emitted");
                    debugMessage(log4jslogger, `updating voice mail SNS info for report ${reportdata.guid}`);
                    var calldetailsinfolist=  reportdata.calldetailsinfolist;
                    const customernumber= reportdata.fromd;
                    var callinfodescription= `Message received from ${formatPhoneNumber(customernumber)} `;
                    const now_unix= moment().utc().unix();;
                    var calldetailsinfo= {
                        "time":now_unix,
                        "discription":callinfodescription,
                        "callrecording":true,
                        "voicemailid":reportdata.voicemailid,
                        "voicemessage":false,
                        "voicemailkey":callinfo.key
                    };

                    const voicemailkey_index= calldetailsinfolist.findIndex(c=> c.voicemailkey);
                    if(voicemailkey_index<0)
                    {
                        calldetailsinfolist.push(calldetailsinfo);
                    }
                    reportdata.calldetailsinfolist=calldetailsinfolist;
                    reportdata.messageid= callinfo.key;
                    reportdata.voicemailkey= callinfo.key;
                    reportdata.resolved=true;
                    reportdata.removefromreport=false;
                    const type= reportdata.type;
                    if (type==="Emergency")
                        reportdata.type="General";
                    console.log("inserting s3 message to report");
                   
                 //update elastic search     
                    var fields = {
                        calldetailsinfo:calldetailsinfo,
                        messageid:callinfo.key,
                        voicemailkey:callinfo.key,
                        resolved:true,
                        type:reportdata.type,
                        removefromreport:false

                    }
                    await updatereportdatatoelasticwithguidfors3notification(fields,reportdata.guid);
                     insertreportdata(reportdata,accountDb);
                }
    else if (attempt<4)
    {      
        setTimeout(() => {
             updateVoicemailReport(accountDb,callinfo,property,++attempt)
        }, 30000);

    }
    else
    {
        debugMessage(log4jslogger, `did not find  report for  ${JSON.stringify( callinfo)}`)
    }
}
const parsecallrecording= async(callinfo)=>
{
        var reportdata=await getReportDocumentFromTemp(callinfo.guid)
        reportdata.filename= callinfo.filename;
        console.log("inserting call recording file ");
        
        return parsecallend(reportdata);;
    
}


const parseagentpin= async(callinfo)=>
{
    if (callinfo.when&& callinfo.when.toLowerCase()==="live")
    {
        var reportdata=await getReportDocumentFromTemp(callinfo.guid)
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
        if (result==="valid")
        {
            
           
            reportdata.callstarttime= now_unix;
            const customernumber= reportdata.fromd;
            callinfodescription= `${callinfo.agentname} connected to ${formatPhoneNumber(customernumber)}`;
             const filename= `live_call_${reportdata.guid}.wav`   ;
            let calldetailsinfo= {
                "time":now_unix,
                "discription":callinfodescription,
                "callrecording":true,
                "filename":filename,
                "voicemessage":false
            };
            reportdata.calldetailsinfolist.push(calldetailsinfo);
             var when=  "LIVE";
            reportdata.resolutionon=when;
            reportdata.respondent=callinfo.agentname.substring(0, 1).toUpperCase() + callinfo.agentname.substring(1).toLowerCase();
            reportdata.respondentphone=callinfo.agentid;
            reportdata.respondentat=now_unix ;
            reportdata.responsetime= now_unix- reportdata.incidentdate;
            reportdata.notifyresponsetime= reportdata.responsetime;
            reportdata.filename= filename;
            reportdata.resolved=true;
            if(callinfo.lastname){
            callinfo.lastname=callinfo.lastname.substring(0, 1).toUpperCase() + callinfo.lastname.substring(1).toLowerCase();
            }else{
                callinfo.lastname="";
            }
            reportdata.respondent_lastname = callinfo.lastname? callinfo.lastname:'';
        }
        else 
        {
            callinfodescription+= "entered invalid entry";
        }
        
        console.log("inserting agent respose pin ");
        //await insertreportdata(reportdata,accountDb);
        return reportdata;
    }
    
}

const parsecallend= async(reportdata)=>
{
   
    const now_unix= reportdata.notifytimestamp;
        const callduration=now_unix- reportdata.respondentat  
        
        if (callduration)
        {
            reportdata.callduration=callduration;
        }
            
            reportdata.calldisconnected= true;
            reportdata.callendtime=now_unix;

        console.log("inserting end ");
        
          return reportdata;
}


const parseagentrespnse= async(callinfo)=>
{
    var promise1= new Promise (async (resolve, reject)=>{
         var reportdata=await getReportDocumentFromTemp(callinfo.guid)
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
        if (result==="accepted")
        {
            callinfodescription+= "accepted";
        }
        else if (result=== 'rejected')
        {
            callinfodescription+= "rejected";
        }
        else if (result=== 'userbusy')
        {
            callinfodescription+= "on other call";
        }

       
        var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        };
        //reportdata.calldetailsinfolist.push(calldetailsinfo);
        console.log("inserting agent respose accepted report");
       
        resolve(reportdata);
            
    })
    return await promise1;
    
}
const updatenotelength= async(callinfo,noteslength,propertyid)=>
{
        const property= await getpropertyInfo(propertyid);
       // const companydbname= parseAccountToDatabaseName(property.companyid);
       // const companydb=nano.use(companydbname);
       // var reportdata=await getreportdatadocumentfromguid(callinfo.guid);
       // reportdata.notes = noteslength;
       // console.log("inserting notes length");
        //var result =await insertreportdata(reportdata,companydb);
        var param = {
            notes:noteslength,
            companyid: property.companyid,
        }
        //checked 
        await updatereportdatatoelasticwithguidfornoteslengths(param,callinfo.incidentid);
        return param;
    
}
const updatereportdatatoelasticwithguidfornoteslengths=async(param,guid )=>
{

    console.log("updatereportdatatoelasticwithguidfornoteslengths");
    console.log(guid);
    console.log(param.companyid);
    
    var body= {
        "script": {
            "source": "ctx._source.notes=params.notes",
              "lang": "painless",
                "params" :  param
                
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }
    const result =await updatereportdatatoelastic_new(body);

    return result;
}
const updatereportdatatoelasticwithguidforkeyword=async(param,guid )=>
{

    console.log("updatereportdatatoelasticwithguidforemailsent");
    console.log(guid);
    console.log(param);
    
    var body= {
        "script": {
            "source": "ctx._source.keywords=params.keywords;ctx._source.transcript=params.transcript;ctx._source.category=params.category;",
              "lang": "painless",
                "params" :  param
                
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }
    const result =await updatereportdatatoelastic_transcrib(body);

    return result;
}
const updatereportdatatoelasticwithguidforemailsent=async(param,guid )=>
{

    console.log("updatereportdatatoelasticwithguidforemailsent");
    console.log(guid);
    console.log(param.companyid);
    
    var body= {
        "script": {
            "source": "ctx._source.emailsent=true",
              "lang": "painless",
                "params" :  param
                
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }
    const result =await updatereportdatatoelastic_new(body);

    return result;
}
const updatereportdatatoelastic_new= async (body,refresh=false)=>
{
    debugMessage(log4jslogger,`updatereportdatatoelastic`);
    
   //rd
   const elasticupdatepromise= new Promise (async(resolve, reject)=>{
    var url=  `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_update_by_query?max_docs=10&refresh=${refresh}`;
   const options = {
        method: 'POST',
        url: url,
        headers:
        { 
           // 'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            },
            body:body
            
         ,
        json: true };
        console.log("updatereportdatatoelastic updatereportdatatoelasticupdatereportdatatoelastic")
        console.log(JSON.stringify(body))
        Request(options, async  (error, response, body)=> {
            if (error) {  
                console.log(' elastic update error');
                console.log(error +'//'+ 'error');
                debugMessage(log4jslogger,`elastic update error`);
                console.log("elastic update error")
                console.log(JSON.stringify(error))
                debugMessage(log4jslogger,`error ${JSON.stringify(error)}`);

               resolve( error);
            }
            else
            {
                console.log('elastic update sucess')
                console.log(JSON.stringify(body) +' // '+ 'succuss');
                debugMessage(log4jslogger,`elastic update sucess`);

                debugMessage(log4jslogger,`succuss ${JSON.stringify(body)}`);
                // var reportdata2= await getreportdatadocument(accountDb,callinfo);
                resolve(  body);
            }
        });

   }
   );
   return await elasticupdatepromise;
}



const updatereportdatatoelastic_transcrib= async (body,refresh=false)=>
{
    debugMessage(log4jslogger,`updatereportdatatoelastic`);
    
   //rd
   const elasticupdatepromise= new Promise (async(resolve, reject)=>{
    var url=  `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_update_by_query?max_docs=1&conflicts=proceed&refresh=true`;
    const options = {
        method: 'POST',
        url: url,
        headers:
        { 
           // 'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            },
            body:body
            
         ,
        json: true };
        console.log("updatereportdatatoelastic updatereportdatatoelasticupdatereportdatatoelastic")
        console.log(JSON.stringify(body))
        Request(options, async  (error, response, body)=> {
            if (error) {  
                console.log(' elastic update error');
                console.log(error +'//'+ 'error');
                debugMessage(log4jslogger,`elastic update error`);
                console.log("elastic update error")
                console.log(JSON.stringify(error))
                debugMessage(log4jslogger,`error ${JSON.stringify(error)}`);

               resolve( error);
            }
            else
            {
                console.log('elastic update sucess')
                console.log(JSON.stringify(body) +' // '+ 'succuss');
                debugMessage(log4jslogger,`elastic update sucess`);

                debugMessage(log4jslogger,`succuss ${JSON.stringify(body)}`);
                // var reportdata2= await getreportdatadocument(accountDb,callinfo);
                resolve(  body);
            }
        });

   }
   );
   return await elasticupdatepromise;
}



const updatereportdatatoelasticwithguidforworkorder=async(param,guid )=>
{
    var body= {
        "script": {
            "source": "ctx._source.workordercreated=true",
              "lang": "painless",
                "params" : param
                  
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}

const updatereportdatatoelasticwithguidfortimeout=async(param,guid )=>
{
    var body= {
        "script": {
            "source": "if (params.calldetailsinfo!=null){ctx._source.calldetailsinfolist.add(params.calldetailsinfo );ctx._source.timedout=true}",
              "lang": "painless",
                "params" : param
                  
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}

const updatereportdatatoelasticwithguidforDTMFInforeport=async(param,guid )=>
{

     var body= {
        "script": {
            "source": "if (params.calldetailsinfo!=null){ctx._source.calldetailsinfolist.add(params.calldetailsinfo );ctx._source.type=params.type; ctx._source.escalationtype=params.escalationtype; ctx._source.callflowoption=params.callflowoption; ctx._source.dtmf=params.dtmf;ctx._source.removefromreport=params.removefromreport}",
              "lang": "painless",
                "params" : param
                  
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}

const updatereportdatatoelasticwithguidforrereocrding=async(guid , messagerecordingendtime)=>
{
    var param= {messagerecordingendtime:messagerecordingendtime}
     var body= {
        "script": {
            "source": " ctx._source.removefromreport=true;ctx._source.rerecordingtime=params.messagerecordingendtime",
              "lang": "painless",
              "params" : param
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } },
                {
                    "range": {
                        "messagerecordingendtime": {
                            
                            "lt": messagerecordingendtime,
                            "boost": 2.0
                        }
                    }
                }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}
const updatereportdatatoelasticwithguidfors3notification=async(param,guid )=>
{
   var body= {
        "script": {
            "source": "if (params.calldetailsinfo!=null){ctx._source.calldetailsinfolist.add(params.calldetailsinfo ); ctx._source.messageid=params.messageid;ctx._source.voicemailkey=params.voicemailkey;ctx._source.resolved=true;ctx._source.type=params.type;ctx._source.removefromreport=false}",
              "lang": "painless",
                "params" : param
                  
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}
const updatereportdatatoelasticwithguidforruleexecution=async(param,guid )=>
{
    var body= {
        "script": {
            "source": "if (params.calldetailsinfo!=null){ctx._source.calldetailsinfolist.add(params.calldetailsinfo )}",
              "lang": "painless",
                "params" : param
                  
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body,true);

    return result;

}

const updatereportdatatoelasticwithguidforremovefromreport=async(param,guid )=>
{
    var body= {
        "script": {
            "source": "ctx._source.removefromreport=params.removefromreport",
              "lang": "painless",
                "params" : param
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}
const updatereportdatatoelasticwithguidforparseVM=async(param,guid )=>
{
    var body= {
        "script": {
            "source": "if (params.calldetailsinfo!=null){ctx._source.calldetailsinfolist.add(params.calldetailsinfo )}ctx._source.type=params.type;ctx._source.removefromreport=false;ctx._source.voicemailid=params.voicemailid",
              "lang": "painless",
                "params" : param
                  
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": { "guid.keyword": guid } }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);

    return result;

}

const getunresolvedelasticsearchreportdata = async (callinfo) => {


    const query = {
        "bool": {
            "must": [

                { "match": { "propertyid.keyword": callinfo.propertyid } },
                { "match": { "pvt_type": "reportdata" } },
                { "match": { "didnumber": callinfo.didnumber } },
                { "match": { "resolved": false } },
                { "match": { "removefromreport": false } },
                {

                    "exists": {
                        "field": "messageid"
                    }

                },

                {
                    "bool": {
                        "must_not": {
                            "exists": {

                                "field": "filename"
                            }
                        }
                    }
                },

                {
                    "bool": {
                        "must_not": {
                            "exists": {

                                "field": "timedout"
                            }
                        }
                    }
                }

            ]
        }
    }

    var elasticsearchreportdocs: any = await getReportdataFromElasticSearch(query)

    return elasticsearchreportdocs
}
const getunresolvedelasticsearchreportdataformesssageboxentered = async (callinfo) => {


    const query = {
        "bool": {
            "must": [

                { "match": { "propertyid.keyword": callinfo.propertyid } },
                { "match": { "pvt_type": "reportdata" } },
                { "match": { "didnumber": callinfo.didnumber } },
                { "match": { "resolved": false } },
                { "match": { "removefromreport": false } },
                {

                    "exists": {
                        "field": "messageid"
                    }

                },

                {
                    "bool": {
                        "must_not": {
                            "exists": {

                                "field": "filename"
                            }
                        }
                    }
                }

            ]
        }
    }

    var elasticsearchreportdocs: any = await getReportdataFromElasticSearch(query)

    return elasticsearchreportdocs
}
const parseruleexecution= async(accountDb,callinfo)=>
{
    var formatedphone= formatPhoneNumber(callinfo.agentphonenumber);
    var callinfodescription= `SMS sent to ${callinfo.agentname  ? callinfo.agentname :'unknown'} `;
    const now_unix= callinfo.notifytimestamp;
    var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false,
            "guid":callinfo.guid
        };

    if (callinfo.when.toLowerCase()==="live")
    {
        var reportdata=getReportDocumentFromTemp(callinfo.guid)
    
        reportdata.calldetailsinfolist.push(calldetailsinfo);
        console.log("inserting ruleexecution sms report");
        //await insertreportdata(reportdata,accountDb);
    }
    else 
    {
        var reportlist: any = await getunresolvedelasticsearchreportdata(callinfo);
       reportlist.forEach(async(report) => {
           if (report.calldetailsinfolist && !report.calldetailsinfolist.find(r=>r.time===now_unix))
           {
                
                const param= 
                {
                    calldetailsinfo:calldetailsinfo
                }
                //ok
               await updatereportdatatoelasticwithguidforruleexecution(param,report.guid);
                report.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting ruleexecution sms report");
                await insertreportdata(report,accountDb);
            
            }
       });
    }
    return reportdata;
    
}

const parseagentpinfornotify= async(accountDb,callinfo)=>
{
    const now_unix= callinfo.notifytimestamp;
    var reportlist:any = await getunresolvedelasticsearchreportdata(callinfo);
    for (var i=0;i<reportlist.length;i++){
        var report= reportlist[i];
       
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
        if (result==="valid")
        {
            
            callinfodescription+='entered PIN';
            var calldetailsinfo:any= {
                "time":now_unix,
                "discription":callinfodescription,
                "callrecording":false,
                "guid":callinfo.guid
            };
            report.calldetailsinfolist.push(calldetailsinfo);
        }
       
       
        await insertreportdata(report,accountDb);
             var param={calldetailsinfo:calldetailsinfo};
            //ok
            await updatereportdatatoelasticwithguidforruleexecution(param,report.guid);
    }
       
    
    return reportlist;
    
}

const parseagentmessageboxentered= async(accountDb,callinfo)=>
{
    console.log("parseagentmessageboxentered");

    const now_unix= callinfo.notifytimestamp;
    callinfo.didnumber= callinfo.boxid.substring(0,10);
    
    var reportlist:any = await getunresolvedelasticsearchreportdataformesssageboxentered(callinfo);
    const guids = reportlist.map(o => o.guid)
    const filtered = reportlist.filter(({id}, index) => !guids.includes(id, index + 1))

    for (var i=0;i<filtered.length;i++){
        var report= filtered[i];
      
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
               
            callinfodescription+='entered message box';
            var calldetailsinfo:any= {
                "time":now_unix,
                "discription":callinfodescription,
                "callrecording":false,
                "guid":callinfo.guid
            };
            report.calldetailsinfolist.push(calldetailsinfo);
        
       
       
       
             var param={calldetailsinfo:calldetailsinfo};
            //ok
            await updatereportdatatoelasticwithguidforruleexecution(param,report.guid);
             insertreportdata(report,accountDb);
    }
       
    
    return filtered;
    
}
const parseagentring= async(accountDb,callinfo)=>
{
    var promise1= new Promise(async(resolve , reject)=>
    {
       var formatedphone= formatPhoneNumber(callinfo.agentphonnumber);
       // const setorissue= callinfo.when.toLowerCase()==="live" ? "issued": "sent";
        var callinfodescription= `Call sent to ${callinfo.agentname  ? callinfo.agentname :'unknown'} `;
       
        const now_unix= callinfo.notifytimestamp;
             
        var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false,
            "guid":callinfo.guid
        };
        if (callinfo.when.toLowerCase()==="live")
        {
            var reportdata=await getReportDocumentFromTemp(callinfo.guid);
            reportdata.calldetailsinfolist.push(calldetailsinfo);
            console.log("inserting agent respose ring report");
            
        }
        else if (callinfo.when.toLowerCase()==="notify")
        {
            var reportlist:any = await getunresolvedelasticsearchreportdata(callinfo);
            reportlist.forEach(async(report) => {
                if (report.calldetailsinfolist && !report.calldetailsinfolist.find(r=>r.time===now_unix))
                {
                var param = {
                    calldetailsinfo:calldetailsinfo
                }
                //ok
                await updatereportdatatoelasticwithguidforruleexecution(param,report.guid);
                 report.calldetailsinfolist.push(calldetailsinfo);
                 console.log("inserting ruleexecution ring report");
                 await insertreportdata(report,accountDb);
               
                }

            });
        }
       
            resolve( reportdata);
        });
        var result= await promise1;
        return result;
}
 

const getpropertyInfo=async(propertyid, propertydb=undefined)=>
{

   
    const contactsSelector = {
        "selector": {
            "pvt_type": "property",
            "propertyid":propertyid
            
            },
            limit:30000 ,
        /*    "fields": [
                "propertyid",
                "companyid",
                "timezone","callflowdata"
             ],*/
            "use_index":"pvt_type_propertyid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
            
        }
    
  
     propertydb=propertydb===undefined? nano.use(parseAccountToDatabaseName( propertyid)): propertydb;
    
    var property=await getdocumentbyproperty(propertydb,contactsSelector);
    
    if (!property ||property.error )
    {
        debugMessage(log4jslogger, `property db not available ${JSON.stringify( propertydb)}`);
    }
    return property;
        
}

const getIncidentInfo=async(incidentid, incidentdb=undefined)=>
{

   
    const contactsSelector = {
        'selector': {
            "pvt_type": "incident",
            "incidentid":incidentid
            
            },
            limit:30000 ,
            "use_index":"pvt_type_propertyid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
            
        }
    
  
        incidentdb=incidentdb===undefined? nano.use(parseAccountToDatabaseName( incidentid)): incidentdb;
    
    var property=await getdocumentbyproperty(incidentdb,contactsSelector);
    
    if (!property ||property.error )
    {
        debugMessage(log4jslogger, `property db not available ${JSON.stringify( incidentdb)}`);
    }
    return property;
        
}
const getaccountdata=async()=>
{


    const contactsSelector = {
        "selector": {
           "pvt_type": "accountinfo",
           "type": {
              "$exists": false
           }
        },
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit":3000
     }
    var globaldbname= "globaldb"
  
   const globaldb=nano.use(globaldbname)
    
     var result=await getalldocumentsbyproperty(globaldb,contactsSelector); 
   console.log("rrrrrrrr  " , result.length);
    return result.map(r=>parseAccountToDatabaseName( r.accountid));
        
}
const getcompanyInfo=async(companyid, companydb=undefined)=>
{


    const contactsSelector = {
        'selector': {
            "pvt_type": "company",
            "companyid": companyid


        },
        limit: 30000,
        "use_index":"pvt_type_companyid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var comapnydbname = parseAccountToDatabaseName(companyid);

    companydb = companydb === undefined ? nano.use(comapnydbname) : companydb;

    var comapny = await getdocumentbyproperty(companydb, contactsSelector);
    if (!comapny || comapny.error) {
        debugMessage(log4jslogger, `comapny db not available ${JSON.stringify(companydb)}`);
    }
    return comapny;

}

const getdayscheduleInfo = async (db, schedule1) => {
    //check here
    const contactsSelector = {
        'selector': {
            "pvt_type": "dayschedule",
            "scheduleid": schedule1.scheduleid,
            "datetime": schedule1.datetime

        },
        "use_index":"pvt_type_scheduleid",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

    var schedule = await getdocumentbyproperty(db, contactsSelector);
    return schedule;

}
const getmonthreportdata = async (companyid,fileds=[]) => {

    var endtime = moment().utc().unix();

    var starttime = moment().utc().startOf('day').add(-30, "days").utc().unix();


    const payload:any =
        { "querystring": `(companyid:${companyid}) `, "starttime": starttime, "endtime": endtime, "page": 0, "size":1000, "sorting": "" };

 
    var reportdocsitems:any = await getelasticsearchdata(payload,fileds,true);
    var reportdocslength=reportdocsitems.source.length;
    let  reportdocs:any=reportdocsitems.source;
       while (reportdocslength===9999)
    {
        //console.log(reportdocs)
        payload.search_after= reportdocsitems.sort[reportdocslength-1];
       
        reportdocsitems= await getelasticsearchdata(payload,fileds,true);;
        reportdocslength=reportdocsitems.source.length;
        reportdocs.push(...reportdocsitems.source);
        console.log(reportdocs.length)
    }
    return reportdocs;

}

const getmonthreportdata2 = async (companyid, fileds = []) => {
    var endtime = moment().utc().unix();

    var starttime = moment().utc().startOf("day").add(-30, "days").utc().unix();

    const payload = {
        querystring: `(companyid:${companyid}) `,
        starttime: starttime,
        endtime: endtime,
        page: 0,
        sorting: "",
    };

    var reportdocs = await getelasticsearchdata2(payload, fileds); //await getalldocumentsbyproperty(companydb,contactsSelector);
    return reportdocs;
};


const getcompanypropertylsit = async (companyid) => {
    // check here
    const contactsSelector = {
        'selector': {
            "pvt_type": "property",
            enabled: true

        },
        "use_index":"pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    };
    var comapnydbname = parseAccountToDatabaseName(companyid);

    var companydb = nano.use(comapnydbname);

    var properties = await getalldocumentsbyproperty(companydb, contactsSelector);
    return properties;

}
const finddaybusinesshours = (property) => {
    const timezone = property.timezone;
    var currendatettime = moment().tz(timezone);
    const dayname = currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    const businesshours = property.bussinesshours[dayname];
    return businesshours;
}
const isduringBussinessHour = async (property) => {
    console.log("isduringBussinessHour");
    const timezone = property.timezone ? property.timezone :'America/Kentucky/Louisville';
    var currendatettime = moment().tz(timezone);
    const dayname = currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    const daybusinesshours = property.bussinesshours[dayname];
    //console.log(JSON.stringify( daybusinesshours));
    var from_hh = isNaN(daybusinesshours.from.hh) ? daybusinesshours.from.hh : parseInt(daybusinesshours.from.hh);
    if (from_hh != 12 && daybusinesshours.from.a === "pm") {
        from_hh += 12;
    }
    else if (from_hh === 12 && daybusinesshours.from.a === "am") {
        from_hh = 0;
    }
    var to_hh = parseInt(daybusinesshours.to.hh);
    const from_mm = parseInt(daybusinesshours.from.mm);
    const to_mm = parseInt(daybusinesshours.to.mm);

    if (to_hh != 12 && daybusinesshours.to.a === "pm") {
        to_hh += 12;
    }
    else if ((to_hh === 12 || to_hh === 0) && daybusinesshours.to.a === "am") {
        to_hh = to_mm > 0 ? 0 : 24;
    }

    var duringbussenesshours = false;
    if (isNaN(from_hh)) {
        duringbussenesshours = false;
    }
    else {

        var moment_from_time = moment().tz(timezone).startOf('day').add(from_hh, "hours").add(from_mm, "minutes");;

        var moment_to_time = moment().tz(timezone).startOf('day').add(to_hh, "hours").add(to_mm, "minutes");;
        //     duringbussenesshours=currendatettime.unix()>moment_from_time.unix() && currendatettime.unix()<moment_to_time.unix();
        /* console.log("moment_from_time");
         console.log(moment_from_time.format("DD-MM-YY hh mm ss a z"));
         console.log("currendatettime");
         console.log(currendatettime.format("DD-MM-YY hh mm ss A z"));
         console.log("moment_to_time");
         console.log(moment_to_time.format("DD-MM-YY hh mm ss a z"));
          */

        duringbussenesshours = currendatettime.isBetween(moment_from_time, moment_to_time);
    }
    return duringbussenesshours;

}
const parsecallinfoinitdata = async(callinfolog)=>
{
    var promise1 = new Promise(async (resolve , reject )=>{
        var calldetailsinfolist=[];
        const callinfodescription= `Call received from ${formatPhoneNumber(callinfolog.callernumber)}`;
        const now_unix= callinfolog.notifytimestamp;
        if (callinfolog.when==="live"){
                var calldetailsinfo= {
                    "time":now_unix,
                    "discription":callinfodescription,
                    "callrecording":false
                }
                calldetailsinfolist.push(calldetailsinfo);
                const callinfodescription2= `Caller selected ${callinfolog.callflowoption} `
                calldetailsinfo= {
                    "time":now_unix,
                    "discription":callinfodescription2,
                    "callrecording":false
                }
                calldetailsinfolist.push(calldetailsinfo);
        }
       
            
        var reportdata={
            "companyid":callinfolog.companyid,
            "companyname":callinfolog.companyname,
            "companytimezone":callinfolog.companytimezone,
            "industry":callinfolog.industry,
            "propertytype":callinfolog.propertytype,
            "propertytimezone":callinfolog.propertytimezone,
            "hscustomer": callinfolog.hscustomer,
            "propertyid": callinfolog.propertyid,
            "propertyname": callinfolog.propertyname,
            "propertyphone":callinfolog.propertyphone,
            "duringbussinesshours":callinfolog.duringbussinesshours,
            "calldetailsinfolist":calldetailsinfolist,
            "guid":callinfolog.guid,
            "callid":callinfolog.guid,
            "type":callinfolog.callflowoption ,
            "when": callinfolog.when,
            "boxid": callinfolog.boxid,
            "didnumber": callinfolog.didnumber,
            "respondent": "-",
            "responsetime": 0,
            "notifyresponsetime":0,
            "notes": 0,
            "from": callinfolog.callername,
            "fromd":callinfolog.callernumber,
            "incidentdate": now_unix,
            "resolutiontype": "-",
            "isescalation": true,
            "pvt_type": "reportdata",
            "enabled": true,
           "resolutionon":"-",
            "resolved":false,
            "removefromreport":false, 
            "emailsent":false,
            notifymessage:false,
            version:12.5,
            workordercreated:false,
            newelasticserver:true,
            "notifytimestamp":now_unix
        }
        debugMessage(log4jslogger, `inserting initial report`);
        temp_reports.push(reportdata);
       // await insertreportdata(reportdata,accountDb);
       // 
        resolve (  reportdata);
    })

    var result = await promise1;
    return result
   
    
}
const insertnotifycallinfologtoreport= async (callinfotype,callinfo,propertydb)=>{
    var promise1= new Promise(async (resolve , reject )=>
    {
        switch (callinfotype)
        {
            case "ruleexecution":
            {
                if (callinfo.ruletype==="sms")
                resolve( await  parseruleexecution(propertydb,callinfo));
                break;
            }
            case  "ring":   
            {
                resolve(await parseagentring(propertydb,callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            default:
            {
                resolve ({})
            }
        }
    });
}

const insertlivecallinfologtoreport= async (callinfotype,callinfo,propertydb,callinfologs)=>
{
    var promise1= new Promise(async (resolve , reject )=>
    {
        switch (callinfotype)
        {
            case "callinit":
                {
                    if (callinfo.when.toLowerCase()==="live")
                        var result =await parsecallinfoinitdata(callinfo);
                        console.log("parsing end",callinfotype ) 
                        resolve(result); 
                        
                    break;
                }
            case  "ring":   
            {
                resolve(await parseagentring(propertydb,callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            case  "agentrespnse":   
            {
                resolve(await parseagentrespnse(callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            case  "pin":   
            {
                resolve( await parseagentpin(callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            
            case "callrecording":
            {
                resolve( await parsecallrecording(callinfo));
                break;
            }

            
            
           
             case "messagerecordingend":
            {
                resolve( await parsemessagerecordingend(callinfo,callinfologs));
                break;
            }

            case "callend":
                {
                    resolve( await parsecallend(callinfo));
                    break;
                }

          
            default:
            {
                resolve({});
                break;
                
            }

        }
    })

    return await promise1;
}
const save_oncall_list = async (oncall_list, dbname) => {
    oncall_list.pvt_type = "on_call_list";
    oncall_list.enabled = true;
    const accountDb = nano.use(dbname);
    delete oncall_list._id;
    delete oncall_list._rev;
    oncall_list.schedule_maintainance_create_time = moment.utc().unix(),
    oncall_list.schedule_maintainance_updated_time = moment.utc().unix(),
        console.log(JSON.stringify(oncall_list));
    return await insertObjectToDB(dbname,oncall_list)

}
const findLastIndex =(iarray,searchtext, searchproperty)=>
{
    var lastindex=-1;
   
    if (Array.isArray( iarray))
    {
        const index= JSON.parse( JSON.stringify( iarray)).reverse().findIndex(c=>c[searchproperty]===searchtext);
        if (index>=0)
        {
           
            lastindex=iarray.length-1-index;
        }
    }
   
    return lastindex;

}
const parselivecallinfologdataforreport=async(propertydb,guid,lastcallinfo )=>
{
    debugMessage(log4jslogger,`started parsing ${guid}`);
    var promise1= new  Promise(async (resolve, reject) => {
        const contactsSelector = {
            'selector': {
                "pvt_type":"callinfolog",
                "guid":guid
                },
                "use_index":"pvt_type_guid",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                
                limit:30000 
            }
        var callinfo;  
        var callinfologs=await getalldocumentsbyproperty(propertydb,contactsSelector);
        //sometime we don't get messagerecordingend log. it cause reporting issue.
        var lookforLastLog= callinfologs.find(c=> c.type=== lastcallinfo.type);
        if (!lookforLastLog)
            callinfologs.push (lastcallinfo);
        var lookforcallreccordinglog;
        if (lastcallinfo.type==="callend")
        {
             lookforcallreccordinglog= callinfologs.find(c=>  c.type=== "messagerecordingstart");
        }
        if (!lookforcallreccordinglog)
        {
             callinfologs= callinfologs.sort((a, b) => {
                return a.notifytimestamp > b.notifytimestamp  ? 1 : -1;
            });
            debugMessage(log4jslogger,`\\**********************************************************************\\`);
            const calllength= callinfologs.length;
            var lookforMessageRecordingIndex= findLastIndex (callinfologs,"messagerecordingend","type");
            var lookforCallInitLog= callinfologs.find(c=> c.type=== "callinit");
            await parsecallinfoinitdata(lookforCallInitLog);
            for (var i=0 ; i<calllength;i++)
            {
                callinfo= callinfologs[i];
                if (callinfo.type==="messagerecordingend" && i !=lookforMessageRecordingIndex)
                    continue
                if (callinfo.type==="callinit")
                    continue
                guid=callinfo.guid;
                var callinfotype= callinfo.type  ? callinfo.type.toLowerCase():'';
            
                console.log("parsing ",callinfotype )
                debugMessage(log4jslogger,`parsing ${callinfotype} for ${guid}`);         
                await insertlivecallinfologtoreport(callinfotype,callinfo,propertydb,callinfologs);
            
                debugMessage(log4jslogger,`parsing end ${callinfotype} for ${guid}`);
            }
                    
            debugMessage(log4jslogger,`\\**********************************************************************\\`);
            debugMessage(log4jslogger,`end parsing ${guid}`);
            debugMessage(log4jslogger,`\\**********************************************************************\\`);
        }
        resolve(callinfo);   
    });
   
    var result_callinfo:any = await promise1 ;
    if (result_callinfo && result_callinfo.guid)
    {
        var reportdata= getReportDocumentFromTemp(result_callinfo.guid);
        if (reportdata){
            reportdata.lastcalllogtype=result_callinfo.type;
            await insertreportdatatoelastic(propertydb,result_callinfo);
            insertreportdata(reportdata,propertydb,true);
            const  notifycalllog= await getNotifyCallLog(propertydb,result_callinfo);
        
            if (notifycalllog)
            {
                for (var i=0; i<notifycalllog.length;i++)
                {
                    const callinfotype= notifycalllog[i].type.toLowerCase();
                
                    if (callinfotype==="ruleexecution" || callinfotype==="ring")
                    {
                            console.log(`inserting notify reportdata for ${notifycalllog[i].guid}`)
                            insertnotifycallinfologtoreport(callinfotype, notifycalllog[i], propertydb);
                    }
                }
            }
        }
    }
       return result_callinfo;
       
   

}

const insertcallinfolog= async(callinfo)=>
{
    var promise1= new Promise(async (resolve, reject) => {
        callinfo.pvt_type= "callinfolog";
        callinfo.enabled=true;
        var now_unix= moment().utc().unix();
        callinfo.notifytimestamp=now_unix;

        const propertydbname= parseAccountToDatabaseName(callinfo.propertyid);
        const propertydbwithmonthname=getMonthDbName(propertydbname);
        const propertydb = nano.use(propertydbwithmonthname);
    
        var callinfotype= callinfo.type  ? callinfo.type.toLowerCase():''; 
        const property=await getpropertyInfo(callinfo.propertyid);
        const company =await  getcompanyInfo(property.companyid);
        if (callinfotype==="callend") now_unix++;// sometime message recording end time and callend time wehre same so increasing it by 1
        if (callinfotype==="callinit")
        {
            now_unix=now_unix-5;
            callinfo.notifytimestamp=now_unix;
            var callflowdata= property.callflowdata;
             var callflow;
             callflow= callflowdata.find(cl=>cl.didnumber===callinfo.didnumber);
            if (callflow)
            {
                callinfo.callflowoption= callflow.callflowoption;
                callinfo.callflowoptiontype= callflow.callflowoptiontype;
             }
            const isduringbussinesshours=await isduringBussinessHour(property);
            
            callinfo["companyid"]=company.companyid;
            callinfo["companyname"]=company.companyname;
            callinfo["companytimezone"]=company.timezone;
            callinfo["industry"]=company.industry;
            callinfo["propertytype"]=property.type;
            callinfo["propertytimezone"]=property.timezone;
            callinfo["hscustomer"]= property.hscustomer;
            callinfo["propertyid"]= property.propertyid;
            callinfo["propertyname"]= property.propertyname;
            callinfo["propertyphone"]=property.phone;
            callinfo["duringbussinesshours"]=isduringbussinesshours;
            callinfo["daybusinesshours"]=finddaybusinesshours (property);
            callinfo["units"]= property.units;
            callinfo["hsaccount"]=property.hsaccount;
        }
        
            var insert_time_unix= moment().utc().unix();
            callinfo.inserttimestamp=insert_time_unix;
            callinfo.notifytimestamp=insert_time_unix;
            propertydb.insert(callinfo, async (err, body) => {
            if (err) {
                debugMessage(log4jslogger,`inserting callinfolog error ${JSON.stringify(callinfo)} ` );
                debugMessage(log4jslogger,` error ${JSON.stringify(err)} ` );

                console.log("err ",err);
                resolve( err);
                ;;
            }                   
            else {
                console.log("callinfo log inserted succefully");
                debugMessage(log4jslogger,` callinfo log inserted succefully ${callinfo.guid}` );

                const when= callinfo.when ? callinfo.when.toLowerCase():"";
                const reason=callinfo.reason ? callinfo.reason:"";
                if (when === "live" && (
                    (callinfotype==="messagerecordingend" ) 
                        || ( callinfotype==="callend"&& !callinfo.messageid && reason==="NORMAL_CLEARING")
                        ))
                {
                   
                    resolve (await parselivecallinfologdataforreport(propertydb,callinfo.guid,callinfo ));
                }
                else if (when === "notify" &&(callinfotype==="ruleexecution" || callinfotype==="ring") )
                {
                    console.log(`inserting notify reportdata for ${callinfo.guid}`)
                   resolve (insertnotifycallinfologtoreport(callinfotype, callinfo, propertydb));
                }
                else if (when === "notify" && callinfotype==="timeout"  )
                {
                    console.log(`inserting notify reportdata for ${callinfo.guid}`)
                   resolve (parseincidenttimeout( propertydb,callinfo));
                }
                else if (when=== "agentcall" && callinfotype ==="agentaction")
                {
                    resolve ( parseagentaction(propertydb,callinfo));
                }
               else if (when=== "agentcall" && callinfotype ==="callbackend")
                {
                    resolve(callinfo)
                }
                else if (when=== "agentcall" && callinfotype ==="pin")
                {
                    resolve (parseagentpinfornotify(propertydb,callinfo));
                }
                else if (when=== "agentcall" && callinfotype ==="messageboxentered")
                {
                    resolve (parseagentmessageboxentered(propertydb,callinfo));
                }
               
            }
        });
        var result=  await promise1;
        return result;
    });
   
}

const insertincidentnotes= async(incidentnotenotedata,accountdbname,propertyid)=>
{
   
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
        'selector': {
            "incidentid":incidentnotenotedata.incidentid,
            "pvt_type": "incidentnotes"
            },
            "use_index":"pvt_type_incidentid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
    var incidencenotedocument:any=await getdocumentbyproperty(accountDb,contactsSelector); 
    if (incidencenotedocument)
    {
        incidencenotedocument.data.push(incidentnotenotedata)
    }
    else
    {
        
        var notes= [];
        notes.push(incidentnotenotedata);
        incidencenotedocument= {
            incidentid:incidentnotenotedata.incidentid,
            data:notes,
            enabled:true,
            "pvt_type": "incidentnotes"
        }
       
    }
    
    const noteslength=incidencenotedocument.data.length;
    var insertresult= await   updatenotelength(incidentnotenotedata,noteslength,propertyid);
   const result = await insertObjectToDB(accountdbname,incidencenotedocument);
    return result;

}
const insertreportdata= async (callinfo,accountDb,initrecord=false)=>
{
    callinfo.pvt_type= "reportdata";
    callinfo.enabled=true;
    debugMessage(log4jslogger,`insert reportdata ${callinfo.guid}`);

    var reportdata=initrecord ?callinfo : await getreportdatadocument (accountDb,callinfo);
    if(reportdata && reportdata._id && reportdata._rev)
    {
        
        callinfo._id=reportdata._id;
        callinfo._rev=reportdata._rev;

    }
  
    var insertreportdatapromise =new Promise(async (resolve, reject) => {
        accountDb.insert(callinfo, (err, body) => {
            if (err) {
                console.log("err ",err);
                debugMessage(log4jslogger,JSON.stringify( err));
       
                resolve( err);;
            }
            else {
                console.log( "reportdata inserted succefully");
                debugMessage(log4jslogger,`reportdata inserted succefully ${callinfo.guid}`);
                //console.log(JSON.stringify(body));
                resolve( callinfo);;
                
    
            }
        });
    });

    var result = await insertreportdatapromise;
    return result;
   

}
const insertdtmfinfo=async  (dtmfinfo,accountdbname)=>
{
    dtmfinfo.pvt_type= "dtmfinfo";
    dtmfinfo.enabled=true;
    dtmfinfo.guid=dtmfinfo.call_id;
    dtmfinfo.callid=dtmfinfo.call_id;
    const accountDb = nano.use(accountdbname);
   
    var property=await getpropertyInfo(dtmfinfo.account_id); 
    var callflowdata= property.callflowdata;
    var callflow;
    if (dtmfinfo && dtmfinfo.DTMF>0 && callflowdata && callflowdata.length>dtmfinfo.DTMF)
    {
         callflow= callflowdata[dtmfinfo.DTMF-1];
         debugMessage(log4jslogger,`dtmf callflow ${ callflow.call_id}`);
    }
    else if (dtmfinfo.voicemail_box && callflowdata && callflowdata.length>0 )
    {
        callflow= callflowdata.find(cl=> cl.deviceid===dtmfinfo.voicemail_box)
        debugMessage(log4jslogger,`dtmf voice callflow ${ callflow.call_id}`);
    }

    if (callflow)
    {
        dtmfinfo.callflowoption= callflow.callflowoption;
        dtmfinfo.callflowoptiontype= callflow.callflowoptiontype;
    }
    else
    {
        dtmfinfo.callflowoption="Other";
    }
    const now_unix= moment().utc().unix();
    dtmfinfo.notifytimestamp=now_unix;
    return await insertObjectToDB(accountdbname,dtmfinfo );

}
const getInitilaCallRecordForCallingNumber= async (callernumber,propertydb)=>
{

    const selector = 
        {
            "selector": {
               "pvt_type": "reportdata",
               "initialcallrecord": true,
               "callernumber": callernumber
            },
            "sort": [
               {
                  "incidentdate": "desc"
               }
            ],
            "limit": 1,
            "use_index":"incidentdate_index",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
         };
    var reportdoc=await getdocumentbyproperty(propertydb,selector); 
    return reportdoc;
    
}

const getCallinitForCallingNumber= async (callinfo,propertydb)=>
{

    const selector = 
    {
        "selector": {
           "pvt_type": "callinfolog",
           "type": "callinit",
           "callernumber": callinfo.callernumber,
           "notifytimestamp":{
               "$gt":callinfo.incidentdate
           }
        },
        "sort": [
           {
              "notifytimestamp": "desc"
           }
        ],
        "limit": 1,
        "use_index":"initialcallrecord_callernumber",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
     }
    var callinfolog=await getdocumentbyproperty(propertydb,selector); 
    return callinfolog;
    
}
const addRemovedReportBack=async(callinfo,propertydb)=>{
    var callinfolog= await getCallinitForCallingNumber(callinfo,propertydb);
    if (!callinfolog)
    {
        var reportdata=await getelasticsearchreportdatabyguid (callinfo.guid);   
        if (reportdata)    
        {
            reportdata.removefromreport=false;
             
            var fields = {
                "removefromreport":false
            }
            await updatereportdatatoelasticwithguidforremovefromreport(fields,reportdata.guid);
            insertreportdata(reportdata,propertydb);
        }
    }

}



const insertDTMFInforeport=async  (dtmfinfo,accountdbname,property)=>
{
    console.log("insertDTMFInforeport ", accountdbname);
    const propertydb = nano.use(accountdbname);
    var reportdata=await getelasticsearchreportdatabyguid (dtmfinfo.guid);
     const now_unix= dtmfinfo.notifytimestamp;
    const callinfodescription= `Caller selected ${dtmfinfo.callflowoption} `
    const calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        }
    if (!reportdata)
    {
        const r1=await insertcallinitreport(dtmfinfo,accountdbname,property,calldetailsinfo);
        return   r1;   
    }
    else
    {
        var calldetailsinfolist= reportdata.calldetailsinfolist;
        calldetailsinfolist.push(calldetailsinfo);
        reportdata.type= dtmfinfo.callflowoption;
        reportdata.escalationtype =dtmfinfo.callflowoptiontype;
         //if escalation type the new report will be generated from free switch 
         const removefromreport =reportdata && 
         reportdata.escalationtype &&
              reportdata.escalationtype.toLowerCase()== "escalation" 

        reportdata.removefromreport=removefromreport;
        setTimeout(() => {
            addRemovedReportBack(reportdata,propertydb)
        },99000)
        
        reportdata.callflowoption=dtmfinfo.callflowoption;
        reportdata["dtmf"]= dtmfinfo.DTMF;
        var r=await insertreportdata(reportdata,propertydb);
        //update elastic search 
        var fields = {
            type:reportdata.type,
            escalationtype:reportdata.escalationtype,
            callflowoption:reportdata.callflowoption,
            calldetailsinfo:calldetailsinfo,
            dtmf:dtmfinfo.dtmf,
            "removefromreport": removefromreport
        }
       await updatereportdatatoelasticwithguidforDTMFInforeport(fields,reportdata.guid);
        return r; 
    }

}

const insertcallinitreport=async  (dtmfinfo,accountdbname,property,calldetailsinfo)=>
{

    
    const company= await getcompanyInfo(property.companyid);
    const propertydb= nano.use (accountdbname);
    var init_reportdata=await getelasticsearchreportdatabyguid (dtmfinfo.guid);
   if (!init_reportdata)
   {
        console.log("insertcallinitreport");
        const now_unix= dtmfinfo.notifytimestamp;
        const callinfodescription= `Call received from ${formatPhoneNumber(dtmfinfo.caller_id_number)}`;
        var calldetailsinfo_init= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        }
        var  calldetailsinfolist=[];
        calldetailsinfolist.push(calldetailsinfo_init);
        if (calldetailsinfo)
        {
            calldetailsinfo.initrecord=false;
            calldetailsinfolist.push(calldetailsinfo);
        }
        const isduringbussinesshours=await isduringBussinessHour(property);
        const daybusinesshours  =finddaybusinesshours(property);
        const removefromreport = dtmfinfo && dtmfinfo.callflowoptiontype && 
        dtmfinfo.callflowoptiontype.toLowerCase()== "escalation" ;
      
        const reportdata= {
            
            companyid:company.companyid,
            companyname:company.companyname,
            companytimezone:company.timezone,
            industry:company.industry,
            propertytype:property.type,
            propertytimezone:property.timezone,
            hscustomer: property.hscustomer,
            propertyid:property.propertyid,
            propertyname:property.propertyname,
            propertyphone:property.phone,
            duringbussinesshours:isduringbussinesshours,
            daybusinesshours:daybusinesshours,
            calldetailsinfolist:calldetailsinfolist,
            guid:dtmfinfo.call_id,
            callid:dtmfinfo.call_id,
            callflowoption:dtmfinfo.callflowoption ,
            when:"-",
            
            callername:dtmfinfo.caller_id_name,
            callernumber:dtmfinfo.caller_id_number,
            type: dtmfinfo.callflowoption,
            escalationtype :dtmfinfo.callflowoptiontype,
            dtmf: dtmfinfo.DTMF,
            "respondent": "-",
            "responsetime": 0,
            "notifyresponsetime":0,
            "notes": 0,
            "from": dtmfinfo.caller_id_name,
            "fromd":dtmfinfo.caller_id_number,
            "incidentdate": now_unix,
            "resolutiontype": "-",
            "isescalation": false,
            "pvt_type": "reportdata",
            "enabled": true,
            "resolutionon":"-",
            "resolved":false,
            "removefromreport":removefromreport,
            "initialcallrecord":true,
            workordercreated:false,
            newelasticserver:true
        }
        reportdata["dtmf"]= dtmfinfo.DTMF;
        const accountDb = nano.use(accountdbname);
        const result= await insertreportdata(reportdata,accountDb);
        if (result)
        {
                await  insertreportdatatoelastic(accountDb,reportdata);
        }
        console.log("from 5138");
        //  if (removefromreport)
          {
                  setTimeout(() => {
                  addRemovedReportBack(reportdata,propertydb)
              },99000);
          }
        return   result;
    }
    else 
        return init_reportdata;               

}

const getaccountdbnames = async () => {
    var accountdbpromise = new Promise(async (resolve, reject) => {
        var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
        var nano1 = require('nano')(hellospoke_db);
        nano1.db.list(function (err, body) {
            if (err) {
                console.log("db error", err);
                reject(err);
            }
            else {
                //   console.log( "dblist",body);
                resolve(body);
            }
        });
    });
    var result = await accountdbpromise;
    return result;

}





const createaccountdb = async (dbname)=>
{

    var accountdbpromise = new Promise(async (resolve, reject) => {
        var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
        var nano1 = require('nano')(hellospoke_db);
        nano1.db.create(dbname, function (err, body) {
            if (err) {
                console.log("db creation error", err);
                createindexes(dbname)
                resolve(err);
            }
        else
        {
                console.log("sucess", body);
                createindexes(dbname)
                resolve(body);
            }
        });
    });
    var result = await accountdbpromise;
    return result;

}


const resetpasswordemail = (payload) => {
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    const accountname = payload.data.accountname;
    const email = payload.data.email;
    const account_id = payload.data.accountid;
    const userid = payload.data.userid;
    const first_name = payload.data.first_name;
    const html = `<!DOCTYPE html>
    <html>
    
    <head>
        <style>
            .reset_color {
                fill: #FFFFFF;
            }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    
    <body>
        <div
            style="padding-left: 161px; background-color: #d3d3d342; width: 568px; height: auto; padding:37px 0px 71px 45px;">
            <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1" /></div>
            <div class="row" style="margin-left:0px;margin-right:0px;">
                <div style="font-size: 14px; color:#003A5d;  margin-top: 30px;">
                    Hi ${first_name}, <br /> We received a request to reset your HelloSpoke password for account <span style="font-weight:bold;"> ${accountname}</span>.
                </div>
                <div style="margin-top: 3%; margin-bottom: 11px; font-size: 14px; color:#003A5d;">
                    Simply click the button to set a new password:</div>
            </div>
            <div>
            <a target="_blank" href="${process.env.WEB_SERVER}Change_Password?email=${email}&accountname=${accountname}&account_id=${account_id}&userid=${userid}"><img src="${process.env.WEB_SERVER}img/Reset_password.png" class="head1" /></a>
                
            </div> <br /><br />
            <div class="row" style="margin-top: 7px;margin-left:0px;margin-right:0px;">
                <div style="font-size: 10px; color:#003A5d; font-family:open sans;">Or copy and paste this link into your
                    browser:
                    <a target="_blank" href="${process.env.WEB_SERVER}Change_Password?email=${email}&accountname=${accountname}&account_id=${account_id}&userid=${userid}">${process.env.WEB_SERVER}</a>
                </div>
            </div>
            <div class="row" style="margin-top: 34px;margin-left:0px;margin-right:0px;">
                <div style="font-size: 14px; color:#003A5d; font-family:open sans;">If you didn’t ask to change your
                    password, no worries!<br />
                    Your password is still safe and you can delete this email.</p>
                </div>
                <div class="row" style="margin-left:0px;margin-right:0px;">
                    <div style="font-size: 14px; color:#003A5d; font-family:open sans;margin-top: 20px;">If you need further
                        assistance, reach out to HelloSpoke at 888-955-5155.</div>
                </div>
            </div>
        </div>
        </div>
    </body>
    
    </html>`;

    let mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: email,
        subject: ' NOTIFY Reset Password ',
        text: 'This is the email regarding  NOTIFY Reset Password.',
        html: html,

    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

const sendEscalationEmails= async(reportdata)=>
{
   
    const callflowoption=reportdata.type;
    const propertyid=reportdata.propertyid
   // console.log(JSON.stringify( reportdata));
    var payload ={
        data:{
            callflowoption:callflowoption,
            emaillist:[]
            
        }
    } ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(dbname);
    const contactsSelector = {
                'selector': { "pvt_type": "escalationemaillist",
                "callflowoption": callflowoption
                    },
                    "use_index":"pvt_type_callflowoption",
                    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                    limit:30000 
                }
   var escalationemailobj=await getdocumentbyproperty(accountDb,contactsSelector); 
     var emaillist=[];           
   if (escalationemailobj  && escalationemailobj.emaillist){
            emaillist=escalationemailobj.emaillist.map(a => a.email);
   }
          console.log('emaillist----------------',emaillist);
          emaillist = Array.from(new Set(emaillist)) ;
         console.log('emaillist------after removing duplicate----------',emaillist);        
    if (emaillist.length>0)
    {
        payload.data.emaillist= emaillist;
        vmboxemail(payload,reportdata);
    }
    console.log(payload);

}

interface EmailHistoryDb{
    type: "EmailHistory",
    guid: string,
    toEmail: string,
    emailReferenceId: string,
    emailSubject: string,
    createdAt: string
}
interface EmailHistoryTrackingDb {
    type: "EmailHistoryTracking",
    guid: string,
    trackingId: string
}

const getSize = async(filename) => { 
    let fSize = new Promise(async (resolve, reject) => {
    const AWS = require('aws-sdk')
    const s3 = new AWS.S3({
        accessKeyId: AWS.config.accessKeyId,
        signatureVersion: AWS.config.signatureVersion,
        region: AWS.config.region,
        secretAccessKey: AWS.config.secretAccessKey
    });

    var params = {
        Bucket: process.env.AWS_MESSAGE_RECORDING_URL,
        Key: filename
    };
      
    s3.headObject(params, function(error, response) {
        if (error) {
          reject(error);
        }
        var size = '';
        if(response && response.ContentLength){
            size = (response.ContentLength / 1024).toFixed(1); 
        }
        resolve(size);
    });  
  });
  return await fSize;
} 

const vmboxemail = async (payload, reportdata) => {
    console.log("vmboxemaildata before sending email",payload,reportdata);
    const smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    };
     const transporter = nodemailer.createTransport(smtpConfig);
   
     const emails = payload.data.emaillist.toString();
     console.log(
         "sending email +++++++++++reportdata++++++++++++++++++++++",
         reportdata
     );
     const from = reportdata.from ? reportdata.from : "-";
     const fromnumber = reportdata.fromd ? reportdata.fromd : "-";
     const to = reportdata.didnumber ? reportdata.didnumber : "";
     const tonumber = reportdata.didnumber ? reportdata.tonumber : "";
     const incidentdate = moment.duration(reportdata.incidentdate, "seconds");
      // Convert time to EST for now , This might change it to custom timezone based on property, TASK - 1162
      const dt = moment.utc(incidentdate.asMilliseconds()).utcOffset('-0500');

    //  const received = dt.format("ddd, MMM D,YYYY at hh:mm");
     const voicemailDateTime = `${dt.format("ddd, MMM D,YYYY")} ${dt.format("hh:mm")} EST`;
     //const duration = "";////payload.data.duration ? payload.data.duration : '';
     const duration = formaReportTime(reportdata.callduration);
 
     const filetype = "mp3";
     const boxid = reportdata.boxid;
     const aws_url = process.env.AWS_MESSAGE_RECORDING_URL;
     var filename = reportdata.messageid;
     if (reportdata && reportdata.isescalation == false){
     }else{
     filename = boxid + "/" + filename;
     }
     const AWS = require("aws-sdk");
 
     const myBucket = process.env.AWS_MESSAGE_RECORDING_URL;
     const myKey = filename;
     const s3 = new AWS.S3({
         accessKeyId: AWS.config.accessKeyId,
         signatureVersion: AWS.config.signatureVersion,
         region: AWS.config.region,
         secretAccessKey: AWS.config.secretAccessKey,
     });

       let url;
        if (reportdata && reportdata.isescalation == false) {
            url = s3.getSignedUrl("getObject", {
                Bucket: process.env.AWS_STORAGE_BUCKET,
                Key: decodeURIComponent(filename),
            });
        } else {
            url = s3.getSignedUrl("getObject", {
                Bucket: process.env.AWS_MESSAGE_RECORDING_URL,
                Key: filename,
            });
        }
 
    //  const filesize = await getSize(filename);
     var fileurl = url;
     const propertyname = reportdata.propertyname;
     // const caller=  `from ${from}(${fromnumber})`;
     // const calee=  `from ${to}(${tonumber})`;
    //  const caller = ` ${from}(${fromnumber})`;
    //  const calee = ` ${to}(${tonumber})`;
     const caller_name = from;
     const caller_number = fromnumber;
     const callflowoption = reportdata.type.toUpperCase();
     const voicemailboxname = `${callflowoption} Voicemail `;
     const keywords = `${reportdata.keywords.keywords} `;
     const keyword_s = keywords.toUpperCase();
     const transcript = `${reportdata.transcript} `;
     const category = `${reportdata.category} `;
     const category_s = category.toUpperCase();

     const companyid = `${reportdata.companyid}`;
     const propertyid = `${reportdata.propertyid}`;
     const guid = `${reportdata.guid}`;
     var webserverlink= process.env.WEB_SERVER;
     var property= await getpropertyInfo(propertyid);

     var reportlink= `${webserverlink}login?redirectcompanyid=${companyid}&redirectpropertyid=${propertyid}&redirectguid=${guid}&redirecttype=ca`;
     var workorderlink= `${webserverlink}login?redirectcompanyid=${companyid}&redirectpropertyid=${propertyid}&redirectguid=${guid}&redirecttype=wo`;
    
     var workorderdiv= property.pmcid?`  <div class="row info no-margin"> 
     <a target="_blank" href=${workorderlink}>                        
     <div class="loginimg"><img src="${process.env.WEB_SERVER}img/Start_work_order.png"/></div>
     </div></a>`   :'';

     var callOverviewDiv= `<div class="row info no-margin" style="width: 213px;"> 
     <a target="_blank" href=${reportlink}>                        
     <div class="loginimg">
          <img src="${process.env.WEB_SERVER}img/Open_call_overview.png"/>
     </div></a>
     </div>`

    
     const html = `<!DOCTYPE html>
    <html>     
     <head>
         <meta name="viewport" content="width=device-width, initial-scale=1">
     </head>
     
     <body>
         <div style=" font-family: sans-serif;    color: #555555;">
             <div style=" width: 213px; margin-bottom:15px">
                 
                 ${process.env.EMAIL_BUTTON ==="true" ?workorderdiv:''}
                 
                 
               </div>
               ${process.env.EMAIL_BUTTON ==="true" ?callOverviewDiv:''}

            
                 <div>
                     <div style="color: #003A5D; margin-top: 8pt; font-size: 20px; ">NEW ${callflowoption} VOICEMAIL</div>
                 </div>
 
 
             
                 <div class=" row ">
                     <p style="font-size: 14px;color: #000000;margin-bottom: 32.5px; ">Please find the message audio file in the attachment.</p>
                 </div>
                 <div class="row" style="margin-bottom: 21px;">
                     <table class="table col-md-4" style=" width : 258pt;border-top: 1px solid #E0E0E0;  border-bottom: 3px solid #E0E0E0;border-collapse: collapse;">
                         <tbody>
                             <tr class="active" style=" border-bottom: 1pt solid #E0E0E0 !important;">
                                 <td style="color: #95989A;width: 53%;padding-left: 5px;padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: left;      background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                     Property</td>
                                 <td style="max-width: 203pt; word-wrap: break-word;color: #003A5D;text-align: left ;     background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${propertyname}</td>
                             </tr>
                             <tr class="active" style=" border-bottom: 1pt solid #E0E0E0 !important;">
                                 <td style="color: #95989A;width: 53%;padding-left: 5px;padding-top: 6px;padding-bottom: 5px; font-weight: 600;text-align: left; background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                     Type</td>
                                 <td style="max-width: 203pt;word-wrap: break-word;color: #003A5D;text-align: left ;     background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${reportdata.type}</td>
                             </tr>
                             <tr class="active" style=" border-bottom: 1pt solid #E0E0E0 !important;">
                                 <td style="color: #95989A;width: 53%;padding-left: 5px;padding-top: 6px;padding-bottom: 5px; font-weight: 600;text-align: left;  background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                     Date & time</td>
                                 <td style="max-width: 203pt; word-wrap: break-word;color: #003A5D;text-align: left ;    background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${voicemailDateTime}</td>
                             </tr>
                             <tr class="active" style=" border-bottom: 1pt solid #E0E0E0 !important;">
                                 <td style="color: #95989A;width: 53%;padding-left: 5px;padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: left;    background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                     From</td>
                                 <td style="max-width: 203pt;word-wrap: break-word;color: #003A5D;text-align: left ;     background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${caller_name}</td>
                             </tr>
                             <tr class="active">
                                 <td style="color: #95989A;width: 53%;padding-left: 5px;padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: left;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                     From # </td>
                                 <td style="max-width: 203pt;word-wrap: break-word;color: #003A5D;text-align: left ;    background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${caller_number}</td>
                             </tr>
     
                         </tbody>
                     </table>
                 </div>
                 <div>
                     <div>
                         <div style="width: 251pt !important;margin-bottom: 5px; color: #95989A; font-size: 14px;">Category</div>
                         <div style="width: 251pt !important;margin-bottom: 20px;color: #003A5D;font-size: 18px;min-height: 24px;">${category_s}</div>
                     </div>
                     <div>
                         <div style="width: 251pt !important;margin-bottom: 5px; color: #95989A;font-size: 14px;">Keywords</div>
                         <div style="width: 251pt !important;margin-bottom: 20px; color: #003A5D;width: 294px;font-size: 18px;min-height: 24px;">${keyword_s}</div>
                     </div>
                     <div>
                         <div style="width: 251pt !important;margin-bottom: 5px; color: #95989A;font-size: 14px;">Transcription</div>
                         <div style="width: 251pt !important;margin-bottom: 20px;color: #003A5D;font-size: 18px;min-height: 24px;">${transcript}</div>
                     </div>
                 </div>
             </div>
       
     </body>
     
     </html>`;
    const emaillist = payload.data.emaillist;
    for (var e = 0; e < emaillist.length; e++) {
        const toEmail = emaillist[e];
        const emailSubject = `${propertyname} ${callflowoption} voicemail`
        let mailOptions = {
            from: process.env.SMTP_MAIL_SERVER_FROM,
            to: toEmail,
            subject: emailSubject,
            text: "This is the email regarding vmbox.",
            html: html,
            attachments: [
                {
                    filename: filename,
                    contentType: "application/mp3",
                    path: fileurl,
                },
            ],
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            const messageid = info.messageId;
            console.log("Message sent: %s", messageid);
            const sucess_message = `email sucessfuly sent to ${toEmail} for guid ${reportdata.guid} and property ${reportdata.propertyid} ${reportdata.propertyname} with messageid ${messageid}`;
            serverlog("info", sucess_message, "email");

            const emailHistoryDb = newNano.use<EmailHistoryDb>(
                NOTIFY_VOICEMAIL_EMAIL_HISTORY_DB
            );
            await emailHistoryDb
                .insert({
                    type: "EmailHistory",
                    guid: reportdata.guid,
                    toEmail,
                    emailSubject,
                    emailReferenceId: info.messageId,
                    createdAt: moment().utc().toISOString()
                })
                .catch((e) => {
                    console.error(e);
                });
        } catch (error) {
            const error_message = `email not sent to ${toEmail} for guid ${reportdata.guid} and property ${reportdata.propertyid} ${reportdata.propertyname} `;
            serverlog("error", error_message, "email", JSON.stringify(error));
        }
    }
};


const relogin = async (req, account_name, creds) => {
    const responseData: any = {
        success: false
    };

    const putData = {
        data: {
            credentials: creds,
            account_name
        },
        verb: "PUT"
    };
    const reloginPromise = new Promise<any>((resolve, reject) => {
        const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
            body: JSON.stringify(putData)
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            if (response && response.statusCode === 201) {
                // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
                console.log("loggedin");
                body = JSON.parse(body);
                var decoded = req['decoded'];
                const newToken = jwt.sign({
                    'kazoo_api_key': body.auth_token,
                    'logged_in': true,
                    'user_id': decoded.user_id,
                    'timezone': decoded.timezone,
                    'account_id': decoded.account_id
                }, app.get('superSecret'), {
                    'expiresIn': '1h'
                })

                responseData.success = true;
                responseData.token = newToken;


                resolve(responseData)
            }
            else {
                resolve(body)
            }

        })
    });
    console.log("loggedin12344");
    const reloginPromiseresult = await reloginPromise;
    console.log("loggedin 3445");
    console.log(reloginPromiseresult);
    return reloginPromiseresult;

}

const loginwithcred = async () => {
    const resetPasswordPromise = new Promise<any>((resolve, reject) => {
        const creds = process.env.KAZOO_CREDENTIAL_HASH;
        const account_name = process.env.KAZOO_ACCOUNT_NAME;
        const responseData: any = {
            success: false
        };

        const putData = {
            data: {
                credentials: creds,
                account_name
            },
            verb: "PUT"
        };
        const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
            body: JSON.stringify(putData)
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
            }
            if (response && response.statusCode === 201) {
                // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);


                body = JSON.parse(body);
                //  console.log(body);
                //  console.log(body.auth_token);
                var savepasswordresult;//= await savenewpassword(req,body.auth_token,accountId,userid,payload)

                resolve(body.auth_token);

            } else {
                console.log("loggedin fail");
                resolve(responseData);
            }
        });
    });

    const result = await resetPasswordPromise;
    return result;

}

const loginsavenewpassword = async (req, accountId, userid, password) => {
    const resetPasswordPromise = new Promise<any>((resolve, reject) => {
        const creds = process.env.KAZOO_CREDENTIAL_HASH;
        const account_name = process.env.KAZOO_ACCOUNT_NAME;


        const responseData: any = {
            success: false
        };

        const putData = {
            data: {
                credentials: creds,
                account_name
            },
            verb: "PUT"
        };
        const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
            body: JSON.stringify(putData)
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
            }
            if (response && response.statusCode === 201) {
                // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
                console.log("loggedin");
                body = JSON.parse(body);

                const payload = {
                    data: {
                        //  username: this.$store.state.changepwd.data.username,
                        password: password,
                    }
                }
                var savepasswordresult = await savenewpassword(req, body.auth_token, accountId, userid, payload)
                resolve(savepasswordresult);

            } else {
                console.log("loggedin fail");
                resolve(responseData);
            }
        });
    });

    const result = await resetPasswordPromise;
    return result;

}
const creteKazooStorage = async (req, accountId) => {
    const apiKey = await loginwithcred();
    const storage_payload = { "data": {} };
    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .put({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage?validate_settings=false`,
                body: JSON.stringify(storage_payload)
            },
                (err, response, body) => {

                    if (err) {
                        console.log("\n\n\nbody storage error \n", err);
                        resolve(err);
                        return;
                    }
                    console.log("\n\n\nbody storage account \n", body);
                    resolve(body);
                });



    });

    const result = await storagePromise;
    return result;

}
const getKazooAccountEmailNotification = async (accountId) => {
    // console.log("getKazooAccountEmailNotification")
    const apiKey = await loginwithcred();
    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(null, apiKey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/notifications/voicemail_to_email`, (err, response, body) => {

                if (err) {
                    console.log("\n\n\nbody notifications voicemail_to_email error \n", err);
                    resolve(err);
                    return;
                }
                //  console.log("\n\n\nbody storage account \n",JSON.parse( body).data.from);
                resolve(body);
            });
    });
    return await storagePromise;
}

const setKazooAccountEmailNotification = async (req, accountId) => {
    const apiKey = await loginwithcred();
    const payload = {
        "data": {
            "id": "voicemail_to_email",
            "to": {
                "type": "original"
            },

            "from": process.env.SMTP_MAIL_SERVER_FROM,
            "subject": "voicemail from {{account.name}} - {{voicemail.vmbox_name}} ",
            "enabled": true,
            "template_charset": "utf-8"
        }
    };
    const promise_email_notification = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .post({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/notifications/voicemail_to_email`,
                body: JSON.stringify(payload)
            },
                (err, response, body) => {

                    if (err) {
                        console.log("\n\n\nbody promise_email_notification error \n", err);
                        resolve(err);
                        return;
                    }
                    console.log("\n\n\nbody promise_email_notification  \n", body);
                    resolve(body);
                });



    });

    const result = await promise_email_notification;
    return result;

}
const deletekazoostorage = async (req, accountId) => {
    const apiKey = await loginwithcred();

    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .del(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`, (err, response, body) => {

                if (err) {
                    console.log("\n\n\delete storage error \n", err);
                    resolve(err);
                    return;
                }
                console.log("\n\n\Deleted storage \n", body);
                resolve(body);
            });



    });

}
const creteKazooStorageAttachments = async (req, accountId) => {
    const apiKey = await loginwithcred();
    const property = await getpropertyInfo(accountId);
    const uid = uuid().replace(/\-/g, "");

    console.log(accountId);
    const storage_payload: any = {
        "data": {
            "attachments": {

            },

            "plan": {
                "modb": {
                    "types": {
                        "mailbox_message": {
                            "attachments": {
                                "handler": `${uid}`,
                                "settings": {
                                    "field_list": [
                                        { "arg": "account_id" }
                                        , { "arg": "id" }
                                        , { "arg": "attachment" }
                                    ]

                                }
                            }
                        }
                    }
                }
            }
        }
    };
    storage_payload.data.attachments[uid] = {
        "handler": "s3",
        "name": "kazoos3",
        "settings": {
            "bucket": process.env.AWS_STORAGE_BUCKET,
            "key": "AKIA6II6HXJIOYE2AAUF",
            "secret": "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"
        }
    }
    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .put({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`,
                body: storage_payload,
                json: true

            },
                (err, response, body) => {

                    if (err) {
                        console.log("\n\n\nbody storage error \n", err);
                        resolve(err);
                        return;
                    }
                    console.log("\n\n\nbody storage account \n", body);
                    resolve(body);
                });



    });

    const result = await storagePromise;
    return result;

}
const getKazooStorageInfo = async (req, accountId) => {
    const apiKey = await loginwithcred();

    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`, (err, response, body) => {

                if (err) {
                    console.log("\n\n\nbody storage error \n", err);
                    resolve(err);
                    return;
                }
                console.log("\n\n\nbody storage account \n", body);
                resolve(body);
            });



    });

    const result = await storagePromise;
    return result;

}
const savenewpassword = async (req, auth_token, accountId, userid, payload) => {
    const resetPasswordPromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, auth_token)
            .patch({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users/${userid}`,
                body: payload,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                        resolve(JSON.stringify(e));
                        return;
                    }
                    else {
                        console.log("save passs success");
                        console.log(b);
                        resolve("Success");

                    }
                });

    });

    const result = await resetPasswordPromise;
    return result;

}


const checkuserincompanyaccount = async (req, _accountid, username, apiKey) => {
    var userdocs: any = await getAccountuser(req, _accountid, apiKey);
    const users = userdocs.data;
    const userfound = users.find(u => u.username === username);
    return userfound;
}
const checkuserinaccounts = async (req, _accountid, username, apiKey) => {
    console.log("checkuserinaccounts user");

    const companyuser = await checkuserincompanyaccount(req, _accountid, username, apiKey);
    if (companyuser) return companyuser;

    //check user in child account

    var accountchildren: any = await getAccountChildren(req, _accountid, apiKey);
    var user;
    if (accountchildren.data) {
        const children = accountchildren.data;
        children.every(async (child) => {
            console.log("accountid");
            console.log(child.id);
            console.log(child.name);

            var userdocs: any = await getAccountuser(req, child.id, apiKey)
            const users = userdocs.data;
            const userfound = users.find(u => u.username === username);
            if (userfound) {
                user = child;
                user.account_id = child.id;
                user.account_name = child.name;
            }
            return true;
        });
    }
    return user;

}
const getAccountChildren = async (req, _accountid, apiKey) => {
    console.log("getAccountChildren");
    const accountChildrenPromise = new Promise((resolve, reject) => {
        getKazooRequest(req, apiKey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${_accountid}/children`, (err, response, body) => {

                if (err) {
                    console.log("\n\n\nbody acconut \n", err);
                    resolve(err);
                    return;
                }
                console.log("\n\n\nbody acconut \n", body);
                resolve(JSON.parse(body));
            });


    });

    const result = await accountChildrenPromise;
    return result;
}


const getAccountuser = async (req, _accountid, apiKey) => {
    console.log("getAccountuser");
    const accountusersPromise = new Promise((resolve, reject) => {
        getKazooRequest(req, apiKey)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${_accountid}/users`, (err, response, body) => {

                if (err) {
                    console.log("\n\n\nbody users \n", err);
                    resolve(err);
                    return;
                }
                // console.log("\n\n\nbody users \n", body);
                resolve(JSON.parse(body));
            });


    });

    const result = await accountusersPromise;
    return result;
}

const createUserInKazoo = async (req, accountid, payload, apiKey) => {
    console.log("createUserInKazoo");
    payload.data.priv_level = "user";
    console.log(payload);
    const accountusersPromise = new Promise((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .put({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountid}/users`,
                body: payload,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log("\nkazoo error");

                        console.log(JSON.stringify(e));
                        resolve(JSON.stringify(e));
                        return;
                    }
                    else {
                        let _usr = (r as any).body.data;
                        if (_usr.email) {
                            console.log("\nuser creation started \n", _usr);
                            _usr.kazooid = _usr.id;

                            resolve(_usr);
                        }
                        else {
                            resolve(_usr);
                        }
                    }
                })
    });

    var result = await accountusersPromise;
    return result;

}
const getUserInfoFromKazoo = async (req) => {
    console.log(req['decoded'].account_id)
    console.log(req['decoded'].account_id)

    const kazoouserinfoPromise = new Promise(async (resolve, reject) => {
        const kRequest = getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}`, (err, response, body) => {
                resolve(JSON.parse(body).data);
            });
    });
    return await kazoouserinfoPromise;
}

//free switch 

const free_switch_login = async () => {
    console.log("free_switch_login");
    const freeswitchlogin = new Promise<any>((resolve, reject) => {
        const responseData: any = {
            success: false
        };
        const loginData =
        {
            "username": process.env.FREE_SWITCH_SERVER_USER_NAME,
            "password": process.env.FREE_SWITCH_SERVER_USER_PASSWORD
        }
        const kRequest = Request.post(`${process.env.FREE_SWITCH_SERVER}/login`, {
            body: loginData,
            json: true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
            }
            console.log("response.statusCode ", response.statusCode);
            if (response && response.statusCode === 200) {

                console.log("loggedin ", body.data.token);
                resolve(body);

            } else {
                console.log("loggedin fail  ", response.body);
                resolve(responseData);
            }
        });
    });

    const result = await freeswitchlogin;
    return result;

}

const free_switch_create_device = async (apikey, didnumber, password, realm, callflowdeviceusernamesuffix) => {
    console.log("freeswitchcreatedevice ,");

    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {


        const responseData: any = {
            success: false
        };
        var username = didnumber + callflowdeviceusernamesuffix;
        const postData =
        {

            "gateway_name": username,
            "username": username,
            "password": password,
            "realm": realm,
            "from-domain": realm,
            "register": "1",
            "register-proxy": process.env.PROXY,
            "proxy": process.env.PROXY,
            "ping": "25",
            "is_messagebox": "1",
            "is_outbound": "1"
        }


        console.log(postData);
        //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
        //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/device/create`, {
            body: postData,
            json: true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitchcreatedevice fail  ");
                console.error(err);
            }


            if (response && response.statusCode === 200) {

                console.log("freeswitchcreatedevice sucess");



                resolve(body);

            } else {
                console.log("freeswitchcreatedevice fail  ", response.body);
                resolve(body);
            }
        });
    });

    const result = await freeswitchcreatedevice;
    return result;

}
//Update free switch device password
const free_switch_update_device_password = async (apikey, deviceid, password) => {
    console.log("free_switch_update_device_password ,", deviceid);

    const freeswitchupdatedevice = new Promise<any>((resolve, reject) => {


        const responseData: any = {
            success: false
        };
        // var username= didnumber + callflowdeviceusernamesuffix;
        const updatepassword =
        {

            "_id": deviceid,
            "password": password
        }
        const kRequest = getFreeSwitchRequest(apikey).put(`${process.env.FREE_SWITCH_SERVER}/v1/device/update`, {
            body: updatepassword,
            json: true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitchupdatedevice fail  ");
                console.error(err);
            }

            if (response && response.statusCode === 200) {

                console.log("freeswitchupdatedevice sucess", response.body);
                resolve(body);

            } else {
                console.log("freeswitchupdatedevice fail  ", response.body);
                resolve(body);
            }
        });



        //         resolve(body);

        //      } else {
        //         console.log("freeswitchupdatedevice fail  " , response.body);
        //         resolve(body);
        //  }
        // });
    });

    const result = await freeswitchupdatedevice;
    return result;

}

const free_switch_create_property_device = async (apikey, payload) => {
    console.log("free_switch_create_property_device");
    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {


        const responseData: any = {
            success: false
        };

        const postData =
        {
            "propertyId": payload.propertyId,
            "gateway_name": payload.username,
            "username": payload.username,
            "password": payload.password,
            "realm": payload.realm,
            "from-domain": payload.realm,
            "register": "1",
            "register-proxy": process.env.PROXY,
            "proxy": process.env.PROXY,
            "ping": "25"
        }
        console.log("postData for property device", postData);
        //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
        //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/property/device/create`, {
            body: postData,
            json: true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitch property device fail  ");
                console.error(err);
            }
            if (response && response.statusCode === 200) {

                console.log("freeswitch property device sucess");
                resolve(response);

            } else {
                console.log("freeswitch property device fail  ", response.body);
                resolve(responseData);
            }
        });
    });

    const result = await freeswitchcreatedevice;
    return result;

}

const free_switch_create_voicemessagebox = async (apikey, payload) => {
    console.log("free_switch_create_voicemessagebox");
    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {


        const responseData: any = {
            success: false
        };

        const postData =
        {
            "propertyId": payload.propertyId,
            "number": payload.number,
            "DID": payload.didnumber,
            "password": "1234",
            "status": "1"
        }
        console.log("postData postData", postData);
        //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
        //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/voicemessagebox/create`, {
            body: postData,
            json: true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitch voicemessagebox fail  ");
                console.error(err);
            }
            if (response && response.statusCode === 200) {

                console.log("freeswitch voicemessagebox sucess");
                resolve(response);

            } else {
                console.log("freeswitch voicemessagebox fail  ", response.body);
                resolve(responseData);
            }
        });
    });

    const result = await freeswitchcreatedevice;
    return result;

}


//elastic search
const getelasticsearchreportdata= async(guid)=>
{

    let body = {
        size: 20,
        from: 0,
        query: {
        "match":{
            "guid":guid//"1b305a84-693b-42c2-bf64-798dc8db8ecb411132"
        }
        }
    };
    var elasticsearchreportdocs= await search('reportdocs', body);
    console.log(elasticsearchreportdocs);
    var reportdoc
    if(elasticsearchreportdocs.lenghth>0)
    {
        reportdoc= elasticsearchreportdocs[0];
    }
    return reportdoc;
}
const getNotifyCallLog= async (accountDb,callinfo)=>
{
    //tbd
    var reportdata=await getelasticsearchreportdatabyguid (callinfo.muid);
    if (!reportdata)
         reportdata= await getreportdatadocument(accountDb,callinfo);
    if (reportdata) {
        const contactsSelector = {
            "selector": {
                "pvt_type": "callinfolog",
                "when": "notify",
                "type": {
                    "$in": [
                        "ruleexecution",
                        "ring"
                        ]
                },
            "notifytimestamp": {
                "$gt": reportdata.callendtime
                }
            },
            "use_index":"notify_callLog",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,

        }
        console.log("getNotifyCallLog");
        console.log(JSON.stringify(contactsSelector));
                    
        reportdata=await getalldocumentsbyproperty(accountDb,contactsSelector); 
    }
    return reportdata;
}
const insertreportdatatoelastic= async (accountDb,callinfo,)=>
{
     var reportdata= getReportDocumentFromTemp(callinfo.guid)
     if (!reportdata)
         reportdata= await getreportdatadocument(accountDb,callinfo);
     if (!reportdata)
        reportdata=callinfo;
    
    removeReportDocumentFromTemp(callinfo.guid);
    const promise1 = new Promise(async (resolve, reject) => 
    {
        reportdata.lastcalllogtype=callinfo.type;
        if (reportdata && reportdata._id)
        {
            
            delete reportdata._id;
            delete reportdata._rev;
        }
        else
        {
            debugMessage(log4jslogger ,`Coudn't find report for guid ${callinfo.guid}`);
   
        }
        var url=  `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_doc`;
        const options = {
            method: 'POST',
            url: url,
            headers:
            {
            // 'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                },
            body:reportdata
            ,
            json: true };
            Request(options, async  (error, response, body)=> {
                if (error) {  
                    console.log(' elastic insert error ');
                    console.log(error +'//'+ 'error');
                    resolve( error);
                }
                else
                {
                    console.log('elastic insert sucess')
                    console.log(JSON.stringify(body) +' // '+ 'succuss');
                   
                    resolve( body);
                }
            });
    })


    return await promise1;
}

const getelasticsearchdata = async (payload,fields=[], incudesort=false) => {
    let from, size;
    let defaultSorting = { "incidentdate": { "order": "desc" } };
    let page = isNaN(payload.page) ? 0 : payload.page;
    let searchFields = ["propertyname", "type", "respondent", "respondent_lastname", "resolutionon", "industry", "propertytype", "propertyphone", "didnumber", "from", "fromd", "resolutiontype"];
    if (page == 0) {
        from = 0;
        size = 9999;
    } else {
        size = 50;
        from = ((parseInt(page) - 1) * size);
    }
    const query_string = `${payload.querystring} `;
    console.log("payload.redirect")
    console.log(payload.redirect)
    const query =payload.redirect? {
        "bool": {
            "must": [
               
                {
                    "match": {
                    "removefromreport":false
                  }
                },
                {
                    "match": {
                    "guid.keyword":payload.redirectguid
                  }
                }
                
            ]
        }

    } 
    
    :
    {
        "bool": {
            "must": [
                {
                    "query_string": {
                        "type": "phrase",
                        "fields": searchFields,
                        "query": query_string
                    }
                },
                {
                    "range": {
                        "incidentdate": {
                            "gte": payload.starttime,
                            "lte": payload.endtime,
                            "boost": 2.0
                        }
                    }
                },
                {
                    "match": {
                    "removefromreport":false
                  }
                }
                
            ]
        }

    };
  
    const body:any=    {    
        "_source":fields,
         "sort":[],
         "query":query,
         "timeout": "120s",
         from: from,
         size: size
      
     } ;
console.log('ELASTIC_SEARCH_SERVER----',process.env.ELASTIC_SEARCH_SERVER);
    const options = {
        method: 'POST',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_search`,
        headers:
        {
            'Content-Type': 'application/json',
        },
        body:body,
        json: true
    };
    if (payload) {
        if (Boolean(payload.sorting)) {
            console.log(payload.sorting);
           
            if (payload.sorting.workordercreated && payload.sorting.workordercreated.order=== 'asc')
            {
                payload.sorting.workordercreated.missing = "_first";
            }
                
            options.body.sort.push(payload.sorting);
        } else {
            options.body.sort.push(defaultSorting);
        }
    }

    if (payload && payload.search_after)
    {
        
        options.body.search_after=payload.search_after;
    }

    
    const resultpromise = new Promise(async (resolve, reject) => {
        Request(options, function (error, response, body) {
            if (error) {
                console.log(error + '//' + 'error');
                resolve(error);
            }
            else {

                
                let source = body.hits && body.hits.hits ? body.hits.hits.map(a => a._source) : [];
                let sort = body.hits && body.hits.hits ? body.hits.hits.map(a => a.sort) : [];
               let result ={source:source,sort:sort}
                resolve(result)

            }
        });
    })
    const result:any = await resultpromise;
    return incudesort ?result: result.source;
    
}

const getelasticsearchdata2 = async (payload, fields = []) => {
    let from, size;
    let defaultSorting = { "incidentdate": { "order": "desc" } };
    let page = isNaN(payload.page) ? 0 : payload.page;
    let searchFields = ["propertyname", "type", "respondent", "respondent_lastname", "resolutionon", "industry", "propertytype", "propertyphone", "didnumber", "from", "fromd", "resolutiontype"];
    if (page == 0) {
        from = 0;
        size = 9999;
    } else {
        size = 50;
        from = ((parseInt(page) - 1) * size);
    }
    const query_string = `${payload.querystring} `;
    const query = {
        "bool": {
            "must": [
                {
                    "query_string": {
                        "type": "phrase",
                        "query": query_string
                    }
                },
                {
                    "range": {
                        "incidentdate": {
                            "gte": payload.starttime,
                            "lte": payload.endtime,
                            "boost": 2.0
                        }
                    }
                },
                {
                    "match": {
                        "removefromreport":false
                      }
                }
            ]
        }
    }
    const aggs = {
        "propertyid": {
            "terms": {
                "field": "propertyid.keyword",
                "size":2147483647
            },
            "aggs": {
                "times": {
                    "filter": {
                        "match": {
                            "type": "Emergency"
                        }
                    },
                    "aggs": {
                        "averages": {
                            "filter": {
                                "exists": {
                                    "field": "respondentat"
                                }
                            },
                            "aggs": {
                                "average_emrt": {
                                    "avg": {
                                        // Here If average response time is more than 24 hours then we are setting it to exact 24 hours 
                                        "script": {
                                            "lang": "painless",
                                            "source": "doc['notifyresponsetime'].value > 86400 ? 86400 : doc['notifyresponsetime']"
                                        }
                                    }
                                }
                            }
                        }

                    }
                },
                "types": {
                    "terms": {
		        "script": "doc['type.keyword'].value.trim()",
                        "field": "type.keyword"
                    }
                },
                // "propertyname": {
                //     "terms": {
                //         "field": "propertyname.keyword"
                //     }
                // }
            }
        }
    }
    console.log(payload.starttime, payload.endtime)

    const body = {
        "_source": fields,
        "sort": [],
        "query": query,
        // "from": from,
        // size: size,
        "from": 0,
        "size": 0,
        "aggs": aggs
    };
    const options = {
        method: 'POST',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_search`,
        headers:
        {
            'Content-Type': 'application/json',
        },
        body: body,
        json: true
    };
    if (payload) {
        if (Boolean(payload.sorting)) {
            console.log(payload.sorting);
            options.body.sort.push(payload.sorting);
        } else {
            options.body.sort.push(defaultSorting);
        }
    }
    const resultpromise = new Promise(async (resolve, reject) => {
        Request(options, function (error, response, body) {
            if (error) {
                console.log(error + '//' + 'error');
                resolve(error);
            }
            else {
                // console.log("body", JSON.stringify(body, null, 4));

                // let result = body.hits && body.hits.hits ? body.hits.hits.map(a => a._source) : [];
                let result = body.aggregations.propertyid.buckets;

                resolve(result)

            }
        });
    })
    const result = await resultpromise;
    // console.log("result", JSON.stringify(result, null, 4));
    return result;

}


const updateEmailSent=async(reportdoc)=>
{ 
   // const reportdoc = await await getelasticsearchreportdatabyguid (guid);
    console.log("\n\n\n\n\n\n updateEmailSent \n\n\n\n ")
     sendEscalationEmails(reportdoc)
    return reportdoc;
}
const getelasticsearchreportdatabymessageid= async(messageid,emailsent)=>
{
    
console.log("elasticsearchreportdocselasticsearchreportdocselasticsearchreportdocselasticsearchreportdocs")
    const query:any =  {
        "bool": {
            "must": [
               
                { "match": {  "messageid.keyword": messageid } },
                { "match": {  "pvt_type": "reportdata" } }
                
            ]
        }
    }
    if (emailsent!=undefined)
        query.bool.must.push({ "match": {  "emailsent": false } })
    console.log("query")
    console.log(JSON.stringify(query))
    var elasticsearchreportdocs:any= await getReportdataFromElasticSearch(query);
    let reportdoc;
    if (elasticsearchreportdocs && elasticsearchreportdocs.length > 0) {
        reportdoc = elasticsearchreportdocs[0];
    }
    return reportdoc;
    
    
}
const getemailsendingdataforelasticsearch=async(query, sort=[], size=1000)=>
{

   //rd
    const options = {
        method: 'GET',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/hsemailkey/_search?version=true`,
        headers:
        { 
            'Content-Type': 'application/json',
        },
        body:
        {      
            "size":size,
            "sort":sort,
            "query":query,
            
           
         
        } ,
        json: true
    };

    console.log(JSON.stringify( {      
        "size":size,
        "sort":sort,
        "query":query,
       }))
    const resultpromise=  new Promise (async(resolve, reject)=>{
        Request(options, function (error, response, body) {
            if (error) {  
                console.log(error +'//'+ 'error');
                resolve(error);
            }
            else
            {
               
                //res.send(body);
             //   console.log(JSON.stringify(body))
                let result = body.hits && body.hits.hits? body.hits.hits.map(a => a._source):[];
               // console.log(JSON.stringify(result) +' // '+ 'succuss');
                resolve(result)
              //  resolve(body.hits.hits)

            }
        });
    })
    const result= await resultpromise;
    return result;
}

const getReportdataFromElasticSearch=async(query, sort=[], size=1000)=>
{

   //rd
    const options = {
        method: 'GET',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/_search?version=true`,
        headers:
        { 
            'Content-Type': 'application/json',
        },
        body:
        {      
            "size":size,
            "sort":sort,
            "query":query,
            
           
         
        } ,
        json: true
    };

    console.log(JSON.stringify( {      
        "size":size,
        "sort":sort,
        "query":query,
       }))
    const resultpromise=  new Promise (async(resolve, reject)=>{
        Request(options, function (error, response, body) {
            if (error) {  
                console.log(error +'//'+ 'error');
                resolve(error);
            }
            else
            {
               
                //res.send(body);
             //   console.log(JSON.stringify(body))
                let result = body.hits && body.hits.hits? body.hits.hits.map(a => a._source):[];
               // console.log(JSON.stringify(result) +' // '+ 'succuss');
                resolve(result)
              //  resolve(body.hits.hits)

            }
        });
    })
    const result= await resultpromise;
    return result;
}

//function end

app.get('/properties/:compnyid', validateJWT, (req, res) => {

    var id = req.params.compnyid;
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    //getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/descendants?paginate=false`, (err, response, body) => {

    getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${id}/descendants?paginate=false`, (e, r, b1) => {
        if (e) {
            res.send(e);
        }


        const b = JSON.parse(r.body);
        const data = b.data;

        res.send(data);
    });

});

app.get('/addedproperties/:companyid', validateJWT,async (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    console.log('mster users  ', parseAccountToDatabaseName(req['decoded'].account_id));
    const companyid = req.params.companyid;
    const contactsSelector = {
        'selector': {
            'pvt_type': 'property'

        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
    var result={
        docs:docs
    };
    res.statusCode = 200;
    res.send(result);
})



app.post('/addcompany', validateJWT, async (req, res) => {
    const payload = JSON.parse(req.body.payload);

    const _accountid = parseAccountToDatabaseName(req['decoded'].account_id);

    const result = await insertcompany(payload, req);
    console.log('result' + result);
    res.send("sucess");


});


app.put('/companies/:id', validateJWT, async (req, res) => {
    var payload = JSON.parse(req.body.payload);
    const _accountid = parseAccountToDatabaseName(req['decoded'].account_id);
    const accountDb = nano.use(_accountid);
    const result = updatecompany(payload, _accountid);
    console.log('result' + result);
    res.send("sucess");
});

app.get('/companies/:id', validateJWT, async (req, res) => {
    const companyid = req.params.id;
    console.log('comanyid ' + companyid);
    console.log("get company info ")

    var company: any = await getcompanyInfo(companyid);
    // console.log (company.error);
    if (!company || company.error) {
        //console.log (company.error);
        const account: any = await getkazooaccountinfo(req, companyid);
        console.log(account.data.timezone)
        company = {
            industrytype: '',
            company_phone: '9694787894',
            timezone: account.data.timezone
        }
    }
    console.log(JSON.stringify(company));
    res.send(company);


});

const orderSchema = z.object({

    guid: z.string(),
    company: z.string(),
    site: z.string(),

    issueid: z.string(),
    issuelocationid: z.string(),
    locationtypeid: z.string(),

    buildingid: z.number().optional(),
    unitid: z.number().optional(),
    unit_id: z.number().optional(),
    commonareaid: z.string().optional(),

    preferredtimerangeid: z.string().optional(),
    priorityid: z.string().optional(),
    requestdatetime: z.string().optional(),
    completebydatetime: z.string().optional(),
    contactname: z.string().optional(),
    contactphone: z.string().optional(),
    contactemail: z.string().optional(),
    permissiontoenter: z.enum(["0", "1"]),
    preferreddate: z.string().optional(),
    entrynotes: z.string().optional(),
    servicecomments: z.string().optional(),
})

let orderUpdateSchemma = z.object({
    orderStatus: z.enum(['1', '2', '4']),
});

function safeJsonParse(body){
    try{
        return JSON.parse(body);
    }catch(e){
        console.log(e)
    }
}
  
app.patch('/property/:propertyid/orders/:guid', async (req, res) => {
    const propertyid = req.params.propertyid;
    const guid = req.params.guid;

    const body = safeJsonParse(req.body.payload)

    let parsed = orderUpdateSchemma.safeParse(body);
    if (parsed.success === false) {
        return res.status(400).json({ status: 400, errors: parsed.error.issues });
    }

    const dbname = parseAccountToDatabaseName(propertyid);
    const accountDb = newNano.use(dbname);
    const results = await accountDb.find({
        selector: { pvt_type: 'workorder', guid },
    });

    if (results.docs.length < 1) {
        return res.status(404).json({ status: 404, message: 'Order not found' });
    }
    const orderDocument = results.docs[0];
   // console.log(' orderDocument.orderStatus-------------------', orderDocument);
    // @ts-ignore
    orderDocument.orderStatus = parsed.data.orderStatus;
   // console.log(' parsed.data.orderStatus-------------------', parsed.data.orderStatus);
    // @ts-ignore
    const orderId = orderDocument.order_id;
    
    updateWork_Order_status_InReport(guid, parsed.data.orderStatus);
    Request.post({
        url: `${process.env.REALPAGE_API_URL}/orders/${orderId}/status`,
        headers: { authorization: `Bearer ${process.env.REALPAGE_API_TOKEN}` },
        json: true,
        body: { status: parsed.data.orderStatus }
    }, async (err, response, body) => {
        if (err) {
            console.error("Error while calling update order status api : ", err);
        } else{
            await accountDb.insert(orderDocument)
        }
        console.log("Response while calling order status API ",response.statusCode,body);
    });
    return res.status(200).send('Success');
});

app.get('/property/:propertyid/orders/:guid', async (req, res) => {
    const propertyid = req.params.propertyid;
    const guid = req.params.guid;
    const dbname = parseAccountToDatabaseName(propertyid);
    const accountDb = newNano.use(dbname);
    const results = await accountDb.find({ selector: { pvt_type: "workorder", guid } });

    if (results.docs.length < 1) {
        return res.status(404).json({ status: 404, message: "Order not found" });
    }
    const orderDocument = results.docs[0];
    delete orderDocument._rev;

    return res.json({ status: 200, data: orderDocument })

});
// app.get('/property/:propertyid/work_order_list', async (req, res) => {
//     const propertyid = req.params.propertyid;
//     const guid = req.params.guid;
//     const dbname = parseAccountToDatabaseName(propertyid);
//     const accountDb = newNano.use(dbname);
//     const results = await accountDb.find({ selector: { pvt_type: "workorder" } });

//     if (results.docs.length < 1) {
//         return res.status(404).json({ status: 404, message: "work Orders list not found" });
//     }
//     console.log('results.docs+++++++++++++++++',results.docs);
//     const orderDocument = results.docs[0];
//     delete orderDocument._rev;

//     return res.json({ status: 200, data: orderDocument })

// });
/**
 * This api Creates Work Order in RealPage side using API provided by Josh.
 */
app.post('/property/:propertyid/orders', validateJWT, async (req, res) => {

    const saveworkorder=JSON.parse(req.body.payload);
    const payload = JSON.parse(req.body.payload);
    const orderData = orderSchema.safeParse(payload);
    if (orderData.success === false) {
        console.log(orderData)
        return res.status(400).json({ status: 400, errors: orderData.error.issues });
    }
    const propertyid = req.params.propertyid;
    const guid= payload.guid;
    delete payload.propertyid;
    delete payload.guid;
    delete payload.time;
    delete payload.date;
    delete payload.item;
    delete payload.category;
    delete payload.issuename;
    delete payload.issuelocationname;
    delete payload.commonareaname;

    if ( orderData.data.unit_id && orderData.data.unitid){

        // Swap unit id with unit number , unitid is unitnumber and unit_id is actual unitid
        let swap = orderData.data.unit_id;
        orderData.data.unit_id = orderData.data.unitid;
        orderData.data.unitid= swap;
        delete orderData.data.unit_id;
    }

    Request.post({
        url: `${process.env.REALPAGE_API_URL}/orders`,
        headers: { authorization: `Bearer ${process.env.REALPAGE_API_TOKEN}` },
        json: true,
        body: orderData.data
    }, async (err, response, body) => {
        if (err) {
            console.error("Error while calling create order api : ", err);
        }
        if (body && body.order_id) {
            saveworkorder.order_id = body.order_id;
        }
        saveworkorder.orderStatus = "1";
        updateWorkOrderInReport(guid)
        const dbname = parseAccountToDatabaseName(propertyid);

        const result = await save_work_order(saveworkorder, dbname);

        console.log('save_work_order', result);
        res.send("success");
    });

});

const save_work_order = async (new_order, dbname) => {
    new_order.pvt_type = "workorder";
    const accountDb = nano.use(dbname);

    delete new_order._id;
    delete new_order._rev;

    new_order.create_time = moment.utc().unix();
    new_order.update_time = moment.utc().unix();

    console.log(JSON.stringify(new_order));
    return await insertObjectToDB(dbname, new_order)

}

//Save oncall list user based on property
app.post('/property/:propertyid/save_oncall_list', validateJWT, async (req, res) => {
    //console.log('save_oncall_list++++++++++++++++', req);
    const payload = JSON.parse(req.body.payload);
    console.log(payload);
    const propertyid = req.params.propertyid;

    const dbname = parseAccountToDatabaseName(propertyid);

    const result = await save_oncall_list(payload, dbname);
    console.log('save_oncall_list' + result);
    res.send("success");


});

app.post('/property/:propertyid/update_property_reset_info', validateJWT, async (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const id = payload.propertyid;
    const companyid = payload.companyid;
    console.log("\n\ncompanyid : ", companyid);
    console.log("\n\n id", id);
    const reset_time = payload.reset_time;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
    const property = await getpropertyInfo(id, accountDb);
    var status: any = '';
    var message = '';
    if (property && property._id) {
        property.reset = false;
        property.reset_time = reset_time;
        console.log(property);
        await updatePropertyObj(accountDb, property).then(data => {
            status = 200;
            message = 'success';
        }).catch(err => {
            status = 403;
            message = 'error';
        });
    }

    const propertyInfo = await getpropertyInfo(id);
    const accountDbName = parseAccountToDatabaseName(payload.propertyid);
    const accountDbProperty = nano.use(accountDbName);
    var status: any = '';
    var message = '';
    if (propertyInfo && propertyInfo._id) {
        propertyInfo.reset = false;
        propertyInfo.reset_time = reset_time;
        await updatePropertyObj(accountDbProperty, propertyInfo).then(data => {
            status = 200;
            message = 'success';
        }).catch(err => {
            status = 500;
            message = 'error';
        });
    }


    //res.status(status).send({ message: message});
    res.status(status).send({ status: status, message: message });



});


app.get('/getnotifycompanies/:accountid', validateJWT,async (req, res) => {
    const accountid = req.params.accountid;
    const _accountdbname = parseAccountToDatabaseName(accountid);
    // const _accountdbname=parseAccountToDatabaseName(_accountid);


    console.log("\n  accountname ", _accountdbname);
    const accountDb = nano.use(_accountdbname);
    //check here
    const contactsSelector = {
        'selector': {
            "pvt_type": "company",
            "enabled": true
        },
        limit: 30000 ,
        "use_index":"pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }

    res.statusCode = 200;
       var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
       var result={
           docs:docs
       };
       result.docs.sort((a, b) => {
                 
         return a.companyname.toLowerCase() > b.companyname.toLowerCase()  ? 1 : -1;
     });
      //  console.log("company resulet ",result);
        res.send(result);
})
app.get('/getnotifyproperties/:id', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req.params.id}/children`, (err, response, body) => {
            console.log('\n\n\n body ', body);
            var companydata = JSON.parse(body).data;

            res.send(companydata);
        });
})


app.get('/industries', (req, res) => {
    // const accountId = (req['decoded'] as DecodedJWT).account_id;
    const industries = {
        data: [
            {
                type: 'Multifamily',
                subtypes: [
                    'Affordable',
                    'Conventional',
                    'Senior'
                ]
            },
            {
                type: 'Service Contractor',
                subtypes: [
                    'HVAC',
                    'Plumbing',
                    'Electric'
                ]
            }
        ]
    };

    res.send(industries);
});


//notify user managment


app.post('/resendactivation/:name/user/:email', async (req, res) => {
    const payload = {
        data:
        {
            primarykazooaccount: {
                name: req.params.name
            },
            username: req.params.email,
            first_name: req.body.payload.data.first_name,
            last_name: req.body.payload.data.last_name,
            password: req.body.payload.data.password,
            masteruser_name: req.body.payload.data.masteruser_name
        }
    };
    const accountId = req.body.payload.data.companyid;
    const userid = req.body.payload.data.userid;
    const password = payload.data.password;
    await loginsavenewpassword(req, accountId, userid, password);
    sendemail(payload);
    res.send("Email sent");
});
app.post('/customScheduleEmail', async (req, res) => {
    sendCustomscheduleemail(req.body.payload);
    res.send("Email sent");
});
app.post('/update_resetview/:name/user/:email', async (req, res) => {
    const payload = {
        data:
        {
            primarykazooaccount: {
                name: req.params.name
            },
            username: req.params.email
        }
    };
   // let is_edit = req.body.payload.data.is_edit;
    const id = req.body.payload.data.resetViewPropertyId;
  
    const uid = req.body.payload.data.userid;
    const contactsSelector = {
        'selector': {
            "kazooid": uid,
            "pvt_type": "user"
        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    };
    
    var propertyid = req.body.payload.data.resetViewPropertyId;
    const property = await getpropertyInfo(propertyid);
    const company = await getcompanyInfo(property.companyid);
    const accountDbName = parseAccountToDatabaseName(company.companyid);
    const accountDb = nano.use(accountDbName);
    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
    
   
    if(_userobj.resetview && _userobj.resetview.length > 0){
  
       
         _userobj.resetview.forEach(r => {
                if(r.propertyid==propertyid){
                    r.reset=false;
                }
            });
    }
    //_userobj.administrator = true;
   // console.log('accountDbName--------------',accountDbName);
    await insertUser(_userobj, accountDbName);
    res.send("Email sent");
});

app.post('/resetview/user/:email', async (req, res) => {
    
    const payload = {
        data:
        {
            primarykazooaccount: {
                id: req.body.payload.data.resetViewPropertyId
            },
            username: req.params.email
        }
    };
    let is_edit = req.body.payload.data.is_edit;
    const companyid = req.body.payload.data.companyid;
    const id = req.body.payload.data.resetViewPropertyId;
    if (is_edit) {
        //update reset true in edit case
        const accountDb = nano.use(parseAccountToDatabaseName(companyid));
        const property = await getpropertyInfo(id, accountDb);
        var status: any = '';
        var message = '';
        if (property && property._id) {
            property.reset = true;
            delete property.schedule_daytime;
            console.log(property);
            await updatePropertyObj(accountDb, property).then(data => {
                status = 200;
                message = 'success';
            }).catch(err => {
                status = 403;
                message = 'error';
            });
        }
    }
    const uid = req.body.payload.data.userid;
    const contactsSelector = {
        'selector': {
            "kazooid": uid,
            "pvt_type": "user"
        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    };

    var propertyid = req.body.payload.data.companyid;
    const property = await getpropertyInfo(propertyid);
    const accountDbName = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
   
    if(req.params.email!="Reset but don’t send email"){
        var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
        let resetviewobj = {
            'propertyid' : '',
            'reset' : ''
        };
        let reset_view = [];
        resetviewobj.propertyid = req.body.payload.data.resetViewPropertyId;
        resetviewobj.reset = req.body.payload.data.resetView;
        if(_userobj.resetview && _userobj.resetview.length > 0){
            let resetObject = _userobj.resetview.find((resetObj) => { return resetObj.propertyid == resetviewobj.propertyid });
            console.log('resetObject----------',resetObject);
            _userobj.resetview.forEach(r => {
                    if(r.propertyid==resetviewobj.propertyid){
                        r.reset=true;
                    }
                });
    
        } else {
            reset_view.push(resetviewobj);
            _userobj.resetview = reset_view;
        }
  
    await insertUser(_userobj, accountDbName);
    await sendResetViewMail(payload);
    console.log('Both property and user reset');
    }
    
//}
    const propertyDbName = parseAccountToDatabaseName(id);
    await removeall_adjust_schedules(propertyDbName);
    await removeall_oncall_list(propertyDbName);
    await removeall_dayschedule_list(propertyDbName);
    await removeall_escalation_list(propertyDbName);
    if(req.params.email=="Reset but don’t send email")
    {
        res.send("Reset but don’t send email");
    }else{
        res.send("Email sent"); 
    }

});
const removeall_escalation_list=async(propertyDbName)=>
{
    var escalation_list = await escalationlist(propertyDbName);
   
}

const escalationlist = async(propertyDbName)=>
{    
    var dbname=propertyDbName;
    const accountDb = nano.use(dbname);    
    const contactsSelector = {
        "selector": {
            "pvt_type": "escalationuserlist"
        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

      var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
      if(docs.length>0){
      docs[0].data=[];
      const result = await insertescalationuserlist(docs[0], dbname);
      }
      return docs;
}

app.get('/forgotpassword/company/:name/user/:email', async (req, res) => {

    var accountname = req.params.name;
    var username = req.params.email;
    userSelector.selector.username = username;
    var result: any = {};
    var account: any;
    var user;
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "accountinfo",
            "name": accountname
        },

         "use_index":"pvt_type_name",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:1 
    }
    const globaldb = nano.use("globaldb");
    var accountinfo = await getdocumentbyproperty(globaldb, contactsSelector);

    if (accountinfo && accountinfo.accountid) {
        account = await getcompanyInfo(accountinfo.accountid);
        if (!account)
            account = await getpropertyInfo(accountinfo.accountid);
        const companydbname = parseAccountToDatabaseName(account.companyid);
        const companydb = nano.use(companydbname);
        user = await getdocumentbyproperty(companydb, userSelector);

    }

    if (account && account.companyid && user && user.id) {
        const primarykazooaccount = user.primarykazooaccount;
        const useraccountname = primarykazooaccount ? primarykazooaccount.name : user.accountname;
        const useraccountid = primarykazooaccount ? primarykazooaccount.id : account.companyid;

        const payload = {
            data:
            {
                accountname: useraccountname,
                accountid: useraccountid,
                email: username,
                userid: user.id,
                first_name: user.first_name
            }
        }

        if (payload.data.accountname != accountname) {
            // console.log('error+++++++++++++++++++++++++++');
            res.send("Error");
        } else {
            // console.log('same');
            resetpasswordemail(payload);
            res.send("Email sent");
        }
    }
    else {
        res.send("Error");
    }

});

//create users update  colorindex  settings
app.put('/company/:comapnyid/property/:propertyid/user/:userid/:colorindex', validateJWT, async (req, res) => {
    const companyid = req.params.comapnyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid = req.params.userid;
    const propertyid = req.params.propertyid;
    const colorindex = req.params.colorindex;
    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "id": userid
        },
        "use_index": "pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);

    if (_userobj && _userobj._id) {
        if (_userobj.msteruser)
            _userobj.colorindex = colorindex;
        else if (_userobj.propertylist) {
            var userproperty = _userobj.propertylist.find(up => up.id === propertyid);
            if (userproperty)
                userproperty.colorindex = parseInt(colorindex);

        }
        var notifyupdateresult = await updatenotifyusercolorindex(accountDbName, _userobj);
        res.send(_userobj);
    }
    else {
        res.send("error");
    }
});




//create users savepassword
app.get('/savepassword/company/:companyid/:accountname/user/:userid/password/:password', async (req, res) => {

    const accountId = req.params.companyid;
    const userid = req.params.userid;
    const password = req.params.password;
    await loginsavenewpassword(req, accountId, userid, password);

    res.send("sucess");


});

//create users changePassword
app.put('/changePassword', validateJWT, async (req, res) => {
    //console.log("here is the user object 11111111111");
    var payload = req.body.payload;
    const _id = req['decoded'].user_id;
    var accountId = req['decoded'].account_id;
    const accountname = payload.data.accountname;
    const creds = payload.creds;
    delete payload.data.accountname;
    delete payload.creds;
    payload.data.passwordreset = true;
    console.log("relogin payload ", payload);
    // console.log("id " + _id);
    const kRequest = getKazooRequest(req)
        .patch({
            url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users/${_id}`,
            body: payload,
            json: true
        },
            async (e, r, b) => {
                if (e) {
                    debugMessage(log4jslogger, JSON.stringify(e));

                    //console.log(e);
                    res.send(JSON.stringify(e));
                    return;
                }
                else {
                    const contactsSelector = {
                        'selector': {
                            "pvt_type": "user",
                            "kazooid": _id
                        },
                        "use_index": "pvt_type",
                        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                        limit: 30000
                    }
                    const property = await getpropertyInfo(accountId);
                    if (property) {
                        accountId = property.companyid;
                    }

                    const accountDbname = parseAccountToDatabaseName(accountId);
                    const accountDb = nano.use(accountDbname);
                    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
                    if(_userobj){
                    _userobj.passwordreset = true;
                    var result = await insertUser(_userobj, accountDbname);
                    const reloginresult = await relogin(req, accountname, creds);
                    reloginresult.userObj = _userobj;
                    res.send(reloginresult);
                    }else{
                        res.send('Error');
                    }
                }
            });

});

// create users  change role
app.post('/changeRole', validateJWT, async (req, res) => {

    const payload = JSON.parse(req.body.payload);
    const companyid = payload.companyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "id": payload.userid
        },
        "use_index": "pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
    // var insertingpropertylist= _userobj.propertylist;
    const user_type = payload.user_type.toLowerCase();
    if (user_type != "master") {
        if (_userobj.propertylist) {
            var insertingpropertylist = _userobj.propertylist;
            _userobj.user_type = payload.user_type.toLowerCase();
            _userobj.msteruser = false;
            var propertysetting = insertingpropertylist.find(ip => ip.id === payload.propertyid);
            if (propertysetting === undefined) {
                propertysetting = payload.propertylist;
                _userobj.propertylist = [];
                _userobj.propertylist = propertysetting;
            }
            propertysetting.user_type = payload.user_type;


        } else {
            _userobj.user_type = payload.user_type;
            _userobj.msteruser = false;
            _userobj.propertylist = payload.propertylist;
        }


    }
    else {
        _userobj.propertylist = [];
        _userobj.user_type = payload.user_type;
        _userobj.msteruser = true;
    }

    const result = await insertUser(_userobj, accountDbName);
    res.send(result);


});
// users delete permanently
app.delete('/companies/:companyid/property/:propertyid/users/:userid/permanentdel/:permanentdel', validateJWT, async (req, res) => {

    const companyid = req.params.companyid;
    const userid = req.params.userid;
    const propertyid = req.params.propertyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    //check this
    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "id": userid
        },
        limit: 30000,
        "use_index":"pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
    delete _userobj.notify_enabled;
    //console.log('_userobj-------------------------',_userobj);
    _userobj.pvt_type = "deleteduser";
    var apiKey = await loginwithcred();
    var user = await deleteUserInKazoo(null, apiKey, _userobj.kazooid, _userobj.primarykazooaccount.id);
    removeemails(companyid,_userobj);
    // 

    const result = await insertUser(_userobj, accountDbName);
    res.send(result);


});

const removeesclationemails =async (companyid,_userobj,propertid=undefined)=>
{
   console.log("removeesclationemails");
    var  emaillistsettings = _userobj.emailsettings && _userobj.emailsettings.settings ?
        _userobj.emailsettings.settings : [];
   
    if (emaillistsettings.length > 0 ) {
       
        for (var settingindex=0;settingindex <emaillistsettings.length;settingindex++)
        {

            if (propertid){
                var emailescalationlist=emaillistsettings[settingindex].data;
               ;
                emailescalationlist= emailescalationlist.filter(f=>f.propertyid!=propertid);

                emaillistsettings[settingindex].data=emailescalationlist;
            }
            else
            {
                emaillistsettings[settingindex].data=[];
            }
           
        }
    }
   
   
  
  
}
const removeemails=async (companyid,_userobj,propertid=undefined)=>
{
    var  properties: any = await getproperties(companyid);
    properties= properties.docs;
    if (propertid)
        properties= properties.filter (p=>p.propertyid===propertid);
    properties.forEach(property => {
        const emaillistsettings = _userobj.emailsettings && _userobj.emailsettings.settings ?
            _userobj.emailsettings.settings : [];
        if (emaillistsettings.length > 0) {
            const emaillis = emaillistsettings;//.map(r=>r.email);
            removeemailsFromList(property, emaillis)
        }
    });
}
const deleteUserInKazoo = async (req, apiKey, userid, acccountid) => {
    //console.log("deleteUserInKazoo");
    const deleteuser = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
            .del({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${acccountid}/users/${userid}`,
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                        resolve(JSON.stringify(e));
                        return;
                    }
                    else {
                        console.log("delete success");
                        console.log(b);
                        resolve("Delete Success");

                    }
                });

    });


    var result = await deleteuser;
    return result;

}
// create users delete
app.delete('/companies/:companyid/property/:propertyid/users/:userid/:removeall', validateJWT, async (req, res) => {

    const companyid = req.params.companyid;
    const userid = req.params.userid;
    const removeall = req.params.removeall;
    const propertyid = req.params.propertyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
  
    //check this
    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "id": userid
        },
        limit: 30000,
        "use_index":"pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
    var insertingpropertylist = _userobj.propertylist;
    const user_type = _userobj.user_type.toLowerCase();
    if (user_type != "master") {

        if (removeall != "true") {
            var propertysetting = insertingpropertylist.find(ip => ip.id === propertyid);
            propertysetting.enabled = false;
            removeemails(companyid,_userobj,propertyid);
            removeesclationemails(companyid,_userobj,propertyid);
        }
        else { 
            insertingpropertylist.forEach(ip => {
                ip.enabled = false;
            });
            removeemails(companyid,_userobj);
            removeesclationemails(companyid,_userobj);
        }
        insertingpropertylist = insertingpropertylist.filter(ip => ip.enabled);
        _userobj.notify_enabled = insertingpropertylist.length > 0;
    }
    else {
        _userobj.notify_enabled = false;
        removeemails(companyid,_userobj);
        removeesclationemails(companyid,_userobj);
    }
       
    
    const result = await insertUser(_userobj, accountDbName);
       res.send(result);


});


//create user update 
app.put('/companies/:companyid/masterusers/:userid', validateJWT, (req, res) => {

    const companyid = req.params.companyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid = req.params.userid;
    const payload: any = req.body.payload;
    accountDb.get(userid, (err, _userobj) => {
        if (err) {
            console.log("\n deleting user error:", err);
            res.send(err);
        }
        else {
            _userobj.email = payload.email;
            _userobj.first_name = payload.first_name;
            _userobj.last_name = payload.last_name;
            _userobj.title = payload.title;

            accountDb.insert(_userobj, function (err, result) {
                if (err) {
                    try {
                        res.statusCode = result.statusCode;
                        res.send(err);
                    } catch (e) {
                        console.error(`Couldn't access the db in /contacts`);
                        res.send(err);
                    }
                } else {
                    const payload1: any = {
                        data: {
                            email: payload.email,
                            first_name: payload.first_name,
                            _last_name: payload.last_name,
                            title: payload.title,
                        }
                    };

                    const kRequest = getKazooRequest(req)
                        .patch({
                            url: `${process.env.KAZOO_SERVER}/v2/accounts/${companyid}/users/${_userobj.id}`,
                            body: payload1,
                            json: true
                        },
                            (e, r, b) => {
                                if (e) {
                                    console.log(e);
                                    res.send(JSON.stringify(e));
                                    return;
                                }
                                else {
                                    console.log("\n kazoo updated successfull");
                                    res.send(payload);

                                }
                            }
                        );

                }
            });
        }
    });


});
//create users


//create users create property users
app.post('/companies/:companyid/properties/:propertyid/users', validateJWT, async (req, res) => {

    const companyid = req.params.companyid;
    const propertyid = req.params.propertyid;
    //

    let payload = JSON.parse(req.body.payload);
    console.log('payload in creating user', payload);
    //check this
    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "username": payload.data.email
        },
        "use_index":"pvt_type_username",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }

    const isProperyReset = payload.data.is_property_reset;
    var primarykazooaccount: any = payload.data.primarykazooaccount
    const kazooacccountid = primarykazooaccount ? primarykazooaccount.id : companyid;
    const accountinfo: any = await getkazooaccountinfo(req, kazooacccountid);
    const kazooacccountname = accountinfo.data.name;
    primarykazooaccount = {
        id: kazooacccountid,
        name: kazooacccountname
    }
    payload.data.primarykazooaccount = primarykazooaccount;
    //sendemail(payload);
    const accountDbname = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbname);
    var user = await getdocumentbyproperty(accountDb, contactsSelector);
    let pinuser: any = '';
    if (payload.data.pin != undefined && payload.data.pin != '' && isProperyReset != undefined && isProperyReset) {
        pinuser = await checkpin(payload.data.pin, companyid);
        console.log('pin data', pinuser);
    }
    console.log('pin user', pinuser);
    if (!user && (isProperyReset == undefined || ((pinuser == '' || pinuser == undefined) && isProperyReset != undefined && isProperyReset))) {
        console.log('creating user');
        if(!payload.data.emailsettings.settings){
            payload.data.emailsettings = { settings: [] };
            payload.data.emailsettings.settings.push({ email: payload.data.email });
        }
        var apiKey = await loginwithcred();
        user = await checkuserinaccounts(req, kazooacccountid, payload.data.email, apiKey);
        if (!user) {
            user = await checkuserinaccounts(req, companyid, payload.data.email, apiKey);
        }
        if (!user) {
            user = await createUserInKazoo(req, kazooacccountid, payload, apiKey);
            if (user.email) {
                payload.data.kazooid = user.kazooid;
                payload.data.id = user.kazooid;
            }
            else {
                payload.data.error = "Error occured while creating kazoo user"
            }
        }
        else {
            payload.data.kazooid = user.id;
            payload.data.id = user.id;
            payload.data.hellospokeadmin = true;

        }
        if (payload.data.kazooid) {
            console.log("\nisnserting master users  ", accountDbname);


            var insertingpropertylist = payload.data.propertylist;
            const user_type = payload.data.user_type.toLowerCase();
            if (user_type != "master") {
                insertingpropertylist.forEach(ip => {
                    ip.user_type = payload.data.user_type;
                });
            }
            const result = insertUser(payload.data, accountDbname);
            if (!payload.data.hellospokeadmin) {
                if (payload.data.administrator == true) {
                    sendemail(payload);
                } else {
                    sendemail_later(payload);
                }
            }
            console.log('administrator+++++++++++++', payload);
            if (payload.data.administrator == true) {
                //  sendResetViewMail(payload);
                const accountDb = nano.use(parseAccountToDatabaseName(companyid));
                const property = await getpropertyInfo(propertyid, accountDb);
                //var status:any= '';
                //var message = '';
                if (property && property._id) {
                    property.reset = true;
                    console.log(property);
                    await updatePropertyObj(accountDb, property).then(data => {
                        //status =200;
                        //message = 'success';
                    }).catch(err => {
                        //status =403;
                        //message = 'error';
                    });
                }
            }
        }
    }
    else {
        console.log('here1');
        if (isProperyReset == undefined || ((pinuser == '' || pinuser == undefined) && isProperyReset != undefined && isProperyReset)) {
            var propertylist = user.propertylist;
            var insertingpropertylist = payload.data.propertylist;
            var allpropertiesavailable = true;
            const user_type = payload.data.user_type.toLowerCase();
            if (user_type != "master") {
                insertingpropertylist.forEach(ip => {
                if(propertylist){
                    const property = propertylist.find(p => p.id === ip.id);
                    if (!property) {
                        user.propertylist=[];
                       // allpropertiesavailable = false;
                        user.propertylist.push({
                            "id": ip.id,
                            "enabled": true,
                            "name": ip.name,
                            "user_type": payload.data.user_type
                        });

                    }
                }else{
                  //  allpropertiesavailable = false;
                    user.propertylist=[];
                        user.propertylist.push({
                            "id": ip.id,
                            "enabled": true,
                            "name": ip.name,
                            "user_type": payload.data.user_type
                        });
                }

                });
            }

            if (allpropertiesavailable){
                payload.data.error = "user already exist";
            }else {

                const user_type = payload.data.user_type.toLowerCase();

                if (user_type != "master") {
                    user.user_type = payload.data.user_type;
                }
                const result = await insertUser(user, accountDbname);
                payload.data = user;

            }
        }
    }


    if (pinuser) {
        payload.data.pin_error = 'duplicate pin';
    }
    res.send(payload.data);

})
//create users update settings
app.put('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT, async (req, res) => {
    const companyid = req.params.comapnyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid = req.params.userid;
    const payload = req.body.payload;
    console.log("payload");
    console.log(payload);
    //check this
    var contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "id": userid
        },
        "use_index":"pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var _userobj:any = await getdocumentbyproperty(accountDb, contactsSelector);
    if (!_userobj) {
         contactsSelector = {
            'selector': {
                "pvt_type": "hsadminuser",
                "id": userid
            },
            "use_index":"pvt_type_id",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit: 30000
        }
        _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
        console.log('_userobj here checking',_userobj);
        if (!_userobj)
        {
            var _userobj:any = {};
            _userobj.id=userid;
            _userobj.pvt_type="hsadminuser";
            _userobj.notify_enabled=true;

        }
    }
    
    if (_userobj && _userobj.id) { console.log('userobje',_userobj);
        _userobj.scheduleemailreport = payload;
        updateScheduleReport(accountDbName, _userobj);
        //console.log("userfound", _userobj);
    }
   
    res.send("sucess");

});



app.put('/company/:comapnyid/user/:userid/scheduleactivityreport', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid = req.params.comapnyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    console.log(accountDbName);
    const accountDb = nano.use(accountDbName);

    const userid = req.params.userid;
    const payload = req.body.payload;
    payload.userid = userid;
    payload.enabled = true;
    const result = await insertcallactivityreportinfo(payload, accountDbName);
    res.send("sucess");

});

app.put('/company/:comapnyid/user/:userid/scheduleactivityreport/:id', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid = req.params.comapnyid;
    const id = req.params.id;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    //check this
    const contactsSelector = {
        'selector': {

            "_id": id
        },
        limit: 30000 ,
        "use_index":"_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var _scheduledoc: any = await getdocumentbyproperty(accountDb, contactsSelector);
    _scheduledoc.enabled = false;


    const result = await insertcallactivityreportinfo(_scheduledoc, accountDbName);
    res.send("sucess");

});
app.get('/company/:comapnyid/user/:userid/scheduleactivityreport', validateJWT, async (req, res) => {
    console.log("new");
    const companyid = req.params.comapnyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid = req.params.userid;
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "callactivityreport",
            "userid": userid,
            "enabled": true
        },
        "use_index":"pvt_type_userid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 30000
    };


    var result = await getalldocumentsbyproperty(accountDb, contactsSelector);
    //    console.log(result);
    res.send(result);

});

app.get('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid = req.params.comapnyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid = req.params.userid;


    const contactsSelector = {
        'selector': {
            "pvt_type": {"$in": ["user", "hsadminuser"]},
            "id": userid
        },
        "use_index": "pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var _userobj: any = await getdocumentbyproperty(accountDb, contactsSelector);

    if (!_userobj) {
        _userobj = { "scheduleemailreport": {} }
    }
    res.send(_userobj.scheduleemailreport);

});

let getAllCompaniesSchema = z.object({
     reportType: z.enum(["weekly","monthly"]),
     token: z.string(),
     dryRun: z.boolean().default(true)
});

app.post('/email-reports/get-all-companies', async (req, res) => {
    let conn: amqplib.Connection;
    let channel : amqplib.Channel;
    try {
        console.log("GetAllCompanies Request");
        let request = getAllCompaniesSchema.safeParse(req.body);
        if (request.success == false) {
            return res.status(400).json({
                errors: request.error.flatten()
            });
        };

        if ( request.data.token !== process.env.WEEKLY_REPORT_API_KEY){
            console.log("Token for GetAllCompanies is not valid");
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        conn = await amqplib.connect(process.env.RABBITMQ_URI);
        channel = await conn.createChannel();
        let queue = "WeeklyReport.GetAllCompanies";
        await channel.assertQueue(queue);

        let message = "";
        if (request.data.dryRun == false) {
            let queueMessage = {
                reportType: request.data.reportType
            }
            const channelSentResponse = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(queueMessage)))
            message = `Message Sent To Queue ${channelSentResponse}`
        } else {
            message = "Message will not be sent to queue because it is on dryRun mode";
        }
        console.log(message)
        await channel.close();
        await conn.close();
        return res.status(200).json({
            status: 200,
            message,
        })


    } catch (e) {
        await channel.close().catch((e)=>{console.error("Error while closing channel in catch")});
        await conn.close().catch((e)=>{console.error("Error while closing connection in catch")})
        console.error(e, "Error in emailReports.GetAllCompanies");
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const getCompanySummaryDataSchema = z.object({
    reportType: z.enum(["weekly","monthly"]),
    companyId: z.string(),
    token: z.string(),
    dryRun: z.boolean().default(true),
})

app.post('/email-reports/get-company-summary-data', async (req, res) => {
    let conn: amqplib.Connection;
    let channel: amqplib.Channel;
    try {
        console.log("GetCompanySummaryData Request");
        let request = getCompanySummaryDataSchema.safeParse(req.body);
        if (request.success == false) {
            return res.status(400).json({
                errors: request.error.flatten()
            });
        };

        if (request.data.token !== process.env.WEEKLY_REPORT_API_KEY) {
            console.log("Token for GetAllCompanies is not valid");
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        let db = newNano.use('globaldb');
        let response = await db.find({
            selector: {
                type: 'company',
                pvt_type: 'accountinfo',
                accountid: request.data.companyId,
            },
            limit: 1000000,
        });
        if (response.docs.length < 1){
            return res.status(400).json({
                message: "companyId is not valid"
            })
        }
        conn = await amqplib.connect(process.env.RABBITMQ_URI);
        channel = await conn.createChannel();
        let queue = "WeeklyReport.GetCompanySummaryData";
        await channel.assertQueue(queue);

        let message;
        let transactionId = uuid();
        if (request.data.dryRun == false) {
            let queueMessage = {
                reportType: request.data.reportType,
                companyId: request.data.companyId,
                transactionId
            }
            const channelSentResponse = await channel.sendToQueue(queue, Buffer.from(JSON.stringify(queueMessage)))
            message = `Message Sent To Queue ${channelSentResponse}`
        } else {
            message = "Message will not be sent to queue because it is on dryRun mode";
        }
        console.log(message)
        await channel.close();
        await conn.close();
        return res.status(200).json({
            status: 200,
            message,
            transactionId
        })


    } catch (e) {
        await channel.close().catch((e) => { console.error("Error while closing channel in catch") });
        await conn.close().catch((e) => { console.error("Error while closing connection in catch") })
        console.error(e, "Error in emailReports.GetAllCompanies");
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/unsubscribe/weeklyReport", async (req, res) => {
    const secret: string =
        process.env.EMAIL_SIGNING_KEY || "fa5258066816effd8ba0b9ad8346619";
    const companyId: any = req.query.companyid;
    const uid: any = req.query.userid;
    const email: any = req.query.email;
    const hash = crypto
        .createHmac("sha256", secret)
        .update(companyId + uid + email + "weekly")
        .digest("hex");
    if (hash == req.query.hash) {
        const id: any = req.query.companyid;
        const property = await findPropertydocument(id);
        const accountDbName = parseAccountToDatabaseName(companyId);
        const accountDb = nano.use(accountDbName);
        console.log(accountDbName, "accountDbName");
        const contactsSelector = {
            selector: {
                _id: uid,
                pvt_type: "user",
                // email: "karangauswami.dev@gmail.com"
            },
            use_index: "pvt_type_id",
            execution_stats:
                process.env.EXECUTION_STATS === "true" ? true : false,
            limit: 30000,
        };
        const user = await getdocumentbyproperty(accountDb, contactsSelector);
        // console.log(_userobj,"userobj")
        if (user && user._id) {
            let mailObj = user.emailsettings.settings.find(data => data.email == email);
            if(mailObj.scheduleEmailReports){
                mailObj.scheduleEmailReports.weeklyReport = false;
            }
            else{
                mailObj.scheduleEmailReports = { weeklyReport: false }
            }
            let response = await insertObjectToDB(accountDbName, user);
            res.send('You have been successfully unsubscribed from the Weekly Notify Report.');
        }
    } else {
        res.send("Invalid URL");
    }
});

app.get("/unsubscribe/monthlyReport", async (req, res) => {
    const secret: string =
        process.env.EMAIL_SIGNING_KEY || "fa5258066816effd8ba0b9ad8346619";
    const companyId: any = req.query.companyid;
    const uid: any = req.query.userid;
    const email: any = req.query.email;
    const hash: any = crypto
        .createHmac("sha256", secret)
        .update(companyId + uid + email + "monthly")
        .digest("hex");
    if (hash == req.query.hash) {
        const id: any = req.query.companyid;
        const property = await findPropertydocument(id);
        const accountDbName = parseAccountToDatabaseName(companyId);
        const accountDb = nano.use(accountDbName);
        console.log(accountDbName, "accountDbName");
        const contactsSelector = {
            selector: {
                _id: uid,
                pvt_type: "user",
            },
            use_index: "pvt_type_id",
            execution_stats:
                process.env.EXECUTION_STATS === "true" ? true : false,
            limit: 30000,
        };
        const user = await getdocumentbyproperty(accountDb, contactsSelector);
        // console.log(_userobj,"userobj")
        if (user && user._id) {
            let mailObj = user.emailsettings.settings.find(data => data.email == email);
            if(mailObj.scheduleEmailReports){
                mailObj.scheduleEmailReports.monthlyReport = false;
            }
            else{
                mailObj.scheduleEmailReports = { monthlyReport: false }
            }
            const response = await insertObjectToDB(accountDbName, user);
            res.send('You have been successfully unsubscribed from the Monthly Notify Report.');
        }
    } else {
        res.send("Invalid URL");
    }
});

app.put('/updatenotifyusersettings/:id/:userid', validateJWT, async (req, res) => {


    const id = req.params.id;
    var property = await findPropertydocument(id);

    var companyid = property && property.companyid ? property.companyid : id;
    const accountDbName = parseAccountToDatabaseName(companyid);

    const accountDb = nano.use(accountDbName);
    const uid = req.params.userid;
    const payload = JSON.parse(req.body.payload);

    console.log("\n  userid :- ", uid);
    var pinuser = await checkpin(payload.pin, companyid);

    if (pinuser && pinuser.kazooid != uid) {
        console.log("duplicate pin");
        var error = {
            error: "duplicate pin"
        }
        res.send(error);
    }
    else {
        const contactsSelector = {
            'selector': {
                "pvt_type": "user",
                "kazooid": uid

            },
                "use_index":"kazooid_index",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit: 30000
        }

        var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);

        if (_userobj && _userobj._id) {
            var kazooupdateresult = await updatekazoousersettings(payload, req, id, uid);

            console.log("start notify user setting", kazooupdateresult);
            var notifyupdateresult = await updatenotifyusersettings(accountDbName, _userobj, payload,  property);

            serverlog("info", `${req['decoded'].user_id} created  updated settings for (${_userobj.email})`, "create schedule");

            res.send(_userobj);
        }
    }


});


//create users update  email  settings
app.put('/updatenotifyuseremailsettings/:comapnyid/:userid', validateJWT, async (req, res) => {


    const companyid = req.params.comapnyid;
    const accountDbName = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid = req.params.userid;
    const payload = JSON.parse(req.body.payload);
    var emaildatalist = payload.emaildatalist ? payload.emaildatalist : [];
    for (var i = 0; i < emaildatalist.length; i++) {
        var emaildata = emaildatalist[i];
        // console.log("emaillist");
        // console.log(JSON.stringify());
        var callflowoptiontype = emaildata.callflowdata.callflowoptiontype;
        if (callflowoptiontype && callflowoptiontype.toLowerCase() === "fwd message") {
            //update voicemail box 
            const apiKey = await loginwithcred();
            // await updatefwdmessagevoicemaileemailsettings(apiKey, emaildata);
            await insertescalationemaillist(emaildata, emaildata.callflowdata.callflowoption, userid)
        }
        else if ((callflowoptiontype && callflowoptiontype.toLowerCase() === "escalation")) {
            await insertescalationemaillist(emaildata, emaildata.callflowdata.callflowoption, userid)
        }
    }

    //console.log(payload.callflowdata);

    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "kazooid": userid
        },
                "use_index":"kazooid_index",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                
        limit: 30000
    }

    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);

    if (_userobj && _userobj._id) {
        //        var kazooupdateresult= await updatekazoouseremailsettings(payload,req,companyid,userid);

                var notifyupdateresult = await updatenotifyuseremailsettings(accountDbName,_userobj,payload);
        res.send(_userobj);
    }



});
//create user get
app.get('/presenceid/:username', validateJWT, async (req, res) => {

    var accountId = req['decoded'].account_id;
    const userid = req['decoded'].user_id;
    console.log(accountId)
    const property = await getpropertyInfo(accountId);
    if (property) {
        accountId = property.companyid;
    }

    console.log(accountId)
    const username = req.params.username
    const contactsSelector = {
        'selector': {
            "pvt_type": "user",
            "username": username
        },
            "use_index":"pvt_type_username",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    const accountDbname = parseAccountToDatabaseName(accountId);
    const accountDb = nano.use(accountDbname);
    var user = await getdocumentbyproperty(accountDb, contactsSelector);
    if (!user) {
        user = await getUserInfoFromKazoo(req);
    }
    console.log("user");
    console.log(user);
    res.send(user);


});
// users get image
app.get('/getNotifyimage/:id/:userid', validateJWT, async (req, res) => {
    const uid = req.params.userid;
    const contactsSelector = {
        'selector': {
            "kazooid": uid,
            "pvt_type": "user"
        },
        limit: 30000,
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };

    var propertyid = req.params.id;
    var property = await findPropertydocument(propertyid);
    var comapnyid = property && property.companyid ? property.companyid : propertyid;
    var accountDb = nano.use(parseAccountToDatabaseName(comapnyid));

    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
    var result: any = { data: {} };
    if (_userobj) {
        var userdata = _userobj;
        //    console.log('\n\n\n body ', JSON.stringify(userdata));
        result = {
            data: {                
                member_image: userdata.member_image ? userdata.member_image : '',               
            }
        }
       

    }
    console.log('\n\n\n result ', JSON.stringify(result));
    res.send(result);

})

//create users get settings
app.get('/getnotifyusersettings/:id/:userid', async (req, res) => {
    const uid = req.params.userid;
    const contactsSelector = {
        'selector': {
            "id": uid,
            "pvt_type": "user"
        },
        "use_index": "pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit":30000 ,
           "fields":["first_name",
           "last_name",
           "title",	
           "timezone",
           "phonesettings",
           "smssettings",
           "emailsettings",
           "pin",
           "id",
           "livereplysetting",
           "notificationrulessetting",
           "handoffrulessettings",
           "smsagreement",
           "escalationsettings",
           "user_imager",
           "member_image",
           "primarykazooaccount",
           "user_type",
           "propertylist",
           "masteruser_name","weeklyReport","monthlyReport"
        ]
    };

    var propertyid = req.params.id;
    var property = await findPropertydocument(propertyid);
    var comapnyid = property && property.companyid ? property.companyid : propertyid;
    var accountDb = nano.use(parseAccountToDatabaseName(comapnyid));

    var _userobj = await getdocumentbyproperty(accountDb, contactsSelector);
    var result: any = { data: {} };
    if (_userobj) {
        var userdata = _userobj;
        //    console.log('\n\n\n body ', JSON.stringify(userdata));
        result = {
            data: {
                fullname: userdata.first_name + '  ' + userdata.last_name,
                title: userdata.title ? userdata.title : '',
                timezone: userdata.timezone ? userdata.timezone : '',
                phonesettings: userdata.phonesettings ? userdata.phonesettings : { settings: [] },
                smssettings: userdata.smssettings ? userdata.smssettings : { settings: [] },
                emailsettings: userdata.emailsettings ? userdata.emailsettings : { settings: [] },
                pin: userdata.pin ? userdata.pin : '',
                id: userdata.id,
                livereplysetting: userdata.livereplysetting ? userdata.livereplysetting : [],
                notificationrulessetting: userdata.notificationrulessetting ? userdata.notificationrulessetting : [],
                handoffrulessettings: userdata.handoffrulessettings ? userdata.handoffrulessettings : [],
                smsagreement: userdata.smsagreement,
                escalationsettings: userdata.escalationsettings,
                user_imager: userdata.user_imager ? userdata.user_imager : '',
                // member_image: userdata.member_image ? userdata.member_image : '',
                primarykazooaccount: userdata.primarykazooaccount ? userdata.primarykazooaccount : [],
                password: userdata.password ? userdata.password : '',
                masteruser_name: userdata.masteruser_name ? userdata.masteruser_name : '',
                primarykazooaccountid: userdata.primarykazooaccount.id ? userdata.primarykazooaccount.id : '',
                user_type: userdata.user_type ? userdata.user_type : '',
                firstName: userdata.first_name,
                lastName: userdata.last_name,
                propertylist: userdata.propertylist ? userdata.propertylist : [],
                weeklyReport: userdata.weeklyReport == false ? false : true,
                monthlyReport: userdata.monthlyReport == false ? false: true,
            }
        }
        

    }
    console.log('\n\n\n result ', JSON.stringify(result));
    res.send(result);

})

const getusers = async(companyid)=>
 {
    
      const accountDb = nano.use(parseAccountToDatabaseName(companyid));

       var contactsSelector = {
          "selector": {
             "pvt_type": "user"              
           }, 
          limit: 5000,
         "use_index":"pvt_type",
          "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
      }
      var result = await getalldocumentsbyproperty(accountDb,contactsSelector);

    return result;
 }

//create users get property users
app.get('/companies/:id/property/:propertyid/users/:page/:limit/:activeuseronly', validateJWT,async (req, res) => {
    const companyid = req.params.id;
    const  propertyid= req.params.propertyid;
    let page = isNaN(+req.params.page)   ? 1: +req.params.page ;
    const activeuseronly=req.params.activeuseronly
    const limit =1000;  //isNaN(req.params.limit) ?  1000:req.params.limit;
    let skip =(page-1)*limit ;
    var docs:any = await getusers(companyid);
    docs = docs.filter(r=>r.notify_enabled===true);  
    docs= docs.filter (f=> f.user_type=== "master" ||( Array.isArray( f.propertylist) && f.propertylist.find(p=>p.id===propertyid &&p.enabled=== true)));
    

    if (activeuseronly != "false") {
       docs= docs.filter (f=>f.notificationrulessetting!=undefined);
    }
    docs=docs.slice(skip, skip+limit);  
    const result= {
        docs:docs
    }
    res.statusCode = 200;
    res.send(JSON.stringify(result));

   
})

//get company users
app.get('/companies/:company_id/users', validateJWT,async (req, res) => {
    const companyid = req.params.company_id;
    var docs:any = await getusers(companyid);
    docs = docs.filter(r=>r.notify_enabled===true  && r.user_type!= "master");
    //docs= docs.filter (f=> f.user_type!= "master" );
    const result= {
        docs:docs
    }
    res.statusCode = 200;
    res.send(JSON.stringify(result));
})
//create user get non property users
app.get('/companies/:id/properties/:propertyid/users/notadded', validateJWT,async (req, res) => {
    const companyid = req.params.id;
    const propertyid = req.params.propertyid;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    //check this
    var docs:any = await getusers(companyid);
    docs= docs.filter (f=> f.notify_enabled===false
     ||(f.user_type!="master" && Array.isArray( f.propertylist)&&  
     (f.propertylist.findIndex(p=>p.id===propertyid && p.enabled=== false )>=0||f.propertylist.findIndex(p=>p.id===propertyid )<0)));

    var result={
        docs:docs
    };
    res.statusCode = 200;
    console.log("Number of users ", result.docs.length);
   res.send(JSON.stringify(result));
})


//create user get non master users
app.get('/companies/:id/masterusers/notadded', validateJWT,async (req, res) => {
    const companyid = req.params.id;

    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    //check this
    const contactsSelector = {

        "selector": {
            "pvt_type": "user",
            "notify_enabled": false,
            "user_type": "master"
        }
        ,
        "use_index":"pvt_type_user_type",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:30000 ,
        "fields": [
            "id",
            "first_name",
            "last_name",
            "user_type",
            "notify_enabled",
            "email",
            "title"
        ]
    };
   var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
    var result={
        docs:docs
    };
    res.send(JSON.stringify(result));
})
//create user get masterusers
app.get('/companies/:id/masterusers', validateJWT,async (req, res) => {
    const companyid = req.params.id;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    //check here
    const contactsSelector = {
        'selector': {
            'user_type': 'master',
            "msteruser": true,
            "notify_enabled": true,
            "pvt_type": "user"
        },
        limit: 30000  ,
         "use_index":"user_master_enable-index",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
    var result={
        docs:docs
    };
    res.statusCode = 200;
    res.send(JSON.stringify(result));
})
//notify user managment end 


app.get('/companies/:companyid/properties/added', validateJWT, async (req, res) => {


    const companyid = req.params.companyid;
    var result = await getproperties(companyid);
    // console.log("\n\n\n properties added\n", result);
    res.statusCode = 200;
    res.send(result);

});

app.get('/companies/:companyid/properties/:property_id/getpropertyinfo', validateJWT, async (req, res) => {


    const companyid = req.params.property_id;
    var result = await getproperties(companyid);
    // console.log("\n\n\n properties added\n", result);
    res.statusCode = 200;
    res.send(result);

});


app.get('/companies/:companyid/callsummery/old', validateJWT, async (req, res) => {
     console.log("callsummery");
    const companyid= req.params.companyid;
    const companydbname= parseAccountToDatabaseName(companyid);
   const company= await getcompanyInfo(companyid);
  var result = await getcallsummerydata(companydbname);

    if (result === undefined) {
        var call_summery_result_data=await calculate_company_callsummery(companyid, company.industry);
        result = {
            data: call_summery_result_data.data
        }
    }


    console.log("result11111");
    console.log(JSON.stringify(result));

    res.send(result);
});

// This is V2 version, If everything works well we should be able to remove old version of this API.
app.get('/companies/:companyid/callsummery/', validateJWT, async (req, res) => {
    console.log("callsummery");
    const companyid = req.params.companyid;
    const companydbname = parseAccountToDatabaseName(companyid);
    const company = await getcompanyInfo(companyid);
    var result = await getcallsummerydata(companydbname);

    if (result === undefined) {
    var call_summery_result_data = await calculate_company_callsummery2(companyid, company.industry);
    result = {
        data: call_summery_result_data
    }
    }


    console.log("result11111");
    console.log(JSON.stringify(result));

    res.send(result);
});

app.post('/updatecallsummery', async (req, res) => {


    //  console.log("updatecallsummery"); 
    const result = await update_call_summery_data();
    res.send(result);
});

app.get('/companies/:companyid/properties_avg',validateJWT,async (req, res) => {
    var emrt_data= await getemrtdata();
    
    const i_companyid=req.params.companyid;
    const comp= await getcompanyInfo(i_companyid);
      var avg_calldetails= {
        property:{
        company:0,
        industry:0,
    }
    };
    if (emrt_data && emrt_data.data){
        var  emergency_companydata=emrt_data.data;

        if (emergency_companydata && Array.isArray( emergency_companydata))
        {
            console.log(emergency_companydata);
            const company_avg_emrt_data= emergency_companydata.find(c=>comp.companyid===c.companyid);
            const company_avg_emrt= company_avg_emrt_data && company_avg_emrt_data.avgemrt ? company_avg_emrt_data.avgemrt:0;
   
            const industry_avg_emrt_list= emergency_companydata.filter(c=>comp.industry===c.industry && c.avgemrt);
  
            const industry_avg_emrt= d3.mean(industry_avg_emrt_list.map (id=> id.avgemrt));
  
            avg_calldetails= {property:{
                company:company_avg_emrt ? company_avg_emrt:0,
                industry:industry_avg_emrt ?industry_avg_emrt:0,
            }
        }
    }
}

    ;
           
      
   
    res.send(avg_calldetails);
});

app.get('/companies/:id/properties', validateJWT, async (req, res) => {
    const comanyid = req.params.id;
    var accountchildrenpromiss = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${comanyid}/children?paginate=false`, async (err, response, body) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }
                var children = JSON.parse(body);
                resolve(children);
            });
    });
    var accountpromiss = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${comanyid}`, async (err, response, body) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }
                var account = JSON.parse(body);
                //  console.log("\n\n\n accounts\n", account);

                resolve(account);
            });
    });

    //  console.log("\n\n\n properties\n", body);
    var propertiespromiss = new Promise(async (resolve, reject) => {
        var pr = await getproperties(comanyid);
        resolve(pr);
    });

    Promise.all([accountchildrenpromiss, accountpromiss, propertiespromiss]).then(values => {
        var properties: any = values[2];
        var accounts: any = values[0];
        accounts.data.push((values[1] as any).data);
        console.log("\n\n\n accounts\n", accounts);
        if (properties.docs) {
            if (accounts.data) {
                accounts.data = accounts.data.filter((e) => {
                    const index = properties.docs.findIndex((e1) => {
                        return (e1 as any).propertyid === e.id;
                    });
                    //    console.log("\nindex ");
                    //console.log("\nindex ",  index)
                    return index < 0;
                });
            }
        }
        res.send(accounts);
    });


    //    body.data=availableproperperiees;

});
//storage apis

app.get('/companies/:id/storage', async (req, res) => {
    console.log("storage");

    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];
        const accountid = parseDatabaseNameToAccount(dbname);
        //if (accountid==="7cf889a72eab5c7a71c1a643e661c748")
        {
            // await deletekazoostorage(req,accountid)
            console.log("Dbname" + dbname);
            const result = await creteKazooStorageAttachments(req, accountid);
        }
    };
    res.sendStatus(200);
});

//To get property details using property id

app.get('/getPropertyInfo/:companyid/:propertyid', async (req, res) => {
    const propertyid= req.params.propertyid;
    const companyid= req.params.companyid;
    var property = await getpropertyInfo(propertyid);
    if (!property)
    {
        const active_properties:any =await getproperties(companyid);
        //console.log(active_properties);
        property=active_properties.docs.find(p=> p.propertyid===propertyid );
        console.log("property");
        console.log(parseAccountToDatabaseName(propertyid));
        if (property)
        {
            delete property._id;
            delete property._rev;
            const  dbname= parseAccountToDatabaseName(propertyid);
            insertObjectToDB (dbname,property);
        }
    }
    res.send({ propertyname: property.propertyname });
});

//create property add users

app.post('/companies/:companyid/properties/:propertyid/addusers', validateJWT, async (req, res) => {

    console.log("addusuers")
    console.log(req.body);
    const payload = req.body.payload;
    console.log(payload.data);
    const propertyid = req.params.propertyid;
    const companyid = req.params.companyid;
    const propertyname = payload.data.propertyname;

    const dbname = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(dbname)

    const userlist = payload.data.userlist;
    const contactsSelector = {
        "selector": {
            "pvt_type": "user",
            "id": {
                "$in": userlist
            }
        },
        "use_index": "pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 30000
    };


    var users = await getalldocumentsbyproperty(accountDb, contactsSelector);
    for (var userindex = 0; userindex < users.length; userindex++) {
        const user = users[userindex];
        if (user.user_type.toLowerCase() === "master") {
            user.msteruser = true;
        }

        var propertylist = user.propertylist ? user.propertylist : [];
        var property = propertylist.find(p => p.id === propertyid);
        if (property) {
            property.enabled = true;
            if (!property.user_type)
                property.user_type = "basic";
        }
        else {
            property =

            {
                "id": propertyid,
                "enabled": true,
                "name": propertyname,
                "user_type": user.user_type
            }

            propertylist.push(property);

        }

        user.notify_enabled = true;

        user.propertylist = propertylist;
        const result = await insertUser(user, dbname);


    };
    console.log("end");
    res.send({
        status: 201,
        message: "sucess"
    })

}
);
//create property add masterusers
app.post('/companies/:companyid/addmasterusers', validateJWT, async (req, res) => {

    const payload = req.body.payload;


    const companyid = req.params.companyid;


    const dbname = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(dbname)


    const contactsSelector = {
        "selector": {
            "pvt_type": "user",
            "id": payload.data.id
        },
        "use_index": "pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 30000
    };


    var user = await getdocumentbyproperty(accountDb, contactsSelector);
    user.first_name = payload.data.first_name;
    user.last_name = payload.data.last_name;
    user.title = payload.data.title;
    user.notify_enabled = true;
    user.msteruser = true;
    user.user_type = "master";
    const result = await insertUser(user, dbname);



    console.log("end");
    res.send({
        status: 201,
        result: result
    })

}
);

//create property

var putDataDevice: any = {
    "data":
    {
        "caller_id": { "external": { "number": 1222 } },
        "sip": {
            "password": "",
            "realm": process.env.KAZOO_REALM,
            "username": ""
        },
        "call_restriction": {
            "tollfree_us": {
                "action": "inherit"
            },
            "toll_us": {
                "action": "inherit"
            },
            "emergency": {
                "action": "inherit"
            },
            "caribbean": {
                "action": "inherit"
            },
            "did_us": {
                "action": "inherit"
            },
            "international": {
                "action": "inherit"
            },
            "unknown": {
                "action": "inherit"
            }
        },
        "device_type": "softphone",
        "enabled": true,
        "media": {
            "encryption": {
                "enforce_security": false,
                "methods": []
            },
            "audio": {
                "codecs": ["PCMU", "PCMA"]
            },
            "video": {
                "codecs": []
            }
        },
        "suppress_unregister_notifications": true,
        "name": "",
        "ignore_completed_elsewhere": false,
        "custom_sip_headers": {
            "in": {
                "X-device-header-in": "565658665"
            },
            "out": {
                "X-device-outbound": "16616161611"
            }
        },
        "ui_metadata": {
            "version": "4.3-66",
            "ui": "monster-ui",
            "origin": "voip"
        }
    }
};


var putDataVM = {
    "data": {
        "require_pin": true,
        "check_if_owner": true,
        "name": "manish",
        "mailbox": "122",
        "is_setup": false,
        "skip_greeting": false,
        "skip_instructions": false,
        "delete_after_notify": false,
        "is_voicemail_ff_rw_enabled": false,
        "oldest_message_first": false,
        "media": {},
        "notify_email_addresses": [],
        "not_configurable": false,
        "ui_metadata": {
            "version": "4.3-66",
            "ui": "monster-ui",
            "origin": "voip"
        }
    }
}

const getdevices = async (req, propertyid): Promise<any> => {
    const devicepromise = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices`, (err, response, body) => {
                //    console.log("device d0d7c961d8c8d23cfe17982ddb9153fd", JSON.parse (body).data);
                resolve(JSON.parse(body).data);
            });
    });
    const devices = await devicepromise;
    return devices;
}

const update_devices_password = async (propertyid, devicesid, password): Promise<any> => {

    var apiKey = null;
    apiKey = await loginwithcred();
    const update_data = {
        "data": {
            "sip": {
                "password": password
            }
        }
    }
    const data = new Promise((resolve, reject) => {
        getKazooRequest(null, apiKey)
            .patch({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices/${devicesid}`,
                body: update_data,
                json: true
            }
                , (err, response, body) => {
                    console.log("\n\n\n\succesully update\n\n\n\n", body);
                });
    });

    // return r;

}
const getvoicemaibox = async (req, propertyid): Promise<any> => {
    const devicepromise = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/vmboxes?paginate=false`, (err, response, body) => {

                resolve(JSON.parse(body).data);
            });
    });
    const devices = await devicepromise;
    return devices;
}

const createDeviceInKazoo = async (req, propertyid, putDataDevice): Promise<any> => {
    const kazoodevicepromise = new Promise((resolve, reject) => {
        console.log("createDeviceInKazoo for ", putDataDevice.data.name);
        let kRequest = getKazooRequest(req)
            .put({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices/`,
                body: putDataDevice,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log("error device for ", putDataDevice);
                        resolve(e);
                    }
                    else {
                        console.log("sucess device for ", b.data);
                        ;

                        resolve(b.data.id);
                    }

                });
    });
    var result = await kazoodevicepromise;
    return result;
}
const setup_free_switch = async function (propertyid, didnumber, propertydeviceusernamesuffix,
    callflowdeviceusernamesuffix, password, realm) {
    const loginresponse = await free_switch_login();
    var apikey = loginresponse.data.token;
    console.log("setup_free_switch didnumber ", didnumber);

    //device creattion
    console.log("free_switch_create_device");
    var freeswitchdevice = await free_switch_create_device(apikey, didnumber, password, realm, callflowdeviceusernamesuffix);


    ///property device creation     
    const freeswitch_property_device_data =
    {
        "propertyId": propertyid,
        "didnumber": didnumber,
        "username": didnumber + propertydeviceusernamesuffix,
        "password": password,
        "realm": realm
    }

    console.log("free_switch_create_property_device");
    await free_switch_create_property_device(apikey, freeswitch_property_device_data);
    const freeswitch_voice_messagebox_payload =
    {
        "propertyId": propertyid,
        "number": didnumber + callflowdeviceusernamesuffix,
        "didnumber": didnumber + propertydeviceusernamesuffix,
        "realm": realm

    }

    console.log("free_switch_create_voicemessagebox ", freeswitch_voice_messagebox_payload);
    await free_switch_create_voicemessagebox(apikey, freeswitch_voice_messagebox_payload);




}

const passwordGenerate = async () => {
    var length = 16,
        charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

//const createpropertydevice =  async () 
const createdevice = async (req, payload: any, accountdevice: any, escalationlist, suffix, realm,randomPassword=undefined): Promise<any> => {

    return new Promise(async (resolve, reject) => {
        // accountdevice
        var devices = [];

        escalationlist.forEach(async (clp) => {
            devices.push(
                new Promise(async (resolve, reject) => {
                    // console.log("clp ", clp );
                    // const didnum=clp.didnumber;
                    //clp.didnumber="4"+didnum;
                    var propertydeviceusernamesuffix = `_${clp.callflowoption}_property`;
                    var callflowdeviceusernamesuffix = `_${clp.callflowoption}_Callflow`

                    clp.propertydeviceusername = clp.didnumber + propertydeviceusernamesuffix;
                    clp.propertydevicecallerid = payload.phone;

                    clp.propertydevicecallerid = clp.didnumber;


                    clp.didnumber = clp.didnumber.replace("+1", "");

                    clp.propertydeviceusername = clp.didnumber + propertydeviceusernamesuffix;
                    clp.callflowdeviceusername = clp.didnumber + callflowdeviceusernamesuffix;

                    var usernamesuffix = suffix == 1 ? callflowdeviceusernamesuffix : propertydeviceusernamesuffix;


                    putDataDevice.data.name = clp.didnumber + usernamesuffix;//suffix ==="1"? clp.didnumber:payload.phone ; 
                    putDataDevice.data.sip.username = clp.didnumber + usernamesuffix;
                   
                    putDataDevice.data.sip.password = randomPassword

                    var device = accountdevice.find(d => d.name === putDataDevice.data.name);
                    console.log(putDataDevice.data.name);
                    if (device) {
                        console.log(" device found ", device);
                        clp["deviceid" + suffix] = device.id;
                        resolve(device.id)
                    }
                    else {
                        //console.log("createDeviceInKazoo 111");


                        putDataDevice.data.caller_id.external.number = suffix === "1" ? clp.didnumber : payload.phone;
                        putDataDevice.data.caller_id.external.name = payload.phone;
                        if (suffix === "1")
                            putDataDevice.data.caller_id.external.name += `_${clp.callflowoption}`;
                        const ext_num = putDataDevice.data.caller_id.external.number;
                        console.log("ext_num ", ext_num);
                        if (ext_num.indexOf("+1") != 0)
                            putDataDevice.data.caller_id.external.number = "+1" + ext_num;
                        putDataDevice.data.sip.realm = realm;
                        clp.password = randomPassword;
                        putDataDevice.data.sip.password = clp.password;
                        const deviceid = await createDeviceInKazoo(req, payload.propertyid, putDataDevice);

                        if (deviceid && suffix != 1) {
                            console.log("calling free switch ");
                            await setup_free_switch(payload.propertyid, clp.didnumber, propertydeviceusernamesuffix,
                                callflowdeviceusernamesuffix, clp.password, realm);
                        }
                        // clp.didnumber=didnum;
                        clp["deviceid" + suffix] = deviceid;
                        resolve(deviceid)
                    }

                }))
        });
        Promise.all(devices).then(results => {
            // console.log(`Finished Kazoo Requests`);
            console.log("\n returning devices");
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    })


}

const createvoicemessage = async (req, payload: any, accountVM: any): Promise<any> => {

    return new Promise(async (resolve, reject) => {
        // accountdevice
        var vmboxes = [];
        let escalationlist = payload.callflowdata.filter(cl => cl.callflowoptiontype.toLowerCase() === "fwd message");
        escalationlist.forEach(clp => {
            vmboxes.push(new Promise((resolve, reject) => {
                //  console.log("creating device for ",clp.callflowoption);
                putDataVM.data.name = `${clp.callflowoption}`;
                putDataVM.data.mailbox = `${clp.callflowoption}`;

                var vm = accountVM ? accountVM.find(d => d.name === putDataVM.data.name) : undefined;

                if (vm) {
                    console.log(" device found ", vm.id);
                    clp.deviceid = vm.id;
                    resolve(vm.id)
                }
                else {
                    let kRequest = getKazooRequest(req)
                        .put({
                            url: `${process.env.KAZOO_SERVER}/v2/accounts/${payload.propertyid}/vmboxes`,
                            body: putDataVM,
                            json: true
                        },
                            (e, r, b) => {
                                if (e) {
                                    console.log("error device for ", clp.username);
                                    resolve(e);
                                }
                                else {
                                    //    console.log("sucess device for ",clp.username);
                                    clp.deviceid = b.data.id;
                                    resolve(b.data.id);
                                }

                            });
                }

            }))
        });
        Promise.all(vmboxes).then(results => {
            // console.log(`Finished Kazoo Requests`);
            console.log("\n returning devices");
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    })


}

const updateEmailsettings = async (companyid,propertyid,callflowoption) => {
    var accountDbName = parseAccountToDatabaseName(companyid);
    var accountDb = nano.use(accountDbName);
    console.log("arguments",companyid,propertyid,callflowoption,accountDbName);
    const selector = {
        "selector": {
            "pvt_type": "user",
            "notify_enabled": true
        },
        limit: 30000
    }
    await accountDb.find(selector, function async (err, result) {
        // console.log(err,result)
            if (err) {
                console.log("err ", err);
                // debugMessage(log4jsexceptionlogger, "getdocumentbyproperty--accountdb=" + JSON.stringify(err));
                // resolve(err);;
            }
          let userdocs = result.docs;
            // console.log("userdocs",userdocs);
            userdocs.forEach(async element => {
                element.emailsettings.settings.forEach(async element => {
                    let propertyData = element.data.find(data => data.propertyid == propertyid);
                    if(propertyData != undefined){propertyData[callflowoption] = false;}
                    console.log(propertyData)
                });
                await insertObjectToDB(accountDbName, element);
            });
        });
}

app.post("/companies/:id/properties", validateJWT, async (req, res) => {
    const companyid = req.params.id;

    const payload = JSON.parse(req.body.payload);

    const propertyid = payload.propertyid;

    var devices: any = await getdevices(req, payload.propertyid);

    let escalationlist = payload.callflowdata.filter(
        (cl) => cl.callflowoptiontype.toLowerCase() === "escalation"
    );    

    //delete callflow from propertydb
    const property=await getpropertyInfo(propertyid);
    if(property && property.callflowdata){
        const accountDbName = parseAccountToDatabaseName(propertyid);
        const accountDb = nano.use(accountDbName);
        // console.log(property.callflowdata,payload.callflowdata,accountDbName,"property")
        
        property.callflowdata.forEach(async (data,index) => {
            if(data.callflowoption != payload.callflowdata[index].callflowoption){
                await updateEmailsettings(companyid,propertyid,data.callflowoption);
                const contactsSelector = {
                    'selector': {
                        "pvt_type": "escalationemaillist",
                        "callflowoption": data.callflowoption,
                    },
                    limit: 30000
                }
                // console.log("data",data);
                //update email setting for property id
                var callflowObj = await getdocumentbyproperty(accountDb, contactsSelector);
                // console.log(callflowObj,"callflowobj")
                if(callflowObj){
                    callflowObj._deleted = true;
                    await accountDb.insert(callflowObj);
                }
            }
        });
    }

    const account: any = await getkazooaccountinfo(req, payload.propertyid);
    console.log("account.realm ", account.data.realm);
    const realm = account.data.realm;
    const randomPassword =   await passwordGenerate();
    await createdevice(req, payload, devices, escalationlist, "1", realm,randomPassword);
    await createdevice(req, payload, devices, escalationlist, "", realm,randomPassword);

    payload.kazoopropertyname = account.data.name;
    var vmbox = await getvoicemaibox(req, payload.propertyid);
    await createvoicemessage(req, payload, vmbox);
    var result = await insertproperty(payload, companyid, req);
    if (companyid != propertyid)
        result = await insertproperty(payload, propertyid, req);   
        const siteId = payload.siteId;
        if (siteId) {
            console.log(propertyid, siteId);
            const alreadyInUse = await isSiteIdAlreadyInUse(
                siteId,
                propertyid
            );
            console.log("Is Site Already in Use ", alreadyInUse);
            if (alreadyInUse) {
                return res
                    .status(400)
                    .json({ status: 400, message: "SiteId is already in use." });
            }
            await createRealPageMapping(propertyid, siteId);
        }
        res.send(result);
    });    


async function isSiteIdAlreadyInUse(siteId: string, propertyId: string) {
    const db = newNano.use(NOTIFY_REALPAGE_MAPPING_DB);
    console.log("what is siteId ",siteId);
    const results = await db.find({ selector: { siteId } });
    console.log(results.docs);
    if (results.docs.length < 1) {
        return false;
    }
    let doc: any = results.docs[0];
    if (doc.propertyId != propertyId) { // Site id is associated with another property
        console.log(`SiteId: ${siteId} is already in use by property ${doc.propertyId} so we cannot assign it to ${propertyId}`);
        return true;
    }
    return false;
}
async function createRealPageMapping(propertyId: string | undefined, siteId: string | undefined) {
    if (!propertyId) {
        throw new Error("PropertyId is not present while creating mapping with real page.")
    }
    const db = newNano.use(NOTIFY_REALPAGE_MAPPING_DB);
    const results = await db.find({ selector: { propertyId } });
    const firstResult: any = results.docs[0];
    if (!firstResult) {
        if (siteId) {
            // @ts-ignore
            await db.insert({ propertyId, siteId });
            console.log(`Mapping created for ${propertyId} ${siteId}`);
        } else {
            console.log(`Mapping not created for ${propertyId} because siteId is not present`);
        }
    } else {
        if (siteId) {
            firstResult.siteId = siteId;
            console.log(`Mapping updated for ${propertyId} with siteId ${siteId}`);
        } else {
            firstResult._deleted = true;
            console.log(`Mapping deleted for ${propertyId}`);
        }
        await db.insert(firstResult);
    }

}
async function deleteKazooProperty(req, propertyId: string) {
    try {
      console.log(`Deleting Kazoo property with propertyId:${propertyId}`);
      await getKazooAxiosRequest(req).delete(
        `${process.env.KAZOO_SERVER}/v2/accounts/${propertyId}/`
      );
      console.log(`Deleted Kazoo property with propertyId:${propertyId}`);
    } catch (e) {
      console.error(
        `Error while deleting the kazoo property ${propertyId}, Error: ${e}`
      );
    }
  }

const deletePropertyFromFreeswitch = async (propertyId:string) => {
    try{
        console.log(`deleting property with id : ${propertyId}`)
        const loginresponse = await free_switch_login();
        const apikey = loginresponse.data.token;
        const response = await getFreeSwitchAxiosRequest(apikey).delete(`/v1/properties/${propertyId}`);
        console.log(`deleled property with id : ${propertyId} , Response data : ${response.data}`);
    }catch(e){
        console.error(`error while deleting property with id : ${propertyId}`,e);
    }
};

app.delete(
    '/companies/:companyid/properties/:id', // Notice: this :id is couchdb id and not the propertyid
    validateJWT,
    async (req, res) => {
      console.log('\n\n delete interview');
      const couchdbId = req.params.id;
      const companyid = req.params.companyid;
      console.log('\n\ncompanyid : ', companyid);
      console.log('\n\n id', couchdbId);
      const accountDb: newNanoClient.DocumentScope<AccountDb> = newNano.use(
        parseAccountToDatabaseName(companyid)
      );
      let property = await accountDb.get(couchdbId).catch((e) => {
        console.log('Possibly propertyid doenst exists error ', e);
      });
      if (!property) {
        return res.status(404).send('not found');
      }
      const propertyId = property.propertyid;
      deleteKazooProperty(req,property.propertyid);
      property.enabled = false;
  
      await accountDb.insert(property);
      console.log('property updated successfully');
      res.send('success');
      console.log('Call delete propery from freeswitch api with following Property Id ', propertyId);
      
      await deletePropertyFromFreeswitch(propertyId);
    }
  );




app.post('/companies/:companyid/properties/:propertyid/schedules/:id', validateJWT, async (req, res) => {

    console.log("why this");
    const companyid = req.params.companyid;
    const propertyid = req.params.propertyid;
    const scheduleid = req.params.id;
    let payload = JSON.parse(req.body.payload);
    const dbname = parseAccountToDatabaseName(propertyid);
    const property = await getpropertyInfo(propertyid);
    const accountDbName = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
    const companyInfo = await getcompanyInfo(companyid);
    const callflowsoptiontype = payload.callflowsoptiontype;
    let dayscheduledataInfo = [];
    const timezone = property.timezone ? property.timezone : companyInfo.timezone;
    let dayscheduleResult;
    var scheduledate = moment().tz(timezone).startOf('day');//tz(timezone);
    const scheduledate_start_unix = scheduledate.unix();
    const scheduledate_end_unix = scheduledate.subtract(36, 'days').unix();
    const schedulelist = await getSchedule_for_callflowsoptiontype(accountDb, callflowsoptiontype, "schedule");
    const dayschedulelist = await getDaySchedule_for_Last30days(accountDb, callflowsoptiontype, scheduledate_start_unix, scheduledate_end_unix, "dayschedule");
    const adjustschedulelist = await getAdjSchedule_for_Last30days(accountDb, callflowsoptiontype, scheduledate_start_unix, scheduledate_end_unix, "adjustschedule");
    let last30daysList = [];
    let sch;
    if (schedulelist && schedulelist.length > 0 && schedulelist[0].data && schedulelist[0].data.length > 0) {
        for (var s = 0; s <= schedulelist[0].data.length - 1; s++) {
            sch = schedulelist[0].data[s];
            if (sch.enabled && !sch.hasOwnProperty('deleteddate')) {
                var createdDate: any = moment.unix(sch.createddate);
                var todayDate: any = moment.unix(scheduledate_start_unix);
                var createdDateDiff = todayDate.diff(createdDate, 'days');
                createdDateDiff = createdDateDiff + 1;
                if (createdDateDiff > 30) {
                    createdDateDiff = 36;
                } else {
                    createdDateDiff = createdDateDiff;
                }
                for (let i = createdDateDiff; i >= 0; i--) {
                    var lastScheduledDate = moment().tz(timezone).startOf('day');//tz(timezone);
                    const lastScheduledDate_start_unix = lastScheduledDate.subtract(i, 'days').unix();
                    let dayschedule = dayschedulelist.some(daySch => {
                        return daySch.scheduleid === sch.scheduleid && moment(daySch.scheduledatetime).isSame(new Date(lastScheduledDate_start_unix * 1000), 'day');
                    });
                    let scheduleDay = lastScheduledDate.subtract(i, 'days').format('dddd').toLowerCase();
                    if (!dayschedule && sch.days[scheduleDay] === true && lastScheduledDate_start_unix !== scheduledate_start_unix) {
                        let timeslot = `${sch.from.hh}:${sch.from.mm}${sch.from.a} - ${sch.to.hh}:${sch.to.mm}${sch.to.a}`;
                        if (sch.restricted) {
                            let restrictedday = sch.restrictedschedule.find(rstDay => rstDay.day === scheduleDay);
                            if (restrictedday !== undefined) {
                                timeslot = `${restrictedday.from.hh}:${restrictedday.from.mm}${restrictedday.from.a} - ${restrictedday.to.hh}:${restrictedday.to.mm}${restrictedday.to.a}`;
                            }
                        }
                        let dayscheduledata: any = {
                            propertyid: propertyid,
                            companyid: companyid,
                            scheduleid: sch.scheduleid,
                            datetime: lastScheduledDate_start_unix,
                            datetimeunix: lastScheduledDate_start_unix,
                            enddatetimeunix: '',
                            time: timeslot,
                            schedulekey: sch.scheduleid,
                            users: [],
                            dayschedule: true,
                            livereply: sch.livereply,
                            scheduledatetime: new Date(lastScheduledDate_start_unix * 1000),
                            callflowsoptiontype: payload.callflowsoptiontype
                        }
                        await insertdayschedule(dayscheduledata, accountDbName);
                    }
                }
            }
        }
    }
    payload.data.forEach(element => {
        element.lastUpdatedDate = new Date(scheduledate_start_unix * 1000);
    });
    const result = await insertschedule(payload, dbname);
    const messageinfo = `User ${req['decoded'].user_id} edited  scheduling  in (${property.propertyname})`;
    console.log(messageinfo);
    serverlog("info", messageinfo, "edit schedule");

    res.send(result);

})



app.post('/companies/:companyid/properties/:propertyid/adjustschedules/:id', validateJWT, async (req, res) => {
    console.log("\nadjust schedules\n");
    const companyid = req.params.companyid;
    const propertyid = req.params.propertyid;
    const scheduleid = req.params.id;
    const payload = JSON.parse(req.body.payload);
    const dbname = parseAccountToDatabaseName(propertyid);
    const result = await insertadjustschedule(payload, dbname);
    res.send(result);

})

app.post('/companies/:companyid/properties/:propertyid/unadjustschedules/:id', validateJWT, async (req, res) => {
    console.log("\nunadjust schedules\n");
    const companyid = req.params.companyid;
    const propertyid = req.params.propertyid;
    const scheduleid = req.params.id;
    const payload = JSON.parse(req.body.payload);
    //console.log();
    const dbname = parseAccountToDatabaseName(propertyid);
    const result = await unadjustschedule(scheduleid, dbname);
    res.send(result);

})
app.get('/companies/:companyid/properties/:propertyid/schedules/:optiontype', validateJWT, async (req, res) => {
    //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
    console.log("\n schedules111: ");
    const propertyid = req.params.propertyid;
    const optiontype = req.params.optiontype;
    const accountDbName = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
    var result = [];
    const schedulelist = await getSchedule_for_callflowsoptiontype(accountDb, optiontype, "schedule");
    const dayschedulelist = await getSchedule_for_callflowsoptiontype(accountDb, optiontype, "dayschedule");
    const adjustschedulelist = await getSchedule_for_callflowsoptiontype(accountDb, optiontype, "adjustschedule");
    if (Array.isArray(schedulelist)) {
        result.push(...schedulelist);
    }
    if (Array.isArray(dayschedulelist)) {
        result.push(...dayschedulelist);
    }
    if (Array.isArray(adjustschedulelist)) {
        result.push(...adjustschedulelist);
    }
    res.statusCode = 200;

    // console.log("\nschedule Plumbing:",JSON.stringify( result));
    res.send(result);

})
app.post('/companies/:companyid/properties/:propertyid/dayschedules', validateJWT, async (req, res) => {
    console.log("\n\ndayschedules\n");
    //const companyid= req.params.companyid;
    const propertyid = req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload = JSON.parse(req.body.payload);
    const dbname = parseAccountToDatabaseName(propertyid);
    const result = await insertdayschedule(payload, dbname);
    console.log("days schedule return  ", result);
    res.send(result);

})
app.post('/audio', async (req, res) => {
    const AWS = require('aws-sdk')
    console.log('/audio/audio/audio/audio/audio/audio/audio/audio/audio', req.body.payload);
    var bucket_region;
    var bucket = req.body.payload.bucketname;
    if (bucket.includes("hsnotifymessagerecording")) {

        bucket_region = "us-west-2";

    } else if (bucket.includes("hsnotify")) {

        bucket_region = "us-west-2";

    } else {
        //bucket_region = process.env.AWS_notifybucket_region;
        bucket_region = "us-west-2";
    }
    const myBucket = req.body.payload.bucketname;
    const myKey = req.body.payload.filename;
    console.log('bucket_region------------', bucket_region);
    //const signedUrlExpireSeconds = 20;
    const s3 = new AWS.S3({
        accessKeyId: AWS.config.accessKeyId,
        signatureVersion: AWS.config.signatureVersion,
        region: bucket_region,
        secretAccessKey: AWS.config.secretAccessKey
    });


    var url = s3.getSignedUrl('getObject', {
        Bucket: req.body.payload.bucketname,
        Key: req.body.payload.filename,
        //Expires: signedUrlExpireSeconds
    });

    console.log(url)

    res.send(url);

})

app.post('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT, async (req, res) => {
    console.log("\n\nescalationuserlist\n");
    //const companyid= req.params.companyid;
    const propertyid = req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload = JSON.parse(req.body.payload);
    const dbname = parseAccountToDatabaseName(propertyid);
    const result = await insertescalationuserlist(payload, dbname);
    res.send(result);

})

app.get('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT,async  (req, res) => {
    //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
    console.log("\n escalationuserlist: ");
    const propertyid = req.params.propertyid;

    const accountDbName = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
    console.log("\n accountDb: ", accountDbName);
    console.log("\n propertyid: ", propertyid);
    const contactsSelector = {
        "selector": {
            "pvt_type": "escalationuserlist"

        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
       res.send(docs);

})


app.get('/companies/:companyid/properties/:propertyid/callluserlist', validateJWT, async(req, res) => {
    //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
    console.log("\n callluserlist: ");
    const propertyid = req.params.propertyid;

    const accountDbName = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
    const contactsSelector = {
        "selector": {
            "pvt_type": "on_call_list"

        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
   var docs= await getalldocumentsbyproperty(accountDb,contactsSelector);
   docs= docs.filter(r=>r.enabled);
   console.log("zczx")
   console.log(JSON.stringify(docs))
    res.statusCode = 200;
    res.send(docs);

    

})

app.post('/companies/:companyid/properties/:propertyid/oncalluserlist', validateJWT, async (req, res) => {
    console.log("\n\oncalluserlist\n");
    //const companyid= req.params.companyid;
    const propertyid = req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload = JSON.parse(req.body.payload);
    const dbname = parseAccountToDatabaseName(propertyid);
    const result = await save_oncall_list(payload, dbname);
    res.send(result);

})





const getSchedule_for_callflowsoptiontype = async (accountDb, callflowsoptiontype, scheduletype) => {
    const scheduleselector = {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
            "pvt_type": scheduletype,
            "enabled": true
        },
        "use_index": "pvt_type_callflowsoptiontype_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }
    const schdulelist = await getalldocumentsbyproperty(accountDb, scheduleselector);
    return schdulelist;

}
const removeall_adjust_schedules=async(accountDbName)=>
{
    const adjustschedulelist = await get_All_AdjSchedule(accountDbName);
    
    adjustschedulelist.forEach(async(ads) => {
        await unadjustschedule(ads._id,accountDbName)
     });
}

const removeall_oncall_list=async(accountDbName)=>
{
    console.log("removeall_oncall_list")

    var oncalllist = await get_All_OncallList(accountDbName);
    oncalllist=oncalllist.filter(r=>r.enabled);
    oncalllist.forEach(async(l) => {
        await undoneoncalllist(l._id,accountDbName)
     });
}
const get_All_OncallList = async (accountDbname) => {
    //check this
    const acconutdb= nano.use(accountDbname)
    console.log("get_All_OncallList");
    const scheduleselector = {
        "selector": {
           
            "pvt_type": "on_call_list",
            
           
        },
        "use_index":"pvt_type",
  		"execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }
       var oncalllist = await getalldocumentsbyproperty(acconutdb, scheduleselector);
   
    return oncalllist;

}

const removeall_dayschedule_list=async(accountDbName)=>
{
    console.log("removeall_oncall_list")

    var oncalllist = await get_All_DayscheduleList(accountDbName);
    oncalllist=oncalllist.filter(r=>r.enabled);
    oncalllist.forEach(async(l) => {
        await undoneoncalllist(l._id,accountDbName)
     });
}
const get_All_DayscheduleList = async (accountDbname) => {
    //check this
    const acconutdb= nano.use(accountDbname)
    console.log("dayschedule");
    const scheduleselector = {
        "selector": {
            "pvt_type": "dayschedule",
        },
        "use_index":"pvt_type",
  		"execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }
   
    var scheduleList = await getalldocumentsbyproperty(acconutdb, scheduleselector);
   
    return scheduleList;

}

const get_All_AdjSchedule = async (accountDbname) => {
    //check this
    const acconutdb= nano.use(accountDbname)
    console.log("get_All_AdjSchedule");
    const scheduleselector = {
        "selector": {
           
            "pvt_type": "adjustschedule",
            
           
        },
        "use_index":"pvt_type",
  		"execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }
    var schdulelist = await getalldocumentsbyproperty(acconutdb, scheduleselector);
    console.log(schdulelist);
    schdulelist= schdulelist.filter(f=>f.enabled);
    console.log(schdulelist);
    return schdulelist;

}
const getAdjSchedule_for_Last30days = async (accountDb, callflowsoptiontype, scheduledate_start_unix, scheduledate_end_unix, scheduletype) => {
    //check this
    const scheduleselector = {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
            "pvt_type": scheduletype,
            "enabled": true,
            "adjustdate_unix": {
                "$lte": scheduledate_start_unix,
                "$gte": scheduledate_end_unix
            }
        },
        "use_index":"pvttype_callflowsoptiontype",
  		"execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }
    const schdulelist = await getalldocumentsbyproperty(accountDb, scheduleselector);
    return schdulelist;

}

const getDaySchedule_for_Last30days = async (accountDb, callflowsoptiontype, scheduledate_start_unix, scheduledate_end_unix, scheduletype) => {
    //check this
    const scheduleselector = {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
            "pvt_type": scheduletype,
            "enabled": true,
            "datetime": {
                "$lte": scheduledate_start_unix,
                "$gte": scheduledate_end_unix
            }
        },
         "use_index":"pvttype_callflowsoptiontype_datetime",
  "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }
    const schdulelist = await getalldocumentsbyproperty(accountDb, scheduleselector);
    return schdulelist;

}
const findAdjustSchedule = async (timezone, callflowoption, accountDb) => {
    var startoftheday = moment().tz(timezone).startOf('day').unix();
    console.log("startoftheday");
    console.log(startoftheday);
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "adjustschedule",
            "adjustdate_unix": startoftheday,
            "callflowsoptiontype": callflowoption

        },
         "use_index":"pvt_typeadjustdate_unix-index",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };

    var adjustSchedule = await getdocumentbyproperty(accountDb, contactsSelector);
    return adjustSchedule;

}
const findSchedules = async (accountDb: any, isliveschedule: boolean,
    didnumber, property, company, isCustomProperty = true): Promise<any> => {
    const timezone = property.timezone ? property.timezone : company.timezone;
    didnumber = didnumber.substring(0, 10);
    const callflowdatalist = property.callflowdata;
    const callflowdata = callflowdatalist.find(cl => cl.didnumber === didnumber);
    const callflowoption = callflowdata && callflowdata.callflowoption ? callflowdata.callflowoption : "";
    const adjustSchedule = await findAdjustSchedule(timezone, callflowoption, accountDb);

    var currendatettime = moment().tz(timezone);
    var currentminute = currendatettime.format("mm");
    var currenthour = currendatettime.format("HH");
    var currenttime = Number(currenthour + "." + currentminute);
    var prevdaytime = currenttime + 24;
    var todaysday = currendatettime.format('dddd').toLowerCase();
    var yesterday = currendatettime.add(-1, 'days').format('dddd').toLowerCase();

    var schedulelist = [];
    if (adjustSchedule && adjustSchedule.data && adjustSchedule.enabled) {
        const adjustDaySchedule = adjustSchedule.data.find(sch => sch.livereply === isliveschedule
            && sch.ifrom <= currenttime
            && sch.ito > currenttime
        );
        if (adjustDaySchedule) {
            schedulelist.push(adjustDaySchedule);
        }
    }
    else if (isCustomProperty) 
    {
        const contactsSelector = {
            "selector": {
                "pvt_type": "schedule",
                "callflowsoptiontype": callflowoption

            },
            "use_index": "pvt_type_callflowsoptiontype",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        };

        var document = await getdocumentbyproperty(accountDb, contactsSelector);


        if (document && document.data && document.data.length > 0) {
            const restricschedules = document.data.filter(sch => sch.livereply === isliveschedule
                && sch.enabled
                && (sch.days[todaysday] || sch.days[yesterday])
                && sch.restricted
                && sch.livereply === isliveschedule
            );
            // console.log(JSON.stringify (restricschedules));
            restricschedules.forEach(rsch => {
                if (schedulelist.length <= 0) {
                    /**/
                    var dayrestrictschedule = rsch.restrictedschedule
                        .find(drsch =>
                            drsch.day === todaysday
                            && drsch.ifrom <= currenttime
                            && drsch.ito > currenttime
                        );
                    if (!dayrestrictschedule) {
                        dayrestrictschedule = rsch.restrictedschedule
                            .find(drsch =>
                                drsch.day === yesterday
                                && drsch.ifrom <= prevdaytime
                                && drsch.ito > prevdaytime);
                        if (dayrestrictschedule)
                            rsch.ispreviousday = true;


                    }

                    if (dayrestrictschedule)
                        schedulelist.push(rsch);
                }
            });
            if (schedulelist.length <= 0) //if there is no restrict shedule
            {
                schedulelist = document.data.filter(sch => sch.livereply === isliveschedule
                    && sch.enabled
                    && sch.days[todaysday]
                    && !sch.restricted
                    && ((sch.ifrom <= currenttime && sch.ito > currenttime))
                );
                if (schedulelist.length <= 0) // fi we didnt find shedule for current day we should look for yesterday's spill over schedule
                {
                    schedulelist = document.data.filter(sch => sch.livereply === isliveschedule
                        && sch.enabled
                        && sch.days[yesterday]
                        && !sch.restricted
                        && sch.ifrom <= prevdaytime && sch.ito > prevdaytime
                    );
                    if (schedulelist.length > 0)
                        schedulelist[schedulelist.length - 1].ispreviousday = true;
                }
            }
        }
    }
    else
    {
        var non_custom_schedule:any= await generate_non_custom_schedule(property);
         non_custom_schedule.ispreviousday=property.schedule_type!="daily"&&
                         non_custom_schedule.data[0].ifrom <= prevdaytime 
                            && non_custom_schedule.data[0].ito > prevdaytime;
        schedulelist.push(non_custom_schedule);
    }
    console.log("schedulelist length ", schedulelist.length)
    return schedulelist;


}


const getpropertycallflowoptions = async function (didnumber, property) {
    didnumber = didnumber.substring(0, 10);
    const callflowdatalist = property.callflowdata;
    const callflowdata = callflowdatalist.find(cl => cl.didnumber === didnumber   && cl.callflowoptiontype==="Escalation");
    if (!callflowdata) {
        debugMessage(log4jslogger, "didnumber not present--" + didnumber);
        debugMessage(log4jsexceptionlogger, "didnumber not present--" + didnumber);
    }
    const callflowoption = callflowdata.callflowoption ? callflowdata.callflowoption : "";
    return callflowoption;
}
const findSchedule = async (accountDb: any, isliveschedule: boolean, didnumber, property, company, isCustomProperty = true): Promise<any> => {
    var callflowsoptiontype = await getpropertycallflowoptions(didnumber, property);

    var schedulelist = await findSchedules(accountDb, isliveschedule, didnumber, property, company, isCustomProperty);
    const schedulelistlength = schedulelist.length;
    var scheduledocument = schedulelistlength > 0 ? schedulelist[schedulelistlength - 1] : undefined;

    if (scheduledocument)
        scheduledocument.callflowsoptiontype = callflowsoptiontype;
    return scheduledocument;
}

const findNotifyEscalationSettings = async (property: any, escalationSettingsdocs): Promise<any> => {
    // console.log(`Searching through nesting level ${level}`);
    if (property && property.companyid) {
       
        var escalationList = [];
        const propertyid = property.propertyid;
        const escalationSettingsdocs_filter = escalationSettingsdocs.filter(
            (es)=>es.notify_enabled && es.escalationsettings && (es.msteruser||  (es.propertylist && es.propertylist.find((p)=>p.id===propertyid&& p.enabled) )));          
        escalationSettingsdocs_filter.forEach(setting => {
            setting.escalationsettings.forEach(escalationsetting => {
                var temp = {
                    "name": `${setting.first_name} ${setting.last_name}`,
                    "first_name": `${setting.first_name}`,
                    "last_name": `${setting.last_name}`,
                    "waittime": escalationsetting.time * 60,
                    "callingnumber": `+1${escalationsetting.number}`,
                    "type": "sms"
                }
                const optinObj= setting.phonesettings && setting.phonesettings.settings&& setting.phonesettings.settings.find(s=>s.number===escalationsetting.number);
                            if (optinObj && optinObj.optin)
                                escalationList.push(temp);
            });
        });

        return escalationList;
    }
    else {
        return [];
    }
}

const getcompanyaccountdbnamesforcron = async ()=>
{
    const contactsSelector = {
        "selector": {
            "pvt_type": "accountinfo",
            "type":"company"
        
                     },
         "use_index":"pvt_type_name",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:5000 
    }
    const globaldb=nano.use("globaldb");
    var accountinfo:any=await  getalldocumentsbyproperty(globaldb,contactsSelector);
   console.log(accountinfo.length);
     return accountinfo;
   
}
const updateemrtdata=async()=>
{
    const now_unix= moment().utc().unix();
    //update_call_summery_data();
    var  emergency_companydata=[];
    
    var dbnames:any=await getcompanyaccountdbnamesforcron();
      for (var i=0; i<dbnames.length;i++)
    {
        const account=dbnames[i]
        
        const companyid= account.accountid ;
        if (account && account.accountid)
        {
            console.log(companyid);
            const companyreportdocs:any=await getmonthreportdata(companyid, ["responsetime","type","propertyid"]);
            const active_properties:any =await getproperties(companyid);
            var emrgency_companyreportdocs=companyreportdocs.filter(r=>  r.type && 
                                        r.type.toLowerCase()==="emergency"
                                        && !isNaN( r.responsetime) && r.responsetime>0
                                       );
            if(active_properties && active_properties.docs)
                emrgency_companyreportdocs=emrgency_companyreportdocs.filter(rr=> active_properties.docs.find((ar)=> ar.propertyid===rr.propertyid))
            var emergency_company_propertydata=d3c.nest()
            .key(function(d) { return d.propertyid; }) 
            
            .rollup(function(v) { return {
                avg_emrt: d3.mean(v, function(d) { return isNaN(d.responsetime)?0: d.responsetime>=86400?86400:d.responsetime; })
                }
            })
            .entries(emrgency_companyreportdocs);
            const emergency_company_company_avg_emrt=d3.mean(emergency_company_propertydata.map(da=>da.value.avg_emrt));
            const emergency_company_company_sum_emrt=d3.sum(emergency_company_propertydata.map(da=>da.value.avg_emrt));

            emergency_companydata.push (
            {
                companyid:companyid,
                companyname: account.name,
                industry:account.industry,
                avgemrt:emergency_company_company_avg_emrt,
                emrtsum:emergency_company_company_sum_emrt,
                propertycount:emergency_company_propertydata? emergency_company_propertydata.length:0
            }
        )
        //console.log(emergency_companydata);
        }
    };
    
    //for loop end 

    var emrt_data = {
        timestamp: now_unix,
        data: emergency_companydata
    }
    console.log("emrt_data");
    console.log(JSON.stringify(emrt_data));
    await insertemrtdata(emrt_data);
}

const getScheduleforProperty = async (propertydb) => {
    const contactsSelector = {
        'selector': {
            "pvt_type": "schedule",
            "enabled": true
        },
        "use_index": "pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
    }
    var schedulelist = await getalldocumentsbyproperty(propertydb, contactsSelector);
    return schedulelist;

}
const getAdjustScheduleforProperty = async (propertydb, day1_unix_time, day2_unix_time) => {
    const contactsSelector = {
        'selector': {
            "pvt_type": "adjustschedule",
            "$or": [
                {
                    "adjustdate_unix": day1_unix_time,
                },
                {
                    "adjustdate_unix": day2_unix_time
                }
            ]
        },
        "use_index": "pvt_typeadjustdate_unix-index",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,

    }
    var schedulelist = await getalldocumentsbyproperty(propertydb, contactsSelector);
    return schedulelist;

}
const handoffrule = async () => {
    var reportrunningUTCTime = moment().utc();

    console.log(reportrunningUTCTime.format("DD:mm:YYYY HH:mm:ss z"));
    var next_run_report_time = reportrunningUTCTime.clone().add(455, 'minutes');

    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));// && d==='nt_account/2d/67/08f277a137338e4c5815c24962f9');
    dbnames.forEach(async (dbname) => {
        const propertyid = parseDatabaseNameToAccount(dbname);
        const property = await getpropertyInfo(propertyid);
        if (property) {
            const timezone = property.timezone;
            var starttime = reportrunningUTCTime.clone().tz(timezone);
            var endtime = starttime.clone().add(455, 'minutes');
            var startoftheday = starttime.clone().startOf('day');
            var enddaystartoftheday = endtime.clone().startOf('day');

            var scheduleday1 = starttime.format('dddd').toLowerCase();
            var scheduleday2 = endtime.format('dddd').toLowerCase();

            const propertydb = nano.use(dbname);
            const property_schedulelist = await getScheduleforProperty(propertydb);
            const property_adjustschedulelist = await getAdjustScheduleforProperty(propertydb, startoftheday.unix(), enddaystartoftheday.unix())
            var property_day_schedules = [];
            for (var property_schedule_index = 0;
                property_schedule_index < property_schedulelist.length;
                property_schedule_index++) {
                const property_schedule = property_schedulelist[property_schedule_index];
                const schedule_callflowsoptiontype = property_schedule.callflowsoptiontype;
                const datalist = property_schedule.data;
                const day1_adjustschedules = property_adjustschedulelist && property_adjustschedulelist.length > 0 ?
                    property_adjustschedulelist.filter(as => as.adjustdate_unix === startoftheday.unix()
                        && as.callflowsoptiontype === schedule_callflowsoptiontype) : [];
                const day1_schedules = day1_adjustschedules.length > 0 ?
                    day1_adjustschedules[0].data : datalist.filter(data => data.days[scheduleday1]);
                property_day_schedules.push(...day1_schedules);
                if (scheduleday1 != scheduleday2) {
                    const day2_adjustschedules = property_adjustschedulelist && property_adjustschedulelist.length > 0 ?
                        property_adjustschedulelist.filter(as => as.adjustdate_unix === enddaystartoftheday.unix()) : [];

                    const day2_schedules = day2_adjustschedules.length > 0 ?
                        day2_adjustschedules[0].data : datalist.filter(data => data.days[scheduleday2]);
                    property_day_schedules.push(...day2_schedules);
                }
            }
            const reporttime_utc_unix = reportrunningUTCTime.unix();
            // const endtime_utc_unix=  reportrunningUTCTime.clone().add(455, 'minutes').unix(); 

            await handoffruleforproperty(property, property_day_schedules, reporttime_utc_unix);
        }
    });

}
const handoffruleforproperty = async (property, property_day_schedules_list, reporttime_utc_unix) => {

    var starttime_d = moment().tz(property.timezone).startOf('day');
    var starttime_unix = starttime_d.unix();
    var endtime_d = starttime_d.clone().add(1, "days").add(455, "minutes");
    var endtime_unix = endtime_d.unix();
    const company = await getcompanyInfo(property.companyid);

    var dayschedules = await findUsersForhandOffRules(property, starttime_unix, endtime_unix);

    for (var i = 0; i < dayschedules.length; i++) {
        const dayschedule = dayschedules[i];
        const property_day_schedule = property_day_schedules_list.find(pd => pd.scheduleid === dayschedule.scheduleid);
        if (property_day_schedule) {
            var from_hh = parseInt(property_day_schedule.from.hh);
            const from_mm = parseInt(property_day_schedule.from.mm);
            const from_a = property_day_schedule.from.a;
            if (from_a === "pm" && from_hh < 12) {
                from_hh += 12;
            }
            var schedule_start_time = starttime_d.clone().add(from_hh, "hours").add(from_mm, "minutes");

            var to_hh = parseInt(property_day_schedule.to.hh);
            const to_mm = parseInt(property_day_schedule.to.mm);
            const to_a = property_day_schedule.to.a;
            if (to_a === "pm" && to_hh < 12) {
                to_hh += 12;
            }

            const schedule_end_time = starttime_d.clone().add(to_hh, "hours").add(to_mm, "minutes");

            const datetimeunix = schedule_start_time.utc().unix();
            const enddatetimeunix = schedule_end_time.utc().unix();

            const schedulefromtimediffrence = (datetimeunix - reporttime_utc_unix) / 60;
            const scheduleendtimediffrence = (enddatetimeunix - reporttime_utc_unix) / 60;
            const users = dayschedule.users;
            const userIds = users.map(a => a.key);
            console.log(JSON.stringify(userIds));
            var userdocs = await findDayScheduleuserlist(userIds, property);
            await sendhandoffrulesmessage(userdocs, dayschedule, property, schedulefromtimediffrence, scheduleendtimediffrence);
        }
    }
}
const sendhandoffrulesmessage = async (userdocs, dayscheule, property, schedulefromtimediffrence, scheduleendtimediffrence) => {

    userdocs.forEach(user => {
        var handoffrulessettings = user.handoffrulessettings;
        if (handoffrulessettings) {
            handoffrulessettings = handoffrulessettings
                .filter(h => h.call.toLowerCase() === "on"
                    || h.call.toLowerCase() === "off");


            handoffrulessettings.forEach(async (setting) => {
                const ruletype = setting.call.toLowerCase();
                const time = parseInt(setting.time);
                const diffrencetime = ruletype === "on" ?
                    schedulefromtimediffrence
                    : scheduleendtimediffrence
                const timediffrence = diffrencetime - time;
                console.log("timediffrence");
                console.log(timediffrence);
                if (timediffrence <= 14 && timediffrence > 0) {
                    var number = setting.number.toString();
                    const propertyname = property.propertyname;
                    const schedulename = dayscheule.callflowsoptiontype;
                    const message = `You’re ${ruletype} call in ${time} minutes for ${propertyname} ${schedulename}`;
                    const messaging_number = process.env.MESSAGINGNUMBER;
                    const from = messaging_number;
                    number = number.indexOf("+1") >= 0 ? number : `+1${number}`;

                    var payload = {

                        "from": from,
                        "to": number,
                        "messagetext": message

                    }
                    console.log(`sendig message ${message}`);
                    sendNotifySMS(payload)
                }
            });
        }
    });
}
const findUsersForhandOffRules = async (property, starttime_utc_unix, endtime_utc_unix) => {
    const propertydbname = parseAccountToDatabaseName(property.propertyid)
    const propertydb = nano.use(propertydbname);
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "dayschedule",
            "$or": [{
                "datetimeunix": {
                    "$gt": starttime_utc_unix,
                    "$lt": endtime_utc_unix
                }

            },
            {
                "enddatetimeunix": {
                    "$gt": starttime_utc_unix,
                    "$lt": endtime_utc_unix
                }
            }
            ]
            ,
            "users.0": {
                "$gt": 0
            }
        }
    };
    console.log(JSON.stringify(contactsSelector));
    var dayscheules = await getalldocumentsbyproperty(propertydb, contactsSelector);
    return dayscheules;
}





const transferreport = async () => {
    console.log("transferreport");
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var alldbnames: any = await getaccountdbnames();
    var dbnames = alldbnames.filter(d => account_db_pattern.test(d)
        && d === "nt_account/f7/92/31ba4e415e51890926f66ffea868"
        //&& d===parseAccountToDatabaseName("7c0af64b98ca71604153ae0ec7fe770e")
    );
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];

        const id = parseDatabaseNameToAccount(dbname);
        const pre_dbwithmonthname = getMonthDbName(dbname, false);
        const dbwithmonthname = getMonthDbName(dbname);
        const pre_monthdb = nano.use(pre_dbwithmonthname);
        const monthdb = nano.use(dbwithmonthname);
        //check this
        const reportselector =
        {
            "selector": {
                "pvt_type": "reportdata",
                "resolved": false,
                "isescalation": true,
                "removefromreport": false,
                "transfered": {
                    "$exists": false
                }

            }
        }
        var reports = await getalldocumentsbyproperty(pre_monthdb, reportselector);
        for (var k = 0; k < reports.length; k++) {
            var report = reports[k];
            report.transfered = true;
            console.log(pre_dbwithmonthname);
            console.log(dbwithmonthname);
            // await insertreportdata(report,pre_monthdb)
            delete report._id;
            delete report._rev;

            // await insertreportdata(report,monthdb)
        }
        console.log(reports.length)

    }
}

const notificationinfo = async () => {
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var alldbnames: any = await getaccountdbnames();
    var dbnames = alldbnames.filter(d => account_db_pattern.test(d)
  /// && d==="nt_account/04/37/c65cbd078fce391ab0bd167727ee"
    );
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];
        const id = parseDatabaseNameToAccount(dbname);
        var property = await getpropertyInfo(id);
        var company = await getcompanyInfo(id);
        if ((property && property.propertyid) || (company && company.companyid)) {
            const result = await getKazooAccountEmailNotification(id);
            const result2 = JSON.parse(result);
            if (!result2 || !result2.data || result2.data.from != "hsnoreply@notify.hellospoke.com") {
                if ((property && property.propertyid))
                    console.log(`property ${property.propertyname}  ${property.propertyid}  ${result2.data.from}`)

                if ((company && company.companyid))
                    console.log(`comapny ${company.name}  ${company.companyid}  ${result2.data.from}`)
                if (result2.data.message!='bad identifier')
                 await setKazooAccountEmailNotification(null,id)
            }
        }


    }
    console.log("done")

}
const createindexforce=async()=>
{
//    console.log("createindexforce");
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var alldbnames:any=await getaccountdbnames();
   var dbnames= alldbnames.filter (d=>  account_db_pattern.test(d)
  //  && d==="nt_account/ee/d2/5dfa72b758f9eeb12e3104159b0f"
   );
 
   console.log(dbnames.length);
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const id= parseDatabaseNameToAccount(dbname);
       const company=  await getcompanyInfo(id);
       var property=  await getpropertyInfo(id);
       var incident=  await getIncidentInfo(id);
           
       console.log( `\ndbnumber ${i}.\n`);
       const dbwithmonthname=getMonthDbName(dbname);
       
       if( (company && company.companyid)||(property && property.propertyid) )
       {
       
           //  console.log( `company. ${company.name}`);
           
             const isDbAvailable= alldbnames.find(d=>d===dbwithmonthname);
             if (!isDbAvailable){
                console.log(`db  ${dbwithmonthname} is not available`)
                var creation_result= await  createaccountdb (dbwithmonthname);
                
               
                 await createindexes(dbwithmonthname);
                 const oldmonthDbName= getOldMonthDbName(dbname);
                deletedb(oldmonthDbName);
             }
             else
             {
              
                console.log(`db is  ${dbwithmonthname} available`)
               
             }
            
       }
       
    }
}

const storageupdate = async () => {
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    // && d==="nt_account/06/45/36efbf50c38cac7f8824e74ab55a");
    // dbnames.forEach(async(dbname) => 
    var kk = 1;
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];

        const propertyid = parseDatabaseNameToAccount(dbname);
        const property = await getpropertyInfo(propertyid);
        if (property && property.propertyid) {
            console.log(kk++);
            console.log(property.propertyid);
            console.log(property.propertyname);
            await deletekazoostorage(null, property.propertyid);
            const result = await creteKazooStorageAttachments(null, property.propertyid);

        }
    }
}

const insertaccountinfotoglobale = async () => {
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdata();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    // dbnames.forEach(async(dbname) => 
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname = dbnames[i];

        const id = parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo(id);

        if ((company && company.companyid)) {
            console.log(dbname);
            console.log(company.name);
             await insertaccountinfo(company.companyid, company,"company",company.name )
        }
        else {
            const property = await getpropertyInfo(id);
            if (property && property.propertyid)
                await insertaccountinfo(property.propertyid, property,"property",property.kazoopropertyname)
        }
    }
}


const updatecallloginfo = async (callinfo, accountDbName) => {
    delete callinfo.pvt_type;

    callinfo.iscallinfolog = true;


    var result = insertObjectToDB(accountDbName,callinfo)
     return result;


}

const deletecallinfolog = async (companyid, c) => {
    //check this
    const contactsSelector =
    {
        "selector": {
            "pvt_type": "callinfolog"
        },
        "sort": [
            "notifytimestamp"
        ],
        "limit": 3000
    }
    console.log("deletecallinfolog")
    const dbname = parseAccountToDatabaseName(companyid);
    const comapnydb = nano.use(dbname)
    var callinfologs = await getalldocumentsbyproperty(comapnydb, contactsSelector);
    for (var i = 0; i < callinfologs.length; i++) {
        const callinfo = callinfologs[i];
        console.log(c * 1000 + i);
        console.log(callinfo.notifytimestamp)
        await updatecallloginfo(callinfo, dbname);
    }

}



const deletecallinfologforcompany = async (companyid) => {
    //   var account_db_pattern = new RegExp(getDabaseNameRegx());
    //   var dbnames:any=await getaccountdbnames();
    // dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
    // dbnames.forEach(async(dbname) => 
    //  for (var i=0; i<dbnames.length;i++)
    {



        const company = await getcompanyInfo(companyid);
        if (company && company.companyid) {

            console.log(company.name);
            for (var i = 0; i < 4; i++) {
                await deletecallinfolog(company.companyid, i);
            }
        }
    }
}
const unSavedReportToElasticSearch = async () => {
    var now_unix = moment().add(-10, "minutes").utc().unix();
    //  console.log( moment().add(-10,"minutes").utc().format())
    const contactsSelector = {
        "selector": {
            "pvt_type": "reportdata",
            "elasticid": {
                "$exists": false
            },
            "incidentdate": { "$lt": now_unix }
        },

        "use_index": "elasticid_exists",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }

    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    // && d=== parseAccountToDatabaseName( "c037d1a2d320e497a0891e530af064e5"));
    // dbnames.forEach(async(dbname) => 
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];

        const companyid = parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo(companyid);
        if (company && company.companyid) {
            console.log(dbname);

            const comapnydb = nano.use(dbname);
            debugMessage(log4jslogger, `Sync report ${JSON.stringify(companyid)}`);
            var reports = await getalldocumentsbyproperty(comapnydb, contactsSelector);

            //reports.forEach(async(reportdata) => 
            for (var k = 0; k < reports.length; k++) {
                const reportdata = reports[k];
                if (reportdata && reportdata.guid) {

                    console.log(JSON.stringify(reportdata.guid));
                    const isduplicate = await isduplicatedocument(comapnydb, reportdata.guid);
                    if (!isduplicate)
                        console.log(JSON.stringify(reportdata.guid));
                    
                    else
                        console.log("duplicate");
                }
            }
            //);  
        }
    }
    //);

}

const setScheduleReportJob = () => {

    cron.schedule('0 2,32 * * * *', () => {
        console.log('building ScheduleReport');
        callsummery_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
    //send schedule report on every 30 minutes
    cron.schedule('0 29,59 * * * *', () => {
        console.log('sending ScheduleReport');

        send_callsummery_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    })


}

const setCallActivityScheduleReportJob = () => {

    cron.schedule('0 5,35 * * * *', () => {
        console.log('building call activity  ScheduleReport');
        callactivity_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
    //send schedule report on every 30 minutes
    cron.schedule('0 1,31 * * * *', () => {
        console.log('sending call activity ScheduleReport');

        send_callactivity_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    })


}

const setUpdateCallSummeryJob = () => {

    cron.schedule('0 20,50 * * * *', () => {
        console.log('update call_summery_data');
        update_call_summery_data();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });



}

const setUpdateEMRTdataJob = () => {

    cron.schedule('0 10,40 * * * *', () => {
        console.log('update EMRT data');
        updateemrtdata();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });



}
const setCreateIndexCronJob= ()=>
{

    cron.schedule('* 49 9 * *', () => {
        console.log('setCreateIndexCronJob');
        ;
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      });
    
   
    
}

const checkScheduleCallActivityReport= ()=>
{
    //setInterval(function(){ console.log("Hello"); }, 36000);
    console.log(moment().format("HH:mm:ss"));

    callactivity_report();
    // setInterval(function(){ console.log("Hello");
    // console.log(moment().format("HH:mm:ss"));update_call_summery_data();callsummery_report(); }, 300000);


}


const findAnyNotifyDayScheduleUsers = async (accountDb: any, didnumber, islivereply, company, property): Promise<string[]> => {

    console.log("findAnyNotifyDayScheduleUsers");
    const callflowsoptiontype = await getpropertycallflowoptions(didnumber, property);
    const timezone = property.timezone ? property.timezone : company.timezone;
    var scheduledate = moment().tz(timezone).startOf('day');//tz(timezone);
    scheduledate = scheduledate.add(+1, 'days');
    const scheduledate_start_unix = scheduledate.unix();
    //check this
    // const scheduledate_end_unix= scheduledate.add(+1, 'days').subtract(1,'minutes').unix();
    const contactsSelector = {
        "selector": {
            "pvt_type": "dayschedule",
            "datetime": {
                "$lt": scheduledate_start_unix
            },
            "users.0": {
                "$gt": 0
            },
            "livereply": false,
            "callflowsoptiontype": callflowsoptiontype
        },

        "sort": [
            {
                "datetime": "desc"
            }
        ],
        "limit": 1,
        "use_index":"datetime",
  "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };
    const dayschedulePromise = await getalldocumentsbyproperty(accountDb,contactsSelector);

    // console.log(`Starting to search for users in set`, userIds);
    const dayscheduledocs = await dayschedulePromise;
    console.log(dayscheduledocs);
    console.log("dayscheduledocs");
    var keyArray = [];
    if (dayscheduledocs && dayscheduledocs.length > 0 && dayscheduledocs[dayscheduledocs.length - 1]
        && dayscheduledocs[dayscheduledocs.length - 1].users)
        keyArray = dayscheduledocs[dayscheduledocs.length - 1].users.map(function (item) { return item["key"]; });
    return keyArray;
}
const getOnCallListForSchedule = async (accountDb, property, today_date,weekdayschedulechange) => {
    const property_schedule_type = property.schedule_type;

     var isDailyProperty = property_schedule_type && property_schedule_type.toLowerCase() === "daily";
    var isWeeklyProperty = property_schedule_type && property_schedule_type.toLowerCase() === "weekly";;

    var list = [{
        users: []
    }];
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "on_call_list"
        }
    };
    var oncallListUserList = await getalldocumentsbyproperty(accountDb, contactsSelector);
    oncallListUserList= oncallListUserList.filter(r=>r.enabled);
    oncallListUserList.forEach((cl) => {
        if (!cl.schedule_maintainance_create_time)
            cl.schedule_maintainance_create_time = 0;
    });
    oncallListUserList = oncallListUserList.sort((nt1, nt2) => {
        return (
            nt2.schedule_maintainance_create_time -
            nt1.schedule_maintainance_create_time
        );
    });
    const oncallListUser = oncallListUserList && oncallListUserList.length > 0 ? oncallListUserList[0] : undefined;
   const weekday = isDailyProperty ? 0 :  parseInt(
        (
          ( today_date.diff(weekdayschedulechange, "days")) /
          7
        ).toString()
      );
     
   // var users = oncallListUser ? (weekday === 0 ? oncallListUser.call_users.week1 : oncallListUser.call_users.week2) : [];
    var users = oncallListUser ? (weekday %2=== 0 ? oncallListUser.call_users.week1 : oncallListUser.call_users.week2) : [];
    users.forEach(u => {
        u.key = u.id;
    });
    list[0].users = users;
    return list;
}
const generate_non_custom_schedule=async (property) =>
  {
      console.log("generate_non_custom_schedule")
   var non_custom_schedule:any=  {
    propertyid: "",
    
    data: [
      {
        scheduleid: "77e81ec2-9146-43c0-8bff-93a208fbcb61",
        name: "non custom",
               
        from: {
          hh: "00",
          mm: "00",
          ss: "00",
          a: "am",
        },
        ifrom: 0,
        to: {
          hh: "00",
          mm: "00",
          ss: "00",
          a: "am",
        },
        ito: 24,
        restrictedschedule: [],
        restricted: false,
        hours: 24,
        enabled: true,
        createddate: 1628712524,
        schedule_graph_color: "rgb(205, 220, 57)",
        activateddate: "2021-08-11T20:08:44.523Z",
              },
    ],
    callflowsoptiontype: "",
    pvt_type: "schedule",
    enabled: true,
  };
    non_custom_schedule.propertyid =property.propertyid;
   
    var data: any = non_custom_schedule.data[0];
    var schedule_daytime = property.schedule_daytime;
    const resettime=property.reset_time;
   var timezone = property.timezone; 
    var resettime_datetime=  moment.unix(resettime).tz(timezone);
      const resettimedaynumber= resettime_datetime.day();
     var weekdayschedulechangedaynumber=schedule_daytime&& !isNaN( schedule_daytime.daynumber) ? schedule_daytime.daynumber: resettimedaynumber;
   
     var schedule_daytime_time =
      schedule_daytime && schedule_daytime.time
        ? schedule_daytime.time
        : "12:00 am";
    var t_arr = schedule_daytime_time.toLowerCase().split(" ");
    var hr_m_arr = t_arr[0].split(":");
    var from_hr = String(hr_m_arr[0]).padStart(2, "0");
    var from_mm = String(hr_m_arr[1]).padStart(2, "0");
    const days = {
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    };
    var from = {
      hh: from_hr,
      mm: from_mm,
      ss: "00",
      a: t_arr[1],
    };
    var to = {
      hh: from_hr,
      mm: from_mm,
      ss: "00",
      a: t_arr[1],
    };
    data.days = days;
    data.from = from;
    data.to = to;

    var ifrom = Number(from.hh + "." + from.mm);    
    if (from.a === "pm" && ifrom != 12) 
    {ifrom += 12;
    }
    var ito = Number(to.hh + "." + to.mm);
    if (to.a === "pm" && parseInt(to.hh) != 12) ito += 12;
     if (ito <= ifrom && (ifrom!=12  || (ifrom===12 && to.a === "pm" ))) ito += 24;
     //if (ito <= ifrom || (ito === 12 && to.a === "am")) ito += 24;
    //this is
    data.ito = ito;
    data.ifrom = ifrom;
       data.createddate = property.reset_time
      ? property.reset_time
      : data.createddate;
    var tmp_schedule =non_custom_schedule;
    
 resettime_datetime = resettime_datetime.set({ hour:  ifrom, minute:parseInt( from_mm)});
const  resettime_datetime_unix  =resettime_datetime.unix();
   var weekdayschedulechange= (resettime_datetime.add(weekdayschedulechangedaynumber-resettimedaynumber,"days"));
   if (weekdayschedulechange.unix()>resettime)
    weekdayschedulechange.add(-7,"days")
   data.weekdayschedulechange=weekdayschedulechange;
    return tmp_schedule;
     
      // JSON.parse(JSON.stringify(data((this as any).non_custom_schedule))),
    
  }

const findschedulecallflowusers = async (accountDb, schedule, scheduledate_start_unix, scheduledate_end_unix) => {
    //check this
    const contactsSelector = {
        "selector": {
            "pvt_type": "dayschedule",
            "callflowsoptiontype": schedule.callflowsoptiontype.trim(),

            "scheduleid": schedule.scheduleid,
            "datetime": {
                "$gte": scheduledate_start_unix,
                "$lte": scheduledate_end_unix
            }
        }

    }
   
    const docs = await getalldocumentsbyproperty(accountDb, contactsSelector);

    return docs;
}
const findDayScheduleUsers = async (accountDb:any,schedule:any,islivereply,company,property, isCustomProperty): Promise<string[]> => {
    
   
    const timezone = property.timezone ? property.timezone : company.timezone;
    var scheduledate = moment().tz(timezone).startOf('day');//tz(timezone);
       if (schedule && schedule.ispreviousday)
       scheduledate = scheduledate.add("-1", "days");

    const scheduledate_start_unix = scheduledate.unix();

    const scheduledate_end_unix = scheduledate.add(+1, 'days').subtract(1, 'minutes').unix();

    // console.log(`Starting to search for users in set`, userIds);
    var  dayscheduledocs: any =  await findschedulecallflowusers(accountDb, schedule, scheduledate_start_unix, scheduledate_end_unix) ;
  
    if (!isCustomProperty && (!dayscheduledocs ||dayscheduledocs.length===0) )
    {
        dayscheduledocs=await getOnCallListForSchedule(accountDb, property, scheduledate,schedule.data[0].weekdayschedulechange);
    }
    var keyArray = [];
    if (dayscheduledocs && dayscheduledocs.length > 0 && dayscheduledocs[dayscheduledocs.length - 1]
        && dayscheduledocs[dayscheduledocs.length - 1].users)
        keyArray = dayscheduledocs[dayscheduledocs.length - 1].users.map(function (item) { return item["key"]; });
    return keyArray;
}

const findPropertydocument = async (propertyid: string): Promise<any> => {
    const currentUserSelector = {
        "selector": {

            "pvt_type": "property",
            "enabled": true

        },
        "use_index": "pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };

    var accountDb = nano.use(parseAccountToDatabaseName(propertyid));

    // console.log(`Starting to search for users in set`, userIds);
    const companydocs = await getalldocumentsbyproperty(accountDb,currentUserSelector);
    //console.log(`Found users`, companydocs[0]);
    return companydocs.length > 0 ? companydocs[0] : {};
}


const checkpin = async (pin: string, companyid: string): Promise<any> => {
    const currentUserSelector = {
        "selector": {
            "pvt_type": "user",
            "notify_enabled": true,
            "pin": {
                "$eq": pin
            }

        },
        "use_index": "pvt_type_notify_enabled_pin",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,

    };

   var accountDb = nano.use(parseAccountToDatabaseName(companyid ));

    // console.log(`Starting to search for users in set`, userIds);
    const userdocs = await  getdocumentbyproperty(accountDb,currentUserSelector); //result.docs[0];
    // console.log(`pin users`, userdocs);
    return userdocs;
}


const findDayScheduleuserlist = async (userIds: string[], property): Promise<any> => {

    if (property && property.companyid) {
        const currentUserSelector = {
            'selector': {
                "pvt_type": "user"
            },
            "fields":[ "escalationsettings","msteruser","phonesettings","propertylist", "pin","id","last_name","first_name","notify_enabled","livereplysetting","notificationrulessetting"],
               "use_index":"pvt_type",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            "limit":3000
        };


          var accountDb = nano.use(parseAccountToDatabaseName(property.companyid));

        // console.log(`Starting to search for users in set`, userIds);
        const userdocs = await getalldocumentsbyproperty(accountDb,currentUserSelector);
        //console.log(`Found users`, userdocs);
        return userdocs;
    }
    else {
        return []
    }
}
const generateLivereply = async (userIds: string[], userdocs: any[]): Promise<string[]> => {
    // console.log(`Searching through nesting level ${level}`);

    const livereplypromiss = new Promise<any>((resolve, reject) => {


        var lrdatalist = [];

        userIds.forEach(id => {
            //  if (user.livereplysetting)
            var user = userdocs.find(u => u.id == id);
            if (user && user.livereplysetting) {
                //console.log(user.first_name);
                var lrdata = {
                    name: user.first_name.trim(),
                    userid: user.id,
                    pin: user.pin,
                    first_name: user.first_name.trim(),
                    last_name: user.last_name.trim(),
                    phones: []
                };
                user.livereplysetting.forEach(lr => {
                    // console.log("\nlr.number", lr.number);
                    lrdata.phones.push({
                        "callingnumber": "+1" + lr.number,
                        "ring": 30
                    });
                });
                lrdatalist.push(lrdata);
            }

        });

        resolve(lrdatalist);
    });


    // console.log(`Starting to search for users in set`, userIds);
    const lrresult = await livereplypromiss;
    // console.log(`Found lrresult`, lrresult);




    return lrresult;
};

const generateNoticationreply = async (userIds: string[], userdocs: any[]): Promise<string[]> => {
    // console.log(`Searching through nesting level ${level}`);

    const livereplypromiss = new Promise<any>((resolve, reject) => {
        // console.log("generateNoticationreply 22222");

        var ntdatalist = [];
        userIds.forEach(id => {
            //  if (user.livereplysetting)


            var user = userdocs.find(u => u.id == id);


            if (user && user.notificationrulessetting) {
                console.log(user.first_name);
                var ntdata = {
                    name: user.first_name.trim(),
                    first_name: user.first_name.trim(),
                    last_name: user.last_name.trim(),
                    userid: user.id,
                    data: []
                };
                user.notificationrulessetting.forEach(nt => {
                    const optinObj=nt.type.toLowerCase()!="sms" ? {optin:true}:
                        user.phonesettings && user.phonesettings.settings&& user.phonesettings.settings.find(s=>s.number==nt.number);
  
                    if (optinObj && optinObj.optin){
                    var waittime1 = nt.notificationwait.toString().replace(/\D/g, '').trim();
                    var waittime = 60 * waittime1;
                    ntdata.data.push({
                        "callingnumber": "+1" + nt.number,
                        type: nt.type.toLowerCase(),
                        "waittime": waittime,
                        pin: user.pin


                    });
                }

                });
                ntdatalist.push(ntdata);
            }

        });

        resolve(ntdatalist);
    });


    // console.log(`Starting to search for users in set`, userIds);
    const lrresult = await livereplypromiss;
    //console.log(`Found lrresult`, lrresult);




    return lrresult;
};


app.get('/property/:propertyid/handoffrules', async (req, res) => {
    //console.log ("fffff");

    const propertyid = req.params.propertyid;


    res.send("sucess");

});

app.get('/property/:propertyid/:didnumber/schedule', async (req, res) => {
    const didnumber = req.params.didnumber;
    var type = "";
    const propertyid = req.params.propertyid;//441202171b923a9cc3a8ab36f9728294
    debugMessage(log4jslogger, "Schedule API ");
    debugMessage(log4jslogger, "didnumber---" + JSON.stringify(didnumber));
    debugMessage(log4jslogger, "propertyid---" + JSON.stringify(propertyid));
    var lrresult = [];
    var intmaxhold = '';
    try {
        var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
        const property = await getpropertyInfo(propertyid);
            
        if (property.liveEscalation === undefined || property.liveEscalation === true) {
            console.log('property.liveEscalation-------------------------------', property.liveEscalation);

            const companydbname = parseAccountToDatabaseName(property.companyid);
            const company = await getcompanyInfo(property.companyid);
            var schedule = await findSchedule(accountDb, true, didnumber, property, company);
            var userIds = schedule ? await findDayScheduleUsers(accountDb, schedule, true, company, property, true) : [];
            var userdocs = await findDayScheduleuserlist(userIds, property);
            userdocs= userdocs.filter(u=> userIds.find(u1=>u1=== u.id));
            lrresult = await generateLivereply(userIds, userdocs);
            const strmaxhold = schedule ? schedule.livereplyduration : '120';
            intmaxhold = isNaN(strmaxhold) ? 120 : strmaxhold;
            var callflowsoptiontype;
            if (schedule) {
                callflowsoptiontype = schedule.callflowsoptiontype
            }
        }

        // var result:any= notificationdata.data.find(d => d.propertyid === propertyid && d.didnumber== didnumber    )
        var result: any = {
            "didnumber": didnumber,
            "propertyid": propertyid,
            "type": "live",
            "maxonholdtime": intmaxhold,
            "label": callflowsoptiontype,
            "data": lrresult
        };
        debugMessage(log4jslogger, "live result result:---" + JSON.stringify(result));
        //console.log("\n live result result:",  JSON.stringify( result));
        res.send(JSON.stringify(result));
        //res.send(  result);
    }
    catch (ex) {
        res.statusCode = 500;
        res.send('failed');
        debugMessage(log4jsexceptionlogger, "Schedule API error");
        debugMessage(log4jsexceptionlogger, "didnumber---" + JSON.stringify(didnumber));
        debugMessage(log4jsexceptionlogger, "propertyid---" + JSON.stringify(propertyid));

    }

})

//propertycalloutnumber

app.get('/property/:propertyid/propertycalloutnumber', async (req, res) => {
    console.log("propertycalloutnumber");

    var propertyid = req.params.propertyid;

    var result = {
        data: {

            calloutnumber: "",
            propertyid: propertyid
        }

    }

    const property = await getpropertyInfo(propertyid);;
    result.data.calloutnumber = property ? property.phone : "";
    res.send(result);

})

app.get('/property/:propertyid/:phonenumber', async(req, res) => {
    console.log("phonenumber");
 
    var propertyid=req.params.propertyid;
    var phonenumber=req.params.phonenumber;
   var property=await findPropertydocument(propertyid);
   var users;
   if (property && property.companyid)
   {
        var companyid= property.companyid;
        
        const allusers=  await getusers(companyid);
        const notify_enabled_users = allusers.filter(r=>r.notify_enabled===true);
       const property_users= notify_enabled_users.filter (f=> f.user_type=== "master" ||( Array.isArray( f.propertylist) && f.propertylist.find(p=>p.id===propertyid &&p.enabled=== true)));
       users= property_users.filter(u=>u.phonesettings && u.phonesettings.settings&& u.phonesettings.settings.find(s=>s.number===phonenumber));
      
   }
   var result:any= {
    data:{verified:false,
        propertyid:propertyid}
};
if (users && users.length===1)
{
    var pinuser=users.length>1 ? {
        first_name:"Shared",
        last_name:"Number"
    }:users[0];
    const firstname =pinuser.first_name.trim();
    const last_name=pinuser.last_name.trim();
    result.data.verified=true;
    result.data.agenttid=pinuser.id;
    result.data.agenttname=firstname;
    result.data.agenttname_firstname=firstname;
    result.data.agenttname_last_name=last_name;
   
}

res.send(result);
})
app.get('/property/:propertyid/:didnumber/:boxid/pin/:pin', async (req, res) => {
    console.log("pin");
    const didnumber = req.params.didnumber;
    var propertyid = req.params.propertyid;
    var property = await findPropertydocument(propertyid);
    var comapnyid = property.companyid;
    console.log("\n comapnyid ", comapnyid);
    var pin = req.params.pin;
    const isHellospeakAdminPin= pin==="*****";
    var pinuser=isHellospeakAdminPin ? {
        first_name:"HelloSpoke",
        last_name:"Admin",
        id:"1234"
    }:await checkpin(pin,comapnyid);
    var result: any = {
        data:{verified:false,
            propertyid:propertyid}
    };
    if (pinuser)
    {
        const firstname = pinuser.first_name.trim();
        const last_name = pinuser.last_name.trim();
        result.data.verified = true;
        result.data.agenttid = pinuser.id;
        result.data.agenttname = firstname;
        result.data.agenttname_firstname = firstname;
        result.data.agenttname_last_name = last_name;

    }

    res.send(result);

})

app.get('/company/:companyid/property/:propertyid/pin/:pin/:userid', async (req, res) => {
    console.log("user pin pin");

    var comapnyid = req.params.companyid;
    console.log("\n comapnyid ", comapnyid);
    var pin = req.params.pin;
    const userid = req.params.userid;
    var pinuser = await checkpin(pin, comapnyid);
    var result: any = {
       data:{verified:false,
        }
    };
   if (pinuser && pinuser.id!=userid)
   {
        result.data.verified = true;
        result.data.agenttid = pinuser.id;
        result.data.agenttname = pinuser.first_name;

    }

    res.send(result);

})
app.get('/property/:propertyid/:didnumber/schedule/notify', async (req, res) => {
    const didnumber = req.params.didnumber;
    const propertyid = req.params.propertyid;

    try {

        const result = await updateNOtifySchedule(propertyid, didnumber);// getNOtifySchedule(propertyid, didnumber)//  
        //console.log("dddddddddddddddddddddddddddddddddddd",JSON.stringify( result));
        res.send(JSON.stringify(result));
    } catch (ex) {
        res.statusCode = 500;
        res.send('failed');
        debugMessage(log4jsexceptionlogger, "Notify API error");
        debugMessage(log4jsexceptionlogger, "didnumber---" + JSON.stringify(didnumber));
        debugMessage(log4jsexceptionlogger, "propertyid---" + JSON.stringify(propertyid));

        debugMessage(log4jsexceptionlogger, "exception---" + JSON.stringify(ex));

    }

})


app.get('/property/:propertyid/:callflowoption/vmboxemail', async (req, res) => {
    //console.log("\n\n vmboxemail\n");
    const propertyid = req.params.propertyid;
    const callflowoption = req.params.callflowoption;
    var payload = {
        data: {
            callflowoption: callflowoption,
            emaillist: []
        }
    };
    const dbname = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(dbname);
    //check here
    const contactsSelector = {
        'selector': {
            "pvt_type": "escalationemaillist",
            "callflowoption": callflowoption
        },
        limit: 30000,
        "use_index":"pvt_type_callflowoption",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var escalationemailobj = await getdocumentbyproperty(accountDb, contactsSelector);
    var emaillist = [];
    if (escalationemailobj && escalationemailobj.emaillist)
        emaillist = escalationemailobj.emaillist.map(a => a.email);

    payload.data.emaillist = emaillist;

    console.log(payload);
    // vmboxemail(payload);

    res.send({

        "Status": "200",
        "list": payload,
        "messages": "Email sent  successfully",

    });

})

app.post('/sendoptinsms/:companyid/:phonenumber/:optin',  async(req, res, next) => {
        console.log("sendoptinsms\n", req.body);
        const to_number= req.params.phonenumber;
        const companyid= req.params.companyid;
        const optin= req.params.optin==="true";
        const messaging_number= process.env.MESSAGINGNUMBER;

        insertIntoOptin(companyid,to_number , optin);
        const payload = {
            to:to_number,
            from:messaging_number,
            "messagetext":   "You’ve successfully opted in to receive HelloSpoke Notify messages, text STOP at any point to opt out"
        };
        
        
        
        if (optin)
            await sendNotifySMS(payload);
    
    res.sendStatus(200);
    
    
    });

app.post('/property/:propertyid/:didnumber/callinfolog', async (req, res) => {
    console.log("\n\n callinfo log\n");
    debugMessage(log4jslogger, "\n****  callinfo log  ****\n");

    const propertyid = req.params.propertyid;
    const didnumber = req.params.didnumber.substring(0, 10);
    debugMessage(log4jslogger, `propertyid ${propertyid}`);
    debugMessage(log4jslogger, `didnumber ${didnumber}`);
    const payload = req.body;
    debugMessage(log4jslogger, `infolog ${JSON.stringify(payload.guid)}`);
    payload.didnumber = didnumber;
    payload.propertyid = propertyid;
    const result = await insertcallinfolog(payload);
    res.send({

        "Status": "200",

        "messages": "Call info log  log inserted  successfully",

    });

})

app.get('/property/:propertyid/callinfolog/guid/:guid', async (req, res) => {
    console.log("\n\n callinfo log\n");

    const propertyid = req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    const property = await getpropertyInfo(propertyid);
    const companyid = property.companyid;
    const dbname = parseAccountToDatabaseName(companyid);
    const comapnydb = nano.use(dbname);

    const guid = req.params.guid;

    const contactsSelector = {
        'selector': {
            "pvt_type": "callinfolog",
            "guid": guid
        },
        "use_index": "pvt_type_guid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit: 30000
    }
    var callinfologs = await getalldocumentsbyproperty(comapnydb, contactsSelector);

    // console.log("reportdocs\n",  reportdocs);

    res.send({

        "Status": "200",

        callinfologs: callinfologs

    });


})
app.get('/property/:propertyid/:incidentid/notes', validateJWT, async (req, res) => {
    console.log("incident notes");
    var propertyid = req.params.propertyid;
    var incidentid = req.params.incidentid
    //check here
    const contactsSelector = {
        'selector': {
            "incidentid": incidentid,
            "pvt_type": "incidentnotes"
        },
        limit: 30000,
        "use_index":"pvt_type_incidentid",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }

    var dbname = parseAccountToDatabaseName(propertyid);
    var db = nano.use(dbname);
    var notes = await getalldocumentsbyproperty(db, contactsSelector);

    //console.log("incident notes\n",  notes);

    res.send({

        "Status": "200",

        notes: notes

    });
})

app.post('/property/:propertyid/:incidentid/notes', validateJWT, (req, res) => {
    console.log("\n\n incidentid notes\n");

    const propertyid = req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    const payload = req.body;
    const dbname = parseAccountToDatabaseName(propertyid);


    const result = insertincidentnotes(payload, dbname, propertyid);

    res.send({

        "Status": "200",

        "messages": "CDR log inserted  successfully",

    });

})

app.post('/property/:propertyid/reportdata', async (req, res) => {
    console.log("\n\n reportdata  log\n");
    const propertyid = req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;

    const payload = req.body;
    const dbname = parseAccountToDatabaseName(propertyid);

    const result = await insertreportdata(payload, dbname);



    res.send({

        "Status": "200",

        "messages": "CDR log inserted  successfully",

    });

})




app.get('/property/:propertyid/chart/:type/:bussinesshours/:nonbussinesshours/:startime/:endtime', validateJWT, async (req, res) => {

    console.log("\n\n get chart  log\n");
    var response_result = [];

    const propertyid = req.params.propertyid;
    const bussinesshours = req.params.bussinesshours;
    const nonbussinesshours = req.params.nonbussinesshours;
    const startime = parseInt(req.params.startime);
    const endtime = parseInt(req.params.endtime);

    console.log(startime);
    console.log(endtime);
    if (bussinesshours === "true" || nonbussinesshours === "true") {
        const property = await getpropertyInfo(propertyid);
        const propertydbname = parseAccountToDatabaseName(propertyid);
        const propertydb = nano.use(propertydbname);
        const type = Number(req.params.type);

        var query = {
            "bool": {
                "must": [
                    {
                        "term": {
                            "propertyid": propertyid
                        }
                    },
                    {
                        "range": {
                            "incidentdate": {
                                "gte": startime,
                                "lte": endtime,
                                "boost": 2.0
                            }
                        }
                    },
                    {
                        "bool": {
                            "should": [

                                {
                                    "bool": {
                                        "must": [
                                            {
                                                "query_string": {
                                                    "query": "(removefromreport:false)"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                "should": [
                    {
                        "term": {
                            "duringbussinesshours": true
                        }
                    },
                    {
                        "term": {
                            "duringbussinesshours": false
                        }
                    }
                ],
                "minimum_should_match": 1
            }
        }
        if (bussinesshours === "false" || nonbussinesshours === "false") {
            query.bool.should[0].term.duringbussinesshours = bussinesshours === "true";
            query.bool.should[1].term.duringbussinesshours = bussinesshours === "true";
        }
        const options = {
            method: 'POST',
            url: `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_search`,
            headers:
            {
                'Content-Type': 'application/json',
            },
            body:
            {
                "sort": [],
                "query": query,
                size: 9999
            },
            json: true
        };
        const resultpromise = new Promise(async (resolve, reject) => {
            Request(options, function (error, response, body) {
                if (error) {
                    console.log(error + '//' + 'error');
                    resolve(error);
                }
                else {
                    let result = body.hits && body.hits.hits ? body.hits.hits.map(a => a._source) : [];
                    resolve(result)
                }
            });
        })
        var reportdocs = await resultpromise;
        const timezone = property.timezone ? property.timezone : 'America/Kentucky/Louisville';

        const incidentdatetime = (time, type) => {

            var retunvalue: any = -1;
            if (type === 0)//daily
            {
                retunvalue = moment.unix(time).tz(timezone).format('H');
            }
            else if (type === 1)
                retunvalue = moment.unix(time).tz(timezone).day();
            else if (type === 2) {
                retunvalue = parseInt(moment.unix(time).tz(timezone).format("M")) - 1;

            }
            return retunvalue;
        }
        const serachcount = (dataset, search) => {
            var count = dataset.reduce(function (n, val) {
                return n + (val == search);
            }, 0);

            return count;
        }
        const groupBy = key => array =>
            array.reduce(
                (objectsByKeyValue, obj) => ({
                    ...objectsByKeyValue,
                    [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(incidentdatetime(obj.incidentdate, type))
                }),
                {}
            );


        const groupByType = groupBy('type');

        reportdocs = groupByType(reportdocs);
        var reportdocskeys = Object.keys(reportdocs);

        reportdocskeys.forEach(k => {

            var seriesdata = reportdocs[k];
            var seriesdatavalue = [];
            for (var i = 0; i < 24; i++) {
                //   console.log(i);

                var tmpvalue = {
                    value: serachcount(seriesdata, i)
                };
                seriesdatavalue.push(tmpvalue);
            }
            var tmp = {
                seriesname: k,
                hourdata: seriesdatavalue
            }

            response_result.push(tmp);
        });
    }


    res.send({

        "Status": "200",

        chartdata: response_result

    });


})
app.post('/elasticsearch', validateJWT, async (req, res) => {
    console.log('ElasticSearch ');
    console.log(JSON.stringify(req.body));
    const payload = req.body;
    const result1 = await getelasticsearchdata(payload.payload);
    res.send({ result: result1 });
});


app.get('/property/:propertyid/reportdata', validateJWT, async (req, res) => {
    console.log("\n\n get reportdata  log\n");
    let body = {
        size: 20,
        from: 0,
        query: {
            "match_all": {}
        }
    };
    search('reportdocs', body)
        .then(results => {
            var hits = results.hits.hits

            let result1 = hits.map(a => a._source);
            res.send({

                "Status": "200",

                reportdocs: result1

            })
        })
})
app.post('/webhook/VoicemailEmail/Notification', async (req, res) => {
    console.log("email notification ");
    var payload = req.body;
    // console.log(JSON.stringify(payload));
    const fields = payload.fields;
    const indexname = payload.name;
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];
        const account_id = parseDatabaseNameToAccount(dbname);//"d0ca5df0ae801c7f8963a7605da860c9";//"2047a7abb35d2ee72092efca120a0119";//
        console.log(account_id);
        await setKazooAccountEmailNotification(req, account_id)
    }
    res.send({

        "Status": "200",

        "messages": "voicemail successfully",

    });

})

app.post(
    "/webhook/callbackRecordingUpload",
    bodyParser.text(),
    async (req, res) => {
        const body = JSON.parse(req.body);
        console.log("/webhook/callbackRecordingUpload", body);
        if (body && body.Message) {
            const message = JSON.parse(body.Message);
            /* GET VOICEMAIL EMAIL HISTORY DATA* */
            const voicemailEmailHistoryDb = newNano.use<EmailHistoryDb>(
                NOTIFY_VOICEMAIL_EMAIL_HISTORY_DB
            );
            const smtpConfig = {
                host: process.env.SMTP_MAIL_SERVER,
                port: 25,
                secure: false, // Use TLS
                auth: {
                    user: process.env.SMTP_MAIL_SERVER_USERNAME,
                    pass: process.env.SMTP_MAIL_SERVER_PASSWORD,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            };
            message.Records.forEach(async (data) => {
                const s3 = new AWS_SDK.S3({
                                        accessKeyId: AWS.config.accessKeyId,
                                        signatureVersion: AWS.config.signatureVersion,
                                        region: data.awsRegion,
                                        secretAccessKey: AWS.config.secretAccessKey,
                                    });
                const s3bucketname = data.s3.bucket.name;
                const filename = data.s3.object.key;
                const guid = filename.split("notify_callback_")[1].split("_")[0];

                /* GET S3 BUCKET ATTACHMENT* */
                const filetype = "mp3";


                const results = await voicemailEmailHistoryDb.find({
                    selector: {
                        type: "EmailHistory",
                        guid,
                    },
                    use_index: "type-guid-index",
                });
                const transporter = nodemailer.createTransport(smtpConfig);

                // Tracking logic to wait for file to be completely uploaded
                const trackingDb = newNano.use<EmailHistoryTrackingDb>(
                    NOTIFY_VOICEMAIL_EMAIL_HISTORY_DB
                );
                const trackingId = uuid();

                const results2 = await trackingDb.find({
                    selector: {
                        type: "EmailHistoryTracking",
                        guid,
                    },
                });
                if (results2.docs.length > 0) {
                    // Already tracking id was uploaded so we need to update it
                    let trackingData = results2.docs[0];
                    trackingData.trackingId = trackingId;
                    await trackingDb.insert(trackingData);
                } else {
                    await trackingDb.insert({
                        type: "EmailHistoryTracking",
                        guid,
                        trackingId,
                    });
                }
                setTimeout(async () => {
                    try{
                        const resultData = await trackingDb.find({
                            selector: { type: "EmailHistoryTracking", guid },
                        });
                        if (resultData.docs.length < 1) {
                            console.error(
                                `Error case for guid ${guid}, it should have at least one result`
                            );
                        } else {
                            const resultDoc = resultData.docs[0];
                            if (resultDoc.trackingId == trackingId) {
                                const fileurl = s3.getSignedUrl("getObject", {
                                                                        Bucket: s3bucketname,
                                                                        Key: filename,
                                                                });
                                /* SEND EMAIL IN REPLY TO PREVIOUS MAIL FOR CALLBACK RECORDING */
                                results.docs.forEach(async (element: any) => {
                                    const emailMessage = {
                                        from: process.env.SMTP_MAIL_SERVER_FROM,
                                        to: element.toEmail,
                                        inReplyTo: element.emailReferenceId,
                                        references: [element.emailReferenceId],
                                        subject: element.emailSubject,
                                        text: `Callback from Maintenance staff to Resident`,
                                        attachments: [
                                            {
                                                filename: filename,
                                                contentType: "application/mp3",
                                                path: fileurl,
                                            },
                                        ],
                                    };

                                    try {
                                        let info = await transporter.sendMail(
                                            emailMessage
                                        );
                                        console.log(`Success`);
                                    } catch (err) {
                                        console.log(
                                            `Error while sending callback recording email: `,
                                            err
                                        );
                                    }
                                });
                                // @ts-ignore
                                resultDoc._deleted = true;
                                await trackingDb.insert(resultDoc).catch((e)=>{
                                    console.log('Error while deleting the tracking history',e.message);
                                });
                            } else {
                                console.log(
                                    `Tracking id was changed by some another process for guid : ${guid}`
                                );
                            }
                        }
                    }
                    catch(e){
                        console.error(`Error while sending callback email `,e);
                    }
                }, 320000); // 5 mins and 20 seconds
            });
        }
        res.send("OK");
    }
);



 app.post('/webhook/createindex', async (req, res) => {
    console.log("createindex ");
    var payload = req.body;
    console.log(JSON.stringify(payload));
    const fields = payload.fields;
    const indexname = payload.name;
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];
        console.log(dbname);
        await createindex(dbname, fields, indexname)
    }
    res.send({

        "Status": "200",

        "messages": "voicemail successfully",

    });
})

    const voicemaillog= async(payload)=>
    {
        const propertyid= payload.account_id;
        const property= await getpropertyInfo(propertyid);
        var companyid=property.companyid;
        const propertydbname=parseAccountToDatabaseName(propertyid);
        const propertydbwithmonthname=getMonthDbName(propertydbname);
        const propertydb= nano.use (propertydbwithmonthname);
        payload.eventtype="voicemail";

        setTimeout(() => {
            deleteVoiceMessages(propertyid,payload.voicemail_box);
        }, 4000); 
        const result =await insertdtmfinfo(payload,propertydbwithmonthname)   ;
    
        await parseVoiceMessage(propertydb,payload,property);
    }

    app.post('/webhook/voicemail', async (req, res) => {
        console.log("voice mail ");
        debugMessage(log4jslogger,"******voice mail******");
              
        var payload =req.body ;
        console.log(JSON.stringify(payload));
        debugMessage(log4jslogger,`dtmf log ${payload.call_id }`); 
        voicemaillog(payload)
        
       
        res.send({  
    
            "Status":"200",
         
            "messages":"voicemail successfully",
         
         });
    
    })
    
   app.post('/webhook/media', async (req, res) => {
    console.log("media mail ");
    var payload = req.body;
    console.log(req);

    res.sendStatus(200);

})
app.post('/webhook/escalationemail', async (req, res) => {
        console.log("s3messageinfo escalationemail ");
       
        res.sendStatus(200);
    
    })
    app.all('/webhook/transcribe-response',bodyParser.text(),async(req,res)=>{
        debugMessage(log4jslogger, `Transcribe Notify Response`);
        console.log(req.body);
    
        const body= safeJsonParse( req.body)
        if (body && body.Message){
            parseTranscribeSNS ( safeJsonParse( req.body).Message);
        }
        res.send("OK");
    })

    app.post('/webhook/s3messageinfo', async (req, res) => {
        console.log("s3messageinfo  ");
        debugMessage(log4jslogger,"******s3messageinfo******");
        //await inserts3notification(req);
        var bodyarr = []
        req.on('data', function(chunk){
          bodyarr.push(chunk);
        })
        
        req.on('end',async  function(){
            console.log("bodyarr")
            console.log( bodyarr.join('') )
            var bodyarr2 = JSON.parse(bodyarr.join(''));
            inserts3notification(bodyarr2);
            const message=JSON.parse( (bodyarr2.Message));
            debugMessage(log4jslogger,`voice mail SNS ${bodyarr2.Message}`);``
            message.Records.forEach(record => {
                    console.log("record")
                    console.log(record);
                    debugMessage(log4jslogger,`record ${JSON.stringify(record) }`);``

                    var notification =record;
                    console.log("notification")
                    console.log(notification)
                    var s3= notification.s3;
                    console.log ("s3");
                    
                    console.log (s3);
                    if (s3.object)
                    {
                        const s3Onje3ct= s3.object;
                        console.log("s3Onje3ct");
                        console.log(s3Onje3ct);
                        setTimeout(() => {
                            parseS3Notifcation(s3Onje3ct,99);
                        }, 40000); 
                       
                    }
               });
        })  
        console.log( "here i am " )
       
        res.status(200);
        res.send(`ok`);
    
    })

app.get('/status', (req: IRequest, res: IResponse) => {
    return res.status(200).json({ status: 200 });
});
// app.get("/realpage_work/companies/", async (req:IRequest,res:IResponse)=>{
//     let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
//     realPageDb.find({selector:{}},(err,response)=>{    if (err){
//             return res.status(500).json({ status:500, message:"Internal Server Error" });
//         }
//         res.status(200).json({ status:200, companies: response.docs })
//     });
// });

app.get("/realpage_work/companies/:pmcid", async (req: IRequest, res: IResponse) => {
    let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
    try {
        console.log("getting all real page companies");
        const response = await realPageDb.find({ selector: { type: "property", 
                                                             pmcid: req.params.pmcid },
                                                                limit: 3000,
                                                                "use_index":"type_index",
                                                                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false });
        if (response.docs.length < 1) {
            return res.status(404).json({ status: 404, message: "Property not found" });
        }
        let document = response.docs[0];
        delete document["_id"];
        delete document["_rev"];
        res.status(200).json({ status: 200, data: response.docs[0] })
    } catch (e) {
        res.status(500).json({ status: 500, message: "Internal Server Error" })
    }
});
app.get("/realpage_work/companies/", async (req: IRequest, res: IResponse) => {
    let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
    try {
        console.log("getting all real page companies");
        const response = await realPageDb.find({ selector: { type: "property" }, 
                                                             limit: 3000,
                                                             "use_index":"type_index",
                                                              "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false  });
        res.status(200).json({ status: 200, companies: response.docs })
    } catch (e) {
        res.status(500).json({ status: 500, message: "Internal Server Error" })
    }
});
// app.get("/realpage/companies/properties/:companyId",(req:IRequest,res:IResponse)=>{
app.get("/realpage/companies/", async (req: IRequest, res: IResponse) => {
    let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
    try {
        console.log("getting all real page companies");
        const response = await realPageDb.find({ selector: { type: "property" },
                                                     fields: ["pmcid", "pmcname"],
                                                    "use_index":"type_index",
                                                    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false  });
        res.status(200).json({ status: 200, companies: response.docs })
    } catch (e) {
        res.status(500).json({ status: 500, message: "Internal Server Error" })
    }
});
async function getAllRealPageMappings(): Promise<{ siteId: string }[]> {
    const notifyDb = newNano.db.use(NOTIFY_REALPAGE_MAPPING_DB);
    const response: newNanoClient.MangoResponse<any> = await notifyDb.find({ selector: {}, fields: ["siteId"] });
    return response.docs;
 }
// async function getAllRealPageMappings(): Promise<{ siteId: string }[]> {
//     const notifyDb = newNano.db.use(NOTIFY_REALPAGE_MAPPING_DB);
//     const response: newNanoClient.MangoResponse<any> = await notifyDb.find({ selector: {}, fields: ["siteId"] });
//     return response.docs;
// }

// app.get("/realpage/companies/properties/:companyId", async (req: IRequest, res: IResponse) => {
//     try {
    app.get('/status', (req: IRequest, res: IResponse) => {
        return res.status(200).json({ status: 200 });
    });
    app.get("/realpage_work/companies/", async (req:IRequest,res:IResponse)=>{
        let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
        realPageDb.find({
            selector: { type: "property" ,
                        "use_index":"type_index",
                        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false }
        },(err,response)=>{
            if (err){
                return res.status(500).json({ status:500, message:"Internal Server Error" });
            }
            res.status(200).json({ status:200, companies: response.docs })
        });
    });
    // app.get("/realpage/companies/properties/:companyId",(req:IRequest,res:IResponse)=>{
    app.get("/realpage/companies/", async (req: IRequest, res: IResponse) => {
        let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
        try {
            console.log("getting all real page companies");
            const response = await realPageDb.find({ selector: { type: "property" }, 
                                                                fields: ["pmcid", "pmcname"],
                                                                "use_index":"type_index",
                                                                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false  });
            res.status(200).json({ status: 200, companies: response.docs })
        } catch (e) {
            res.status(500).json({ status: 500, message: "Internal Server Error" })
        }
    });
    
//});
app.get("/realpage/companies/properties_work/:companyId", async (req: IRequest, res: IResponse) => {
    try {
        let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);

        const allMappings = await getAllRealPageMappings();
        const reservedSites = allMappings.map((mapping) => mapping.siteId);

        const response = await realPageDb.find({ selector: { "pmcid": req.params.companyId, 
                                                             "type": "property" },
                                                              use_index: "pmcid_type_index",
                                                            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false  });
        const docs = response.docs;
        if (docs.length < 1) {
            return res.status(404).json({ status: 404, message: "Property not found" });
        }
        const property = docs[0];
        const sitesCount = Object.keys(property["sites"])
        let properties = sitesCount.reduce((result, siteCounter) => {
            const site = property["sites"][siteCounter];            
            if (reservedSites.includes(site.siteid) === false) {
                result.push(site);
                result.push({
                    siteId: site.siteid,
                    siteNumber: site.sitenumber,
                    siteName: site.sitename,
                    categories: site.categories,
                    areas: site.areas,
                    priorities: site.priorities,
                });
            }
            console.log('site+++++++++++++++++',result);
            return result;
        }, [])
        res.status(200).json({ status: 200, properties })
    } catch (e) {
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
//const dtmfinfolog= async(payload)=>
    
    app.get("/realpage/companies/properties/:companyId", async (req: IRequest, res: IResponse) => {
        try {
            let realPageDb = realPageNano.db.use(process.env.REALPAGE_COUCH_DB_NAME);
    
            const allMappings = await getAllRealPageMappings();
            const reservedSites = allMappings.map((mapping) => mapping.siteId);
    
            const response = await realPageDb.find({ selector: { "pmcid": req.params.companyId,
                                                                 "type": "property" }, 
                                                                use_index: "pmcid_type_index",
                                                                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false  });
            const docs = response.docs;
            if (docs.length < 1) {
                return res.status(404).json({ status: 404, message: "Property not found" });
            }
            const property = docs[0];
            const sitesCount = Object.keys(property["sites"])
            let properties = sitesCount.reduce((result, siteCounter) => {
                const site = property["sites"][siteCounter];
                if (reservedSites.includes(site.siteid) === false) {
                    result.push({
                        siteId: site.siteid,
                        siteNumber: site.sitenumber,
                        siteName: site.sitename,
                    });
                }
                return result;
            }, [])
            res.status(200).json({ status: 200, properties })
        } catch (e) {
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    });
    const dtmfinfolog= async(payload)=>
{
    const propertyid= payload.account_id;
    const property= await getpropertyInfo(propertyid);
    var companyid=property.companyid;
    const propertydbname=parseAccountToDatabaseName(propertyid);
    const propertydbwithmonthname=getMonthDbName(propertydbname);
    const result =await insertdtmfinfo(payload,propertydbwithmonthname)   ;
    
    if (payload.DTMF && payload.DTMF>=0)
    {
        await insertDTMFInforeport(payload,propertydbwithmonthname,property)  ;   
       
    }
    else
    {

        //we wait for 1 so user can choose menu options dtmf inof 
       
          
        setTimeout(()=>{ insertcallinitreport(payload,propertydbwithmonthname,property,undefined)  },70000); 
        
    }
}
app.post('/property/dtmfinfo', async (req, res) => {
    console.log("\n\n dtmf log\n");
    const payload =req.body ;
    debugMessage(log4jslogger,"******dtmf log******");
    console.log("\n\n dtmf log\n", payload);
    debugMessage(log4jslogger,`dtmf log ${payload.guid }`); 
    dtmfinfolog(payload);
    
    res.send({  

        "Status":"200",
     
        "messages":"DTMF inserted  successfully",
     
     });

});

//serverlog
app.post('/serverlog', validateJWT, async (req, res) => {
    console.log("serverlog \n");
    const payload = JSON.parse(req.body.payload);
    console.log(payload);
    const message = payload.message;
    const method = payload.method;

    serverlog("info", message, method);
    res.send("log inserted");

})



app.get('/companies/:companyid/properties/:propertyid/callflow', validateJWT, (req, res) => {
    const _accountid = req['decoded'].account_id;
    const propertid = req.params.propertyid;
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertid}/callflows?filter_not_ui_metadata.origin=voip&filter_not_ui_metadata.origin=callqueues&_=1578197504745`, (err, response, body) => {

                if (err) {
                    console.log("\n\n\nbody callflow \n", err);
                    res.send(err);
                    return;
                }
                //console.log("\n\n\nbody callflow \n", body);
                res.send(body);
            });


    });
})



app.get('/companies/:companyid/properties/:propertyid/phonenumbers', validateJWT, (req, res) => {
    const _accountid = req['decoded'].account_id;
    const propertid = req.params.propertyid;
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertid}/phone_numbers?paginate=false`,
                (err, response, body) => {

                    if (err) {
                        // console.log("\n\n\nbody phone_numbers \n", err);
                        res.send(err);
                        return;
                    }
                    //  console.log("\n\n\nbody phone_numbers \n", body);
                    res.send(body);
                });


    });
})

app.get('*', (req, res) => {
    let filename = req.path;
    if (filename.indexOf('.') >= 0) {
        const filePath = path.join(__dirname, "public/dist/", filename);
        //         console.log(filePath);
        fs.stat(filePath, (err, stat) => {
            if (err) {
                return res.status(404).send('Not found');
            }
            res.sendFile(path.join(__dirname, "public/dist/", filename));
        })
    } else {
        res.sendFile(path.join(__dirname, "public/dist/", 'index.html'));
    }
});


app.get('/property/:propertyid', validateJWT,async (req:any , res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    //console.log('added properties  ', parseAccountToDatabaseName(req['decoded'].account_id));
    const companyid = req.params.companyid;
    const contactsSelector = {
        "selector": {
            "pvt_type": "property"
        },
        "use_index": "pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000

    }
   res.statusCode = 200;
   var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector);
       var result={
           docs:docs
       };
   res.send(JSON.stringify(result));
})




app.post('/sendsms', async (req, res, next) => {
    console.log("sendsms\n", req.body);


    const payload = req.body;
    const messaging_number = process.env.MESSAGINGNUMBER;
    payload.from = messaging_number;
    const response = await sendNotifySMS(payload);
    console.log("response");
    console.log(response);


    res.send(response);


});

app.post('/webhook/schedulereport', async (req, res) => {
    console.log("schedulereport");
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));//&& d==="account/44/12/02171b923a9cc3a8ab36f9728294"
    dbnames.forEach(async (dbname) => {
        var companyid = parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo(companyid);
        if (company) {

            const companyuserlist: any = await getComapnyUsers(dbname);
            if (companyuserlist && Array.isArray(companyuserlist) && companyuserlist.length > 0) {

                const companyschedulereportinfo = {
                    companyid: companyid,
                    companydbname: dbname,
                    users: companyuserlist
                }
               await  send_callsumery_report(companyschedulereportinfo);
            }


        }
    });

    res.send("done");

})
app.post('/webhook/optin', async (req, res) => {
    console.log("\n\n webhook optin\n");
   // const opt_out_messagetext = "You have unsubscribed from HelloSpoke Notify SMS messages. To resubscribe you must opt in again via the Notify portal.";
 
     const incomingMessages =req.body ;
    
     incomingMessages.forEach(async (m) => {
         
         const mtext= m.message.text.toLowerCase();
         var toarr= m.message.to;
         var from= m.message.from.replace("+1","");;
         var phone=toarr[0].replace("+1","");
         var messaging_number= process.env.MESSAGINGNUMBER;
         messaging_number=messaging_number.replace("+1",'');
         if (phone===messaging_number && mtext=== "stop" )
         {
             updateOptinStatus(messaging_number,from)
         }
         
         else
         {
             console.log ("do nothing");
         }
     });
     console.log ("done");
res.send({

        "Status": "200",

        "messages": "webhook optin  successfully",

    });

})



//save schedule type in property document
app.post('/company/:comapnyid/saveScheduleTypeProperty', validateJWT, async (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const property = await getpropertyInfo(payload.propertyid);
    const companyid = payload.companyid;
    const accountDbName = parseAccountToDatabaseName(payload.propertyid);
    const accountDb = nano.use(accountDbName);
    var status: any = '';
    var message = '';
    if (property && property._id) {
        property.schedule_type = payload.schedule_type;
        await updatePropertyObj(accountDb, property).then(data => {
            status = 200;
            message = 'success';
        }).catch(err => {
            status = 500;
            message = 'error';
        });
    }


    const accountDbCompany = nano.use(parseAccountToDatabaseName(companyid));
    const propertyCompany = await getpropertyInfo(payload.propertyid, accountDbCompany);
    var status: any = '';
    var message = '';
    if (propertyCompany && propertyCompany._id) {
        propertyCompany.schedule_type = payload.schedule_type;
        console.log(propertyCompany);
        await updatePropertyObj(accountDbCompany, propertyCompany).then(data => {
            status = 200;
            message = 'success';
        }).catch(err => {
            status = 403;
            message = 'error';
        });
    }


    console.log(status, 'status');
    //res.status(status).send({ message: message});
    res.status(status).send({ status: status, message: message });
});

app.post('/property/:propertyid/reset_schedule', validateJWT, async (req, res) => {
    const propertyid = req.params.propertyid;
    const accountDbName = parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
    var schedules = await getScheduleforProperty(accountDb);  
    
    schedules.forEach(async (sh) => {
        if (sh.data)
        {
            sh.valid=false;
            sh.data=[];
            await insertObjectToDB(accountDbName, sh);
        }
    });
    
    var response=await removeall_adjust_schedules(accountDbName);
    // adjustschedulelist = await get_All_AdjSchedule(accountDbName);
    
    res.send(response);
    
});


app.post('/company/:comapnyid/scheduleDaytimePropertySave', validateJWT, async (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const property = await getpropertyInfo(payload.propertyid);
    const companyid = payload.companyid;
    const accountDbName = parseAccountToDatabaseName(payload.propertyid);
    const accountDb = nano.use(accountDbName);
    var status: any = '';
    var message = '';
    if (property && property._id) {
        property.schedule_daytime = payload.schedule_daytime;
        //console.log(property);
        await updatePropertyObj(accountDb, property).then(data => {
            status = 200;
            message = 'success';
        }).catch(err => {
            status = 403;
            message = 'error';
        });
    }

    const accountDbCompany = nano.use(parseAccountToDatabaseName(companyid));
    const propertyCompany = await getpropertyInfo(payload.propertyid, accountDbCompany);
    var status: any = '';
    var message = '';
    if (propertyCompany && propertyCompany._id) {
        propertyCompany.schedule_daytime = payload.schedule_daytime;
        //console.log(propertyCompany);
        await updatePropertyObj(accountDbCompany, propertyCompany).then(data => {
            status = 200;
            message = 'success';
        }).catch(err => {
            status = 403;
            message = 'error';
        });
    }

    //res.status(status).send({ message: message});
    res.status(status).send({ status: status, message: message });
});

const updatePropertyObj = async (accountDb, _propObj) => {

    const updateScheduleReportPromise = new Promise<any>((resolve, reject) => {
        // console.log("sendsms2\n", payload);
        accountDb.insert(_propObj, function (err, result) {
            if (err) {
                resolve(err);
            }
            else {
                resolve(result);
            }
        });

    });

    const result = await updateScheduleReportPromise;
    return result;

}





// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function): void => {
    let err: Error = new Error("Not Found");
    next(err);
});

// production error handler
app.use((err: any, req: express.Request, res: express.Response, next): void => {
    res.status(err.status || 500).render("error", {
        message: err.message,
        error: {}
    });
});


//createindex(_accountdbname,["propertyid","enabled","pvt_type","messageid","filename","elasticid","resolved"],"unresolved-index");
const createindexincompanies = async () => {
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];

        const companyid = parseDatabaseNameToAccount(dbname);

        const company = await getcompanyInfo(companyid);

        if (company && company.companyid) {
            const comapnydb = nano.use(dbname);
            console.log(company.companyname);
            console.log(dbname);

            console.log("*******************************");

        }
    }
}
const getFSDeviceList = async (apikey) => {
    const freeswitdevicelist = new Promise<any>((resolve, reject) => {


        const kRequest = getFreeSwitchRequest(apikey).get(`${process.env.FREE_SWITCH_SERVER}/v1/device/list`, {
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("couldn'get  getfreeswitchdevice_list ");
                console.error(err);
                resolve(err);
            }


            if (response && response.statusCode === 200) {

                console.log("freeswitchdevice_list sucess");
                resolve(JSON.parse(body).data)

            }
        }
        );


    });
    return await freeswitdevicelist;
}

const updateDevicePasswardforProperty = async (propertyid) => {
    const loginresponse = await free_switch_login();
    var apikey = loginresponse.data.token;
    const fsdevicelist = await getFSDeviceList(apikey);
    console.log(fsdevicelist);
    const property: any = await getpropertyInfo(propertyid);
    //console.log(property);
    var callflowdatalist = property.callflowdata.filter(r => r.callflowoptiontype == 'Escalation');
    //console.log(callflowdatalist);
    const callflowdata = callflowdatalist[0];
    const propertydeviceusername = callflowdata.propertydeviceusername;
    const callflowdeviceusername = callflowdata.callflowdeviceusername;
    const propertydeviceFS = fsdevicelist.find(d => d.username === propertydeviceusername);
    const callflowdeviceFS = fsdevicelist.find(d => d.username === callflowdeviceusername);
    console.log("callflowdeviceFS");
    console.log(callflowdeviceFS);
    const password = Math.random().toString(36).slice(-8);;
    var freeswitchdevice = await free_switch_update_device_password(apikey, callflowdeviceFS._id, password);
    var result11 = await update_devices_password(propertyid, callflowdata.deviceid1, password)
    //console.log("callflowdeviceFS");
    //console.log(callflowdeviceFS);
}


const getallpropertiesnameandid = async (companyid) => {


    //     const dbname= dbnames[i];

    // const companyid= parseDatabaseNameToAccount(dbname);

    const company = await getcompanyInfo(companyid);

    if (company && company.companyid) {
        const dbname = parseAccountToDatabaseName(companyid);
        const comapnydb = nano.use(dbname);
        //console.log(company.companyname);
        //console.log(dbname);

        console.log("*******************************");

        var properties: any = await getproperties(company.companyid);

        for (var k = 0; k < properties.docs.length; k++) {
            const prop = properties.docs[k];

            console.log(prop.propertyid);
            console.log(prop.propertyname);
            //  
            // var apikey =loginresponse.data.token;

            /* for(var j=0;j< results.length;j++){
                 console.log(prop.propertyid);
             
                var deviceid=results[j].deviceid;
                var password = Math.random().toString(36).slice(-8); 
         //       freeswitdevicelist(apikey)  ;                
               // var freeswitchdevice= await free_switch_update_device_password(apikey,deviceid, password);

             }*/


        };

    }

}

if (app.get("env") === "development") {
    app.use((err: Error, req: express.Request, res: express.Response, next): void => {
        if (!res.headersSent) {
            res.status(500).write(`error
                message: ${err.message || 'no error message'}
                error: ${err || {}}
            `
            );
            // res.sendStatus(500);
        }
    });
}





const getGeneralIncident = async (comapnyid, time) => {
    var ids = [];
    const contactsSelector =
    {
        "selector": {
            "pvt_type": "dtmfinfo",
            "notifytimestamp": {

                "$gte": time


            },
            "callflowoption": {
                "$ne": "Other"
            }
        },
        "use_index": "callflowoption_callflowoption",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 3000
    }

    console.log(JSON.stringify(contactsSelector));
    const accountDb = nano.use(parseAccountToDatabaseName(comapnyid));
    var callinfodatalist: any = await getalldocumentsbyproperty(accountDb, contactsSelector);
    callinfodatalist = callinfodatalist.reverse();
    //callinfodatalist.forEach(async (callinfodata) => 
    for (var i = 0; i < callinfodatalist.length; i++) {
        const callinfodata = callinfodatalist[i];

        if (callinfodata.voicemail_id) {
            var reportdata = await getreportdatadocument(accountDb, callinfodata);
            if (!reportdata.voicemailkey && reportdata.voicemailid) {
                console.log("got report");
                console.log(reportdata.companyname);

                ids.push(reportdata.guid);
                // console.log(JSON.parse(s3notification.data.Message) );
                await tmps3parse(reportdata.voicemailid, callinfodata.notifytimestamp)

            }
        }
        console.log(i)
        console.log(callinfodatalist.length)


    };
    console.log(ids);
    console.log("end");
}
const tmps3parse = async (voicemailid, time) => {
    console.log("tmps3parse");
    //check this
    const contactsSelector2 =
    {
        "selector": {
            "pvt_type": "s3notification",
            "data.Message": {
                "$regex": voicemailid
            }
        }
    };
    const globaldb = nano.use("globaldb");

    var s3notification = await getdocumentbyproperty(globaldb, contactsSelector2);
    if (s3notification && s3notification.data && s3notification.data.Message) {


        const message = JSON.parse(s3notification.data.Message);
        const nowtime = time;
        console.log(JSON.stringify(message));
        console.log(nowtime);
        await sendVoiceMail(message, nowtime);
    }
}
const sendVoiceMail = async (message, time) => {

    //  message= {"Records":[{"eventVersion":"2.1","eventSource":"aws:s3","awsRegion":"us-west-2","eventTime":"2021-03-05T15:15:56.001Z","eventName":"ObjectCreated:Put","userIdentity":{"principalId":"AWS:AIDAIND6XFBQVCVGGBWJC"},"requestParameters":{"sourceIPAddress":"192.34.51.102"},"responseElements":{"x-amz-request-id":"8E447WJD8H6PNZAV","x-amz-id-2":"//95nOmz5TZWPkghR9J/TNr8HId6MvIVf5Mi19VtO1VSsD2dUJgY0Ov8HjXt3fOky+bzcgDyPam1JRwlv+daRp/R4WHYl46I"},"s3":{"s3SchemaVersion":"1.0","configurationId":"voicemesssag","bucket":{"name":"hsnotify","ownerIdentity":{"principalId":"AFD8O01VN61EK"},"arn":"arn:aws:s3:::hsnotify"},"object":{"key":"account%252F18%252Fee%252F821425d34d545967d45a5c48a0cc-202103/202103-603b64f663d0cce094ea2c0f146125b9_940ff638ecd13351c6ad265425586fc6.mp3","size":48528,"eTag":"b0a6dc114667453c3760dc0f8d3cf937","sequencer":"0060424B2C09D95267"}}}]}

    console.log("sendVoiceMail");
    message.Records.forEach(async (record) => {
        console.log("record")
        console.log(record);
        debugMessage(log4jslogger, `record ${JSON.stringify(record)}`); ``

        var notification = record;
        console.log("notification")
        console.log(notification)
        var s3 = notification.s3;
        console.log("s3");

        console.log(s3);
        if (s3.object) {
            const s3Onje3ct = s3.object;
            console.log("s3Onje3ct");
            console.log(s3Onje3ct);
            await parseS3Notifcation(s3Onje3ct, time);

        }
    });

    console.log("here i am ")
}

const getVoiceMailsForId = async (apikey, accountId, vid) => {
    const kazooupdatepromise = new Promise<any>((resolve, reject) => {

        const kRequest = getKazooRequest(null, apikey)

            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}/messages?paginate=false`
                ,
                (e, r, b) => {
                    if (e) {
                        console.log(e);

                        resolve(e);
                    }
                    else {


                        resolve(JSON.parse(b));
                    }
                }
            );
    });


    const result = await kazooupdatepromise;
    return result;
}
const getVm_Id = async () => {
    const apikey = await loginwithcred();
    const kazooupdatepromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(null, apikey)

            .get(`${process.env.KAZOO_SERVER}/v2/accounts/f9b45805fa213343e4f84d56eed46503/vmboxes/9fd2b992d4280bd70672e72c79f1d71a/messages?paginate=true`, (err, response, body) => {
                console.log(JSON.parse(body));
            })
    });
}
const printVoicemail = (vms, property, callflowoption, company) => {
    // console.log(vms);
    vms = vms.filter((vm) => { return vm.timestamp > 63783957600 && vm.timestamp < 63784359600 })
    vms = vms.map((vm) => {
        var new_obj = {
            companyname: company.name,
            propertyname: property.propertyname,
            type: callflowoption,
            call_id: vm.call_id,
            media_id: vm.media_id,
            timestamp: vm.timestamp,

        }


        return new_obj;
    });

    for (var k = 0; k < vms.length; k++) {

    }


    /*: vms.forEach(vm => {
         vm.companyname= company.name;
         vm.propertyname= property.propertyname;
         vm.type= callflowoption;
         console.log(`${vm.companyname},${vm.propertyname},${vm.type},${vm.call_id},${vm.media_id},${vm.timestamp},${vm.caller_id_number},${vm.caller_id_name} `);
     });*/
}
const getVoiceemails = async (property) => {
    const apikey = await loginwithcred();
    const callflowdata = property.callflowdata.filter(cl => cl.callflowoptiontype === "FWD Message" && cl.deviceid)
    const propertyid = property.propertyid;
    const company = await getcompanyInfo(property.companyid);
    if (callflowdata) {
        callflowdata.forEach(async (cl) => {
            var vmbox = await getVoiceMailsForId(apikey, propertyid, cl.deviceid);
            console.log(`${property.propertyname}_${cl.callflowoption}`);
            printVoicemail(vmbox.data, property, cl.callflowoption, company);
            //    vmbox=await  updateVoiceMailBoxForId(apikey,propertyid,cl.deviceid,vmbox);


        });
    }

}
const generatevoicemaillist = async () => {
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames: any = await getaccountdbnames();
    dbnames = dbnames.filter(d => account_db_pattern.test(d));
    // && d==="nt_account/06/45/36efbf50c38cac7f8824e74ab55a");
    // dbnames.forEach(async(dbname) => 
    var kk = 1;
    console.log("start");
    for (var i = 0; i < dbnames.length; i++) {
        const dbname = dbnames[i];

        const propertyid = parseDatabaseNameToAccount(dbname);
        const property = await getpropertyInfo(propertyid);
        if (property && property.propertyid) {
            console.log(kk++);
            console.log(property.propertyid);
            //console.log(property.propertyname);
            getVoiceemails(property);
        }
    }
}
const parseMessageid=async(messageid)=>
{
    
    const msgindex= messageid.indexOf("msg");
    const wavindex= messageid.indexOf("mp3");
    const resturnvalue= msgindex >=0 && wavindex >=0? messageid.substring(msgindex,wavindex+3):messageid;
    console.log(resturnvalue);
    return resturnvalue;
}
const testcalllog=( )=>
{
     console.log("testcalllog");
   
    console.log("testcalllog");
    const callinfo={
        
        "timestamp": "1669143969",
        "guid": "35fc9372-4acb-4463-8fcb-52c88a47a3332",
        "boxid": "5025550611_Emergency_Callflow",
        "propertyid": "12d34fa40fc65d2447f8c30f43284c26",
        "agentphonenumber": "+15025550961",
        "when": "agentcall",
        "messagetype": "new",
        "action": "7",
        "messageid": "msg_5be51e45-71ec-4220-9448-e709b4028ca5.mp3",
        "agentid": "28b444c4543cd355a5c9fb05cc9be250",
        "agentname": "KULDEEP",
        "firstname": "KULDEEP",
        "lastname": "KULDEEP",
        "didnumber": "5025550611",
        "pvt_type": "callinfolog",
        "enabled": true,
        "notifytimestamp": 1669125954,
        "inserttimestamp": 1669125944
          }
      
    insertcallinfolog(callinfo);
    // voicemaillog(callinfo)
    //    insertcallinfolog(callinfo)


   // testS3notification(  callinfo.data);
}


const testS3notification=async(bodyarr2)=>
{
    await inserts3notification(bodyarr2);
    const message=JSON.parse( (bodyarr2.Message));
    debugMessage(log4jslogger,`voice mail SNS ${bodyarr2.Message}`);``
    message.Records.forEach(record => {
            console.log("record")
            console.log(record);
            debugMessage(log4jslogger,`record ${JSON.stringify(record) }`);``

            var notification =record;
            console.log("notification")
            console.log(notification)
            var s3= notification.s3;
            console.log ("s3");
            
            console.log (s3);
            if (s3.object)
            {
                const s3Onje3ct= s3.object;
                console.log("s3Onje3ct");
                console.log(s3Onje3ct);
                setTimeout(() => {
                    parseS3Notifcation(s3Onje3ct,99);
                }, 1); 
               
            }
       });

}


const findphonenumber=async ()=>
{
    var dbnames:any=await getcompanyaccountdbnamesforcron();
    console.log(dbnames.length);
    var optin_numbers = await getOptinStatus();
    console.log(optin_numbers);
    for (var dbindex=0;dbindex<dbnames.length;dbindex++)
    {
        var account= dbnames[dbindex];
        const company = account.type==="company";
        const companyid =account.accountid;
        console.log(`${dbindex } ${account.name}`);
        if (company)
        {
            const users=  await getusers(companyid);


            for (var i= 0;i<users.length;i++)
            {
                const user= users[i];
               
                user.ponesettingsupdated=true;
                if (user.smssettings && user.smssettings.settings.length>0)
                {
                    
                    const smssettings = user.smssettings.settings;//.find(s=> s.number==="5022551945");
                     if (!user.phonesettings || !user.phonesettings.settings)
                     {
                        user.phonesettings=  {
                         "settings": [ ]
                        };
                       }
                       var phonesettings=user.phonesettings.settings;
                       for (var smi=0;smi<smssettings.length;smi++)
                       {
                           
                           var optin = optin_numbers.find(p => p.phonenumber === smssettings[smi].number);
                           const phonesettings_number= phonesettings.find(p=>p.number===smssettings[smi].number);
                           if (phonesettings_number)
                           {
                               
                               phonesettings_number.optin= optin?true:false;
                           }
                           else
                           {
                               smssettings[smi].optin= optin?true:false;;
                               phonesettings.push(smssettings[smi]);
                           }
                       }


                }
                console.log(`${dbindex } ${account.name}`);
               await insertObjectToDB(parseAccountToDatabaseName(companyid) ,user)
            }

        }
    }
}

const deletedbs= async ()=>
{
    console.log("deletedbs")
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var alldbnames:any=await getaccountdbnames();
   var dbnames= alldbnames.filter (d=>  account_db_pattern.test(d)
  //  && d==="nt_account/ee/d2/5dfa72b758f9eeb12e3104159b0f"
   );
 
   console.log(dbnames.length);
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const id= parseDatabaseNameToAccount(dbname);
       const company=  await getcompanyInfo(id);
       var property=  await getpropertyInfo(id);
       var incident=  await getIncidentInfo(id);
           
       console.log( `\ndbnumber ${i}.\n`);
       const dbwithmonthname=getMonthDbName(dbname);
       
       if( (company && company.companyid)||(property && property.propertyid) )
       {

            for (var j= -20;j<=-2;j++){
                var dateutc = moment().add(j,"months").utc();
                const month = dateutc.format("MM");
                const year = dateutc.format("YYYY");
                console.log(`${month} `);
                var m_dbname = `${dbname}_${month}-${year}`;
                console.log(`${m_dbname} `);
                const isDbAvailable= alldbnames.find(d=>d===m_dbname);
                if (isDbAvailable)
                {
                    console.log(`${m_dbname} is available`);
                    await deletedb(m_dbname)
                }
            }

        
       }
}
}
const deletedb= async (dbname)=>
{
    //nt_account/17/a0/2154832acc92780e06ebe5654340_01-2022

    const DBNAME = dbname;
    console.log('deletedb');
    const db = newNano.db.use(DBNAME)
    try {
        
        const info = await db.info()
        console.log('DB Exists!')
        await newNano.db.destroy(DBNAME)
      //  await nano.db.destroy(DBNAME);
        console.log('deletedb');
    } catch (e) {
        console.log('DB does not exist!')
    }
}

//deletedbs();
//removeall_oncall_list("nt_account/4b/79/00fa04facccaf950b9b47fd849cf");
//createindexforce()
//findphonenumber();
/*
http.createServer(function (req, res) {
    console.log(req.url);
    // if (req && req.headers &&req.headers['host'] )
    //   res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(':3000','') + req.url });

    res.end();
}).listen(3000);

httpsServer.listen(443, 3000);
*/
//testcalllog();
//parseTranscribeSNS()
//calculate_company_callsummery ("5603d75489a4873bca15a30f5d7f428e","Multifamily")

const testQuery =async ()=>
{
    var emrt_data = await getemrtdata();

    const i_companyid = "4c08ece6f4b90a2260b6d004ef4422a7";
    const comp = await getcompanyInfo(i_companyid);
    var avg_calldetails = {
        property: {
            company: 0,
            industry: 0,
        }
    };
    if (emrt_data && emrt_data.data) {
        var emergency_companydata = emrt_data.data;

        if (emergency_companydata && Array.isArray(emergency_companydata)) {
            //console.log(emergency_companydata);
            const company_avg_emrt_data = emergency_companydata.find(c => comp.companyid === c.companyid);
          
            const company_avg_emrt = company_avg_emrt_data && company_avg_emrt_data.avgemrt ? company_avg_emrt_data.avgemrt : 0;

            const industry_avg_emrt_list = emergency_companydata.filter(c => comp.industry === c.industry && c.avgemrt);
            var sum = 0; 
            for (var a=0;a<industry_avg_emrt_list.length;a++)
            {
                const industry_avg_emrt= industry_avg_emrt_list[a];
                if (industry_avg_emrt.avgemrt)
                    sum+=industry_avg_emrt.avgemrt;
            }

            console.log(sum);
            console.log(sum/industry_avg_emrt_list.length);
            
            
            const industry_avg_emrt = d3.mean(industry_avg_emrt_list.map(id => id.avgemrt));
            console.log(company_avg_emrt);
            console.log(industry_avg_emrt);
            avg_calldetails = {
                property: {
                    company: company_avg_emrt ? company_avg_emrt : 0,
                    industry: industry_avg_emrt ? industry_avg_emrt : 0,
                }
            }
        }
    }
}
//updateEmailSent("4700e826-3024-47d9-af1e-5858bd724c6e");
app.listen(process.env.PORT || 8040);
module.exports = app;
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack);
    debugMessage(log4jsexceptionlogger, "************ exception starts ************");
    debugMessage(log4jsexceptionlogger, JSON.stringify(err));
    debugMessage(log4jsexceptionlogger, JSON.stringify(err.stack));
    debugMessage(log4jsexceptionlogger, "************ exception End ************");
    process.exit(1)
});
