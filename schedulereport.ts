"use strict";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
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

configure("./log4js.config");
const log4jslogger = getLogger();
const log4jsexceptionlogger = getLogger("exception");


 const esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_SEARCH_HOST,
    log: 'error'
  });
//Elastic Search - Search Function
const search = async function search(index, body) {
    return await esClient.search({index: index, body: body});
  };
  
//  



import { RSA_PKCS1_OAEP_PADDING } from "constants";
import { setTimeout } from "timers";
const nodemailer = require('nodemailer');
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
  })

const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN);

const app: express.Express = express();
const nano = require('nano')(process.env.COUCHBASE_DB)
const storage = Multer.memoryStorage();
const upload = Multer({storage: storage});
AWS.config.loadFromPath('./aws_config.json');
const s3 = new AWS.S3({});
var cron = require('node-cron');
var message_recording_start_time= [];
var temp_reports= [];
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
const notificationdata= {
    data:[
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
const livereplydata= {
    data:[
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
const privateKey  = fs.readFileSync('./certs/key.key', 'utf8');
const certificate = fs.readFileSync('./certs/cert.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

const getMonthDbName= (dbname, nextmonth=true)=>
{
    var  dateutc= moment().utc();
  // if (nextmonth)
 //  dateutc =dateutc.add("1", "months");
    const month= dateutc.format("MM");
    const year= dateutc.format("YYYY");
    
     dbname= `${dbname}_${month}-${year}`;
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
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true ,
    parameterLimit: 1000000,
    limit: '100mb',
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());
app.set('superSecret', 'SuperDuperSecretDoNotTellAnyone');
app.use(function(req, res, next) {
    res.on('finish', function() {
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


const serverlog=  (level,message,methodname,errormessage=undefined)=>
{
    console.log('serverlog' );
    console.log(process.env.ELASTIC_SEARCH_SERVER);;
    const now= moment().utc().format();

    const now_uinix=  moment().utc().unix();
    const payload=  {
        "timestamp": now,
        "level": level,
        "message": message,
        "servernode": "node server",
        "methodname": methodname,
        "timestampunix":now_uinix,
        "errormessage":errormessage? errormessage :''
        
        }
    
    const options = {
    method: 'POST',
    url: `${process.env.ELASTIC_SEARCH_SERVER}/hpsapperrorlog/_doc`,
    headers:
    { 
       
        'Content-Type': 'application/json',
        },
        body:payload,
    
        json: true 
    };
    Request(options, function (error, response, body) {
        if (error) {  
            console.log(error +'//'+ 'error');
        }
        else
        {
           console.log ("log sucuessfully inserted");
           //console.log (body)
        }
    });

}
const debugMessage = (logger,message ) => {

  try {
   var log_message= `could not be assigned ${typeof message}`
   
    if(typeof message === 'string') {
        log_message= message
       
    }
    else if(typeof message === 'object') {
        log_message = JSON.stringify( message);
    }
    //console.log(process.env.LOCAL_DEBUGING);
    if  ( process.env.LOCAL_DEBUGING==="true")
    {
            console.log(message)
    }
    else
    {
        logger.level = "debug";
        var count = (log_message.match(/,/g) || []).length;
        if (count<2)
             logger.debug(message);
    }
}
catch(ex)
{

}
}

debugMessage(log4jslogger,"server started");
const getkazooaccountinfo= async (req, accountid)=>
{
    var apiKey = null;
    apiKey = await loginwithcred();
    
    var accountpromiss=  new Promise((resolve, reject) => {
        getKazooRequest(req,apiKey)
                .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountid}`, async (err, response, body) => {
                if (err)
                {
                    debugMessage(log4jslogger,err);
                    resolve(err)
                    return;
                }
                var account=JSON.parse(body);
              //  console.log("\n\n\n accounts\n", account);
                
                resolve (account);
                });
        });

        var  result = await accountpromiss;
        return result;

}

const sendemail= async (payload)=>
{
     const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
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
    
  const accountname= payload.data.primarykazooaccount.name;
    debugMessage(log4jslogger,`accountname  ${accountname}`); 
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
                      <div class="row heading no-margin" style="margin-top:20px;">
                          <p style="font-size: 14px;  color:#003A5D ">Welcome to Notify!</p>
                          <p style="font-size: 14px; color:#003A5D "> Below are your user profile details.</p>
                      </div>
                     
                      <div style="padding-top: 29px; "> 
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
                      <div class="row info no-margin">
                         <div style="font-size: 14px;  width:100%;height:19px;color:#003A5D">If you have any questions, please contact ${payload.data.masteruser_name}.</div>
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
const validateJWT = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
   
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token.replace('Bearer ', ''), app.get('superSecret'), function(err, decoded) {      
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

const getKazooRequest = (req, apiKey = null) => {
   
    return Request.defaults({
        headers: {
            'X-AUTH-TOKEN': (apiKey ||req['decoded'] && req['decoded'].kazoo_api_key)  || null
        }
    });
}

const getFreeSwitchRequest = ( token ) => {
   
    return Request.defaults({
        headers: {
            'Token':  token 
        }
    });
}

function parseAccountToDatabaseName(accountName) {
    if (accountName && accountName != undefined && accountName !="undefined" )
    {
        const notifytext= process.env.ISPRODUCTION==="true"? "nt_":"";
        return [`${notifytext}account`, accountName.substr(0, 2), accountName.substr(2, 2), accountName.substr(4)].join('/');
    }
    else
        return accountName;
}


function getDabaseNameRegx()
{
   return  process.env.ISPRODUCTION==="true"? "nt_account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$":"account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$";
}
function parseDatabaseNameToAccount(dbnmae) {
    var arr = dbnmae.split("/");
    arr= arr.splice(1,arr.length-1);
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

    if(req.query.owner_id) {
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


        function cdr_post_search_callback (err, result) {
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
               
                if (result.rows.length<cdrLimit || !req.query.download )
                {
                  resolve({
                      callReports,
                      bookmark: result.bookmark,
                      my,
                      totalRecords: result.total_rows
                  });
                }
                else
                {
                 
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

const to_num = function (direction, num , to ) { //Cleans up redundancy.
    if (direction === "outbound") {
        return getNumber(num);
    };
    if ( (direction === "inbound") && (num === getNumber(to)) ) {
        return " ";
    }
    else {
        return getNumber(num);
    }
};

const cdrMapping = (cdr) => {
    const  resultdata=[];  
    //Sample data for "cdr.custom_channel_vars.media_names" need to work
     var media_nameslist=
    {
     "media_name": "7ad1c467369388de6e0be4536125595a.mp3",
     "media_names": [
                 "7ad1c467369388de6e0be4536125595a.mp3",
                 "7a17b50e1aa4ceb84a1076aeb15d81e0.mp3",
                 "7f36ddcdeacb58578629fecee03d0289.mp3"
                    ],
     };
     if(media_nameslist.media_names.length>0)
     {
         for(var i=0; i<media_nameslist.media_names.length ;i++){
            resultdata.push(
                {
                 media:callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id),
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
        dialed_number: cdr.custom_channel_vars.inception ? to_num(cdr.call_direction, cdr.custom_channel_vars.inception, cdr.to).split("+1").pop()  : null || cdr.callee_id_number ? to_num(cdr.call_direction, cdr.callee_id_number, cdr.to).split("+1").pop()  : null ,
        to_name: cdr.callee_id_name ? to_num(cdr.call_direction, cdr.callee_id_name, cdr.to)  : null ,
        from_name: cdr.caller_id_name || '',
        call_recording: cdr.custom_channel_vars.media_name ? callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id)  : null ,
        call_recording_medias:cdr.custom_channel_vars.media_names ? resultdata:'',
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
    var u_id= req['decoded'].user_id;
    var a_id= req['decoded'].account_id;
    getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${a_id}/users/${u_id}`, (err, resp3, body) => {
        if(err) {
        //    console.log("token error ", err);
            res.send(err);
            return;
        }
       // console.log("\n user\n",body);
        res.send(body);
    });
    
});
app.get("/reportdocs/search", (req, res) => {
    console.log("reportdocs");
	let body = {
      size: 20,
      from: 0,
      query: {
        "match_all":{}
      }
    };
	 search('reportdocs', body)
    .then(results => {
        var hits= results.hits.hits

        let result1 = hits.map(a => a._source);
        res.send({  

            "Status":"200",
         
            reportdocs:result1
         
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
    console.log( req.body.data);
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
        timestamp: moment().toISOString()};
    if(userId && req.body.data.username)
    {
        try{
            body.distinct_id = userId;
            if(req.body.data.first_name || req.body.data.last_name)
            {
                mixpanel.people.set(userId, {
                    $first_name: req.body.data.first_name,
                    $last_name: req.body.data.last_name,
                    $email: req.body.data.username,
                    $created: (new Date()).toISOString(),
                    $user_type: req.body.data.user_type ? req.body.data.user_type : '' ,
                    $property: req.body.data.primarykazooaccount && req.body.data.primarykazooaccount.name ? req.body.data.primarykazooaccount.name : '',
                    $management_company: req.body.data.accountname ? req.body.data.accountname : ''
                });
                // mixpanel.people.append(userId, body);
                body['url'] = req.body.config.url ? req.body.config.url : ''; 
                body['first_name'] = req.body.data.first_name ? req.body.data.first_name : ''; 
                body['last_name'] = req.body.data.last_name ? req.body.data.last_name : ''; 
            }
            console.log("mixpanel body ---- ", body);
            mixpanel.track(type, body,(err)=>{if(err){ console.log("mixpanel error", err);  }});

       }
       catch(e)
       {
            console.log("Mixpnel Error --- ",e); 
            mixpanel.track(type, body,(err)=>{if(err){ console.log("mixpanel error", err);  }});
       }
    }
    else
    {
        mixpanel.track(type, body,(err)=>{if(err){ console.log("mixpanel error", err);  }});
    }
    res.send('success');
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



app.post ('/downloadfile/', (req, res) => {
console.log ('downloadfile');
console.log (req.body);
var   fileurl = req.body.fileurl;
  //  const fileurl=  encodeURIComponent('http://www.africau.edu/images/default/sample.pdf');
   // const attachementurl ='http://www.africau.edu/images/default/sample.pdf';// `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
  console.log (fileurl);
 
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
       imageurl:`https://s3-us-west-2.amazonaws.com/spoke-mms/${req['file'].key}`
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
        if(err) {
            res.send(err);
        }
        else {
            _userobj.first_name=payload.first_name;
            _userobj.last_name=payload.last_name;
            _userobj.email=payload.email;
             accountDb.insert( _userobj, (update_err, update_body) => {
                if(update_err) {
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
    const scheduledReportSelector = {
        'selector': {
            'pvt_type': 'scheduled_report',
            'user_id': req['decoded'].user_id
            
        },
        "use_index":"pvt_type_user_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
        // 'use_index': ['query', 'scheduled-report-by-user']
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
            serverlog  ("warning",err,"login");
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
            serverlog  ("warning","login fail","login");
            res.send(responseData);
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
                            query:{query_string:{query: "live_*"}},
                            from : from, 
                            size : size,
                            sort : [
                            { 
                                "inserted_on" : {"order" : "desc"}
                            }]
                        }

    const searchoptions = {
        method: 'POST',
        url: reqUrl,
        headers:
        { 
            'Content-Type': 'application/json',
        },
        body:search_query,
        
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
            let resp= body;

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
    return  `account/${account_id[0]}${account_id[1]}/${account_id[2]}${account_id[3]}/${account_id.substring(4)}`;
}



/**
 * Call Dashboard API Routes
 */

app.get('/admin/accounts', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/`, (e, r, b1) => {
            if(e) {
                reject(e);``
            }
            b1 = JSON.parse(b1);
            const self = {
                id: accountId,
                name: b1.data.name,
                realm: b1.data.realm,
                timezone:b1.timezone,
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
        if(values[1] === 'invalid creds') {
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


var userSelector= {
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
    
const getMasterUsers= async(account_id,companyid)=>
{
    const accountDb = nano.use(account_id);
    
    const contactsSelector = {
    'selector': {
        'pvt_type': 'user'
        },
        "use_index":"pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:30000 
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
    var result={
        docs:docs
    };
    return {statusCode : 200,
        result
    };
   
}


const getAddedProperty=async (account_id,companyid)=>
{
    const accountDb = nano.use(account_id);
    
    const contactsSelector = {
    'selector': {
        'pvt_type': 'property'
        },
        "use_index":"pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:30000 
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
    var result={
        docs:docs
    };
    return {statusCode : 200,
        result
    };

   
}
const insertUser= async (usr,accountdbname)=>
{
    console.log("\naccountdbname ", accountdbname);
    usr.pvt_type=usr.pvt_type ?  usr.pvt_type:"user" ;
    var result =await insertObjectToDB(accountdbname,usr);
    return result;
}
const getCallReportData= async (propertydbname)=>
{
    console.log("\getComapnyUsers ", propertydbname);
    const propertydbwithmonthname=getMonthDbName(propertydbname);
    const propertydb = nano.use(propertydbwithmonthname );
    var userdocspromise = new Promise(async (resolve, reject) => {
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
       
        
        var userdocs=await getalldocumentsbyproperty(propertydb,contactsSelector);
        resolve(userdocs)
    });

    var result = await userdocspromise;
    return result;
    

}
const getCallActivityReportData= async (companydbname)=>
{
    console.log("\getCallActivityReportData1 ", companydbname);
    const companydb = nano.use(companydbname);
    var callActivityReportDataPromise = new Promise(async (resolve, reject) => {
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
       
        
        var userdocs=await getalldocumentsbyproperty(companydb,contactsSelector);
        resolve(userdocs)
    });

    var result = await callActivityReportDataPromise;
    return result;
   

}
const getComapnyUsers= async (companydbname)=>
{
    console.log("\getComapnyUsers ", companydbname);
    const companydb = nano.use(companydbname);
    var userdocspromise = new Promise(async (resolve, reject) => {
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
       
        
        var userdocs=await getalldocumentsbyproperty(companydb,contactsSelector);
        resolve(userdocs)
    });

    var result = await userdocspromise;
    return result;
   

}
const insertusersettings= async(usrsettings,accountdbname)=>
{
    console.log("\naccountdbname ", accountdbname);
   
    usrsettings.pvt_type="usersetting";
     return await insertObjectToDB(accountdbname,usrsettings)

}
const getemrtdata= async()=>
{
    const globaldb=nano.use("globaldb");
        const contactsSelector = {
                'selector': {
                    "pvt_type":"emrtavg",
                    },
                    "use_index":"pvt_type",
                    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
                }
   var emrtdata=await getdocumentbyproperty(globaldb,contactsSelector); 

   return emrtdata;
   
}

const getcallsummerydata= async(companydbname)=>
{
    const companydb=nano.use(companydbname);
        const contactsSelector = {
                'selector': {
                    "pvt_type":"callsummery",
                    
                    },
                    "use_index":"pvt_type",
                    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,                    
                }
   var callsummeryforcompany=await getdocumentbyproperty(companydb,contactsSelector); 

   return callsummeryforcompany;
   
}
const get_call_activity_data=async(companyid)=>
{
    const start_date_local = moment().add(-30, "days").startOf('day');
    var start_date_utc = moment(start_date_local.clone()).utc();
    var start_date_utc_unix = start_date_utc.unix();

    const end_date_local = moment().endOf('day');
    var end_date_utc = moment(end_date_local.clone()).utc() ;
    var end_date_utc_unix = end_date_utc.unix();
    const querystring=`(companyid:${companyid})`;
            
    const payload = {
        querystring: querystring,
        starttime: start_date_utc_unix,
        endtime: end_date_utc_unix
     }

    const callActivityData=  await getelasticsearchdata(payload);
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
const callactivity_report = async()=>
{
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
            console.log("company")
            const dbname =parseAccountToDatabaseName( account.accountid);
            var schedulereportdatalist= await getSechdulereportData(dbname,"dailyreport");
           if (schedulereportdatalist && Array.isArray(schedulereportdatalist) && schedulereportdatalist.length>0)
            {
                var callsummeryData=await getcallsummerydata(dbname);

                for (var s=0; s<schedulereportdatalist.length;s++)
                {
                    const schedulereportdata=schedulereportdatalist[s];
                
                    if (schedulereportdata.data && schedulereportdata.data.length)
                    {
                        console.log("email hserdsf",schedulereportdata.data);
                        var emails =schedulereportdata.data.join();
                        console.log('emails here',emails);
                        await sendScheduleReport(callsummeryData,emails);
                        
                    }
                    schedulereportdata.processed=true;
                      await insert_dailyemaillist(dbname,schedulereportdata)
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
            console.log("company")
            const dbname =parseAccountToDatabaseName( account.accountid);
            const companyuserlist:any=  await  getComapnyUsers(dbname);
            
            if (companyuserlist && Array.isArray(companyuserlist) &&companyuserlist.length>0 )
            {
                
                const companyschedulereportinfo= {
                    companyid:companyid,
                    companydbname:dbname,
                    users:companyuserlist,
                    reportrunningUTCTime
                }
               await  send_callsumery_report(companyschedulereportinfo);
            }
            
            
        } 
    }
    
    

}
const send_callsumery_report= async (companyScheduleReportInfo )=>
{
    
    const companydbname= companyScheduleReportInfo.companydbname;
    var users= companyScheduleReportInfo.users;
    const companydb = nano.use(companydbname);
    
    const reportrunningUTCTime=  companyScheduleReportInfo.reportrunningUTCTime;

    for (var userindex=0;userindex<users.length;userindex++) {
        try
        {
            var dailyemaillist = [];
           var user=users[userindex];
           const timezone=user.timezone? user.timezone:"America/New_York";
           var now_date_time= reportrunningUTCTime.tz( timezone);
           console.log('nowdatetime',now_date_time);
           console.log("user daily",);
           var next_run_report_time= now_date_time.clone().add(30, 'minutes');
           console.log('useristher',user);
            console.log("nexttime",next_run_report_time);
            var user_schedule_report_time_string;
            const scheduleemailreport= user.scheduleemailreport;
            const dayname= now_date_time.format('dddd');
            const monthday=now_date_time.format( 'DD');
            console.log('monthday',monthday);
            const endOfMonth   = moment().endOf('month').format('DD');
            var timing;
            let foundCron=false;
            if (scheduleemailreport.daily.is_active)
            {
                const daily= scheduleemailreport.daily;
                timing= daily.timing;
                let dailyTiming = setTiming(timing);
                if (dailyTiming.isBetween(now_date_time,next_run_report_time))
                {
                    foundCron = true;
                    console.log('dailyTiming',dailyTiming);
                }
             //   user_schedule_report_time_string= `${dailytiming.hh}:${dailytiming.mm} ${dailytiming.a}`;
                //user_schedule_report_time=  moment(from_time_1 ,"hh:mm a");
            }
             if (scheduleemailreport.weekely.is_active && scheduleemailreport.weekely.days[ dayname])
            {
                const weekely= scheduleemailreport.weekely;   
                timing=weekely.timing;
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
                
                const monthly= scheduleemailreport.monthly;
                const reporttype= parseInt(monthly.report_type) ;
               
                
                if ((reporttype===0 &&monthday===1) ||(  reporttype===1&& monthday==15)
                || (reporttype===2 && endOfMonth==monthday))
                {
                    console.log('monthly',monthly);
                    timing = monthly.timing;
                    let monthlyTiming = setTiming(timing);
                
                    if (monthlyTiming.isBetween(now_date_time,next_run_report_time))
                    {
                        foundCron = true;
                        console.log('monthly timng',monthlyTiming);
                    }
                }
            }

            //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
            {
              
                /*const hh=parseInt( timing.hh);
                if (timing.a==="pm"&& hh!=12)
                    timing.hh=hh+12;
                else if (hh===12 &&timing.a==="am" )
                    timing.hh=0;
                const user_schedule_report_Date_time=  moment.tz(timezone);
                user_schedule_report_Date_time.set({
                    hour:  timing.hh,
                    minute:timing.mm ,
                    second: timing.ss
                    
                })*/
                
               /* console.log("user_schedule_report_Date_time");
                console.log(user_schedule_report_Date_time.format("DD-MM-YY hh mm ss A z"));
             */   
             /// 
                if (foundCron)
                { 
                    const emaillist = scheduleemailreport.emails;
                    dailyemaillist.push(emaillist);
                    //sendCallActivityScheduleReport(callActivityData, scheduleemailreport)

                }
                
            }

            if (dailyemaillist.length>0)
            {
                const data = {
                    "pvt_type": "dailyreport",
                    "data": dailyemaillist,
                    "processed": false
                }
                console.log('data while inserting',data);
                //check if exist or not
                const contactsSelector = {
                    "selector": {
                        "pvt_type": "dailyreport",
                        "data": dailyemaillist,
                        "processed": false
                    }
                };
                var userdocs=await getalldocumentsbyproperty(companydb,contactsSelector);
                console.log('resultReport',userdocs);
                console.log('resultreportlength',userdocs.length);
                if(userdocs.length==0) {
                    await insert_dailyemaillist(companydbname, data);
                }
                
            }
        }
        catch(error)
        {
                //console.log(error);
        }
    };
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
const formaReportTime= (value)=>
    {   
        if (isNaN(value) || !value) return '';
        const time=parseInt(value);
        var hour=Math.floor( time/3600);
        const minutes= Math.floor(time / 60) - (hour * 60);
        const sconds=(time % 60);
        const minutes_str=minutes.toString();
        const sconds_str=sconds.toString();
        const hour_str=hour.toString();
        if (hour>0)
             return `${hour}h ${minutes_str}m`;
        else if (minutes>0)
            return `${minutes}m ${sconds_str}s`;
        else
            return  `0m ${sconds_str}s`;
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
const sendScheduleReport=(reportdata, emails)=>
{

    const header=reportdata.data.header;
    header.unshift('PROPERTY NAME','TOTAL CALLS');
    header.push("AVG EMRT");
    const csv =[];
    csv.push (header.join());//['PROPERTY NAME,TOTAL CALLS,LEASING,GENERAL,COURTESY ,EMERGENCY ,OTHER , AVG EMRT']; 
    console.log('reportdata.data.header',reportdata.data.header);
    console.log('reportdata.data.data',reportdata.data.data);             
    reportdata.data.data.forEach(cdr => {
        const duration = moment.duration(+cdr.avg_emrt, 'seconds');  
        var convert_durt= moment.utc(duration.asMilliseconds()).format("mm:s")
        var durtn= convert_durt.split(':');
        var final_durtn=durtn[0]+'m' +' '+ durtn[1]+'s';
        var _avgemrt=isNaN(cdr.avg_emrt) ? "-": final_durtn;
        const cdrString = [];
        cdrString.push( 
                 cdr.propertyname ,
                 cdr.total_call ,
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
     const emaillist= emails;
     console.log(emaillist);  
     const emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to:  emaillist, 
        subject: 'Notify property report',
        text: `Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .`,
        html: `<img src="http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png" width="150" height="63" title="HelloSpoke Logo" alt="HelloSpoke">
        <div>
            <h1>Thank you for using HelloSpoke!  </h1>
            <p>Attached you will find your scheduled HelloSpoke call report.</p>
        </div>`,
        
        attachments: [
            {
                filename: `Notify_Schedule.csv`,
                content: csv.join('\n')
            }
        ]
    }
    const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
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
           console.log(`kkkkkkkkkkkkkkkk erorr: `,err);

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
          var inserresult=  insertcallsummerydata(dbname,call_summery_result_data);
          result.push(inserresult);
        }
        }
    return result;

}
const calculate_company_callsummery= async (companyid,industry)=>
{
    const companydbname= parseAccountToDatabaseName(companyid);
    const comapanydb = nano.use(companydbname);
   
    const reportdocs:any=await getmonthreportdata(companyid);
    const emrgency_reportdocs=reportdocs.filter(r=>  r.type
         && r.type.toLowerCase()==="emergency"    && !isNaN( r.responsetime) && r.responsetime>0)
    const companypropertylist= await getcompanypropertylsit(companyid);
    var propertyData=d3c.nest()
        .key(function(d) { return d.propertyid; }) 
       
        .rollup(function(v) { return {
                total: v.length,
            }
        })
        .entries(reportdocs);

    var emergency_propertyData=d3c.nest()
        .key(function(d) { return d.propertyid; }) 

        .rollup(function(v) { return {

            avg_emrt: d3.mean(v, function(d) { return isNaN(d.responsetime)?0: d.responsetime>=86400 ? 86400: d.responsetime; })
        }
        })
        .entries(emrgency_reportdocs);

    var emergency_property_Response_Data_Count=d3c.nest()
        .key(function(d) { return d.propertyid; }) 

        .rollup(function(v) { return {
            total: v.length,
        }
        })
        .entries(emrgency_reportdocs);
        
    
    var calloptionData = d3c.nest()
        .key(function(d) { return d.propertyid; }) 
     
        .key(function(d) { return d.type; })
        .rollup(function(v) { return v.length; })
        .entries(reportdocs);
    const multifamilycalloptions=["Leasing","General","Emergency","Courtesy","Other"];
    const heatingandaircalloptions=["Plumbing","Electrical","General","Emergency","Other"]
    const header= industry==="Multifamily" ?
                multifamilycalloptions
                : heatingandaircalloptions;
    var callsummery=[];
     companypropertylist.forEach(p => 
        {
            const propertydata = propertyData.find(pd=>pd.key===p.propertyid);
            const emergency_propertydata = emergency_propertyData.find(pd=>pd.key===p.propertyid );
            const emergency_property_response_data_count= emergency_property_Response_Data_Count.find(pd=>pd.key===p.propertyid );
            var rowdata:any={
                propertyname:p.propertyname,
                propertyid:p.propertyid,
            }
            const calloptionRows= calloptionData.find(cl=> cl.key===p.propertyid);
            console.log(propertydata);
            if (propertydata)
            {
                rowdata["total_call"]=propertydata.value.total;
                
            }
            else
            {
                rowdata["total_call"]=0;
                ;
            }
            rowdata["avg_emrt"] = emergency_propertydata && 
                                  emergency_propertydata.value && 
                                  emergency_propertydata.value.avg_emrt ?
                                  parseInt(emergency_propertydata.value.avg_emrt):
                                  "-";
            rowdata["avg_emrt_data_count"] = emergency_property_response_data_count && 
                                            emergency_property_response_data_count.value && 
                                            emergency_property_response_data_count.value.total ?
                                            parseInt(emergency_property_response_data_count.value.total):
                                             0;            
                                  
           // if (calloptionRows) {
                header.forEach(calloption => {
                    const calloptionRowData=calloptionRows && calloptionRows.values?
                                    calloptionRows.values.find(clpr=>clpr.key===calloption ):undefined;
                  //  console.log(calloptionRowData);
                    if (calloptionRowData)
                        rowdata[calloption.toLowerCase()]= calloptionRowData.value;
                    else
                        rowdata[calloption.toLowerCase()]= 0;
                });
            
            callsummery.push(rowdata);
   
   });
   var result = {
       data:{
           header:header,
           data:callsummery,
       }
   }
   
   return result;
}
const insertcallsummerydata= async(companydbname, callsummurydata)=>
{
  
    var _storeddata =await getcallsummerydata(companydbname);
    
    callsummurydata.pvt_type= "callsummery";
    if (_storeddata)
    {
        callsummurydata._id=_storeddata._id;
        callsummurydata._rev=_storeddata._rev;
    }
    
    var result= await insertObjectToDB(companydbname,callsummurydata);
    return result;
}


const getSechdulereportData= async(companydbname,pvt_type)=>
{
   
    const companydb=nano.use(companydbname);
    const contactsSelector = {
        "selector": {
            "pvt_type":pvt_type ,
            "processed":false
           
        },
        "use_index":"pvt_type_processed",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };

    var schedulereports=await getalldocumentsbyproperty(companydb,contactsSelector); 
   
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
const insert_dailyemaillist= async(companydbname, data)=>
{
    var result= await insertObjectToDB(companydbname,data);
    return result;
}
const insertemrtdata= async(i_emrtdata)=>
{
    const globaldb=nano.use("globaldb");
    var emrtdata =await getemrtdata();
    
    i_emrtdata.pvt_type= "emrtavg";
    if (emrtdata)
    {
        i_emrtdata._id=emrtdata._id;
        i_emrtdata._rev=emrtdata._rev;
    }
    
    var result= await insertObjectToDB("globaldb",i_emrtdata);
    return result;
}

 
const insertcompany= async (company,req): Promise<any> => {

    return new Promise(async (resolve, reject) => {
   // accountdevice
	  var tree= company.tree;
    tree.push(company.kazooid);
    company.pvt_type= "company";
    tree= tree.reverse();
    var index =1;
    var dbnames:any=await getaccountdbnames();
   
   console.log("inserting company");
    var accountinsertpromise= [];
	tree.forEach(accid => {
        accountinsertpromise.push(new Promise(async (resolve, reject) =>
				{
                    
                     const _accountdbname=parseAccountToDatabaseName(accid);
                     const isCompanyDBAvailable= dbnames.find(d=>d===_accountdbname);
                    if (!isCompanyDBAvailable)
                    {
                        const accountdbwithmonthname=getMonthDbName(_accountdbname);
                       var creation_result= await  createaccountdb (_accountdbname);
                       creation_result=   createaccountdb (accountdbwithmonthname);
                       
                      
                       await setKazooAccountEmailNotification(req,accid);
                       await deletekazoostorage(req,accid)
                        const result= await  creteKazooStorageAttachments(req,accid);

                    }
					 console.log("\n  accountname ",_accountdbname );
                     const accountDb = nano.use(_accountdbname);
                     const stored_company= await getcompanyInfo(company.companyid,accountDb);
                     if (stored_company && stored_company._id && stored_company._rev)
                     {
                         company._id=stored_company._id;
                         company._rev=stored_company._rev;
                     }
                     else if ( company._id)
                     {
                         delete  company._id;
                         delete  company._rev;

                     }

                    accountDb.insert(company, (err, body) => {
						if (err) {
							console.log("err ",err);
							resolve( err);;
						}
						else {
							console.log(" company inserted succefully");
                            insertaccountinfo(company.companyid, company,"company",company.name)
							resolve( body);
    
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
const sendNotifySMS= async(payload)=>
{
    BandwidthMessaging.Configuration.basicAuthUserName = "notify_api";;
    BandwidthMessaging.Configuration.basicAuthPassword = "Th1s1s@L0ngP@55W0rd!";
    const messagingController = BandwidthMessaging.APIController;
    const app_id=process.env.BANDWIDTH_APP_ID;
   
    var body = new BandwidthMessaging.MessageRequest({
        "applicationId" : app_id ,
        "to"            : payload.to,
        "from"          : payload.from,
        "text"          : payload.messagetext,
        "tag"           :"web hook outbound"
    });
console.log(body);
    var response = await messagingController.createMessage( "5000040", body).catch (function (err)
    {
        console.log("rejet")
            console.log(err)
    });

    return response;
}
const sendMessage=  async(payload)=>
{   
   
    const sendMessagePromise = new Promise<any>((resolve, reject) => {
		// console.log("sendsms2\n", payload);
		client.Message.send({
			from: payload.from,
			to: payload.to,
			text: payload.messagetext,
			callbackUrl: `${process.env.BANDWIDTH_MESSAGE_SERVER}`,
			receiptRequested:'all',

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

const updatecompany=async (company,accountid)=>
{
  
    var accid = company.companyid;
   
    const _accountdbname=parseAccountToDatabaseName(accid);
    company.pvt_type= "company";   
    console.log("\n  accountname ",_accountdbname );
    
    var result= await insertObjectToDB(_accountdbname,company);
    return true;
}

const getproperties = async (companyid)=>
{
    return new Promise(async (resolve, reject) => {
        const accountDbName= parseAccountToDatabaseName(companyid);
        const accountDb = nano.use(accountDbName);
        const contactsSelector = {
        'selector': {
            'pvt_type': 'property',
            'enabled':true
        },
        "use_index":"pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
        var result={
            docs:docs
        };
        resolve( (result));
        
    });
}
const Execution_stats_log= async(apiname,result)=>
 {     
        console.log('Execution_stats_log execution_time_ms-----result----------',result.execution_time_ms);
        var result=result;
        if(result.execution_time_ms>100 || result.total_docs_examined>2500){
        let date_ob = new Date();
        var txtfile=process.env.SERVERNAME+"-"+'Execution_stats_log-'+ date_ob.getFullYear() + "-"+ (date_ob.getMonth()+1) + "-" + date_ob.getDate()+'.txt'
        var logfile_name = './execution_stats_logs/'+txtfile;
       
        console.log('logfile_name-----------',logfile_name);
        console.log('txtfile-----------',txtfile);

      
        const statsFolder = './execution_stats_logs/';
        if (!fs.existsSync(statsFolder)){
            fs.mkdirSync(statsFolder);
        }
        
       
        fs.readdir(statsFolder, (err, files) => {
           console.log('files-----------------',files);

            if(files.indexOf(txtfile) !== -1){

             console.log("logfile_name  exists!");

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


 const updateNOtifySchedule= async(propertyid, didnumber)=>
 {
   var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
    const property=await getpropertyInfo(propertyid); 
    
   
    const company=await getcompanyInfo(property.companyid); 

       ///notify 
    var schedule = await findSchedule(accountDb,false,didnumber,property,company);
    
    var userIds= schedule ?await findDayScheduleUsers(accountDb,schedule,false,company,property):[];
     if (userIds.length==0) 
     {
        userIds=await findAnyNotifyDayScheduleUsers(accountDb,didnumber,false,company,property);
     }
    var userdocs=await findDayScheduleuserlist(userIds,property);
   
      var escalationList=await findNotifyEscalationSettings(property,userdocs);
     userdocs= userdocs.filter(u=> userIds.find(u1=>u1=== u.id));
     var ntresult= await generateNoticationreply(userIds, userdocs);
   
   var callflowsoptiontype;
   if (schedule)
          callflowsoptiontype= schedule.callflowsoptiontype
    
   
   var result:any= {
    "didnumber": didnumber,
    "propertyid": propertyid,
    "type": "notify",
    "label":callflowsoptiontype,    
    "data": {
        "escalation": escalationList,
        "notify": ntresult
    }
    
   }
  // insertNotifySchedule(result);

   return result;
 } 

 const getNOtifySchedule= async(propertyid, didnumber)=>
 {
    const prpertydbname= parseAccountToDatabaseName(propertyid);
    const propertydb= nano.use(prpertydbname);
    const contactsSelector = {
        'selector': {
            "pvt_type": "notify",
            "didnumber": didnumber
            },
            "use_index":"pvttypedidnumber",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
    }
    console.log(JSON.stringify(contactsSelector))
    var current_schedule=await getdocumentbyproperty(propertydb,contactsSelector); 
    return current_schedule;
 }
 const insertNotifySchedule= async(schedule)=>
 {
    const propertyid=  schedule.propertyid;
    schedule.pvt_type="notify";
    const prpertydbname= parseAccountToDatabaseName(propertyid);
  
    const stored_schedule= await getNOtifySchedule(schedule.propertyid, schedule.didnumber);
    if (stored_schedule && stored_schedule._id)
    {
        schedule._id= stored_schedule._id;
        schedule._rev= stored_schedule._rev;

    }
    const result = await insertObjectToDB(prpertydbname,schedule);
   return result;

 }
const insertproperty= async (property,accountid,req)=>
{

    const accountdbname=parseAccountToDatabaseName(accountid);
    var dbnames:any=await getaccountdbnames();

    const propertydbname= parseAccountToDatabaseName(property.propertyid);
    const isPropertyDbAvailable= dbnames.find(d=>d===propertydbname);
    if (!isPropertyDbAvailable)
    {
        const propertydbwithmonthname=getMonthDbName(propertydbname);
        var creation_result=  await createaccountdb (propertydbname);
        creation_result=   createaccountdb (propertydbwithmonthname);
       
       
        
        const accountid=property.propertyid;
        await deletekazoostorage(req,accountid)
        const result= await  creteKazooStorageAttachments(req,accountid);
    }
    property.pvt_type= "property";
    property.enabled=true;
    const accountDb = nano.use(accountdbname);
    const stored_property= await getpropertyInfo(property.propertyid,accountDb);

    if(stored_property && stored_property._id && stored_property._rev)
    {
        property._id=stored_property._id;
        property._rev=stored_property._rev;
    } 
    const propertyInsertPromise = new Promise<any>(async (resolve, reject) => {
        accountDb.insert(property, (err, body) => {
         if (err) {
             console.log("err ",err);
             resolve( err);;
         }
         else {
            insertaccountinfo (property.propertyid,property,"property",property.kazoopropertyname)
             console.log(" property inserted succefully");
             resolve( body);
 
         }
     });
     });
    var result = await propertyInsertPromise;
    return result;

}  
const removeemailsFromList=async ( property,deletedemailids)=>
{
        removeEmailFromEscalationList(property.propertyid,deletedemailids);
            removeEmailAddressFromVoiceMaiilBox(property,deletedemailids);
}
const removeEmailFromEscalationList= async (propertyid,emailids)=>
{
    const accountdbname=parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountdbname);
    console.log("removeEmailFromEscalationList");
    const contactsSelector = {
        'selector': {
            "pvt_type":"escalationemaillist",
                   
         },
         "use_index":"pvt_type",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
                   
    }
   var escalationemailobjlist=await getalldocumentsbyproperty(accountDb,contactsSelector); 
  
   escalationemailobjlist.forEach(escalationemailobj => {
         var  emaillist=escalationemailobj.emaillist;
        
          emaillist=emaillist.filter(e=> !emailids.find((e1)=> e1.email===e.email));
         
          escalationemailobj.emaillist=emaillist;
          updateescalationemaillist(accountDb,escalationemailobj);
   });
           
}
const updateescalationemaillist= async (accountDbName,escalationemailobj)=>
{

    var result = await insertObjectToDB(accountDbName,escalationemailobj);
    return result;
   
}
const insertescalationemaillist= async (payload,callflowoption,userid)=>
{
   // console.log ("payload  insertescalationemaillist ", payload);
    const accountdbname=parseAccountToDatabaseName(payload.propertyid);
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
                'selector': {
                    "pvt_type":"escalationemaillist",
                    "callflowoption":callflowoption
                    },
                    "use_index":"pvt_type_callflowoption",
                    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
                    
                }
   var escalationemailobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            var emaillist=[];
            if (escalationemailobj)
            {
                emaillist=escalationemailobj.emaillist
            }
            else
            {
                escalationemailobj= {
                    "pvt_type":"escalationemaillist",
                    "callflowoption":callflowoption
                };
            }

     //       console.log ("emaillist1111 ",emaillist)
            if (!emaillist)  emaillist=[];
       //     console.log ("emaillist 2222 ",emaillist)
            

            if (payload.checked && payload.email)
            {
                var emailobj= {email:payload.email,
                userid:userid}
                emaillist.push(emailobj);
               
            }
            else if( !payload.checked && payload.email)
            {
                
                emaillist=  emaillist.filter (e=> e.email!=payload.email || e.userid!=userid);
            }
                
            escalationemailobj.emaillist=emaillist;
         //   console.log ("escalationemailobj ",escalationemailobj)
   
    var result = await insertObjectToDB(accountdbname,escalationemailobj);
    return result;

}
const insertschedule= async(schedule,accountdbname)=>
{
    schedule.pvt_type= "schedule";
    schedule.enabled=true;
    var result = await insertObjectToDB(accountdbname,schedule );
    return result;

}

const insertadjustschedule= async(schedule,accountdbname)=>
{
    schedule.pvt_type= "adjustschedule";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    if (schedule._id)
    {
        const contactsSelector = {
            'selector': {
                "_id":schedule._id
                },
                "use_index":"_id",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
        }
        var stored_schedule=await getdocumentbyproperty(accountDb,contactsSelector); 
        if (stored_schedule && stored_schedule._id)
        {
            schedule._rev=stored_schedule._rev;
        }
    }
    return await insertObjectToDB(accountdbname,schedule);
   

}
const unadjustschedule= async(schedule,accountdbname)=>
{
    schedule.pvt_type= "adjustschedule";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    if (schedule._id)
    {
        const contactsSelector = {
            'selector': {
                 "_id":schedule._id
                },
                "use_index":"_id",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
        }
        var stored_schedule=await getdocumentbyproperty(accountDb,contactsSelector);  
        if (stored_schedule && stored_schedule._id)
        {
            schedule._rev=stored_schedule._rev;
            schedule.pvt_type= 'schedule',
            schedule.enabled= false
        }
    }

    return await insertObjectToDB(accountdbname,schedule);
   
}

const removeEmailAddressFromVoiceMaiilBox=async ( property,removedEmails)=>
{
    const apikey= await loginwithcred();
    const  callflowdata= property.callflowdata.filter(cl=>  cl.callflowoptiontype==="FWD Message" && cl.deviceid)
    const propertyid= property.propertyid;
    if (callflowdata)
    {
        callflowdata.forEach(async (cl) => {
            var vmbox=   await getVoiceMailBoxForId(apikey,propertyid,cl.deviceid);
            var emaillist = vmbox.data.notify_email_addresses;
            console.log(removedEmails);
            console.log(emaillist);
            if (emaillist)
            {
                emaillist=  emaillist.filter (e=>!removedEmails.find(e1=>e1.email===e) );
                vmbox.data.notify_email_addresses= emaillist;
                console.log(emaillist);
                vmbox=await  updateVoiceMailBoxForId(apikey,propertyid,cl.deviceid,vmbox);
               
            }
        });
    }
    
}
const updatefwdmessagevoicemaileemailsettings= async (apiKey,payload)=>
{
        var vmbox=   await getVoiceMailBoxForId(apiKey,payload.propertyid,payload.callflowdata.deviceid);
        var emaillist = vmbox.data.notify_email_addresses;
       
        if (!emaillist)  emaillist=[];
        if (payload.checked && payload.email)
        {
            emaillist.push(payload.email);
           
        }
        else if( !payload.checked && payload.email)
        {
            
            emaillist=  emaillist.filter (e=> e!=payload.email );
        }
          vmbox.data.notify_email_addresses= emaillist;

        vmbox=await  updateVoiceMailBoxForId(apiKey,payload.propertyid,payload.callflowdata.deviceid,vmbox);
       
}

const getVoiceMailBoxForId=  async(apikey,accountId,vid)=>
{   
   const kazooupdatepromise = new Promise<any>((resolve, reject) => {
       
            const kRequest =getKazooRequest(null,apikey)
			.get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}`
				,
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                    
                     
                        resolve(JSON.parse( b));
                    }
                }
                );
             });

  
    const result = await kazooupdatepromise;
     return result;
}
const deleteVoiceMessages=  async(accountId, vmbox_id)=>
{   
    debugMessage(log4jslogger,`deleting voice mail for accountid  ${accountId } and voice mail box ${vmbox_id }`); 
    const apiKey = await loginwithcred();
   const kazooupdatepromise = new Promise<any>((resolve, reject) => {
            const kRequest =getKazooRequest(null, apiKey)
			.get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vmbox_id}/messages?paginate=false`
				,
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                        debugMessage(log4jslogger,`deleting voice mail error for accountid  ${accountId } and voice mail box ${vmbox_id } error ${JSON.stringify(e)}`); 
                    
                        resolve(e);
                    }
                    else {
                        
                        const messages= JSON.parse( b);
                        
                        if (messages && messages.data && messages.data.length>50)
                        {
                            const oldest_message=messages.data[ messages.data.length-1];
                        
                            const mesageid=oldest_message.media_id;
                            const kRequest = getKazooRequest(null,apiKey)
                                         .del(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vmbox_id}/messages/${mesageid}`
                                        , (err, response, body) => {
                                            debugMessage(log4jslogger,`deleting voice mail error for accountid  ${accountId } and voice mail box ${vmbox_id } error ${JSON.stringify(err)}`); 

                                            console.log(body)
                                         });

                        }
                        resolve(JSON.parse( b));
                    }
                }
                );
             });

  
    const result = await kazooupdatepromise;
     return result;
}
const updateVoiceMailBoxForId=  async(apikey,accountId,vid, vbox)=>
{   
   
       //    console.log("\n updateVoiceMailBoxForId vbox ", vbox);
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {
       
            const kRequest =getKazooRequest(null,apikey)
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
                        resolve( b);
                    }
                }
                );
             })
    const result = await kazooupdatepromiss;
    return result;
}

const checkResultExecution=(accountDb,contactsSelector, result)=>
{
    if (result.execution_stats && result && result.execution_stats && result.execution_stats.total_docs_examined>10000)
    {
        //log here 
    }
}
const getdocumentbyproperty=  async(accountDb,contactsSelector)=>
{   
   
    const documentPromise = new Promise<any>((resolve, reject) => {
       
           accountDb.find(contactsSelector, function (err, result) {
              if (err) {
                console.log("err ",err);
                debugMessage(log4jsexceptionlogger,"getdocumentbyproperty--accountdb="+ JSON.stringify(err));
                resolve( err);;
                    }
                    else {
                        
                        var document;
                        if (result.execution_stats) {
                            const dbname=accountDb.config.db;
                            Execution_stats_log(`Dbname:- ${dbname} ${JSON.stringify(contactsSelector)}`,result.execution_stats);
                           }
                        if ( result && result.docs )
                        {
                            document= result.docs.length>0? result.docs[result.docs.length-1]:document;
                        }
                        else
                        {
                            debugMessage(log4jslogger,`did not get result for ${JSON.stringify(contactsSelector)}` )
                            debugMessage(log4jslogger,`did not get result for ${JSON.stringify(accountDb)}` )

                        }
                        resolve( document);
                    }
                });
    });

    const result = await documentPromise;
    return result;

}


const getalldocumentsbyproperty=  async(accountDb,contactsSelector)=>
{   
    const dbname=accountDb.config.db;
    const documentPromise = new Promise<any>((resolve, reject) => {
       
           accountDb.find(contactsSelector, function (err, result) {
              if (err) {
                        console.log("err ",err);
                        debugMessage(log4jslogger,`*getalldocumentsbyproperty* error for ${JSON.stringify(contactsSelector)}` )
                        debugMessage(log4jslogger,`*getalldocumentsbyproperty* error  ${JSON.stringify(err)}` )

                        resolve( err);;
                    }
                    else {
                        
                        var documents=[];
                        if(result && result.execution_stats){
                             Execution_stats_log(`Dbname:- ${dbname} ${JSON.stringify(contactsSelector)}`,result.execution_stats);
                       }
                        if ( result && result.docs )
                        {
                        
                            documents= result.docs.length>0 ? result.docs: [];
                        }
                        else
                        {
                            debugMessage(log4jslogger,`*getalldocumentsbyproperty* did not get result for ${JSON.stringify(contactsSelector)}` )
                        }
                        
                       
                        //   console.log("got document  " ,result);
                        resolve( documents);
                    }
                });
    });

    const result = await documentPromise;
    return result;

}
const insertObjectToDB=async (dbname,insertObjetc) => {
    const db =nano.use(dbname);
    const promise= new Promise(async (resolve, reject) => {
        db.insert(insertObjetc, (err, body) => {
            if (err) {
                console.log(`error inserting  in ${dbname} object ${JSON.stringify(insertObjetc)}`);
                console.log(JSON.stringify(err));
                reject( err);;
            }
            else {
                console.log(`${insertObjetc.pvt_type} is inserted successfully in ${dbname}` );
                resolve( body);
    
            }
         });
    });
    var result= await promise;
    return result;
}
    
const inserts3notification= async(s3notification)=>
{
   // if(typeof message === 'string') {
    console.log(s3notification)
    const globaldb=nano.use("globaldb");
    var insertdata={
       data:s3notification,
        pvt_type:"s3notification"
    }
    var result= await insertObjectToDB("globaldb", insertdata);;
    return result;
}

const insertaccountinfo =async (id,obj,type,name)=>
{   
    const globaldb=nano.use("globaldb");
//    console.log(`insertaccountinfo ${id}  ${name}   ${type}`)
    const contactsSelector = {
        "selector": {
            "pvt_type": "accountinfo",
            "accountid":id
            
         },
         "use_index":"pvt_type_accountid",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
          limit:1  
    }
    var stored_info=await getdocumentbyproperty(globaldb,contactsSelector); 
    
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
const updatekazoousersettings=  async(payload,req,companyid,id)=>
{   
    const livereplysetting= payload.livereplysetting ==='undefined' ? []: payload.livereplysetting;
			    const notificationrulessetting= payload.notificationrulessetting ==='undefined' ? []: payload.notificationrulessetting;
			    const handoffrulessettings=payload.handoffrulessettings ==='undefined' ? []: payload.handoffrulessettings;
			    const escalationsettings=payload.escalationsettings ==='undefined' ? []: payload.escalationsettings;
			    const smsagreement= payload.smsagreement
 
                var userdata:any={data:{
                title:payload.title,
                timezone:payload.timezone,
                phonesettings:payload.phonesettings,
                smssettings:payload.smssettings,
                emailsettings:payload.emailsettings,
                pin:payload.pin,
                livereplysetting:livereplysetting,
                notificationrulessetting:notificationrulessetting,
                handoffrulessettings:handoffrulessettings,
                escalationsettings:escalationsettings,
                smsagreement:smsagreement
        }};
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

const updatekazoouseremailsettings=  async(payload,req,companyid,id)=>
{   
   
            var userdata:any={data:{
                
                emailsettings:payload.emailsettings,
                
        }};
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
const updateScheduleReport=  async(accountDbName,_userobj)=>
{   
   
    var result= await insertObjectToDB(accountDbName, _userobj);;
    return result;;
       

}
const check_user_log= (_userobj, temp_user)=>
{
    if (_userobj.pin!=temp_user.pin)
    {
        console.log("update pin");
    }
    
    
}


const updatenotifyusersettings=  async(accountDbName,_userobj,payload, sendsms, property,req)=>
{   
    //console.log("updatenotifyusersettings");
    const temp_user= JSON.parse(JSON.stringify(_userobj));
   _userobj.timezone=payload.timezone;
		_userobj.phonesettings=payload.phonesettings;
		_userobj.title=payload.title;
        if(payload.firstName)
        {
             _userobj.first_name=payload.firstName;
            _userobj.last_name=payload.lastName;
        }
		
        _userobj.smssettings=payload.smssettings;
        const deletedemailids= _userobj.emailsettings.settings.filter ((_em)=> !payload.emailsettings.settings.find((pem)=>pem.email===_em.email) )
        _userobj.emailsettings=payload.emailsettings;
		_userobj.pin=payload.pin;
		_userobj.livereplysetting=payload.livereplysetting;
		
		_userobj.notificationrulessetting=payload.notificationrulessetting;
		_userobj.handoffrulessettings=payload.handoffrulessettings;
		_userobj.handoffrulessettings=payload.handoffrulessettings;
        _userobj.escalationsettings=payload.escalationsettings;
        
        _userobj.user_imager=payload.user_imager;
		_userobj.member_image=payload.member_image;
		
        _userobj.smsagreement=payload.smsagreement
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
const createindex=async (dbname, fields,name)=>
{

    console.log("fields ",fields);

    const indexDef = {
        index: { fields: fields },
        ddoc:name,
        name: name
      };
      var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
      var nano1 = require('nano')(hellospoke_db);
      const db=nano1.use(dbname);
      const creatindexpromise= new Promise((resolve,reject)=>{
          
        const indexDef = {
            index: { fields: fields },
            ddoc:name,
            name: name
        };
        db.createIndex(indexDef, (err, body) => {
            if (err) {
                console.log("err ",err);
                resolve( err);;
            }
            else {
                console.log("index created " ,body);
                resolve( body);

            }
    });
});
       

     
      var result= await creatindexpromise;
      return result;
}
const insertdayschedule= async(schedule,accountdbname)=>
{
    schedule.pvt_type= "dayschedule";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    const stored_schedule= await getdayscheduleInfo(accountDb,schedule);
    if (stored_schedule && stored_schedule._id)
    {
         schedule._rev=stored_schedule._rev;
         schedule._id=stored_schedule._id;
    }
    // console.log(`Starting to search for users in set`, userIds);
    const result = await insertObjectToDB(accountdbname,schedule);
      return   result;
}
const updatenotifyusercolorindex=  async(accountdbname,_userobj)=>
{   
   
    const result = await insertObjectToDB(accountdbname,_userobj);
    return   result;

}
const updatenotifyuseremailsettings=  async(accountDbName,_userobj,payload)=>
{   
   
    _userobj.emailsettings=payload.emailsettings;
    const result = await insertObjectToDB(accountDbName,_userobj);
    return result;

}

const insertescalationuserlist= async (schedule,accountdbname)=>
{
    schedule.pvt_type= "escalationuserlist";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
        "selector": {
            "pvt_type": "escalationuserlist"
            
         },
         "use_index":"pvt_type",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:30000 
    }
    var stored_list=await getdocumentbyproperty(accountDb,contactsSelector); 
    console.log("escalationuserlist");
    if (stored_list && stored_list._id && stored_list._rev)
    {
        schedule._id=stored_list._id;
        schedule._rev=stored_list._rev;
    }

   
    const result = await insertObjectToDB(accountdbname,schedule);
    return result;
}


const insertcallactivityreportinfo= async (callactivityinfo,accountdbname)=>
{
    callactivityinfo.pvt_type= "callactivityreport";
   const result = await insertObjectToDB(accountdbname,callactivityinfo);
    return result;

}

const formatPhoneNumber= (phoneNumber) =>{
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

const getReportDocumentFromTemp=(guid)=>
{
   console.log( "getReportDocumentFromTemp" + guid );
    const reportdoc = temp_reports.find(r=>r.guid===guid);
    console.log(reportdoc);
    return reportdoc;
}
const removeReportDocumentFromTemp=(guid)=>
{
    var  index = temp_reports.findIndex(r=>r.guid===guid);
    temp_reports =temp_reports.splice(index,1);
 
}

const getreportdatadocument= async (accountDb,callinfo)=>
{
    const guid= callinfo.incidentid?callinfo.incidentid:  callinfo.guid;

    const contactsSelector = {
        'selector': {
            "pvt_type": "reportdata",
            "guid":guid
           
            },
            "use_index":"pvt_type_guid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        var reportdata=await getdocumentbyproperty(accountDb,contactsSelector); 
    return reportdata;
}

const isduplicatedocument= async (accountDb,guid)=>
{
    const contactsSelector = {
        'selector': {
            "pvt_type": "reportdata",
            "guid":guid
           
            },
            "use_index":"pvt_type_guid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        var reportdata=await getalldocumentsbyproperty(accountDb,contactsSelector); 
    return reportdata && reportdata.length > 1;
}

const getcallinfologformessagerecording= async (accountDb,guid)=>
{
     const contactsSelector = {
        "selector": {
            "pvt_type": "callinfolog",
            "type": "messagerecordingstart",
            "guid": guid
            
            },
            "use_index":"pvt_type_type_guid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        var callinfo=await getdocumentbyproperty(accountDb,contactsSelector); 
    return callinfo
}
const getreportdatadocumentfrommessagid= async (accountDb,callinfo)=>
{
    
    const contactsSelector = {
        'selector': {
           
            "messageid":callinfo.messageid
            },
            "use_index":"messageid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        var reportdatalist:any=await getalldocumentsbyproperty(accountDb,contactsSelector); 
        var reportdata= reportdatalist ? reportdatalist.find(r=>r.pvt_type==="reportdata"):undefined;
    return reportdata
}


const getreportdatadocumentfromvoicemailid= async (accountDb,callinfo)=>
{
    
    const contactsSelector = {
        'selector': {
            "pvt_type": "reportdata",
             "voicemailid":callinfo.voicemailid
            },
            "use_index":"voicemailid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        console.log(JSON.stringify(contactsSelector));
        var reportdata=await getdocumentbyproperty(accountDb,contactsSelector); 
    return reportdata
}



const parseincidenttimeout= async(accountDb,callinfo)=>
{
    console.log("parseincidenttimeout")
    if (callinfo.muid) 
        callinfo.guid= callinfo.muid
    var reportdata=await getelasticsearchreportdatabyguid (callinfo.muid);
    
    if(reportdata && !reportdata.timedout){
        const now_unix= callinfo.notifytimestamp;
        const callinfodescription="Maximum number of attempts exceeded";
        var calldetailsinfo:any= {
                        "time":now_unix,
                        "discription":callinfodescription,
                        "callrecording":false,
                    
                    };
        reportdata.calldetailsinfolist.push(calldetailsinfo);
        reportdata.timedout=true;
        console.log("inserting timed out");
        await insertreportdata(reportdata,accountDb);
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
    
    const sourceString= `ctx._source.calldetailsinfolist.add(params.calldetailsinfo );ctx._source.respondent=params.respondent;ctx._source.respondentphone=params.respondentphone;ctx._source.respondentat=params.respondentat;ctx._source.responsetime=params.responsetime;ctx._source.notifyresponsetime=params.notifyresponsetime;ctx._source.resolved=params.resolved;ctx._source.filename=params.filename;`
    var body= {
        "script": {
            "source": sourceString,
              "lang": "painless",
                "params" :param
            
          },
          "query": {
            "bool": {
              
              "must": [
                { "match": {  "pvt_type": "reportdata" } },
                { "match": {    "guid.keyword":guid} }
              ]
              }
             
        }
    }

    const result =await updatereportdatatoelastic_new(body);
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
                    filename= `notify_call_${callinfo.guid}_${callinfo.messageid}`;
                    generatereport=true;
                }
                else if (agentaction==="3")
                {
                // straction+=`acknowledged message from ${formatPhoneNumber(customernumber)}`;
                straction+= ` acknowledged they’re on the way`;
                    generatereport=true;
                    
                }
                else if (agentaction==="4")
                {
                // straction+=`acknowledged message from ${formatPhoneNumber(customernumber)}`;
                // straction+= `Agent acknowledged message as a non-emergency`;
                straction+= ` acknowledged message as a non-emergency`;
                generatereport=true;
                    
                }
                else if (agentaction==="7")
                {
                    straction+=`deleted this message`;
                    generatereport=true;
                    
                }
                if(generatereport)
                {
                    const now_unix= callinfo.notifytimestamp;
                
                    const savedstr= messagetype==="old" ? "from saved message":"";
                    if (messagetype==="new" &&  straction.length>0)
                    {
                        reportdata.respondent=callinfo.agentname.substring(0, 1).toUpperCase() + callinfo.agentname.substring(1).toLowerCase();
                        reportdata.respondentphone=callinfo.agentphonenumber;
                        reportdata.respondentat=now_unix ;
                        reportdata.responsetime= now_unix- reportdata.incidentdate;
                        reportdata.notifyresponsetime=reportdata.responsetime;
                        reportdata.resolved=true;
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
                    if(filename.length>0)
                    {
                        calldetailsinfo.filename=filename;
                        
                    } 
                    if (reportdata.calldetailsinfolist)
                        reportdata.calldetailsinfolist.push(calldetailsinfo);
                    console.log("inserting agent action report");
                    await insertreportdata(reportdata,accountDb);
                    //update elastic search 
                    var param = {
                        calldetailsinfo:calldetailsinfo,
                        respondent:reportdata.respondent.substring(0, 1).toUpperCase() + reportdata.respondent.substring(1).toLowerCase(),
                        respondentphone:reportdata.respondentphone,
                        respondentat:reportdata.respondentat,
                        responsetime:reportdata.responsetime,
                        notifyresponsetime:reportdata.responsetime,
                        resolved:reportdata.resolved,
                        filename:reportdata.filename,
                        respondent_lastname:reportdata.respondent_lastname ? reportdata.respondent_lastname:''
        
                    }
                
                
                    await updatereportdatatoelasticforagentaction(param,reportdata.guid);
                    setTimeout(() => {
                            parseagentaction(accountDb,callinfo,++attempt);
                        }, 20000);
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
const parsemessagerecordingstart= async(accountDb,callinfo)=>
{
    var obj= {
        guid:callinfo.guid,
        notifytimestamp:callinfo.notifytimestamp
    }
    message_recording_start_time.push(obj);
    return obj;
}
const parsemessagerecordingend= async(accountDb,callinfo)=>
{
    var reportdata=await getReportDocumentFromTemp(callinfo.guid);
    try
    {
        const customernumber= reportdata.fromd;
        var callinfodescription= `Message received from ${formatPhoneNumber(customernumber)} `;
        const now_unix= callinfo.notifytimestamp;

        const time_obj=message_recording_start_time.find(r=>r.guid===callinfo.guid);
        message_recording_start_time= message_recording_start_time.filter(r=> r.guid!=callinfo.guid )
        const callduration = now_unix- time_obj.notifytimestamp;
        if (callduration)
            reportdata.callduration=callduration;
        var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":true,
            "filename":callinfo.messageid,
            "voicemessage":true,
            "messageurl":callinfo.url,
            "callduration": reportdata.callduration
        };
        reportdata.calldetailsinfolist=  reportdata.calldetailsinfolist.filter(rd=> !rd.messageurl);

        reportdata.calldetailsinfolist.push(calldetailsinfo);
        reportdata.messageid= callinfo.messageid;
        reportdata.messageurl= callinfo.url;
        reportdata.notifymessage=true;
        console.log("inserting messagerecordingen report");
        //await insertreportdata(reportdata,accountDb);
    
    return reportdata;
    }
    catch (ex)
    {
        debugMessage(log4jslogger,"error droping report");
        debugMessage(log4jslogger, ex);
        

    }
    
}

const parseVoiceMessage= async(accountDb,callinfo,property)=>
{
    debugMessage(log4jslogger,"******parseVoiceMessage******");
    var reportdata=await getelasticsearchreportdatabyguid (callinfo.guid);   
     const now_unix= callinfo.notifytimestamp;

    const type=reportdata? reportdata.type:""  ;
    if (reportdata)
        debugMessage(log4jslogger,`updating report for ${reportdata.guid}`);
    var description= `Caller selected General `;
    var calldetailsinfo:any;
    if (type==="Emergency")
    {
        debugMessage(log4jslogger,"******emergency to general******");
        calldetailsinfo= {
            "time":now_unix,
            "discription":description,
            "callrecording":false
                                
        }
        reportdata.calldetailsinfolist.push(calldetailsinfo); 
        reportdata.type="General";  
    }
    if (!reportdata)
    {
        
        debugMessage(log4jslogger,`report did not find for ${callinfo.guid}`);
          //we found that sometime we dont have initial record 
       const dbname = parseAccountToDatabaseName(property.propertyid);
       await insertDTMFInforeport(callinfo,dbname,property)
       var reportdata=await getelasticsearchreportdatabyguid (callinfo.guid);;
    }
    reportdata.voicemailid=callinfo.voicemail_id;
    reportdata.removefromreport=false;
    console.log("inserting voice message to report");
    await insertreportdata(reportdata,accountDb);
     
    
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
    return reportdata;
    
}

var tmp_messageidlist=[];
const insertescalationemailguid= async(messageid)=>
{
   
    const index=tmp_messageidlist.findIndex(c=>c===messageid);
    if (index<0 )tmp_messageidlist.push(messageid);
    
    return index<0
}
const parseS3EscalationNotification= async(callinfo,time)=>
{
    console.log("parseS3EscalationNotification");
    console.log(callinfo);
    

    debugMessage(log4jslogger, `parseS3EscalationNotification`);
  const key =callinfo.key;
    if (key)
    {
        const keyparts= key.split("/");
     
        if (keyparts.length>1)
        {
            try {
                const messageid=await parseMessageid( keyparts[1]);
                callinfo.messageid=messageid;
               
                console.log("messageid");
                console.log(messageid);
                if (await insertescalationemailguid(messageid))
                    getelasticsearchreportdatabymessageid(messageid);
            }
            catch(ex)
            {

            }
        }
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
               await updateVoicemailReport(accountDb,callinfo)
        }
            catch(ex)
            {
                    debugMessage(log4jsexceptionlogger, JSON.stringify(ex));
                    debugMessage (log4jsexceptionlogger,`parseS3Notifcation error ${JSON.stringify(callinfo)}`);
            }
        }
        
    }
    
  
}

const updateVoicemailReport=async(accountDb,callinfo,attempt=0)=>
{
    var reportdata=await getreportdatadocumentfromvoicemailid(accountDb,callinfo);
    if (reportdata && reportdata.voicemailid)
    {
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

        const call_desconnected_index= calldetailsinfolist.findIndex(c=> c.calldiscconected);
        if (call_desconnected_index>=0)
        {
            var call_desconnected_record=calldetailsinfolist[call_desconnected_index];
            call_desconnected_record.now=now_unix;
            calldetailsinfolist.splice(call_desconnected_index,0,calldetailsinfo) 
        }
        else 
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
        await insertreportdata(reportdata,accountDb);
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
    }
    else if (attempt<4)
    {
        setTimeout(() => {
             updateVoicemailReport(accountDb,callinfo,++attempt)
        }, 30000);
       
    }
    else
    {
        debugMessage(log4jslogger, `did not find  report for  ${JSON.stringify( callinfo)}`)
    }
}
const parsecallrecording= async(accountDb,callinfo)=>
{
        var reportdata=await getReportDocumentFromTemp(callinfo.guid)
        reportdata.filename= callinfo.filename;
        console.log("inserting call recording file ");
        
        return reportdata;
    
}


const parseagentpin= async(accountDb,callinfo)=>
{
    if (callinfo.when&& callinfo.when.toLowerCase()==="live")
    {
        var reportdata=await getReportDocumentFromTemp(callinfo.guid)
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
        if (result==="valid")
        {
            
            callinfodescription+='entered PIN';
            var calldetailsinfo:any= {
                "time":now_unix,
                "discription":callinfodescription,
                "callrecording":false
            };
            reportdata.calldetailsinfolist.push(calldetailsinfo);
            reportdata.callstarttime= now_unix;
            const customernumber= reportdata.fromd;
            callinfodescription= `${callinfo.agentname} connected to ${formatPhoneNumber(customernumber)}`;
             const filename= `live_call_${reportdata.guid}.wav`   ;
            calldetailsinfo= {
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
            callinfodescription+= "entered invalid pin";
        }
        
        console.log("inserting agent respose pin ");
        //await insertreportdata(reportdata,accountDb);
        return reportdata;
    }
    
}

const parsecallend= async(accountDb,callinfo)=>
{
    if (callinfo.when==="live" && callinfo.reason && callinfo.reason==="NORMAL_CLEARING" )
    {
       var reportdata=await getReportDocumentFromTemp(callinfo.guid)
       if (reportdata && !reportdata.calldisconnected)
       {
             const now_unix= callinfo.notifytimestamp? callinfo.notifytimestamp: moment().utc().unix();
              const callduration=now_unix- reportdata.respondentat  
             
                if (callduration)
                {
                    reportdata.callduration=callduration;
                }
                 
                 reportdata.calldisconnected= true;
                 reportdata.callendtime=now_unix;

                console.log("inserting end ");
                await insertreportdata(reportdata,accountDb);
                return reportdata;
            }
        }
        return reportdata;
}


const parseagentrespnse= async(accountDb,callinfo)=>
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
    var url=  `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_update_by_query?max_docs=1&refresh=${refresh}`;
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
 
    for (var i=0;i<reportlist.length;i++){
        var report= reportlist[i];
      
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
        
       
       
        await insertreportdata(report,accountDb);
             var param={calldetailsinfo:calldetailsinfo};
            //ok
            await updatereportdatatoelasticwithguidforruleexecution(param,report.guid);
    }
       
    
    return reportlist;
    
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
            "companyid":companyid
            
            
            },
          //  "fields":["companyid","timezone"],
            limit:30000,
            "use_index":"pvt_type_companyid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
        }
    var comapnydbname= parseAccountToDatabaseName(companyid);
  
     companydb=companydb===undefined ?nano.use(comapnydbname):companydb;
    
     var comapny=await getdocumentbyproperty(companydb,contactsSelector); 
     if (!comapny || comapny.error)
     {
         debugMessage(log4jslogger, `comapny db not available ${JSON.stringify( companydb)}`);
     }
    return comapny;
        
}

const getdayscheduleInfo=async(db,schedule1)=>
{
    const contactsSelector = {
        'selector': {
            "pvt_type": "dayschedule",
            "scheduleid":schedule1.scheduleid,
            "datetime":schedule1.datetime
           
            },
            "use_index":"pvt_type_scheduleid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
   
    var schedule=await getdocumentbyproperty(db,contactsSelector); 
    return schedule;
        
}
const getmonthreportdata=async(companyid,fileds=[])=>
{
   
    var  endtime = moment().utc().unix();

    var starttime= moment().utc().startOf('day').add(-30,"days").utc().unix();
   

    const payload= 
                {"querystring":`(companyid:${companyid}) `,"starttime":starttime,"endtime":endtime,"page":0,"sorting":""};

    
    var reportdocs=await getelasticsearchdata(payload,fileds);//await getalldocumentsbyproperty(companydb,contactsSelector); 
    return reportdocs;
        
}


const getcompanypropertylsit=async(companyid)=>
{

    const contactsSelector = {
        'selector': {
            "pvt_type": "property",
            enabled:true
           
        },
        "use_index":"pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        
        limit:30000 
    };
    var comapnydbname= parseAccountToDatabaseName(companyid);
  
    var companydb= nano.use(comapnydbname);
    
    var properties=await getalldocumentsbyproperty(companydb,contactsSelector); 
    return properties;
        
}
const finddaybusinesshours = (property)=>
{
    const timezone= property.timezone;
    var currendatettime =moment().tz(timezone);
    const dayname= currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    const businesshours= property.bussinesshours[dayname];
    return businesshours;
}
const isduringBussinessHour=async(property)=>
{
    console.log("isduringBussinessHour");
    const timezone= property.timezone;
    var currendatettime =moment().tz(timezone);
    const dayname= currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    const daybusinesshours= property.bussinesshours[dayname];
    //console.log(JSON.stringify( daybusinesshours));
    var from_hh=isNaN(daybusinesshours.from.hh)? daybusinesshours.from.hh :parseInt( daybusinesshours.from.hh);
    if (from_hh!=12 && daybusinesshours.from.a==="pm" )
    {
        from_hh+=12;
    }
    else  if (from_hh===12 && daybusinesshours.from.a==="am" )
    {
        from_hh=0;
    }
    var to_hh= parseInt(daybusinesshours.to.hh);
    const from_mm= parseInt(daybusinesshours.from.mm);
    const to_mm=parseInt( daybusinesshours.to.mm);
   
    if (to_hh!=12 && daybusinesshours.to.a==="pm" )
    {
        to_hh+=12;
    }
    else  if ((to_hh===12 || to_hh===0)&& daybusinesshours.to.a==="am" )
    {
        to_hh= to_mm>0 ? 0 :24;
    }
   
    var duringbussenesshours=false;
    if (isNaN(from_hh))
    {
        duringbussenesshours=false;
    }
    else
    {
        
        var moment_from_time= moment().tz(timezone).startOf('day').add(from_hh,"hours").add(from_mm,"minutes");;
      
        var moment_to_time= moment().tz(timezone).startOf('day').add(to_hh,"hours").add(to_mm,"minutes");;   
   //     duringbussenesshours=currendatettime.unix()>moment_from_time.unix() && currendatettime.unix()<moment_to_time.unix();
  /* console.log("moment_from_time");
   console.log(moment_from_time.format("DD-MM-YY hh mm ss a z"));
   console.log("currendatettime");
   console.log(currendatettime.format("DD-MM-YY hh mm ss A z"));
   console.log("moment_to_time");
   console.log(moment_to_time.format("DD-MM-YY hh mm ss a z"));
    */   
        
        duringbussenesshours=currendatettime.isBetween(moment_from_time,moment_to_time);
    }
    return duringbussenesshours;
       
}
const parsecallinfoinitdata = async(accountDb,callinfolog)=>
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
            version:12.5
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

const insertlivecallinfologtoreport= async (callinfotype,callinfo,propertydb)=>
{
    var promise1= new Promise(async (resolve , reject )=>
    {
        switch (callinfotype)
        {
            case "callinit":
                {
                    if (callinfo.when.toLowerCase()==="live")
                        var result =await parsecallinfoinitdata(propertydb,callinfo);
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
                resolve(await parseagentrespnse(propertydb,callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            case  "pin":   
            {
                resolve( await parseagentpin(propertydb,callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            
            case "callrecording":
            {
                resolve( await parsecallrecording(propertydb,callinfo));
                break;
            }

            case "callend":
            {
                resolve(await parsecallend(propertydb,callinfo));
                break;
            }
            case "messagerecordingstart":
            {
                resolve( await parsemessagerecordingstart(propertydb,callinfo));
                break;
            }
             case "messagerecordingend":
            {
                resolve( await parsemessagerecordingend(propertydb,callinfo));
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
const parselivecallinfologdataforreport=async(propertydb,guid)=>
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
       
        callinfologs= callinfologs.sort((a, b) => {
                        
            return a.notifytimestamp > b.notifytimestamp  ? 1 : -1;
        });
        debugMessage(log4jslogger,`\\**********************************************************************\\`);
        const calllength= callinfologs.length;
        var messagerecordingend_end_parsed=false;
        for (var i=0 ; i<calllength;i++)
        {
             callinfo= callinfologs[i];
            guid=callinfo.guid;
            var callinfotype= callinfo.type  ? callinfo.type.toLowerCase():'';
            messagerecordingend_end_parsed = messagerecordingend_end_parsed 
            ||callinfotype==="messagerecordingend"
            || callinfotype=== "callrecording";
            if (callinfotype==="callend" && !messagerecordingend_end_parsed)  continue;
            console.log("parsing ",callinfotype )
            debugMessage(log4jslogger,`parsing ${callinfotype} for ${guid}`);         
            await insertlivecallinfologtoreport(callinfotype,callinfo,propertydb);
           
            debugMessage(log4jslogger,`parsing end ${callinfotype} for ${guid}`);
        }
                    
        debugMessage(log4jslogger,`\\**********************************************************************\\`);
        debugMessage(log4jslogger,`end parsing ${guid}`);
        debugMessage(log4jslogger,`\\**********************************************************************\\`);

        resolve(callinfo);        
    });
   
    var result_callinfo = await promise1 ;
    if (result_callinfo)
    {
        await insertreportdatatoelastic(propertydb,result_callinfo);
        const  notifycalllog= await getNotifyCallLog(propertydb,result_callinfo);
        console.log(notifycalllog.length);
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
            now_unix--;
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
                if (when === "live" && callinfotype==="callend" && reason==="NORMAL_CLEARING")
                {
                     const messagerecordingstart= await getcallinfologformessagerecording(propertydb,callinfo.guid)   
                    
                    const messageid= callinfo.messageid;
                     if (!messagerecordingstart || messageid)
                    {
                         //removeInitialCallRecord(callinfo,propertdb );
                         resolve (await parselivecallinfologdataforreport(propertydb,callinfo.guid));
                    }else
                    {
                        debugMessage(log4jslogger,` messageid did not find for ${callinfo.guid}` );

                    }
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
const insertreportdata= async (callinfo,accountDb)=>
{
    callinfo.pvt_type= "reportdata";
    callinfo.enabled=true;
    debugMessage(log4jslogger,`insert reportdata ${callinfo.guid}`);

    var reportdata=await getreportdatadocument (accountDb,callinfo);
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
                resolve( body);;
                
    
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
        var reportdata=await getelasticsearchreportdatabyguid (callinfo.guid);       reportdata.removefromreport=false;
        await insertreportdata(reportdata,propertydb);
        var fields = {
            "removefromreport":false
        }
        await updatereportdatatoelasticwithguidforremovefromreport(fields,reportdata.guid);

        }

}

const removeInitialCallRecord=async(callinfo,propertydb)=>{
       
        var reportdata= await getInitilaCallRecordForCallingNumber(callinfo.callernumber,propertydb);
       try
       {
            reportdata.removefromreport= true;
            
            var fields = {
                "removefromreport":true
            }
            await updatereportdatatoelasticwithguidforremovefromreport(fields,reportdata.guid);
            await insertreportdata(reportdata,propertydb);
        }
        catch(ex)
        {
            debugMessage(log4jsexceptionlogger, `removeInitialCallRecord error`);
            debugMessage(log4jsexceptionlogger,JSON.stringify( ex));
            debugMessage(log4jsexceptionlogger,`removeInitialCallRecord error - object  ${callinfo}`);

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
            calldetailsinfolist.push(calldetailsinfo);
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
            "initialcallrecord":true
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

const getaccountdbnames = async ()=>
{
    console.log("getaccountdbnames")
    var accountdbpromise =new Promise(async (resolve, reject) => {
        var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
    var nano1 = require('nano')(hellospoke_db);
    nano1.db.list(function(err, body) {
        if (err) {
            console.log("db error", err);
            reject(  err);
        }
        else
        {
         //   console.log( "dblist",body);
            resolve( body);
        }
    });
    });
    var result = await accountdbpromise;
   // console.log(result)
    return result;
   
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


const createaccountdb = async (dbname)=>
{
       
    var accountdbpromise =new Promise(async (resolve, reject) => {
        var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
    var nano1 = require('nano')(hellospoke_db);
    nano1.db.create(dbname,function(err, body) {
        if (err) {
            console.log("db creation error", err);
            createindexes(dbname)
            resolve(  err);
        }
        else
        {
            console.log( "sucess",body);
             createindexes(dbname)
            resolve( body);
        }
    });
    });
    var result = await accountdbpromise;
    return result;
   
}


const resetpasswordemail = (payload) => {
    const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
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
    const email= payload.data.email;
    const account_id = payload.data.accountid;
    const userid= payload.data.userid;
    const first_name= payload.data.first_name;
    const html= `<!DOCTYPE html>
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
                    Hi ${first_name}, <br /> We received a request to reset your HelloSpoke password.
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

const vmboxemail = async(payload,reportdata) => {
     const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
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
   
  const emails= payload.data.emaillist.toString();
//  console.log('sending email ', emails);
  const from = reportdata.from ? reportdata.from : '-';
  const fromnumber =reportdata.fromd ? reportdata.fromd : '-';;
  const to = reportdata.didnumber ? reportdata.didnumber : '';
  const tonumber = reportdata.didnumber ? reportdata.tonumber : '';
  const  incidentdate= moment.duration(reportdata.incidentdate , 'seconds');
  const dt= moment.utc(incidentdate.asMilliseconds());
  const received = dt.format("ddd, MMM D,YYYY at hh:mm");
  //const duration = "";////payload.data.duration ? payload.data.duration : ''; 
  const duration = formaReportTime(reportdata.callduration); 
 
  const filetype = 'mp3';
  const boxid= reportdata.boxid;
  const aws_url= process.env.AWS_MESSAGE_RECORDING_URL;
  var filename= reportdata.messageid;
   filename = boxid+"/"+ filename;
      const AWS = require('aws-sdk')

const myBucket = process.env.AWS_MESSAGE_RECORDING_URL;
  const myKey = filename;
  const s3 = new AWS.S3({
    accessKeyId: AWS.config.accessKeyId,
    signatureVersion: AWS.config.signatureVersion,
    region: AWS.config.region,
    secretAccessKey: AWS.config.secretAccessKey
  });


  const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_MESSAGE_RECORDING_URL,
      Key: filename,
  })
  
  const filesize = await getSize(filename);
  var fileurl = url;
const propertyname= reportdata.propertyname;
  const caller=  `from ${from}(${fromnumber})`;
  const calee=  `from ${to}(${tonumber})`;
  const callflowoption= reportdata.type;
  const voicemailboxname= `${callflowoption} Voicemail `;
    //const account_id = payload.data.accountid;
    //const userid= payload.data.userid;
    const html= 
    `<!DOCTYPE html>
    <html><head>    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div style=" font-family: sans-serif;  padding-left: 161px;  color: #555555;">
            <div style="width: 70%;padding-right: 3%; padding-bottom: 8px; padding-left: 3%; padding-top: 2%;  background-color: #d3d3d342;">
                <div  style="background-color: #5995f7;   height: 11px !important;   margin-top: -4% !important;   margin-left: -25px!important;">
                </div>
                <div class="row head1">
                    <h3 style="font-size: 17px; margin-left: 34%;">New Voicemail</h3>
                </div>
                <div class="row">
                    <p style="font-size: 15px;  ">Hi,</p>
                    <p style="margin-top: 6%;   ">You have a new voicemail from \n<span style="font-weight: 600;">${caller}</span>  for your voicemail box at <span style="font-weight: 600;">${voicemailboxname}</span>.</p>
                </div>
                <div style="display: flex;  "> 
                <p>Please find the message audio file in the attachment.</p>
                </div>
                <div class="row info">
                    <p style="font-size: 15px;   margin-top: 4%;   margin-bottom: 5%; font-size: 17px;">Voicemail Message Details</p>
                </div>
                <div class="row">
                    <table width="50%" class="table col-md-4" style="font-size: 13px;   width: 96%;">
                        <tbody>
                            <tr class="active">
                                <td
                                    style="padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: right;   border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    Caller</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                    ${caller}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="padding-top: 6px;padding-bottom: 5px; font-weight: 600;text-align: right;border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    Callee</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                    ${calee}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="padding-top: 6px;padding-bottom: 5px; font-weight: 600;text-align: right; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    Received</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${received}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: right; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    Length</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${duration}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: right; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    File Name	</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                    ${filename}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style=" padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: right; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    File Type	</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                    ${filetype} </td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="padding-top: 6px;padding-bottom: 5px; font-weight: 600; text-align: right; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-right: 6px;">
                                    File Size	</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;">
                                     ${filesize} KB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </body>
    
    </html>`;
    var emaillist =payload.data.emaillist ;
   for (var e=0; e<emaillist.length; e++) 
   {
       const email= emaillist[e];
        let mailOptions = {
            from: process.env.SMTP_MAIL_SERVER_FROM,
            to: email,
            subject: `${propertyname} ${callflowoption} voicemail`,
            text: 'This is the email regarding vmbox.',
            html: html,
            attachments: [{
                filename:filename, 
                        contentType: 'application/mp3',
                path: fileurl
            }]
        };
    
    var p= new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                const error_message= `email not sent to ${email} for guid ${reportdata.guid} and property ${reportdata.propertyid} ${reportdata.propertyname} `
               serverlog("error",error_message,"email",JSON.stringify( error))
                 resolve (error);
            }
            else
            {
                const messageid=info? info.messageId:'';
                console.log('Message sent: %s',messageid);
                const sucess_message= `email sucessfuly sent to ${email} for guid ${reportdata.guid} and property ${reportdata.propertyid} ${reportdata.propertyname} with messageid ${messageid}`
                serverlog("info",sucess_message,"email")
                resolve(info);
            }
        }); 
    });
    await p;

    }
}


const relogin=  async(req,account_name,creds)=>
{
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
           var decoded= req['decoded'];
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
       else{
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

const loginwithcred=  async()=>
{   
   const resetPasswordPromise = new Promise<any>((resolve, reject) => {
    const  creds=process.env.KAZOO_CREDENTIAL_HASH;
    const account_name=process.env.KAZOO_ACCOUNT_NAME ;
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

const loginsavenewpassword=  async(req,accountId,userid,password)=>
{   
    const resetPasswordPromise = new Promise<any>((resolve, reject) => {
       const  creds=process.env.KAZOO_CREDENTIAL_HASH;
        const account_name=process.env.KAZOO_ACCOUNT_NAME ;


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
                      password:password,
                    }
                  }
                var savepasswordresult= await savenewpassword(req,body.auth_token,accountId,userid,payload)
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
const creteKazooStorage=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
   const storage_payload= {"data":{}};
    const storagePromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .put({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage?validate_settings=false`,
        body:JSON.stringify( storage_payload)
    },
     (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody storage error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody storage account \n", body);
           resolve( body);
       });


                
    });

    const result = await storagePromise;
    return result;

}
const getKazooAccountEmailNotification= async (accountId)=>
{
   // console.log("getKazooAccountEmailNotification")
    const apiKey = await loginwithcred();
    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(null, apiKey)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/notifications/voicemail_to_email`, (err, response, body) => {
 
            if (err)
            {
                console.log("\n\n\nbody notifications voicemail_to_email error \n", err);
                resolve(err);
                return;
            }
          //  console.log("\n\n\nbody storage account \n",JSON.parse( body).data.from);
            resolve( body);
        });
});
return await storagePromise;
}

const setKazooAccountEmailNotification=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
   const payload= {
    "data": {
      "id":"voicemail_to_email",
      "to": {
        "type": "original"
      },
      
      "from":  process.env.SMTP_MAIL_SERVER_FROM,
      "subject": "voicemail from {{account.name}} - {{voicemail.vmbox_name}} ",
      "enabled": true,
      "template_charset": "utf-8"
    }};
    const promise_email_notification = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .post({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/notifications/voicemail_to_email`,
        body:JSON.stringify( payload)
    },
     (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody promise_email_notification error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody promise_email_notification  \n", body);
           resolve( body);
       });


                
    });

    const result = await promise_email_notification;
    return result;

}
const deletekazoostorage= async(req,accountId)=>
{
    const apiKey = await loginwithcred();
   
    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
        .del(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`, (err, response, body) => {
 
            if (err)
            {
                console.log("\n\n\delete storage error \n", err);
                resolve(err);
                return;
            }
            console.log("\n\n\Deleted storage \n", body);
            resolve( body);
        });
 
 
                 
     });
    
}
const creteKazooStorageAttachments=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
    const property = await getpropertyInfo(accountId);
    const uid= uuid().replace(/\-/g, "");
    
    console.log(accountId);
    const storage_payload:any= {
    "data": { 
            "attachments": {
             
            },
            
        "plan": {
            "modb": {
                "types": {
                    "mailbox_message": {
                        "attachments": {
                            "handler": `${uid}`,
                            "settings":{
                                "field_list":[
                                    {"arg":"account_id"}
                                    ,{"arg":"id"}
                                    ,{"arg":"attachment"}
                                ]
                               
                            }
                        }
                    }
                }
            }
        }
        }
    };
    storage_payload.data.attachments[uid]= {
        "handler": "s3",
        "name":"kazoos3",
        "settings": {
            "bucket":process.env.AWS_STORAGE_BUCKET,
    "key":"AKIA6II6HXJIOYE2AAUF",
    "secret":"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"
        }
    }
    const storagePromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .put({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`,
        body: storage_payload,
        json :true
       
    },
     (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody storage error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody storage account \n", body);
           resolve( body);
       });


                
    });

    const result = await storagePromise;
    return result;

}
const getKazooStorageInfo=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
   
    const storagePromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`, (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody storage error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody storage account \n", body);
           resolve( body);
       });


                
    });

    const result = await storagePromise;
    return result;

}
const savenewpassword=  async(req,auth_token,accountId,userid,payload)=>
{   
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


const checkuserincompanyaccount=async  (req,_accountid, username,apiKey)=>
{
    var userdocs:any = await getAccountuser(req, _accountid,apiKey);
    const users= userdocs.data;
    const userfound= users.find(u=>u.username ===username);
    return userfound;
}
const checkuserinaccounts= async (req,_accountid, username,apiKey) => {
    console.log("checkuserinaccounts user");

    const companyuser= await checkuserincompanyaccount(req,_accountid, username,apiKey);
    if (companyuser) return companyuser;

    //check user in child account
  
    var accountchildren:any= await getAccountChildren(req,_accountid, apiKey);
    var user;
    if (accountchildren.data) 
    {
        const children = accountchildren.data;
        children.every(async (child) => {
            console.log ("accountid");
            console.log (child.id);
            console.log (child.name);

            var userdocs:any = await getAccountuser(req, child.id,apiKey)
            const users= userdocs.data;
            const userfound= users.find(u=>u.username ===username);
            if (userfound) 
            {
                user=child;
                user.account_id= child.id;
                user.account_name= child.name;
            }
            return true;
        });
    }
    return user;

}
const  getAccountChildren= async (req,_accountid,apiKey)=>{
    console.log("getAccountChildren");
    const accountChildrenPromise = new Promise((resolve, reject) => {
          getKazooRequest(req,apiKey)
              .get(`${process.env.KAZOO_SERVER}/v2/accounts/${_accountid}/children`, (err, response, body) => {
  
                  if (err)
                  {
                      console.log("\n\n\nbody acconut \n", err);
                      resolve(err);
                      return;
                  }
                  console.log("\n\n\nbody acconut \n", body);
                  resolve(JSON.parse( body));
              });
       
      
  });
  
      const result= await accountChildrenPromise;
      return result;
  }


  const  getAccountuser= async (req,_accountid,apiKey)=>{
    console.log("getAccountuser");
    const accountusersPromise = new Promise((resolve, reject) => {
          getKazooRequest(req,apiKey)
              .get(`${process.env.KAZOO_SERVER}/v2/accounts/${_accountid}/users`, (err, response, body) => {
  
                  if (err)
                  {
                      console.log("\n\n\nbody users \n", err);
                      resolve(err);
                      return;
                  }
                 // console.log("\n\n\nbody users \n", body);
                  resolve(JSON.parse( body));
              });
       
      
  });
  
      const result= await accountusersPromise;
      return result;
  }

  const createUserInKazoo= async (req,accountid,payload,apiKey)=> {
      console.log("createUserInKazoo");
        payload.data.priv_level= "user";
      console.log(payload);
    const accountusersPromise = new Promise((resolve, reject) => {
    const kRequest = getKazooRequest(req,apiKey)
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
            let _usr=(r as any).body.data;
            if (_usr.email)
            {
                console.log("\nuser creation started \n", _usr );
               _usr.kazooid= _usr.id;
               
                resolve(_usr);
            }
            else
            {
                resolve(_usr);
            }
         }
    })
});

var result = await accountusersPromise;
return result;
  
}
const getUserInfoFromKazoo= async (req)=>
{
    console.log(req['decoded'].account_id)
    console.log(req['decoded'].account_id)
    
    const kazoouserinfoPromise=  new  Promise (async(resolve, reject)=>{
        const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}`, (err, response, body) => {
           resolve (JSON.parse(body).data);
        });
    });
   return  await kazoouserinfoPromise;
}

  //free switch 

  const free_switch_login=  async()=>
{   
   console.log("free_switch_login");
    const freeswitchlogin = new Promise<any>((resolve, reject) => {
    const responseData: any = {
            success: false
        };
    const loginData = 
            {
				"username":process.env.FREE_SWITCH_SERVER_USER_NAME,
				"password":process.env.FREE_SWITCH_SERVER_USER_PASSWORD
			}
     const kRequest = Request.post(`${process.env.FREE_SWITCH_SERVER}/login`, {
                 body: loginData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
            }
            console.log("response.statusCode " , response.statusCode);
            if (response && response.statusCode === 200) {
           
                console.log("loggedin " , body.data.token);
                resolve(body);
               
             } else {
                console.log("loggedin fail  " , response.body);
                resolve(responseData);
         }
        });
        });

    const result = await freeswitchlogin;
    return result;

}

const free_switch_create_device=  async(apikey,didnumber,password,realm,callflowdeviceusernamesuffix)=>
{   
   console.log("freeswitchcreatedevice ,");

    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {
      
       
        const responseData: any = {
            success: false
        };
        var username= didnumber + callflowdeviceusernamesuffix;
        const postData = 
            {
				
                "gateway_name":username,
                "username":username,
                "password":password,
                "realm":realm,
                "from-domain": realm,
                "register":"1",
                "register-proxy":process.env.PROXY,
                "proxy": process.env.PROXY,
                "ping":"25",
                "is_messagebox":"1",
                "is_outbound":"1"
            }
            

            console.log(postData);
     //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
     //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/device/create`, {
                 body: postData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitchcreatedevice fail  " );
                console.error(err);
            }
           
            
            if (response && response.statusCode === 200) {
           
                console.log("freeswitchcreatedevice sucess");
               
                
           
                resolve(body);
               
             } else {
                console.log("freeswitchcreatedevice fail  " , response.body);
                resolve(body);
         }
        });
        });

    const result = await freeswitchcreatedevice;
    return result;

}
//Update free switch device password
const free_switch_update_device_password=  async(apikey,deviceid,password)=>
{   
   console.log("free_switch_update_device_password ,", deviceid);

    const freeswitchupdatedevice = new Promise<any>((resolve, reject) => {
      
       
        const responseData: any = {
            success: false
        };
       // var username= didnumber + callflowdeviceusernamesuffix;
          const updatepassword = 
                    {
                        
                        "_id":deviceid,
                        "password":password
                    }
                 const kRequest = getFreeSwitchRequest(apikey).put(`${process.env.FREE_SWITCH_SERVER}/v1/device/update`, {
                 body: updatepassword,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitchupdatedevice fail  " );
                console.error(err);
            }          
            
            if (response && response.statusCode === 200) {
           
                console.log("freeswitchupdatedevice sucess" ,response.body);
                resolve(body);
               
             } else {
                console.log("freeswitchupdatedevice fail  " , response.body);
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

const free_switch_create_property_device=  async(apikey, payload)=>
{   
   console.log("free_switch_create_property_device");
    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {
      

        const responseData: any = {
            success: false
        };

        const postData = 
        {
            "propertyId":payload.propertyId,
            "gateway_name":payload.username,
            "username":payload.username,
            "password":payload.password,
           "realm":payload.realm,
            "from-domain":payload.realm,
            "register":"1",
            "register-proxy":process.env.PROXY,
            "proxy": process.env.PROXY,
             "ping":"25"
        }
        console.log("postData for property device" , postData);
     //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
     //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/property/device/create`, {
                 body: postData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitch property device fail  " );
                console.error(err);
            }
            if (response && response.statusCode === 200) {
           
                console.log("freeswitch property device sucess");
                resolve(response);
               
             } else {
                console.log("freeswitch property device fail  " , response.body);
                resolve(responseData);
         }
        });
        });

    const result = await freeswitchcreatedevice;
    return result;

}

const free_switch_create_voicemessagebox=  async(apikey, payload)=>
{   
   console.log("free_switch_create_voicemessagebox");
    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {
      

        const responseData: any = {
            success: false
        };

        const postData = 
        {
            "propertyId":payload.propertyId,
            "number":payload.number ,
            "DID":payload.didnumber,
            "password":"1234",
            "status":"1"
        }
console.log("postData postData" , postData);
     //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
     //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/voicemessagebox/create`, {
                 body: postData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitch voicemessagebox fail  " );
                console.error(err);
            }
            if (response && response.statusCode === 200) {
           
                console.log("freeswitch voicemessagebox sucess");
                resolve(response);
               
             } else {
                console.log("freeswitch voicemessagebox fail  " , response.body);
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
const insertreportdatatoelastic= async (accountDb,callinfo)=>
{
     var reportdata= getReportDocumentFromTemp(callinfo.guid)
     if (!reportdata)
         reportdata= await getreportdatadocument(accountDb,callinfo);
    removeReportDocumentFromTemp(callinfo.guid);
    const promise1 = new Promise(async (resolve, reject) => 
    {
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
                    var reportdata2= await getreportdatadocument(accountDb,callinfo);
                    //insert elastic id to couchdb so we can use it for updation
                    if(reportdata2)
                    {
                        reportdata2.elasticid=body._id;
                        console.log('elastic sucess insertreportdata')
                        await insertreportdata(reportdata2,accountDb);
                    }
                    resolve( body);
                }
            });
    })
    return await promise1;
}

const getelasticsearchdata= async (payload,fields=[])=>
{
    let from, size;
    let defaultSorting = { "incidentdate" : {"order" : "desc"}};
    let page = isNaN(payload.page) ? 0 : payload.page;
    let searchFields = ["propertyname","type","respondent","resolutionon","industry","propertytype","propertyphone","didnumber","from","fromd","resolutiontype"];
    if(page == 0){
        from =  0;
        size = 9999;  
    } else {
        size = 50; 
        from = ((parseInt(page)-1)* size) ;
    }
    const query_string= `${payload.querystring} `;
    const query =  {
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
                  "lte" : payload.endtime,
                    "boost" : 2.0
                }
              }
            },
            {
                "bool": {
                  "should": [
                    {
                       "bool": {
                          "must_not": [
                            {
                               "exists": {
                               "field": "removefromreport"
                               }
                            }
                         ]
                     }
                   },
                 {
                   "bool":
                   {
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
          ]
        }
      
    };
      
    const body=    {    
        "_source":fields,
         "sort":[],
         "query":query,
         from: from,
         size: size
      
     } ;
 

    const options = {
        method: 'POST',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_search`,
        headers:
        { 
            'Content-Type': 'application/json',
        },
        body:body
         ,
        json: true
    };
    if(payload){
        if(Boolean(payload.sorting)){
            console.log (payload.sorting);
            options.body.sort.push(payload.sorting);
        } else {
            options.body.sort.push(defaultSorting);
        }
    }
    const resultpromise=  new Promise (async(resolve, reject)=>{
        Request(options, function (error, response, body) {
            if (error) {  
                console.log(error +'//'+ 'error');
                resolve(error);
            }
            else
            {
               
                let result = body.hits && body.hits.hits? body.hits.hits.map(a => a._source):[];
               resolve(result)
 
 
            }
        });
    })
    const result= await resultpromise;
    return result;
    
}
const getelasticsearchreportdatabymessageid= async(messageid,attempt=0)=>
{
    
console.log("elasticsearchreportdocselasticsearchreportdocselasticsearchreportdocselasticsearchreportdocs")
    const query =  {
        "bool": {
            "must": [
               
                { "match": {  "messageid.keyword": messageid } },
                { "match": {  "pvt_type": "reportdata" } },
                { "match": {  "emailsent": false } }
            ]
        }
    }
    
    var elasticsearchreportdocs:any= await getReportdataFromElasticSearch(query)
    
    var reportdoc;
   // console.log(elasticsearchreportdocs)
    console.log(elasticsearchreportdocs.length)
    if(elasticsearchreportdocs && elasticsearchreportdocs.length>0)
    {
        reportdoc= elasticsearchreportdocs[0];
      
        sendEscalationEmails(reportdoc)
        var param = {
            emailsent:true,
        }
        //checked 
         updatereportdatatoelasticwithguidforemailsent(param,reportdoc.guid);
 
    }
    else if (attempt<4)
    {
        setTimeout(() => {
            getelasticsearchreportdatabymessageid(messageid,++attempt);
        }, 60000);
    }
    
    return reportdoc;
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
const updatereportdatatoelastic= async (accountDb,callinfo,fileds)=>
{
    debugMessage(log4jslogger,`updatereportdatatoelastic`);

    var reportdata= await getreportdatadocument(accountDb,callinfo);
    if (!reportdata)
    {
        debugMessage(log4jslogger,`did not find the report while updating elastic ${JSON.stringify(callinfo)}`);

    }
   const elasticid= reportdata.elasticid;
   console.log("elasticid");
   console.log(elasticid);
   const elasticupdatepromise= new Promise (async(resolve, reject)=>{
    var url=  `${process.env.ELASTIC_SEARCH_SERVER}/${process.env.REPORT_INDEX}/_update/${elasticid}`;
    const options = {
        method: 'POST',
        url: url,
        headers:
        { 
           // 'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            },
            body:{
            doc:fileds
            }
         ,
        json: true };
        Request(options, async  (error, response, body)=> {
            if (error) {  
                console.log(' elastic update error');
                console.log(error +'//'+ 'error');
                debugMessage(log4jslogger,`elastic update error`);

                debugMessage(log4jslogger,`error ${JSON.stringify(error)}`);

               resolve( error);
            }
            else
            {
                console.log('elastic update sucess')
                console.log(JSON.stringify(body) +' // '+ 'succuss');
                debugMessage(log4jslogger,`elastic update sucess`);

                debugMessage(log4jslogger,`succuss ${JSON.stringify(body)}`);
                 resolve(  body);
            }
        });

   }
   );
   return await elasticupdatepromise;
}
//function end

app.get('/properties/:compnyid', validateJWT, (req, res) => {
   
    var id =req.params.compnyid;
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    //getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/descendants?paginate=false`, (err, response, body) => {

        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${id}/descendants?paginate=false`, (e, r, b1) => {
            if(e) {
                res.send( e);
            }
            
           
            const b = JSON.parse(r.body);
            const data = b.data;
           
            res.send(data);
        });
    
});

app.get('/addedproperties/:companyid', validateJWT, async(req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    console.log('mster users  ', parseAccountToDatabaseName(req['decoded'].account_id));
    const companyid=req.params.companyid;
    const contactsSelector = {
    'selector': {
         'pvt_type': 'property'
               
        },
        "use_index":"pvt_type",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:30000 
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
    var result={
        docs:docs
    };
    res.statusCode = 200;
    res.send(result); 
   
})



app.post('/addcompany', validateJWT, async (req, res) => {
    const payload =  JSON.parse(req.body.payload);
  
   const _accountid=parseAccountToDatabaseName(req['decoded'].account_id);
  
   const result =await insertcompany(payload,req)   ;
   console.log('result'+result);
   res.send("sucess");
         
    
});


app.put('/companies/:id', validateJWT, async (req, res) => {
    var payload =  JSON.parse(req.body.payload);
    const _accountid=parseAccountToDatabaseName(req['decoded'].account_id);
    const accountDb = nano.use(_accountid);
   const result =updatecompany(payload,_accountid)   ;
   console.log('result'+result);
    res.send("sucess");
 });

app.get('/companies/:id', validateJWT, async(req, res) => {
    const companyid =  req.params.id;
    console.log('comanyid '+companyid);
    console.log("get company info ")
    
    var company:any = await getcompanyInfo(companyid);
   // console.log (company.error);
    if (!company || company.error )
    {
        //console.log (company.error);
        const account:any = await getkazooaccountinfo(req,companyid);
        console.log(account.data.timezone)
        company = {industrytype:'',
                     company_phone:'9694787894',
                     timezone:account.data.timezone
                 }
    }
    console.log(JSON.stringify(company));
    res.send(company);
          
    
});


app.get('/getnotifycompanies/:accountid', validateJWT, async(req, res) => {
    const accountid=req.params.accountid;
    const _accountdbname=parseAccountToDatabaseName(accountid);
   // const _accountdbname=parseAccountToDatabaseName(_accountid);
      
    
   console.log("\n  accountname ",_accountdbname );
    const accountDb = nano.use(_accountdbname);
    const contactsSelector = {
       'selector': {
                     "pvt_type": "company",
                    "enabled": true
                 },
           limit:30000 ,
           "use_index":"pvt_type_enabled",
           "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
       }
       res.statusCode = 200;
       var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
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
           var companydata=JSON.parse( body).data;
       
          res.send(companydata);
       });
})


app.get('/industries', (req, res) => {
   // const accountId = (req['decoded'] as DecodedJWT).account_id;
    const industries = {data:[
        {
            type:'Multifamily',
            subtypes:[
                'Affordable',
                'Conventional',
                'Senior'
            ]
        },
        {
            type:'Service Contractor',
            subtypes:[
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
    const payload= {
        data:
        {
           primarykazooaccount : {
            name: req.params.name
           }, 
           username: req.params.email,
           first_name: req.body.payload.data.first_name,
           last_name: req.body.payload.data.last_name,
           password: req.body.payload.data.password,
           masteruser_name: req.body.payload.data.masteruser_name
        }
    };
    const accountId= req.body.payload.data.companyid;
    const userid= req.body.payload.data.userid;
    const password= payload.data.password;
    await loginsavenewpassword(req,accountId,userid,password);
    sendemail(payload);
    res.send("Email sent");
});

app.get('/forgotpassword/company/:name/user/:email', async (req, res) => {
     
    var accountname= req.params.name;
    var username= req.params.email;
    userSelector.selector.username=username;
     var result:any= {};
     var account:any;
     var user;
     const contactsSelector = {
        "selector": {
            "pvt_type": "accountinfo",
            "name":accountname
         },
         "use_index":"pvt_type_name",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        limit:1 
    }
    const globaldb=nano.use("globaldb");
    var accountinfo=await getdocumentbyproperty(globaldb,contactsSelector);
     
    if (accountinfo && accountinfo.accountid)
    {
        account= await getcompanyInfo(accountinfo.accountid); 
        if (!account)
            account= await getpropertyInfo(accountinfo.accountid);   
        const companydbname= parseAccountToDatabaseName(account.companyid);
        const companydb=nano.use(companydbname);
        user =await getdocumentbyproperty(companydb,userSelector);
                
    }
     
     if (account && account.companyid &&user && user.id )
     {
         const primarykazooaccount=user.primarykazooaccount;
         const useraccountname= primarykazooaccount ? primarykazooaccount.name: user.accountname;
         const useraccountid= primarykazooaccount ? primarykazooaccount.id:account.companyid;
        
         const payload= {
             data:
             {
                accountname:useraccountname,
                accountid:useraccountid,
                email:username,
                userid:user.id,
                first_name : user.first_name
            }
         }
     
            if(payload.data.accountname != accountname){
               // console.log('error+++++++++++++++++++++++++++');
                res.send("Error");
            }else{
               // console.log('same');
                resetpasswordemail(payload);
                res.send("Email sent");
             }
     }
     else
     {
        res.send("Error");
     }
      
});

//create users update  colorindex  settings
app.put('/company/:comapnyid/property/:propertyid/user/:userid/:colorindex', validateJWT, async (req, res) => {
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
    const propertyid = req.params.propertyid;
    const colorindex = req.params.colorindex;
    const contactsSelector = {
            'selector': {
                "pvt_type":"user",
                "id":userid
                },
                "use_index":"pvt_type_id",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
            }

     var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            
            if (_userobj && _userobj._id)
            {
                if (_userobj.msteruser)
                    _userobj.colorindex=colorindex;
                else if (_userobj.propertylist)
                {
                    var userproperty= _userobj.propertylist.find (up=>up.id===propertyid );
                    if (userproperty)
                        userproperty.colorindex=parseInt(colorindex);

                }
                var notifyupdateresult = await updatenotifyusercolorindex(accountDbName,_userobj);
                res.send(_userobj);
            }
            else
            {
                res.send("error");
            }
 });




//create users savepassword
app.get('/savepassword/company/:companyid/:accountname/user/:userid/password/:password', async (req, res) => {
   
    const accountId= req.params.companyid;
    const userid= req.params.userid;
    const password= req.params.password;
    await loginsavenewpassword(req,accountId,userid,password);
            
    res.send("sucess");
           
       
});

//create users changePassword
app.put('/changePassword', validateJWT, async (req, res) => {
    //console.log("here is the user object 11111111111");
    var payload = req.body.payload;
    const _id=req['decoded'].user_id;
    var accountId = req['decoded'].account_id;
    const accountname= payload.data.accountname;
    const creds= payload.creds;
    delete payload.data.accountname;
    delete payload.creds;
    payload.data.passwordreset= true;
    console.log ("relogin payload ", payload);
    // console.log("id " + _id);
     const kRequest = getKazooRequest(req)
     .patch({
         url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users/${_id}`,
         body: payload,
         json: true
     },
     async (e, r, b) => {
         if (e) {
            debugMessage( log4jslogger,JSON.stringify(e));         
   
           //console.log(e);
            res.send(JSON.stringify(e));
             return;
         }
         else {
            const contactsSelector = {
                'selector': {
                    "pvt_type":"user",
                      "kazooid":_id
                },
                "use_index":"pvt_type",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
            }
            const property= await getpropertyInfo(accountId);
            if (property)
            {
                accountId= property.companyid;
            }
        
            const accountDbname= parseAccountToDatabaseName(accountId);
            const accountDb = nano.use(accountDbname);
            var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            _userobj.passwordreset=true;
            var result= await insertUser(_userobj, accountDbname);
            const reloginresult= await relogin(req,accountname, creds );
            reloginresult.userObj = _userobj;
             res.send(reloginresult);
        }
     });
       
});

// create users  change role
app.post('/changeRole',validateJWT,async (req, res) => {

        const payload = JSON.parse(req.body.payload);
        const companyid=payload.companyid;
        const accountDbName= parseAccountToDatabaseName(companyid);
        const accountDb = nano.use(accountDbName);
        const contactsSelector = {
            'selector': {
                "pvt_type":"user",
                "id":payload.userid
                },
                "use_index":"pvt_type_id",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
            }
        var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
       // var insertingpropertylist= _userobj.propertylist;
        const user_type= payload.user_type.toLowerCase();
        if (user_type!="master" )
        {
            if( _userobj.propertylist){
              var insertingpropertylist= _userobj.propertylist;
             _userobj.user_type= payload.user_type.toLowerCase();
             _userobj.msteruser=false;
            var propertysetting= insertingpropertylist.find(ip => ip.id===payload.propertyid);
            if(propertysetting === undefined){
                propertysetting=payload.propertylist;
                 _userobj.propertylist=[];
                _userobj.propertylist=propertysetting;
            }
              propertysetting.user_type=payload.user_type;


            }else{
                 _userobj.user_type= payload.user_type;
                 _userobj.msteruser=false;
                 _userobj.propertylist=payload.propertylist;
            }
            
         
        }
        else
        {    _userobj.propertylist=[];
            _userobj.user_type= payload.user_type;
            _userobj.msteruser=true;
        }

        const result =await insertUser(_userobj,accountDbName)   ;
        res.send (result);

  
});
// users delete permanently
app.delete('/companies/:companyid/property/:propertyid/users/:userid/permanentdel/:permanentdel', validateJWT,async(req, res) => {
   
    const companyid=req.params.companyid;
    const userid= req.params.userid;
    const propertyid=req.params.propertyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);    
    const contactsSelector = {
        'selector': {
            "pvt_type":"user",
            "id":userid
            },
            limit:30000 ,
            "use_index":"pvt_type_id",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
            
        }
    var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
    delete     _userobj.notify_enabled;
    //console.log('_userobj-------------------------',_userobj);
    _userobj.pvt_type="deleteduser";
    var apiKey=await loginwithcred();
       var  user=  await deleteUserInKazoo(null,apiKey, _userobj.kazooid, _userobj.primarykazooaccount.id);
  // _userobj.kazooid=
        const properties:any =await getproperties(companyid);
        properties.docs.forEach(property => {
            const emaillistsettings = _userobj.emailsettings &&_userobj.emailsettings.settings?
                                            _userobj.emailsettings.settings:[];
            if (emaillistsettings.length>0)
            {            
                const emaillis = emaillistsettings;//.map(r=>r.email);
                removeemailsFromList(property,emaillis)
            }
        });
 // 
    
    const result =await insertUser(_userobj,accountDbName)   ;
    res.send (result);
                
        
});
const deleteUserInKazoo= async (req,apiKey,userid,acccountid)=> {
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
app.delete('/companies/:companyid/property/:propertyid/users/:userid/:removeall', validateJWT,async(req, res) => {
   
    const companyid=req.params.companyid;
    const userid= req.params.userid;
    const removeall= req.params.removeall;
    const propertyid=req.params.propertyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const contactsSelector = {
        'selector': {
            "pvt_type":"user",
            "id":userid
            },
            
            limit:30000 ,
            "use_index":"pvt_type_id",
             "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
        }
    var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
    var insertingpropertylist= _userobj.propertylist;
    const user_type= _userobj.user_type.toLowerCase();
    if (user_type!="master" )
    {
     
        if (removeall!="true")
        {
            var propertysetting= insertingpropertylist.find(ip => ip.id===propertyid);
            propertysetting.enabled=false;
        }
        else
        {
            insertingpropertylist.forEach(ip => {
                ip.enabled=false;
            });
        }
        insertingpropertylist=insertingpropertylist.filter(ip=> ip.enabled);
        _userobj.notify_enabled=insertingpropertylist.length>0;
    }
    else
    {
        _userobj.notify_enabled= false;
        
    }

    const result =insertUser(_userobj,accountDbName)   ;
    res.send (result);
                
        
});

//create user update 
app.put('/companies/:companyid/masterusers/:userid', validateJWT, (req, res) => {
   
    const companyid=req.params.companyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
    const payload:any =  req.body.payload;
    accountDb.get(userid, (err, _userobj) => {
        if(err) {
           console.log("\n deleting user error:" , err);
            res.send(err);
        }
        else {
            _userobj.email=payload.email;
            _userobj.first_name=payload.first_name;
            _userobj.last_name=payload.last_name;
            _userobj.title=payload.title;
          
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
                    const payload1:any = {
                        data: {
                            email:payload.email,
                            first_name:payload.first_name,
                            _last_name:payload.last_name,
                            title:payload.title,
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
    
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    //
  
    let payload =  JSON.parse(req.body.payload);
    const contactsSelector = {
        'selector': {
            "pvt_type":"user",
            "username":payload.data.email
            },
            "use_index":"pvt_type_username",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000  
        }
      

    var primarykazooaccount:any =payload.data.primarykazooaccount
    const kazooacccountid= primarykazooaccount ? primarykazooaccount.id:companyid;
    const accountinfo:any=  await getkazooaccountinfo(req,kazooacccountid);
    const kazooacccountname= accountinfo.data.name;
    primarykazooaccount={
            id:kazooacccountid,
            name:kazooacccountname
        }
    payload.data.primarykazooaccount=primarykazooaccount;
    //sendemail(payload);
    const accountDbname = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbname);
    var user=await getdocumentbyproperty(accountDb,contactsSelector);
    if (!user)
    {
        payload.data.emailsettings= {settings:[]};
        payload.data.emailsettings.settings.push({email:payload.data.email});
        var apiKey=await loginwithcred();
        user = await checkuserinaccounts(req,kazooacccountid, payload.data.email,apiKey);
        if (!user)
        {
            user = await checkuserinaccounts(req,companyid, payload.data.email,apiKey);
        }
        if (!user)
        {
            user=  await createUserInKazoo(req,kazooacccountid,payload,apiKey);
            if (user.email)
            {
                payload.data.kazooid= user.kazooid;
                payload.data.id= user.kazooid;
            }
            else
            {
                payload.data.error= "Error occured while creating kazoo user"
            }
        }
        else
        {
            payload.data.kazooid= user.id;     
            payload.data.id= user.id;
            payload.data.hellospokeadmin= true;
               
        }
        if (payload.data.kazooid)
        {
             console.log("\nisnserting master users  ",accountDbname);


             var insertingpropertylist= payload.data.propertylist;
             const user_type= payload.data.user_type.toLowerCase();
             if (user_type!="master" )
             {
                insertingpropertylist.forEach(ip => {
                    ip.user_type=payload.data.user_type;
                });
            }
             const result =insertUser(payload.data,accountDbname)   ;
             if (!payload.data.hellospokeadmin)
             sendemail(payload);
        }
    }
    else
    {
        var propertylist= user.propertylist;
        var insertingpropertylist= payload.data.propertylist;
        var allpropertiesavailable=true;
         const user_type= payload.data.user_type.toLowerCase();
        if (user_type!="master" )
        {
            insertingpropertylist.forEach(ip => {
                const property= propertylist.find(p=> p.id ===ip.id);
                if (!property)
                {
                    allpropertiesavailable=false;
                    user.propertylist.push({
                        "id": ip.id,
                        "enabled": true,
                        "name": ip.name,
                        "user_type":payload.data.user_type
                    });
        
                }
            
            });
        }
       
        if (allpropertiesavailable)
            payload.data.error="user already exist";
        else
        {
            const user_type= payload.data.user_type.toLowerCase();
           
            if (user_type!="master" )
            {
                user.user_type=payload.data.user_type;
            }
            const result =await insertUser(user,accountDbname) ;
            payload.data=user;
            
        }
    }
   res.send(payload.data);
   
})
//create users update settings
app.put('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
    const payload =  req.body.payload;
    console.log("payload");
    console.log(payload);
    const contactsSelector = {
        'selector': {
            "pvt_type":"user",
            "id":userid
            },
            "use_index":"pvt_type_id",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
    var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            
    if (_userobj && _userobj._id)
    {
        _userobj.scheduleemailreport= payload;
        updateScheduleReport(accountDbName,_userobj);
        //console.log("userfound", _userobj);
    }
    res.send("sucess");

});



app.put('/company/:comapnyid/user/:userid/scheduleactivityreport', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    console.log(accountDbName);
    const accountDb = nano.use(accountDbName);
   
    const userid= req.params.userid;
    const payload =  req.body.payload;
    payload.userid=userid;
    payload.enabled=true;
    const result=await insertcallactivityreportinfo(payload,accountDbName);
    res.send("sucess");

});

app.put('/company/:comapnyid/user/:userid/scheduleactivityreport/:id', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const id=req.params.id;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const contactsSelector = {
        'selector': {
            
            "_id":id
            },
            limit:30000 ,
            "use_index":"_id",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
        }
    var _scheduledoc:any=await getdocumentbyproperty(accountDb,contactsSelector); 
    _scheduledoc.enabled=false;

   
    const result=await insertcallactivityreportinfo(_scheduledoc,accountDbName);
    res.send("sucess");

});
app.get('/company/:comapnyid/user/:userid/scheduleactivityreport',validateJWT, async (req, res) => {
    console.log("new");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
  
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
    
      
        var result =await getalldocumentsbyproperty(accountDb,contactsSelector);
    //    console.log(result);
    res.send(result);

});

app.get('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT,async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
   
    
    const contactsSelector = {
        'selector': {
            "pvt_type":"user",
            "id":userid
            },
            "use_index":"pvt_type_id",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
    var _userobj:any=await getdocumentbyproperty(accountDb,contactsSelector); 

    if (!_userobj )
    {
        _userobj = {"scheduleemailreport":{}}
    }
    res.send(_userobj.scheduleemailreport);

});
app.put('/updatenotifyusersettings/:id/:userid', validateJWT, async (req, res) => {
      
   
    const id=req.params.id;
    var property=await findPropertydocument(id);

    var companyid=property&& property.companyid ? property.companyid:id;
    const accountDbName= parseAccountToDatabaseName(companyid);

    const accountDb = nano.use(accountDbName);
    const uid= req.params.userid;
	const payload = JSON.parse( req.body.payload);
    
   console.log ("\n  userid :- ", uid);
    var pinuser=await    checkpin(payload.pin,companyid);
    
    if (pinuser && pinuser.kazooid!=uid )
    {
            console.log("duplicate pin");
            var error = {
                    error:"duplicate pin"
            }
            res.send(error);
    }
    else
    {
        const contactsSelector = {
            'selector': {
                "pvt_type":"user",
                "kazooid":uid

                },
                "use_index":"kazooid_index",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                limit:30000 
            }

            var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 

            if (_userobj && _userobj._id)
            {
                var kazooupdateresult= await updatekazoousersettings(payload,req,id,uid);

                console.log("start notify user setting",kazooupdateresult);
                var notifyupdateresult = await updatenotifyusersettings(accountDbName,_userobj,payload,true,property,req);
                
                serverlog  ("info",`${req['decoded'].user_id} created  updated settings for (${_userobj.email})`,"create schedule");

                res.send(_userobj);
            }
        }
      
   
 });


 //create users update  email  settings
app.put('/updatenotifyuseremailsettings/:comapnyid/:userid', validateJWT, async (req, res) => {
      
   
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
	const payload = JSON.parse( req.body.payload);
    var emaildatalist= payload.emaildatalist? payload.emaildatalist :[];
    for (var i=0;i<emaildatalist.length;i++) 
    {
        var emaildata=emaildatalist[i];
       // console.log("emaillist");
       // console.log(JSON.stringify());
        var callflowoptiontype = emaildata.callflowdata.callflowoptiontype;
        if (  callflowoptiontype && callflowoptiontype.toLowerCase() ==="fwd message" )
        {
            //update voicemail box 
                 const apiKey = await loginwithcred();
                 await updatefwdmessagevoicemaileemailsettings(apiKey,emaildata); 
        }
        else if ((  callflowoptiontype && callflowoptiontype.toLowerCase() ==="escalation" ))
        {
                 await insertescalationemaillist(emaildata,emaildata.callflowdata.callflowoption,userid)    
        }
   }
    
    //console.log(payload.callflowdata);
  
        const contactsSelector = {
            'selector': {
                "pvt_type":"user",
                "kazooid":userid
                },
                "use_index":"kazooid_index",
                "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
                
                limit:30000 
            }

            var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            
            if (_userobj && _userobj._id)
            {
        //        var kazooupdateresult= await updatekazoouseremailsettings(payload,req,companyid,userid);
              
                var notifyupdateresult = await updatenotifyuseremailsettings(accountDbName,_userobj,payload);
                res.send(_userobj);
            }
        
      
   
 });
//create user get
app.get('/presenceid/:username',validateJWT, async (req, res) => {
    
    var accountId = req['decoded'].account_id;
    const userid = req['decoded'].user_id;
    console.log(accountId)
    const property= await getpropertyInfo(accountId);
    if (property)
    {
        accountId= property.companyid;
    }

    console.log(accountId)
    const username= req.params.username
    const contactsSelector = {
        'selector': {
            "pvt_type":"user",
            "username":username
            },
            "use_index":"pvt_type_username",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
    const accountDbname = parseAccountToDatabaseName(accountId);
    const accountDb = nano.use(accountDbname);
    var user=await getdocumentbyproperty(accountDb,contactsSelector);
    if (!user)
    {
        user = await getUserInfoFromKazoo(req);
    }
    console.log("user");
    console.log(user);
    res.send(user) ;
        
      
});

//create users get settings
app.get('/getnotifyusersettings/:id/:userid',async (req, res) => {
  const uid= req.params.userid;
    const contactsSelector = {
        'selector': {"id":uid,
        "pvt_type":"user"
             },
             "use_index":"pvt_type_id",
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
            "masteruser_name"]
        };

        var propertyid=req.params.id;
        var property=await findPropertydocument(propertyid);
        var comapnyid= property && property.companyid? property.companyid:propertyid;
        var accountDb = nano.use(parseAccountToDatabaseName(comapnyid));
   
        var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            var result:any={data:{}};
            if (_userobj){
                    var userdata=_userobj;
                //    console.log('\n\n\n body ', JSON.stringify(userdata));
                    result= {data: {
                        fullname:userdata.first_name + '  ' +userdata.last_name,
                        title : userdata.title? userdata.title:'',
                        timezone : userdata.timezone? userdata.timezone:'',
                        phonesettings : userdata.phonesettings? userdata.phonesettings:{settings:[]},
                        smssettings : userdata.smssettings? userdata.smssettings:{settings:[]},
                        emailsettings: userdata.emailsettings? userdata.emailsettings:{settings:[]},
                        pin:userdata.pin?userdata.pin:'',
                        id:userdata.id,
                        livereplysetting: userdata.livereplysetting? userdata.livereplysetting:[],
                        notificationrulessetting:userdata.notificationrulessetting? userdata.notificationrulessetting:[],
                        handoffrulessettings: userdata.handoffrulessettings? userdata.handoffrulessettings:[],
                        smsagreement:userdata.smsagreement,
                        escalationsettings:userdata.escalationsettings,
                        user_imager:userdata.user_imager?userdata.user_imager:'',
                        member_image:userdata.member_image?userdata.member_image:'',
                        primarykazooaccount:userdata.primarykazooaccount?userdata.primarykazooaccount:[],
                        password: userdata.password?userdata.password:'',
                        masteruser_name: userdata.masteruser_name?userdata.masteruser_name:'',
                        primarykazooaccountid: userdata.primarykazooaccount.id?userdata.primarykazooaccount.id:'',
                        user_type:userdata.user_type?userdata.user_type:'',
                        firstName: userdata.first_name,
                        lastName : userdata.last_name,
                        propertylist: userdata.propertylist ? userdata.propertylist:[] 
                    }
        }
                

            }
         console.log('\n\n\n result ', JSON.stringify (result));
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
    const companyid= req.params.id;
    const  propertyid= req.params.propertyid;
    let page = isNaN(+req.params.page)   ? 1: +req.params.page;
    const activeuseronly=req.params.activeuseronly
    const limit =1000;  //isNaN(req.params.limit) ?  1000:req.params.limit;
    let skip =(page-1)*limit ;
    
    var docs:any = await getusers(companyid);
    docs = docs.filter(r=>r.notify_enabled===true);

    docs= docs.filter (f=> f.user_type=== "master" ||( Array.isArray( f.propertylist) && f.propertylist.find(p=>p.id===propertyid &&p.enabled=== true)));

    if (activeuseronly!="false")
    {
        docs= docs.filter (f=>f.notificationrulessetting!=undefined);
    }
    docs=docs.slice(skip, skip+limit);  
    const result= {
        docs:docs
    }
    res.statusCode = 200;
    res.send(JSON.stringify(result));

 
})


//create user get non property users
app.get('/companies/:id/properties/:propertyid/users/notadded',validateJWT,async (req, res) => {
    const companyid= req.params.id;
   const  propertyid= req.params.propertyid;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
  
    
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
app.get('/companies/:id/masterusers/notadded',validateJWT,async(req, res) => {
    const companyid= req.params.id;
  
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
  
    const contactsSelector = {
                
        "selector": {
            "pvt_type": "user",
            "notify_enabled": false,
          "user_type":"master"
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
   var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
    var result={
        docs:docs
    };
    res.send(JSON.stringify(result));
   
})
//create user get masterusers
app.get('/companies/:id/masterusers', validateJWT, async(req, res) => {
    const companyid= req.params.id;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
    const contactsSelector = {
    'selector': {'user_type': 'master',
                    "msteruser":true,
                    "notify_enabled":true ,
                "pvt_type":"user"       },
        limit:30000 ,
        "use_index":"user_master_enable-index",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    }
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
    var result={
        docs:docs
    };
    res.statusCode = 200;
    res.send(JSON.stringify(result));
   
})
//notify user managment end 


app.get('/companies/:companyid/properties/added', validateJWT, async (req, res) => {
    
   
    const companyid=req.params.companyid;
    var result= await getproperties(companyid);
   // console.log("\n\n\n properties added\n", result);
    res.statusCode = 200;
    res.send(result);
    
});

app.get('/companies/:companyid/callsummery',validateJWT, async(req, res) => {  
    console.log("callsummery");
    const companyid= req.params.companyid;
    const companydbname= parseAccountToDatabaseName(companyid);
   const company= await getcompanyInfo(companyid);
  var result = await getcallsummerydata(companydbname);
 
  if (result===undefined)
 {
    var call_summery_result_data=await calculate_company_callsummery(companyid, company.industry);
    result= {
     data:call_summery_result_data.data
    }
 }

 
    console.log("result11111");
    console.log(JSON.stringify( result));
 
   res.send(result);
});

app.post('/updatecallsummery', async(req, res) => {  
   
    
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
    const comanyid =  req.params.id;
    var accountchildrenpromiss=  new Promise((resolve, reject) => {
            getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${comanyid}/children?paginate=false`, async (err, response, body) => {
            if (err)
            {
                console.log(err);
                res.send(err);
                return;
            }
            var children=JSON.parse(body);
            resolve (children);
     });
    });
    var accountpromiss=  new Promise((resolve, reject) => {
        getKazooRequest(req)
                .get(`${process.env.KAZOO_SERVER}/v2/accounts/${comanyid}`, async (err, response, body) => {
                if (err)
                {
                    console.log(err);
                    res.send(err);
                    return;
                }
                var account=JSON.parse(body);
              //  console.log("\n\n\n accounts\n", account);
                
                resolve (account);
                });
        });

      //  console.log("\n\n\n properties\n", body);
       var propertiespromiss = new Promise(async (resolve, reject) => { 
                    var pr= await getproperties(comanyid);
                    resolve(pr);
       });

       Promise.all([accountchildrenpromiss, accountpromiss,propertiespromiss]).then(values => {
           var properties:any= values[2];
           var accounts:any =values[0];
           accounts.data.push((values[1] as any).data);
           console.log("\n\n\n accounts\n", accounts);
           if (properties.docs)
           { 
                if (accounts.data)
                {
                    accounts.data=accounts.data.filter((e) => {
                        const index = properties.docs.findIndex((e1) => {
                            return (e1 as any).propertyid === e.id;
                        });
                    //    console.log("\nindex ");
                    //console.log("\nindex ",  index)
                        return index<0;
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
        var dbnames:any= await getaccountdbnames();
         dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
         for (var i=0;i<dbnames.length;i++)
            {
                const dbname= dbnames[i];
                const accountid=parseDatabaseNameToAccount(dbname) ;
            //if (accountid==="7cf889a72eab5c7a71c1a643e661c748")
            {
               // await deletekazoostorage(req,accountid)
               console.log("Dbname" +dbname);
                const result= await  creteKazooStorageAttachments(req,accountid);
            }
         };
       res.sendStatus(200);
    });    

     //To get property details using property id

app.get('/getPropertyInfo/:propertyid', async (req, res) => {
     var property = await getpropertyInfo(req.params.propertyid);
    res.send({propertyname: property.propertyname });
 });

//create property add users

app.post('/companies/:companyid/properties/:propertyid/addusers',validateJWT, async(req, res) => {
    
    console.log ("addusuers")
    console.log(req.body);
    const payload =  req.body.payload;
    console.log(payload.data);
    const propertyid =req.params.propertyid;
    const companyid =req.params.companyid;
    const propertyname =payload.data.propertyname;

    const dbname=parseAccountToDatabaseName(companyid);
    const accountDb= nano.use(dbname)

    const userlist= payload.data.userlist;
    const contactsSelector = {
        "selector": {
           "pvt_type": "user",
           "id": {
              "$in":userlist
           }
        },
        "use_index":"pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 30000
     };

  
    var users =await getalldocumentsbyproperty(accountDb,contactsSelector);
     for (var userindex=0;userindex<users.length;userindex++)
    
    {
       const user=users[userindex];
        if (user.user_type.toLowerCase() ==="master" )
            {
                user.msteruser=true;
            }

         var propertylist=   user.propertylist ? user.propertylist:[];
         var property= propertylist.find(p =>p.id===propertyid );
         if (property)
         {
            property.enabled= true;
            if (!property.user_type)
                 property.user_type="basic";
         }
         else
         {
            property=

            {
                "id": propertyid,
                "enabled": true,
                "name": propertyname,
                "user_type":user.user_type
              }

              propertylist.push(property);
             
         }

         user.notify_enabled=true;

         user.propertylist =propertylist;
         const result =await insertUser(user,dbname)   ;


    };
console.log("end");
res.send({
    status:201,
    message:"sucess"
})

}
);
//create property add masterusers
app.post('/companies/:companyid/addmasterusers', validateJWT,async(req, res) => {
    
    const payload = req.body.payload;


    const companyid =req.params.companyid;
   

    const dbname=parseAccountToDatabaseName(companyid);
    const accountDb= nano.use(dbname)

    
    const contactsSelector = {
        "selector": {
           "pvt_type": "user",
           "id": payload.data.id
        },
        "use_index":"pvt_type_id",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit": 30000
     };

  
    var user =await getdocumentbyproperty(accountDb,contactsSelector);
     user.first_name= payload.data.first_name;
     user.last_name= payload.data.last_name;
     user.title= payload.data.title;
     user.notify_enabled= true;
     user.msteruser=true;
     user.user_type= "master";
    const result =await insertUser(user,dbname)   ;


   
console.log("end");
res.send({
    status:201,
    result:result
})

}
);
         
//create property

var putDataDevice:any = {
    "data": 
    {
        "caller_id":{"external": {"number":1222}},
        "sip": {
            "password":  "",
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
        "name":"",
        "ignore_completed_elsewhere": false,
        "custom_sip_headers": {
            "in": {
                "X-device-header-in": "565658665"
            },
            "out": {
                "X-device-outbound":"16616161611"
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

const getdevices= async (req,propertyid): Promise<any> => 
    {
        const devicepromise = new Promise((resolve, reject) => {
            getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices`, (err, response, body) => {
            //    console.log("device d0d7c961d8c8d23cfe17982ddb9153fd", JSON.parse (body).data);
                resolve(JSON.parse (body).data);
            });
        });
        const devices = await devicepromise;
        return devices;
    }

const update_devices_password= async (propertyid,devicesid,password): Promise<any> => 
  {

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
            getKazooRequest(null,apiKey )
            .patch({
                url:`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices/${devicesid}`,
                body: update_data,
                json: true
            }
            , (err, response, body) => {
               console.log("\n\n\n\succesully update\n\n\n\n" ,  body);
            });
        });
       
       // return r;
    
 }    
const getvoicemaibox = async (req,propertyid): Promise<any> => 
{
    const devicepromise = new Promise((resolve, reject) => {
        getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/vmboxes?paginate=false`, (err, response, body) => {
          
            resolve(JSON.parse (body).data);
        });
    });
    const devices = await devicepromise;
    return devices;
}

const createDeviceInKazoo = async (req, propertyid,putDataDevice) :Promise<any> =>{
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
                console.log("error device for ",putDataDevice);
            resolve (e);
            }
            else {
                console.log("sucess device for ",b.data);
              ;
              
                resolve (b.data.id);
            }
    
        });
    });
   var result= await kazoodevicepromise;
   return result;
}
const setup_free_switch = async function(propertyid,didnumber,propertydeviceusernamesuffix,
    callflowdeviceusernamesuffix , password,realm)
{
    const loginresponse= await free_switch_login();
    var apikey =loginresponse.data.token;
    console.log("setup_free_switch didnumber ", didnumber);
        
        //device creattion
        console.log("free_switch_create_device");
        var freeswitchdevice= await free_switch_create_device(apikey,didnumber, password, realm,callflowdeviceusernamesuffix);


        ///property device creation     
        const freeswitch_property_device_data = 
        {
            "propertyId":propertyid,
            "didnumber":didnumber,
            "username":didnumber + propertydeviceusernamesuffix,
            "password":password,
            "realm":realm
        }

        console.log("free_switch_create_property_device");
        await free_switch_create_property_device(apikey, freeswitch_property_device_data);
          const freeswitch_voice_messagebox_payload = 
        {
            "propertyId":propertyid,
            "number":didnumber+ callflowdeviceusernamesuffix,
            "didnumber":didnumber + propertydeviceusernamesuffix,
            "realm":realm
            
        }
       
        console.log("free_switch_create_voicemessagebox ", freeswitch_voice_messagebox_payload);
        await free_switch_create_voicemessagebox(apikey ,freeswitch_voice_messagebox_payload);
      
      
    
    
}

//const createpropertydevice =  async () 
const createdevice = async (req,payload:any, accountdevice:any, escalationlist,suffix,realm): Promise<any> => {

    return new Promise(async (resolve, reject) => {
   // accountdevice
    var devices= [];
            
	escalationlist.forEach(async (clp) => {
				devices.push(
                    new Promise(async(resolve, reject) =>
				{
                   // console.log("clp ", clp );
                   // const didnum=clp.didnumber;
                    //clp.didnumber="4"+didnum;
                   var propertydeviceusernamesuffix=`_${clp.callflowoption}_property` ;
                   var callflowdeviceusernamesuffix = `_${clp.callflowoption}_Callflow`
                 
                   clp.propertydeviceusername= clp.didnumber+propertydeviceusernamesuffix;
                   clp.propertydevicecallerid=payload.phone;

                   clp.propertydevicecallerid=clp.didnumber;
                         
                    
                    clp.didnumber= clp.didnumber.replace("+1","");
                    
                   clp.propertydeviceusername= clp.didnumber+propertydeviceusernamesuffix;
                   clp.callflowdeviceusername = clp.didnumber+callflowdeviceusernamesuffix;
                    
                   var usernamesuffix= suffix==1? callflowdeviceusernamesuffix :propertydeviceusernamesuffix;
                  

				 	putDataDevice.data.name=clp.didnumber+usernamesuffix;//suffix ==="1"? clp.didnumber:payload.phone ; 
					putDataDevice.data.sip.username=clp.didnumber+usernamesuffix; 
                                       
                    putDataDevice.data.sip.password=clp.password; 
                    
                    var device=accountdevice.find(d=> d.name===putDataDevice.data.name);
                    console.log(	putDataDevice.data.name);
                    if (device)
                    {
                        console.log(" device found ",device);
                        clp["deviceid"+ suffix]= device.id;
                        resolve (device.id)
                    }
                    else
                    {
                        //console.log("createDeviceInKazoo 111");

                        
                        putDataDevice.data.caller_id.external.number=suffix==="1"? clp.didnumber:payload.phone;
                        putDataDevice.data.caller_id.external.name= payload.phone;
                        if (suffix==="1")
                             putDataDevice.data.caller_id.external.name+=`_${clp.callflowoption}`;
                        const ext_num= putDataDevice.data.caller_id.external.number;
                        console.log("ext_num ",ext_num);
                        if (ext_num.indexOf("+1")!=0)
                            putDataDevice.data.caller_id.external.number="+1" +ext_num;
                        putDataDevice.data.sip.realm= realm;
                       const deviceid= await createDeviceInKazoo(req,payload.propertyid,putDataDevice);
                       
                       if (deviceid && suffix !=1)
                       {   
                            console.log("calling free switch "); 
                            await setup_free_switch(payload.propertyid,clp.didnumber,propertydeviceusernamesuffix,
                                    callflowdeviceusernamesuffix ,clp.password, realm);
                       }
                      // clp.didnumber=didnum;
                       clp["deviceid"+ suffix]= deviceid;
                       resolve (deviceid)
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

const createvoicemessage = async (req,payload:any, accountVM:any): Promise<any> => {

    return new Promise(async (resolve, reject) => {
   // accountdevice
	var vmboxes= [];
	let escalationlist = payload.callflowdata.filter(cl=>cl.callflowoptiontype.toLowerCase()=== "fwd message");
    escalationlist.forEach(clp => {
        vmboxes.push(new Promise((resolve, reject) =>
        {
            //  console.log("creating device for ",clp.callflowoption);
                    putDataVM.data.name=`${clp.callflowoption}`; 
                    putDataVM.data.mailbox=`${clp.callflowoption}`; 

                    var vm=accountVM ? accountVM.find(d=>d.name===putDataVM.data.name): undefined;
                    
                    if (vm)
                    {
                        console.log(" device found ",vm.id);
                        clp.deviceid= vm.id;
                        resolve (vm.id)
                    }
                    else
                    {
                        let kRequest = getKazooRequest(req)
                            .put({
                                url: `${process.env.KAZOO_SERVER}/v2/accounts/${payload.propertyid}/vmboxes`,
                                body: putDataVM,
                                json: true
                            },
                            (e, r, b) => {
                                if (e) {
                                    console.log("error device for ",clp.username);
                                resolve (e);
                                }
                                else {
                                //    console.log("sucess device for ",clp.username);
                                    clp.deviceid= b.data.id;
                                    resolve (b.data.id);
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

app.post('/companies/:id/properties', validateJWT,async (req, res) => {
    const companyid= req.params.id;
  
    const payload =JSON.parse(req.body.payload)  ;
   
    const propertyid=payload.propertyid;
  
    var devices:any=await getdevices(req,payload.propertyid);
    
    let escalationlist = payload.callflowdata.filter(cl=>cl.callflowoptiontype.toLowerCase()=== "escalation");
    const account:any = await getkazooaccountinfo(req,payload.propertyid);
    console.log("account.realm ", account.data.realm);
    const realm= account.data.realm;
     await createdevice(req,payload,devices,escalationlist,"1",realm);
     await createdevice(req,payload,devices,escalationlist,"" ,realm);
    
     payload.kazoopropertyname=account.data.name;
     var vmbox= await getvoicemaibox (req,payload.propertyid);
     await createvoicemessage(req,payload,vmbox);
      var result =await insertproperty(payload,companyid,req)   ;
    if (companyid!=propertyid)
         result =await insertproperty(payload,propertyid,req)   ;
    res.send(result);
})

app.delete('/companies/:companyid/properties/:id', validateJWT, (req, res) => {
    console.log("\n\n delete interview");
    const id = req.params.id;
    const companyid = req.params.companyid;
    console.log("\n\ncompanyid : " ,companyid);
    console.log("\n\n id", id);
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
   
    accountDb.get(id, (err, _proerty) => {
        if(err) {
            res.send(err);
        }
        else {
                 _proerty.enabled=false;
                 accountDb.insert(_proerty, (err, body) => {
                    if (err) {
                      
                        res.send(err);
                    }
                    else {
                        console.log("property updated succefully");
                        res.send("sucsess");         
                    }
                });
              
                }
            });
        
});




app.post('/companies/:companyid/properties/:propertyid/schedules/:id', validateJWT, async(req, res) => {

    console.log("why this");
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    const scheduleid=req.params.id;
    let payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const property = await getpropertyInfo(propertyid);
    const accountDbName= parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountDbName);
    const companyInfo=  await getcompanyInfo(companyid);
    const callflowsoptiontype = payload.callflowsoptiontype;
    let dayscheduledataInfo = [];
    const timezone= property.timezone?  property.timezone: companyInfo.timezone;
    let dayscheduleResult;
    var scheduledate =moment().tz(timezone).startOf('day');//tz(timezone);
    const scheduledate_start_unix= scheduledate.unix();
    const scheduledate_end_unix= scheduledate.subtract(36, 'days').unix();
    const schedulelist= await getSchedule_for_callflowsoptiontype(accountDb,callflowsoptiontype,"schedule");
    const dayschedulelist=await getDaySchedule_for_Last30days(accountDb,callflowsoptiontype,scheduledate_start_unix,scheduledate_end_unix,"dayschedule");
    const adjustschedulelist=await getAdjSchedule_for_Last30days(accountDb,callflowsoptiontype,scheduledate_start_unix,scheduledate_end_unix,"adjustschedule");
    let last30daysList = [];
    let sch;
    if (schedulelist && schedulelist.length > 0 && schedulelist[0].data && schedulelist[0].data.length>0)
    {
        for(var s = 0; s <= schedulelist[0].data.length-1; s++ ){  
            sch = schedulelist[0].data[s];   
            if(sch.enabled && !sch.hasOwnProperty('deleteddate')){
                var createdDate:any = moment.unix(sch.createddate);
                var todayDate:any = moment.unix(scheduledate_start_unix);
                var createdDateDiff = todayDate.diff(createdDate, 'days');
                createdDateDiff = createdDateDiff + 1;
                if(createdDateDiff > 30){
                    createdDateDiff = 36;
                } else {
                    createdDateDiff = createdDateDiff;
                }
                for(let i = createdDateDiff; i >= 0; i--){
                    var lastScheduledDate = moment().tz(timezone).startOf('day');//tz(timezone);
                    const lastScheduledDate_start_unix  = lastScheduledDate.subtract(i, 'days').unix();
                    let dayschedule = dayschedulelist.some(daySch => {
                        return daySch.scheduleid === sch.scheduleid && moment(daySch.scheduledatetime).isSame(new Date(lastScheduledDate_start_unix*1000), 'day');       
                    });  
                    let scheduleDay = lastScheduledDate.subtract(i, 'days').format('dddd').toLowerCase();
                    if(!dayschedule && sch.days[scheduleDay] === true && lastScheduledDate_start_unix !== scheduledate_start_unix){
                        let timeslot= `${sch.from.hh}:${sch.from.mm}${sch.from.a} - ${sch.to.hh}:${sch.to.mm}${sch.to.a}`;
                        if (sch.restricted)
                        {
                            let restrictedday = sch.restrictedschedule.find(rstDay => rstDay.day === scheduleDay);
                            if(restrictedday !== undefined){
                                timeslot = `${restrictedday.from.hh}:${restrictedday.from.mm}${restrictedday.from.a} - ${restrictedday.to.hh}:${restrictedday.to.mm}${restrictedday.to.a}`;
                            }
                        }  
                        let dayscheduledata:any={
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
                            scheduledatetime: new Date(lastScheduledDate_start_unix*1000),
                            callflowsoptiontype: payload.callflowsoptiontype
                        }
                        await insertdayschedule(dayscheduledata, accountDbName);
                    }
                }        
             }
            }
    } 
    payload.data.forEach(element => {
        element.lastUpdatedDate = new Date(scheduledate_start_unix*1000);
    });
    const result = await insertschedule(payload,dbname);
    const messageinfo = `User ${req['decoded'].user_id} edited  scheduling  in (${property.propertyname})`;
    console.log(messageinfo);
    serverlog  ("info",messageinfo,"edit schedule");

    res.send(result);

})



app.post('/companies/:companyid/properties/:propertyid/adjustschedules/:id', validateJWT, async(req, res) => {
    console.log("\nadjust schedules\n");
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result =await insertadjustschedule(payload,dbname)   ;
    res.send(result);

})

app.post('/companies/:companyid/properties/:propertyid/unadjustschedules/:id', validateJWT, async(req, res) => {
    console.log("\nunadjust schedules\n");
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result =await unadjustschedule(payload,dbname)   ;
    res.send(result);

})
app.get('/companies/:companyid/properties/:propertyid/schedules/:optiontype', validateJWT, async(req, res) => {
//app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
    console.log("\n schedules111: ");
   const  propertyid= req.params.propertyid;
   const  optiontype= req.params.optiontype;
   const accountDbName= parseAccountToDatabaseName(propertyid);
   const accountDb = nano.use(accountDbName);
   var result =[];
  const schedulelist= await getSchedule_for_callflowsoptiontype(accountDb,optiontype,"schedule");
   const dayschedulelist=await getSchedule_for_callflowsoptiontype(accountDb,optiontype,"dayschedule");
   const adjustschedulelist=await getSchedule_for_callflowsoptiontype(accountDb,optiontype,"adjustschedule");
    if (Array.isArray(schedulelist))
    {
        result.push(...schedulelist);
    }
    if (Array.isArray(dayschedulelist))
    {
        result.push(...dayschedulelist);
    }
    if (Array.isArray(adjustschedulelist))
    {
        result.push(...adjustschedulelist);
    }
   res.statusCode = 200;
         
  // console.log("\nschedule Plumbing:",JSON.stringify( result));
   res.send(result);

})
app.post('/companies/:companyid/properties/:propertyid/dayschedules', validateJWT,async (req, res) => {
    console.log("\n\ndayschedules\n");
    //const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result = await insertdayschedule(payload,dbname)   ;
    console.log("days schedule return  ", result);
    res.send(result);

})
app.post('/audio', async (req, res) => {
  const AWS = require('aws-sdk')
console.log('/audio/audio/audio/audio/audio/audio/audio/audio/audio',req.body.payload);
var bucket_region;
 var bucket=req.body.payload.bucketname;
 if(bucket.includes("hsnotifymessagerecording")){

    bucket_region="us-west-2";

}else if(bucket.includes("hsnotify")){

    bucket_region="us-west-2";

}else{
    bucket_region=process.env.AWS_notifybucket_region;
}
const myBucket = req.body.payload.bucketname;
  const myKey = req.body.payload.filename;
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
  }, );

   console.log(url)
   
   res.send(url);

})

app.post('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT, async (req, res) => {
    console.log("\n\nescalationuserlist\n");
    //const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result =await insertescalationuserlist(payload,dbname)   ;
    res.send(result);

})

app.get('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT,async (req, res) => {
    //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
        console.log("\n escalationuserlist: ");
       const  propertyid= req.params.propertyid;
       
       const accountDbName= parseAccountToDatabaseName(propertyid);
        const accountDb = nano.use(accountDbName);
      console.log("\n accountDb: ",accountDbName);
      console.log("\n propertyid: ",propertyid);
        const contactsSelector = {
            "selector": {
                "pvt_type": "escalationuserlist"
                
             },
             "use_index":"pvt_type",
             "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
        var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
        res.send(docs);
     
    
    })
const getSchedule_for_callflowsoptiontype= async(accountDb,callflowsoptiontype,scheduletype)=>
{
    const scheduleselector= {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
             "pvt_type": scheduletype,
            "enabled": true
        },
        "use_index":"pvt_type_callflowsoptiontype_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit":3000
    }
    const schdulelist=await getalldocumentsbyproperty(accountDb,scheduleselector); 
    return schdulelist;
        
}


const getAdjSchedule_for_Last30days= async(accountDb,callflowsoptiontype,scheduledate_start_unix,scheduledate_end_unix,scheduletype)=>
{   

    const scheduleselector= {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
            "pvt_type": scheduletype,
            "enabled": true,
            "adjustdate_unix":{
                "$lte": scheduledate_start_unix,
                "$gte": scheduledate_end_unix  
            },
        },
        
 "use_index":"pvttype_callflowsoptiontype",
  "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit":3000 
    }
    const schdulelist=await getalldocumentsbyproperty(accountDb,scheduleselector); 
    return schdulelist;
        
}

const getDaySchedule_for_Last30days = async(accountDb,callflowsoptiontype,scheduledate_start_unix,scheduledate_end_unix,scheduletype)=>
{   
    const scheduleselector= {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
            "pvt_type": scheduletype,
            "enabled": true,
            "datetime":{
                "$lte": scheduledate_start_unix,
                "$gte": scheduledate_end_unix 
            }
        },
        "use_index":"pvttype_callflowsoptiontype_datetime",
  "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        "limit":3000
    }
    const schdulelist=await getalldocumentsbyproperty(accountDb,scheduleselector); 
    return schdulelist;
        
}
const findAdjustSchedule = async (timezone,callflowoption,accountDb)=>
{
    var startoftheday =moment().tz(timezone).startOf('day').unix();
    console.log("startoftheday");
    console.log(startoftheday);
    const contactsSelector = {
        "selector": {
            "pvt_type": "adjustschedule",
            "adjustdate_unix": startoftheday,
            "callflowsoptiontype":callflowoption

        },
         "use_index":"pvt_typeadjustdate_unix-index",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
        
    };
     
    var adjustSchedule= await getdocumentbyproperty(accountDb,contactsSelector);
    return adjustSchedule;
   
}
const findSchedules = async (accountDb:any,isliveschedule:boolean,
    didnumber,property,company): Promise<any> => {
    const timezone=property.timezone?  property.timezone: company.timezone;
    didnumber= didnumber.substring(0,10);
    const callflowdatalist=  property.callflowdata;
    const callflowdata= callflowdatalist.find(cl=> cl.didnumber===didnumber);
    const callflowoption=callflowdata&& callflowdata.callflowoption ? callflowdata.callflowoption:"";
    const adjustSchedule=await  findAdjustSchedule  (timezone,callflowoption,accountDb);
   
    var currendatettime =moment().tz(timezone);
    var currentminute= currendatettime.format("mm");
    var currenthour=currendatettime.format("HH");
    var currenttime =Number(currenthour  + "." +currentminute );
    var prevdaytime=currenttime+24;
    var todaysday= currendatettime.format('dddd').toLowerCase();
    var yesterday = currendatettime.add(-1, 'days').format('dddd').toLowerCase();
   
       var schedulelist=  [];
    if (adjustSchedule &&adjustSchedule.data )
    {
         const adjustDaySchedule= adjustSchedule.data.find(sch=> sch.livereply===isliveschedule 
                                                        && sch.ifrom<=currenttime
                                                        && sch.ito>currenttime
                                                            );
        if (adjustDaySchedule)
        {
            schedulelist.push(adjustDaySchedule);
        }
    }   
    else
    { 
        const contactsSelector = {
            "selector": {
                "pvt_type": "schedule",
                "callflowsoptiontype": callflowoption
            
            },
            "use_index":"pvt_type_callflowsoptiontype",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        };
        
        var document= await getdocumentbyproperty(accountDb,contactsSelector);
    
        
        if (document && document.data && document.data.length>0)
        {
            const restricschedules= document.data.filter(sch=> sch.livereply===isliveschedule 
                && sch.enabled 
                && (sch.days[todaysday]  ||  sch.days[yesterday])
            && sch.restricted
            && sch.livereply===isliveschedule
            );
            // console.log(JSON.stringify (restricschedules));
            restricschedules.forEach(rsch => {
            if (schedulelist.length<=0)
            {
                /**/
                    var dayrestrictschedule= rsch.restrictedschedule
                                                    .find (drsch=>
                                                        drsch.day ===todaysday
                                                        && drsch.ifrom<=currenttime 
                                                        && drsch.ito>currenttime
                                                    );
                    if (!dayrestrictschedule )
                    {
                            dayrestrictschedule= rsch.restrictedschedule
                                                    .find (drsch=>
                                                        drsch.day ===yesterday
                                                        && drsch.ifrom<=prevdaytime
                                                        && drsch.ito>prevdaytime);
                            if (dayrestrictschedule )
                                rsch.ispreviousday= true;
                                
                                                            
                    }

                    if (dayrestrictschedule)
                        schedulelist.push(rsch);
            }                                        
            });
            if (schedulelist.length<=0 ) //if there is no restrict shedule
            {
                schedulelist= document.data.filter(sch=> sch.livereply===isliveschedule 
                    && sch.enabled 
                    && sch.days[todaysday]
                    && !sch.restricted
                    && ( (sch.ifrom<=currenttime && sch.ito>currenttime) ) 
                    );
                if (schedulelist.length<=0 ) // fi we didnt find shedule for current day we should look for yesterday's spill over schedule
                {
                    schedulelist= document.data.filter(sch=> sch.livereply===isliveschedule 
                        && sch.enabled
                        && sch.days[yesterday]
                        && !sch.restricted
                        && sch.ifrom<=prevdaytime && sch.ito>prevdaytime
                    );
                    if (schedulelist.length>0)
                            schedulelist[schedulelist.length-1].ispreviousday= true;
                }
            }
        }
    }
    console.log("schedulelist length ", schedulelist.length)
    return schedulelist;
    

} 


const getpropertycallflowoptions= async function (didnumber,property)
{
    didnumber= didnumber.substring(0,10);
    const callflowdatalist=  property.callflowdata;
    const callflowdata= callflowdatalist.find(cl=> cl.didnumber===didnumber);
    if(!callflowdata){
    debugMessage(log4jslogger,"didnumber not present--"+didnumber);
    debugMessage(log4jsexceptionlogger,"didnumber not present--"+didnumber);
    }
    const callflowoption= callflowdata.callflowoption ? callflowdata.callflowoption:"";
    return callflowoption;
}
const findSchedule = async (accountDb:any,isliveschedule:boolean,didnumber,property,company): Promise<any> => {
    var callflowsoptiontype= await getpropertycallflowoptions(didnumber,property)

    var schedulelist=  await  findSchedules(accountDb,isliveschedule,didnumber,property,company); 
    const schedulelistlength=schedulelist.length;
    var scheduledocument=schedulelistlength>0? schedulelist[schedulelistlength-1]:undefined;
    
    if(scheduledocument)
        scheduledocument.callflowsoptiontype= callflowsoptiontype;
    return scheduledocument;
}

const findNotifyEscalationSettings = async (property:any, escalationSettingsdocs): Promise<any> => {
    // console.log(`Searching through nesting level ${level}`);
    if (property && property.companyid)
    {
        var  escalationList= [];
        const propertyid = property.propertyid;

      

        const escalationSettingsdocs_filter= escalationSettingsdocs.filter(
            (es)=>es.notify_enabled && es.escalationsettings && (es.msteruser||  (es.propertylist && es.propertylist.find((p)=>p.id===propertyid&& p.enabled) )));
           
        escalationSettingsdocs_filter.forEach(setting => {
            setting.escalationsettings.forEach(escalationsetting => {
            var temp= {
                "name": `${setting.first_name} ${setting.last_name}`,
                "first_name":`${setting.first_name}`,
                "last_name":`${setting.last_name}`,
                "waittime": escalationsetting.time*60,
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
else
{
    return[];
}
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
            emergency_companydata.push (
            {
                companyid:companyid,
                companyname: account.name,
                industry:account.industry,
                avgemrt:emergency_company_company_avg_emrt
            }
        )
        //console.log(emergency_companydata);
        }
    };
    //for loop end 

    var emrt_data= {
        timestamp:now_unix,
        data:emergency_companydata
    }
    console.log("emrt_data");
    console.log(JSON.stringify(emrt_data) );
        await insertemrtdata(emrt_data);
}

const getScheduleforProperty= async (propertydb)=>
{
    const contactsSelector = {
        'selector': {
            "pvt_type":"schedule",
            "enabled":true
            },
            "use_index":"pvt_type_enabled",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
        }
    var schedulelist=await getalldocumentsbyproperty(propertydb,contactsSelector); 
    return schedulelist;

}
const getAdjustScheduleforProperty= async (propertydb,day1_unix_time,day2_unix_time)=>
{
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
        "use_index":"pvt_typeadjustdate_unix-index",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
       
    }
    var schedulelist=await getalldocumentsbyproperty(propertydb,contactsSelector); 
    return schedulelist;

}
const handoffrule=async ()=>
{
    var reportrunningUTCTime= moment().utc();
    
   console.log(reportrunningUTCTime.format ("DD:mm:YYYY HH:mm:ss z"));
   var next_run_report_time= reportrunningUTCTime.clone().add(455, 'minutes');

   var account_db_pattern = new RegExp(getDabaseNameRegx());
   var dbnames:any= await getaccountdbnames();
  dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );// && d==='nt_account/2d/67/08f277a137338e4c5815c24962f9');
  dbnames.forEach(async(dbname) => {
      const propertyid= parseDatabaseNameToAccount(dbname);
    const property=await getpropertyInfo(propertyid);
    if (property)
    {
            const timezone= property.timezone;
            var starttime= reportrunningUTCTime.clone().tz( timezone);
            var endtime= starttime.clone().add(455, 'minutes');
            var startoftheday = starttime.clone().startOf('day');
            var enddaystartoftheday = endtime.clone().startOf('day');
          
           var scheduleday1 = starttime.format('dddd').toLowerCase();
            var scheduleday2 = endtime.format('dddd').toLowerCase();
            
            const propertydb= nano.use(dbname);
            const property_schedulelist = await getScheduleforProperty(propertydb);
            const property_adjustschedulelist= await getAdjustScheduleforProperty(propertydb, startoftheday.unix(),enddaystartoftheday.unix())
            var property_day_schedules=[];
            for (var property_schedule_index=0;
                property_schedule_index< property_schedulelist.length;
                property_schedule_index++)
            {
                const property_schedule= property_schedulelist[property_schedule_index];
                const schedule_callflowsoptiontype =property_schedule.callflowsoptiontype;
               const datalist =property_schedule.data;
                const day1_adjustschedules=property_adjustschedulelist && property_adjustschedulelist.length>0?
                property_adjustschedulelist.filter(as=> as.adjustdate_unix===startoftheday.unix()
                && as.callflowsoptiontype===schedule_callflowsoptiontype):[];
                const day1_schedules= day1_adjustschedules.length>0?
                day1_adjustschedules[0].data:datalist.filter(data=> data.days[scheduleday1]  );
                property_day_schedules.push(...day1_schedules);
                if (scheduleday1!=scheduleday2)
                {
                    const day2_adjustschedules=property_adjustschedulelist && property_adjustschedulelist.length>0?
                    property_adjustschedulelist.filter(as=> as.adjustdate_unix===enddaystartoftheday.unix()):[];
    
                    const day2_schedules= day2_adjustschedules.length>0?
                    day2_adjustschedules[0].data:datalist.filter(data=> data.days[scheduleday2]  ); 
                    property_day_schedules.push(...day2_schedules);
                }
            }
            const reporttime_utc_unix= reportrunningUTCTime.unix();
          // const endtime_utc_unix=  reportrunningUTCTime.clone().add(455, 'minutes').unix(); 
           
           await handoffruleforproperty(property,property_day_schedules,reporttime_utc_unix);
    }
  });
   
}
const handoffruleforproperty= async (property,property_day_schedules_list,reporttime_utc_unix)=>
{

    var starttime_d =moment().tz(property.timezone).startOf('day');
    var starttime_unix=starttime_d.unix();
    var endtime_d = starttime_d.clone().add(1, "days").add(455,"minutes");
    var endtime_unix=endtime_d.unix();
     const company=await getcompanyInfo(property.companyid); 
    
   var dayschedules = await findUsersForhandOffRules(property,starttime_unix,endtime_unix);
      
   for (var i=0; i<dayschedules.length;i++)
   {
      const dayschedule= dayschedules[i];
      const property_day_schedule= property_day_schedules_list.find(pd=> pd.scheduleid===dayschedule.scheduleid);
      if(property_day_schedule)
      {
            var from_hh= parseInt( property_day_schedule.from.hh);
            const from_mm= parseInt( property_day_schedule.from.mm);
            const from_a=  property_day_schedule.from.a;
            if (from_a==="pm" && from_hh<12)
            {
                from_hh+=12;
            }
            var schedule_start_time= starttime_d.clone().add(from_hh, "hours").add(from_mm, "minutes");
            
            var to_hh= parseInt( property_day_schedule.to.hh);
            const to_mm= parseInt( property_day_schedule.to.mm);
            const to_a=  property_day_schedule.to.a;
            if (to_a==="pm" && to_hh<12)
            {
                to_hh+=12;
            }
            
            const schedule_end_time= starttime_d.clone().add(to_hh, "hours").add(to_mm, "minutes");
          
            const datetimeunix=schedule_start_time.utc().unix();
            const enddatetimeunix= schedule_end_time.utc().unix();
            
            const schedulefromtimediffrence= (datetimeunix-reporttime_utc_unix)/60;
            const scheduleendtimediffrence= (enddatetimeunix-reporttime_utc_unix)/60;
            const users= dayschedule.users;
            const userIds = users.map(a => a.key);
            console.log(JSON.stringify(userIds));
            var userdocs=await findDayScheduleuserlist(userIds, property);
            await sendhandoffrulesmessage(userdocs,dayschedule,property,schedulefromtimediffrence,scheduleendtimediffrence);
      }
   }
}
const sendhandoffrulesmessage= async(userdocs,dayscheule,property,schedulefromtimediffrence,scheduleendtimediffrence )=>
{

    userdocs.forEach(user => {
        var handoffrulessettings =user.handoffrulessettings;
        if (handoffrulessettings)
        {
            handoffrulessettings= handoffrulessettings
                                        .filter(h=>h.call.toLowerCase()==="on" 
                                            || h.call.toLowerCase()==="off");
            
            
            handoffrulessettings.forEach(async (setting) => {
                const ruletype=setting.call.toLowerCase();
                const time= parseInt( setting.time);
                const diffrencetime=ruletype==="on"?
                                             schedulefromtimediffrence 
                                             :scheduleendtimediffrence
                const timediffrence= diffrencetime-time;
                console.log("timediffrence");
                console.log(timediffrence);
               if (timediffrence<=14 &&  timediffrence>0 )
                {
                    var  number= setting.number.toString();
                    const propertyname= property.propertyname;
                    const schedulename= dayscheule.callflowsoptiontype;
                    const message= `You’re ${ruletype} call in ${time} minutes for ${propertyname} ${schedulename}`;
                    const messaging_number= process.env.MESSAGINGNUMBER;
                    const from = messaging_number;
                    number= number.indexOf("+1")>=0?number:`+1${number}`;
                   
                    var payload={
                        
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
const findUsersForhandOffRules= async(property,starttime_utc_unix,endtime_utc_unix)=>
{
    const propertydbname= parseAccountToDatabaseName(property.propertyid)
    const propertydb=  nano.use (propertydbname);
   //no need
    const contactsSelector = {
        "selector": {
           "pvt_type": "dayschedule",
           "$or":[{"datetimeunix": {
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
        console.log(JSON.stringify( contactsSelector));
       var dayscheules=await getalldocumentsbyproperty(propertydb,contactsSelector); 
       return dayscheules;
}







const transferreport=async()=>
{
    console.log("transferreport");
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var alldbnames:any=await getaccountdbnames();
   var dbnames= alldbnames.filter (d=>  account_db_pattern.test(d)
        && d==="nt_account/f7/92/31ba4e415e51890926f66ffea868"
     //&& d===parseAccountToDatabaseName("7c0af64b98ca71604153ae0ec7fe770e")
    );
   for (var i=0; i<dbnames.length;i++)
   {
       const dbname= dbnames[i];
      
       const id= parseDatabaseNameToAccount(dbname);
       const pre_dbwithmonthname=getMonthDbName(dbname,false);
       const dbwithmonthname=getMonthDbName(dbname);
       const pre_monthdb= nano.use(pre_dbwithmonthname);
       const monthdb= nano.use(dbwithmonthname);
       //no need
       const reportselector=
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
        var reports=await getalldocumentsbyproperty(pre_monthdb,reportselector); 
        for (var k=0;k<reports.length;k++)
        {
            var report=reports[k];
            report.transfered=true;
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

const notificationinfo=async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var alldbnames:any=await getaccountdbnames();
   var dbnames= alldbnames.filter (d=>  account_db_pattern.test(d));
   for (var i=0; i<dbnames.length;i++)
   {
        const dbname= dbnames[i];
        const id= parseDatabaseNameToAccount(dbname);
        var property=  await getpropertyInfo(id);
        var company=  await getcompanyInfo(id);
        if ((property && property.propertyid) || (company&& company.companyid))
        {          
          const result=await  getKazooAccountEmailNotification(id);
          const result2= JSON.parse( result);
          if (!result2 || !result2.data||  result2.data.from !="hsnoreply@notify.hellospoke.com")
            {
                if ((property && property.propertyid) )
               console.log(`property ${property.propertyname}  ${property.propertyid}  ${result2.data.from}`)
               
               if ((company&& company.companyid) )
               console.log(`comapny ${company.name}  ${company.companyid}  ${result2.data.from}`)
               //await setKazooAccountEmailNotification(null,id)
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
       
       if( (company && company.companyid)||(property && property.propertyid) || (incident && incident.incidentid))
       {
       
           //  console.log( `company. ${company.name}`);
           
             const isDbAvailable= alldbnames.find(d=>d===dbwithmonthname);
             if (!isDbAvailable){
                console.log(`db  ${dbwithmonthname} is not available`)
                var creation_result= await  createaccountdb (dbwithmonthname);
                
               
                 await createindexes(dbwithmonthname);
             }
             else
             {
              
               console.log(`db is  ${dbwithmonthname} available`)
               
             }
            
       }
       
    }
}

const storageupdate=async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
  // && d==="nt_account/06/45/36efbf50c38cac7f8824e74ab55a");
   // dbnames.forEach(async(dbname) => 
   var kk=1;
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const propertyid= parseDatabaseNameToAccount(dbname);
       const property=  await getpropertyInfo( propertyid); 
       if (property && property.propertyid)
       {
        console.log(kk++);
            console.log(property.propertyid);
            console.log(property.propertyname);
          await deletekazoostorage(null, property.propertyid);
           const result= await  creteKazooStorageAttachments(null,property.propertyid);
           
       }
    }
}

const insertaccountinfotoglobale=async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdata();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
   // dbnames.forEach(async(dbname) => 
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const id= parseDatabaseNameToAccount(dbname);
       const company=  await getcompanyInfo(id);
      
       if ((company && company.companyid ))
       {
            console.log(dbname);
            console.log(company.name);
            await insertaccountinfo(company.companyid, company,"company",company.name )
        }
       else 
       {
            const property=  await getpropertyInfo(id);
            if (property && property.propertyid)
                await insertaccountinfo(property.propertyid, property,"property",property.kazoopropertyname)
       }
    }
}


const updatecallloginfo= async (callinfo,accountDbName)=>
{
    delete callinfo.pvt_type;

    callinfo.iscallinfolog=true;
    var result = insertObjectToDB(accountDbName,callinfo)
    return result;
   

}

const deletecallinfolog=async(companyid,c)=>
{
    //no need
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
    const dbname= parseAccountToDatabaseName(companyid);
    const comapnydb = nano.use (dbname)
    var callinfologs=await getalldocumentsbyproperty(comapnydb,contactsSelector); 
    for (var i=0; i<callinfologs.length;i++ )
    {
       const  callinfo= callinfologs[i];
       console.log( c*1000 +i);
       console.log(callinfo.notifytimestamp)
       await updatecallloginfo(callinfo,dbname);
    }

}



const deletecallinfologforcompany=async(companyid)=>
{
 //   var account_db_pattern = new RegExp(getDabaseNameRegx());
 //   var dbnames:any=await getaccountdbnames();
   // dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
   // dbnames.forEach(async(dbname) => 
  //  for (var i=0; i<dbnames.length;i++)
    {
        
       
      
       const company=  await getcompanyInfo(companyid);
       if (company && company.companyid)
       {
            
            console.log(company.name);
            for (var i=0;i<4;i++)
            {
                 await deletecallinfolog(company.companyid,i);
            }
       }
    }
}
const unSavedReportToElasticSearch=async ()=>
{
    var now_unix= moment().add(-10,"minutes").utc().unix();
  //  console.log( moment().add(-10,"minutes").utc().format())
    const contactsSelector = {
        "selector": {
            "pvt_type": "reportdata",
            "elasticid": {
               "$exists": false
            },
            "incidentdate":{"$lt":now_unix}
         } ,

        "use_index": "elasticid_exists",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    } 
        
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
   // && d=== parseAccountToDatabaseName( "c037d1a2d320e497a0891e530af064e5"));
   // dbnames.forEach(async(dbname) => 
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const companyid= parseDatabaseNameToAccount(dbname);
       const company=  await getcompanyInfo(companyid);
       if (company && company.companyid)
       {
            console.log(dbname);
            
           const comapnydb= nano.use(dbname);
           debugMessage(log4jslogger,`Sync report ${JSON.stringify(companyid)}`);
           var reports=await getalldocumentsbyproperty(comapnydb,contactsSelector); 
           
            //reports.forEach(async(reportdata) => 
            for (var k=0; k<reports.length;k++)
            {
              const reportdata= reports[k];
                if (reportdata &&reportdata.guid)
                {
                  
                    console.log(JSON.stringify(reportdata.guid));
                   const isduplicate= await  isduplicatedocument(comapnydb ,reportdata.guid);
                   if (!isduplicate)
                     console.log(JSON.stringify(reportdata.guid));
                    // await insertreportdatatoelastic(comapnydb,reportdata);
                    else
                        console.log("duplicate");
                }
            }
            //);  
       }  
    }
    //);
    
}

/*const setScheduleReportJob= ()=>
{
    
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
   
    
}*/



const checkScheduleCallActivityReport= ()=>
{
    //setInterval(function(){ console.log("Hello"); }, 36000);
    console.log( moment().format("HH:mm:ss"));

    callactivity_report();
   // setInterval(function(){ console.log("Hello");
   // console.log(moment().format("HH:mm:ss"));update_call_summery_data();callsummery_report(); }, 300000);


}


const findAnyNotifyDayScheduleUsers = async (accountDb:any,didnumber,islivereply,company,property): Promise<string[]> => {
    
    console.log("findAnyNotifyDayScheduleUsers");
    const callflowsoptiontype=await getpropertycallflowoptions(didnumber,property);
    const timezone=property.timezone?  property.timezone: company.timezone;
    var scheduledate =moment().tz(timezone).startOf('day');//tz(timezone);
    scheduledate = scheduledate.add(+1, 'days');
    const scheduledate_start_unix= scheduledate.unix();
    
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
    if (dayscheduledocs && dayscheduledocs.length>0 && dayscheduledocs[ dayscheduledocs.length-1] 
        && dayscheduledocs[ dayscheduledocs.length-1].users)
        keyArray=  dayscheduledocs[dayscheduledocs.length-1].users.map(function(item) { return item["key"]; });
    return keyArray;
}

const findDayScheduleUsers = async (accountDb:any,schedule:any,islivereply,company,property): Promise<string[]> => {
    
   
    const timezone=property.timezone?  property.timezone: company.timezone;
    var scheduledate =moment().tz(timezone).startOf('day');//tz(timezone);
    if (schedule.ispreviousday)
        scheduledate= scheduledate.add("-1","days");
   
    const scheduledate_start_unix= scheduledate.unix();
    
    const scheduledate_end_unix= scheduledate.add(+1, 'days').subtract(1,'minutes').unix();
   const contactsSelector = {
        "selector": {
           "pvt_type": "dayschedule",
           "callflowsoptiontype": schedule.callflowsoptiontype.trim(),
          
           "scheduleid":schedule.scheduleid,
           "datetime":{
            "$gte": scheduledate_start_unix,
            "$lte": scheduledate_end_unix
          }
         },
         "fields":["users"],
         "use_index":"pvt_type_callflowsoptiontype_scheduleid",
         "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
         
    };
    const dayschedulePromise = await getalldocumentsbyproperty(accountDb,contactsSelector);

    // console.log(`Starting to search for users in set`, userIds);
    const dayscheduledocs = await dayschedulePromise;
   var keyArray = [];
    if (dayscheduledocs && dayscheduledocs.length>0 && dayscheduledocs[ dayscheduledocs.length-1] 
        && dayscheduledocs[ dayscheduledocs.length-1].users)
        keyArray=  dayscheduledocs[dayscheduledocs.length-1].users.map(function(item) { return item["key"]; });
    return keyArray;
}

const findPropertydocument = async (propertyid:string): Promise<any> => {
    const currentUserSelector = {
        "selector": {
           
            "pvt_type": "property",
            "enabled": true
            
        },
        "use_index":"pvt_type_enabled",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
    };
    var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
   

    // console.log(`Starting to search for users in set`, userIds);
    const companydocs = await getalldocumentsbyproperty(accountDb,currentUserSelector);
     //console.log(`Found users`, companydocs[0]);
     return companydocs.length>0 ?  companydocs[0]: {};
}


const checkpin = async (pin:string, companyid:string): Promise<any> => {
  const currentUserSelector = {
        "selector": {
            "pvt_type": "user",
            "notify_enabled": true,
            "pin": {
                "$eq": pin
            }
           
        },
        "use_index":"pvt_type_notify_enabled_pin",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,

    };
    var accountDb = nano.use(parseAccountToDatabaseName(companyid ));
    

    // console.log(`Starting to search for users in set`, userIds);
    const userdocs = await getdocumentbyproperty(accountDb,currentUserSelector) //result.docs[0];
    // console.log(`pin users`, userdocs);
        return userdocs;
}


const findDayScheduleuserlist = async (userIds: string[],property): Promise<any> => {
            
    if (property && property.companyid)
        {
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
           const userdocs =  await getalldocumentsbyproperty(accountDb,currentUserSelector);
           //console.log(`Found users`, userdocs);
             return userdocs;   
    }
    else
     {
        return []
     }
}
const generateLivereply = async (userIds: string[],userdocs:any[]): Promise<string[]> => {
    // console.log(`Searching through nesting level ${level}`);
   
    const livereplypromiss = new Promise<any>((resolve, reject) => {
 
       
         var lrdatalist=[];
         
        userIds.forEach(id => {
            //  if (user.livereplysetting)
            var user =userdocs.find(u=> u.id==id) ;
            if (user && user.livereplysetting)
            {
                //console.log(user.first_name);
                var lrdata={
                    name:user.first_name.trim(),
                    userid:user.id,
                    pin:user.pin,
                    first_name:user.first_name.trim(),
                    last_name:user.last_name.trim(),
                    phones:[]
                };
                user.livereplysetting.forEach(lr => {
                   // console.log("\nlr.number", lr.number);
                    lrdata.phones.push({
                        "callingnumber":"+1"+lr.number,
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

const generateNoticationreply = async (userIds: string[],userdocs:any[]): Promise<string[]> => {
    // console.log(`Searching through nesting level ${level}`);
   
    const livereplypromiss = new Promise<any>((resolve, reject) => {
        // console.log("generateNoticationreply 22222");

         var ntdatalist=[];
        userIds.forEach(id => {
            //  if (user.livereplysetting)
          
           
            var user =userdocs.find(u=> u.id==id) ;

           
            if (user && user.notificationrulessetting)
            {
               console.log(user.first_name);

                var ntdata={
                    name:user.first_name.trim(),
                    first_name:user.first_name.trim(),
                    last_name:user.last_name.trim(),
                    userid:user.id,
                    data:[]
                };
                    user.notificationrulessetting.forEach(nt => {
                    const optinObj=nt.type.toLowerCase()!="sms" ? {optin:true}:
                        user.phonesettings && user.phonesettings.settings&& user.phonesettings.settings.find(s=>s.number==nt.number);
  
                    if (optinObj && optinObj.optin){
                        var waittime1= nt.notificationwait.toString().replace(/\D/g,'').trim();
                        var waittime= 60*waittime1;
                        ntdata.data.push({
                            "callingnumber":"+1"+nt.number,
                            type:nt.type.toLowerCase(),
                            "waittime":waittime,
                            pin:user.pin
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


app.get('/property/:propertyid/handoffrules', async(req, res)=>
{
        //console.log ("fffff");
       
        const propertyid=req.params.propertyid;
        
      
     res.send("sucess");

});

app.get('/property/:propertyid/:didnumber/schedule', async(req, res) => {
    const didnumber= req.params.didnumber;
        var  type= "";
        const propertyid=req.params.propertyid;//441202171b923a9cc3a8ab36f9728294
        debugMessage(log4jslogger,"Schedule API ");
        debugMessage(log4jslogger,"didnumber---"+JSON.stringify(didnumber));
        debugMessage(log4jslogger,"propertyid---"+JSON.stringify(propertyid));
        var lrresult=[];
        var intmaxhold='';
         try{
        var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
        const property=await getpropertyInfo(propertyid); 
        console.log('propertyproperty>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',property);
        if(property.liveEscalation===undefined ||  property.liveEscalation===true){
            console.log('property.liveEscalation-------------------------------',property.liveEscalation);
        
        const companydbname= parseAccountToDatabaseName(property.companyid);
        const company=await getcompanyInfo(property.companyid); 
        var schedule = await findSchedule(accountDb,true,didnumber,property,company);
        var userIds= schedule ? await findDayScheduleUsers(accountDb,schedule,true,company,property):[];
        var userdocs=await findDayScheduleuserlist(userIds,property);
        userdocs= userdocs.filter(u=> userIds.find(u1=>u1=== u.id));
         lrresult= await generateLivereply(userIds, userdocs);
         const strmaxhold= schedule ? schedule.livereplyduration:'120';
          intmaxhold= isNaN(strmaxhold) ? 120:strmaxhold;
         var callflowsoptiontype;
         if (schedule){
                callflowsoptiontype= schedule.callflowsoptiontype
         }
        }

       // var result:any= notificationdata.data.find(d => d.propertyid === propertyid && d.didnumber== didnumber    )
       var result:any= {
        "didnumber": didnumber,
        "propertyid": propertyid,
        "type": "live",
        "maxonholdtime": intmaxhold,
        "label":callflowsoptiontype,
        "data":lrresult
       };
       debugMessage(log4jslogger,"live result result:---"+JSON.stringify(result));
       //console.log("\n live result result:",  JSON.stringify( result));
         res.send( JSON.stringify( result));
        //res.send(  result);
    }
    catch(ex){
        res.statusCode=500;
        res.send('failed');
        debugMessage(log4jsexceptionlogger,"Schedule API error");
        debugMessage(log4jsexceptionlogger,"didnumber---"+JSON.stringify(didnumber));
        debugMessage(log4jsexceptionlogger,"propertyid---"+JSON.stringify(propertyid));
         
    }
  
})

//propertycalloutnumber

app.get('/property/:propertyid/propertycalloutnumber', async(req, res) => {
    console.log("propertycalloutnumber");
    
   var propertyid=req.params.propertyid;
  
    var result ={data:{
      
        calloutnumber:"",
        propertyid:propertyid
    }
  
    }
   
       const property=await getpropertyInfo(propertyid);; 
   result.data.calloutnumber=property ? property.phone:"";
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
    var pinuser=users[0];
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
app.get('/property/:propertyid/:didnumber/:boxid/pin/:pin', async(req, res) => {
     console.log("pin");
     const didnumber= req.params.didnumber;
     var propertyid=req.params.propertyid;
    var property=await findPropertydocument(propertyid);
    var comapnyid= property.companyid;
    console.log("\n comapnyid ", comapnyid);
    var pin=req.params.pin;
    const isHellospeakAdminPin= pin==="*****";
    var pinuser=isHellospeakAdminPin ? {
        first_name:"HelloSpoke",
        last_name:"Admin",
        id:"1234"
    }:await checkpin(pin,comapnyid);
    var result:any= {
        data:{verified:false,
            propertyid:propertyid}
    };
    if (pinuser)
    {
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

app.get('/company/:companyid/property/:propertyid/pin/:pin/:userid', async(req, res) => {
    console.log("user pin pin");
    
   var comapnyid=  req.params.companyid;
   console.log("\n comapnyid ", comapnyid);
   var pin=req.params.pin;
    const userid=req.params.userid;
   var pinuser=await checkpin(pin,comapnyid);
   var result:any= {
       data:{verified:false,
          }
   };
   if (pinuser && pinuser.id!=userid)
   {
       result.data.verified=true;
       result.data.agenttid=pinuser.id;
       result.data.agenttname=pinuser.first_name;
      
   }
  
  res.send(result);

})
app.get('/property/:propertyid/:didnumber/schedule/notify', async(req, res) => {
    const didnumber= req.params.didnumber;
    const propertyid=req.params.propertyid;
    
  try{
    
       const result=await  updateNOtifySchedule(propertyid, didnumber);// getNOtifySchedule(propertyid, didnumber)//  
        //console.log("dddddddddddddddddddddddddddddddddddd",JSON.stringify( result));
       res.send( JSON.stringify( result));
  }catch(ex){
        res.statusCode=500;
        res.send('failed');
        debugMessage(log4jsexceptionlogger,"Notify API error");
         debugMessage(log4jsexceptionlogger,"didnumber---"+JSON.stringify(didnumber));
         debugMessage(log4jsexceptionlogger,"propertyid---"+JSON.stringify(propertyid));

         debugMessage(log4jsexceptionlogger,"exception---"+JSON.stringify(ex));
         
  }

})


app.get('/property/:propertyid/:callflowoption/vmboxemail', async(req, res) => {
    //console.log("\n\n vmboxemail\n");
    const propertyid= req.params.propertyid;
    const callflowoption= req.params.callflowoption;
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
                    limit:30000 ,
                    "use_index":"pvt_type_callflowoption",
                    "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
                    
                }
   var escalationemailobj=await getdocumentbyproperty(accountDb,contactsSelector); 
     var emaillist=[];           
   if (escalationemailobj  && escalationemailobj.emaillist)
            emaillist=escalationemailobj.emaillist.map(a => a.email);
    
    payload.data.emaillist= emaillist;

    console.log(payload);
   // vmboxemail(payload);

    res.send({  

        "Status":"200",
        "list":payload,
        "messages":"Email sent  successfully",
     
     });

})



app.post('/property/:propertyid/:didnumber/callinfolog', async (req, res) => {
    console.log("\n\n callinfo log\n");
    debugMessage(log4jslogger,"\n****  callinfo log  ****\n");
    
    const propertyid= req.params.propertyid;
    const didnumber= req.params.didnumber.substring(0,10);
    debugMessage(log4jslogger,`propertyid ${propertyid}`);
    debugMessage(log4jslogger,`didnumber ${didnumber}`);
    const payload =req.body ;
    debugMessage(log4jslogger,`infolog ${JSON.stringify( payload.guid)}`);
    payload.didnumber= didnumber;
    payload.propertyid= propertyid;
    const result = await insertcallinfolog(payload)   ;
    res.send({  

        "Status":"200",
     
        "messages":"Call info log  log inserted  successfully",
     
     });

})

app.get('/property/:propertyid/callinfolog/guid/:guid', async(req, res) => {
    console.log("\n\n callinfo log\n");
    
    const propertyid= req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    const property= await getpropertyInfo(propertyid);
    const companyid= property.companyid;
     const dbname=parseAccountToDatabaseName(companyid);
     const comapnydb= nano.use(dbname);
    
    const guid= req.params.guid;
    
    const contactsSelector = {
        'selector': {
            "pvt_type":"callinfolog",
            "guid":guid
            },
            "use_index":"pvt_type_guid",
             "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            limit:30000 
        }
    var callinfologs=await getalldocumentsbyproperty(comapnydb,contactsSelector); 

   // console.log("reportdocs\n",  reportdocs);

    res.send({  

        "Status":"200",
    
        callinfologs:callinfologs
    
    });
    

})
app.get('/property/:propertyid/:incidentid/notes',validateJWT,async (req, res) => {
    console.log("incident notes");
    var propertyid = req.params.propertyid;
    var incidentid=req.params.incidentid
    const contactsSelector = {
        'selector': {
            "incidentid":incidentid,
             "pvt_type": "incidentnotes"
            },
            limit:30000,
            "use_index":"pvt_type_incidentid",
            "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false
            

        }

        var dbname= parseAccountToDatabaseName(propertyid);
        var db= nano.use(dbname);
        var notes=await getalldocumentsbyproperty(db,contactsSelector); 

        //console.log("incident notes\n",  notes);

        res.send({  

            "Status":"200",
    
             notes:notes
    
            });
})

app.post('/property/:propertyid/:incidentid/notes', validateJWT,(req, res) => {
    console.log("\n\n incidentid notes\n");
    
    const propertyid= req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    const payload =req.body ;
    const dbname=parseAccountToDatabaseName(propertyid);
   
    
    const result =insertincidentnotes(payload,dbname,propertyid)   ;
    
    res.send({  

        "Status":"200",
     
        "messages":"CDR log inserted  successfully",
     
     });

})

app.post('/property/:propertyid/reportdata', async (req, res) => {
    console.log("\n\n reportdata  log\n");
    const propertyid= req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
   
    const payload =req.body ;
    const dbname=parseAccountToDatabaseName(propertyid);
   
    const result =await insertreportdata(payload,dbname)   ;

    
    
    res.send({  

        "Status":"200",
     
        "messages":"CDR log inserted  successfully",
     
     });

})




app.get('/property/:propertyid/chart/:type/:bussinesshours/:nonbussinesshours/:startime/:endtime',validateJWT,async (req, res) => {
    
    console.log("\n\n get chart  log\n");
    var response_result=[];
    
    const propertyid= req.params.propertyid;
    const bussinesshours=req.params.bussinesshours;
    const nonbussinesshours=req.params.nonbussinesshours;
    const startime=parseInt( req.params.startime);
    const endtime=parseInt(req.params.endtime);

    console.log(startime);
    console.log(endtime);
    if(bussinesshours==="true"|| nonbussinesshours==="true")
    {
        const property =await getpropertyInfo(propertyid);
        const propertydbname= parseAccountToDatabaseName(propertyid);
        const propertydb= nano.use(propertydbname);
        const type=Number(req.params.type);
        
            var query = {
                "bool":{
                   "must":[
                      {
                         "term":{
                            "propertyid": propertyid
                         }
                      },
                      {
                         "range":{
                            "incidentdate":{
                               "gte": startime,
                               "lte": endtime,
                               "boost":2.0
                            }
                         }
                      },
                      {
                         "bool":{
                            "should":[
                               
                               {
                                  "bool":{
                                     "must":[
                                        {
                                           "query_string":{
                                              "query":"(removefromreport:false)"
                                           }
                                        }
                                     ]
                                  }
                               }
                            ]
                         }
                      }
                   ],
                   "should":[
                      {
                         "term":{
                            "duringbussinesshours":true
                         }
                      },
                      {
                         "term":{
                            "duringbussinesshours":false
                         }
                      }
                   ],
                   "minimum_should_match":1
                }
             }
              if (bussinesshours==="false"|| nonbussinesshours==="false")
              {
                query.bool.should[0].term.duringbussinesshours= bussinesshours==="true";
                query.bool.should[1].term.duringbussinesshours= bussinesshours==="true";
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
                    "sort":[],
                    "query":query,
                    size: 9999
                } ,
                json: true
            };
            const resultpromise=  new Promise (async(resolve, reject)=>{
                Request(options, function (error, response, body) {
                    if (error) {  
                        console.log(error +'//'+ 'error');
                        resolve(error);
                    }
                    else
                    {
                        let result = body.hits && body.hits.hits? body.hits.hits.map(a => a._source):[];
                        resolve(result)
                    }
                });
            })
            var reportdocs = await resultpromise;
            const timezone= property.timezone? property.timezone: 'America/Kentucky/Louisville';
      
            const incidentdatetime= (time,type)=>
            {
                
                var retunvalue:any=-1;
                if (type===0)//daily
                {
                    retunvalue= moment.unix(time).tz(timezone).format('H');
                }
                else if (type===1)
                    retunvalue= moment.unix(time).tz(timezone).day();
                else if(type===2)
                {
                    retunvalue= parseInt( moment.unix(time).tz(timezone).format("M"))-1;
                                      
                }
                return retunvalue;
            }
            const serachcount=(dataset,search)=>
            {
                var count = dataset.reduce(function(n, val) {
                    return n + (val == search);
                }, 0);

                return count;
            }
            const groupBy = key => array =>
            array.reduce(
                (objectsByKeyValue, obj) => ({
                ...objectsByKeyValue,
                [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(incidentdatetime(obj.incidentdate,type))
                }),
                {}
            );

                
            const groupByType = groupBy('type');

            reportdocs= groupByType(reportdocs);
            var reportdocskeys= Object.keys(reportdocs);
        
            reportdocskeys.forEach(k => {

                var seriesdata= reportdocs[k];
                var seriesdatavalue=[];
                for ( var i=0;i<24;i++)
                {
                //   console.log(i);
                
                var tmpvalue= { value:serachcount(seriesdata,i)
                                };
                seriesdatavalue.push(tmpvalue);
                }
                var tmp= {
                    seriesname:k,
                    hourdata:seriesdatavalue
                }

                response_result.push(tmp);
            });
    }
        
        
        res.send({  

            "Status":"200",
        
            chartdata:response_result
        
        });
    

})
app.post('/elasticsearch',validateJWT, async (req, res) => {
    console.log('ElasticSearch ' );
    console.log(JSON.stringify(req.body));
    const payload= req.body;
    const result1 =await getelasticsearchdata(payload.payload);
    res.send({result:result1}); 
});


app.get('/property/:propertyid/reportdata',validateJWT,async (req, res) => {
    console.log("\n\n get reportdata  log\n");
    let body = {
        size: 20,
        from: 0,
        query: {
          "match_all":{}
        }
      };
       search('reportdocs', body)
      .then(results => {
          var hits= results.hits.hits
  
          let result1 = hits.map(a => a._source);
          res.send({  
  
              "Status":"200",
           
              reportdocs:result1
           
           })   
      })
    })

    app.post('/webhook/VoicemailEmail/Notification', async (req, res) => {
        console.log("email notification ");
        var payload =req.body ;
       // console.log(JSON.stringify(payload));
        const fields= payload.fields;
        const indexname= payload.name;
        var account_db_pattern = new RegExp(getDabaseNameRegx());
        var dbnames:any= await getaccountdbnames();
       dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
        for (var i=0;i<dbnames.length;i++)
        {
            const dbname= dbnames[i];
            const account_id=parseDatabaseNameToAccount(dbname);//"d0ca5df0ae801c7f8963a7605da860c9";//"2047a7abb35d2ee72092efca120a0119";//
           console.log(account_id);
            await setKazooAccountEmailNotification(req,account_id)
        }
        res.send({  
    
            "Status":"200",
         
            "messages":"voicemail   successfully",
         
         });
    
    })

    
    app.post('/webhook/createindex', async (req, res) => {
        console.log("createindex ");
        var payload =req.body ;
        console.log(JSON.stringify(payload));
        const fields= payload.fields;
        const indexname= payload.name;
        var account_db_pattern = new RegExp(getDabaseNameRegx());
        var dbnames:any= await getaccountdbnames();
       dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
        for (var i=0;i<dbnames.length;i++)
        {
            const dbname= dbnames[i];
           console.log(dbname);
            await createindex(dbname,fields,indexname)
        }
        res.send({  
    
            "Status":"200",
         
            "messages":"voicemail   successfully",
         
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
         
            "messages":"voicemail   successfully",
         
         });
    
    })
    
    app.post('/webhook/media', async (req, res) => {
        console.log("media mail ");
        var payload =req.body ;
        console.log(req);
        
        res.sendStatus(200);
    
    })
app.post('/webhook/escalationemail', async (req, res) => {
        console.log("s3messageinfo escalationemail ");
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
            await inserts3notification(bodyarr2);
            const message=JSON.parse( (bodyarr2.Message));
            
            message.Records.forEach(record => {
                    console.log("record")
                    console.log(record);
                    debugMessage(log4jslogger,`record ${JSON.stringify(record) }`);

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
                        parseS3EscalationNotification(s3Onje3ct,99);
                        
                       
                    }
               });
        })  
        console.log( "here i am " )

        res.sendStatus(200);
    
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
                        }, 40000); 
                       
                    }
               });
        })  
        console.log( "here i am " )
       
        res.sendStatus(200);
    
    })
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
app.post('/serverlog', validateJWT, async(req, res) => {
    console.log("serverlog \n");
    const payload  =JSON.parse( req.body.payload ) ;
    console.log (payload);
    const message = payload.message;
    const method = payload.method;

    serverlog  ("info",message,method);
    res.send("log inserted");

})



app.get('/companies/:companyid/properties/:propertyid/callflow', validateJWT, (req, res) => {
        const _accountid=req['decoded'].account_id;
        const propertid= req.params.propertyid;
        const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertid}/callflows?filter_not_ui_metadata.origin=voip&filter_not_ui_metadata.origin=callqueues&_=1578197504745`, (err, response, body) => {

                if (err)
                {
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
    const _accountid=req['decoded'].account_id;
    const propertid= req.params.propertyid;
    const promise1 = new Promise((resolve, reject) => {
    getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertid}/phone_numbers?paginate=false`, 
        (err, response, body) => {

            if (err)
            {
               console.log("\n\n\nbody phone_numbers \n", err);
                res.send(err);
                return;
            }
          //  console.log("\n\n\nbody phone_numbers \n", body);
          
        console.log("asda");
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
                res.sendStatus(404);
            }
            res.sendFile(path.join(__dirname, "public/dist/", filename));
        })
    } else {
        res.sendFile(path.join(__dirname, "public/dist/", 'index.html'));
    }
});


app.get('/property/:propertyid', validateJWT, async(req:any, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    //console.log('added properties  ', parseAccountToDatabaseName(req['decoded'].account_id));
    const companyid=req.params.companyid;
    const contactsSelector = {
    "selector": {
                    "pvt_type": "property"
                },
    "use_index":"pvt_type",
     "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
    "limit":3000
       
    }
    res.statusCode = 200;
    var  docs = await getalldocumentsbyproperty(accountDb,contactsSelector)
        var result={
            docs:docs
        };
    res.send(JSON.stringify(result));
   
    
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



app.post('/sendsms',  async(req, res, next) => {
    console.log("sendsms\n", req.body);
   

const payload = req.body;
const messaging_number= process.env.MESSAGINGNUMBER;
payload.from=messaging_number;
   const response= await sendNotifySMS(payload);
console.log("response");
console.log(response);


res.send(response);


});

app.post('/webhook/schedulereport', async (req, res) => {
    console.log("schedulereport");
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );//&& d==="account/44/12/02171b923a9cc3a8ab36f9728294"
    dbnames.forEach(async (dbname) => 
    {
        var companyid= parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo (companyid);
        if (company)
        {
           
            const companyuserlist:any=  await  getComapnyUsers(dbname);
            if (companyuserlist && Array.isArray(companyuserlist) &&companyuserlist.length>0 )
            {
                
                const companyschedulereportinfo= {
                    companyid:companyid,
                    companydbname:dbname,
                    users:companyuserlist
                }
               await  send_callsumery_report(companyschedulereportinfo);
            }
            
            
        } 
    });
       
    res.send("done");

})
app.post('/webhook/optin', async (req, res) => {
    console.log("\n\n webhook optin\n");
    

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

        "Status":"200",
     
        "messages":"webhook optin  successfully",
     
     });

})



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

const elasticSerachDelete= async()=>
{
    console.log("elasticSerachDelete");
    const p={"payload":{
        querystring: '((propertyid:85e29ce2c8e7a21963add8f5e0d73055q) )',
        starttime: 1607020200,
        endtime: 1609871399
      }};
      console.log("result1");
    var result1:any =await getelasticsearchdata(p.payload);
   // console.log(JSON.stringify( result1));
    const ids= result1.map (r=>r._source.guid);
    //const accountdbname= parseAccountToDatabaseName("026f10be54bf6c594240dc2a4875f2b3");
   // const accountdb = nano.use(accountdbname);
   //var reports=await getreportdatadocumentsbyids(accountdb,ids);
   console.log(result1.length)
   result1= result1.filter (h=>h._source.guid==="90bbf49a-7d81-4401-a721-bc0b4ddf25ca1" );
   console.log(result1.length)
   //result1= result1.filter (h=>h._id!="2Q90ZXYBUQl8LdHqBvIE" );
   console.log(result1.length)
   var i=0;
   for (i=0; i<result1.length;i++)
    {
       var r= result1[i]    
       console.log(`${i}  ${r._source.guid} ${r._id} `);
      // if (r._source.responsetime!="-") continue
  //  var rep= reports.find(r1=>r1.elasticid===r._id)
   // console.log(`${rep.guid}  ${rep.elasticid} `);
   // rep.removefromreport=true;
   // await insertreportdata(rep,accountdb);
    var fields = {
        removefromreport:true,
       isduplicate:true
    }
 // await updatereportdatatoelastic(null,r._id,fields);
  
};
}
//createindex(_accountdbname,["propertyid","enabled","pvt_type","messageid","filename","elasticid","resolved"],"unresolved-index");
const createindexincompanies= async()=>{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const companyid= parseDatabaseNameToAccount(dbname);
       
       const company=  await getcompanyInfo(companyid);
       
       if (company && company.companyid)
       {
            const comapnydb= nano.use(dbname);
            console.log(company.companyname);
            console.log(dbname);

            console.log("*******************************");
            
       }
    }
}
const getFSDeviceList=async (apikey)=>
{
    const freeswitdevicelist = new Promise<any>((resolve, reject) => {
    
    
        const kRequest = getFreeSwitchRequest(apikey).get(`${process.env.FREE_SWITCH_SERVER}/v1/device/list`, {
            }, async (err: Error, response: Request.RequestResponse, body: any) => {
             if (err) {
                 console.log("couldn'get  getfreeswitchdevice_list " );
                 console.error(err);
                 resolve(err);
             }
           
            
            if (response && response.statusCode === 200) {
           
                 console.log("freeswitchdevice_list sucess" );
                 resolve(JSON.parse(body).data)

            }
            }
    );
   

    });
    return await freeswitdevicelist;
}

const updateDevicePasswardforProperty=async(propertyid)=>

{
    const loginresponse= await free_switch_login();
    var apikey =loginresponse.data.token;
    const fsdevicelist = await  getFSDeviceList(apikey)  ;  
    console.log(fsdevicelist);   
    const property:any= await getpropertyInfo(propertyid);
    //console.log(property);
    var callflowdatalist = property.callflowdata.filter(r => r.callflowoptiontype == 'Escalation');
    //console.log(callflowdatalist);
    const callflowdata= callflowdatalist[0];
    const propertydeviceusername =callflowdata.propertydeviceusername;
    const callflowdeviceusername= callflowdata.callflowdeviceusername;
    const propertydeviceFS=fsdevicelist.find( d=> d.username===propertydeviceusername);     
    const  callflowdeviceFS =fsdevicelist.find( d=> d.username===callflowdeviceusername);
    console.log("callflowdeviceFS");
    console.log(callflowdeviceFS);
    const password=  Math.random().toString(36).slice(-8); ;
    var freeswitchdevice= await free_switch_update_device_password(apikey,callflowdeviceFS._id, password);
    var result11= await update_devices_password(propertyid,callflowdata.deviceid1, password )
    //console.log("callflowdeviceFS");
    //console.log(callflowdeviceFS);
}


const getallpropertiesnameandid= async(companyid)=>{
    
    
   //     const dbname= dbnames[i];
       
       // const companyid= parseDatabaseNameToAccount(dbname);
       
       const company=  await getcompanyInfo(companyid);
      
       if (company && company.companyid)
       {
           const dbname= parseAccountToDatabaseName(companyid);
            const comapnydb= nano.use(dbname);
            //console.log(company.companyname);
            //console.log(dbname);

            console.log("*******************************");

            var properties:any = await getproperties(company.companyid);
            
            for (var k= 0;k<properties.docs.length;k++)
            {
                const prop= properties.docs[k];
                
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
const sendEsclationEmailifRequired= async()=>
{
    const comapyid='e0e1fdffef2884a52a9b1efcf8149834';
    const accountDbName= parseAccountToDatabaseName(comapyid);
    const accountDb=nano.use(accountDbName);
    const callinfo= {
        guid:'ff37d826-bf59-49e4-aca9-0f54b654ed15'
    }
    var reportdata=await getreportdatadocument(accountDb,callinfo);
    try
    {
        const customernumber= reportdata.fromd;
        sendEscalationEmails(reportdata)
        return reportdata;
    }
    catch (ex)
    {
        debugMessage(log4jslogger,"error durning report");
        debugMessage(log4jslogger, ex);
        return await parsemessagerecordingend(accountDb,callinfo);

    }
    
}

const insertVMid= async(comapnyid)=>
{
    const accountDb= nano.use(parseAccountToDatabaseName(comapnyid));
    const guids= [
       
        
        "5b446651-9bb3-42c9-b69d-5d41c4e03c35",
        "5e72dcd6-09ee-410f-b874-a8b8c623083a",
        "758ea3ff-ced1-4fee-9694-0198b18fa517",
        "89a27063-7489-4d76-8e29-2c14c6d9c0b5",
        "8c692d9d-d27e-4867-922d-f4621feab451",
        "90899ee8-5b0e-4784-b11a-69bf2a34faad",
        "92189eac-42b1-4f0d-9a15-39d5655e5816",
        "93c89f98-0856-425d-bafc-cb603962a962",
        "9a39b041-394a-4c6c-88ca-4d3c8a9e20ad",
        "9b3d6d84-03a3-47a9-9698-6aa166985b07",
        "a03c3777-357e-4ebf-b39a-8b3801a6c8da",
        "a4232c60-bf39-4f6f-b137-7fe0da0a687a",
        "b7428bd4-1d81-4a72-b718-fb64ac70f0bb",
        "bb4bc073-9acc-4792-9323-4a73c6de3342",
        "d5b8eeb3-50d6-4f23-82ea-3680973a1b52",
        "da003dc6-e73d-487d-83bd-236511874b8b",
        
        "43b7c575-53ee-4639-b983-eacb70c8c958",
        "4a96abbe-cc6e-427b-ba0d-bf799bd8b139",
        "7c7122d3-e997-4fd2-bfc2-4af802978a72",
        "a7bcbd02-c347-4da1-876e-bb6b607ec4c4",
        "aca304df-bbeb-4442-811b-4c2d31fe9ea6",
        
        "2c86dba1-5f3d-4a47-9bec-6f9853b40b16",
        "f6e6bee8-3092-495e-9791-49186307082c",
        
        "162e5297-cc9b-4a59-99f3-1694f846f1d0",
        "2fcfd10a-1d45-46d9-8205-f9a8cc53d739",
        "391b41f9-8479-4a64-a057-b038a27bcb05",
        "869fb04e-4e11-45b8-9ba5-110330016281",
        "996d628c-1f8c-4723-a55f-429305f5487b",
        "ce133373-d61f-4c3e-935c-1bfc49146d40",
        "dcf778f5-1d15-482a-ab65-3506a689867f",
        "de74c37c-4086-4e2a-b5a2-99179a24e4e3",
        
        "ad866cd4-dc16-47ee-bbc0-eef99f0e256e",
        "d926fdf2-29ba-427f-b64b-d95244a0f2a8",
        "e6022b4d-c934-4c61-8bd0-a52328a6bf5a",
        
        "030d5e3e-971a-4d8e-aef8-17cd0fbf38f5",
        "321da1d1-03f9-43ee-b526-6843750310b3",
        "3ecf77a3-f9e8-4d8c-adc5-fbc297e87019",
        "56707188-babf-48de-b5c1-fb3abcf7a49c",
        "5b3e8195-20aa-4deb-943d-fcfbd30237aa",
        "6b32422b-7a0c-415a-9369-327e3e6fc414",
        "7bea0905-e1d5-42f9-b51c-62c6e5c200be",
        "9e22344b-d85d-4e79-ac03-a946df02c41f",
        "a73638a1-4ad5-4070-828c-e346acbf7d86",
        "aaaa84e4-af25-4517-917b-b3821341b2a4",
        "b879c872-cfff-4091-a17b-90655c738760",
        "bf43b19c-e050-40c3-b2a4-fc45f2e8d7b6",
        "d89e5ac6-62b5-484e-aef2-2bdf76b75d0c",
        
        "012b5488-1c08-4715-bd04-09c35d2e6252",
        
        "22a5db02-b267-4c2d-ade1-d720fa4da5e4",
        "29b1a864-7ddb-4417-82e0-e0e939471b74",
        "330b228a-471b-41f3-abe7-e62adade65e1",
        "4cd758c4-3d0d-43ed-9ae4-f4a2f6448865",
        "559efb38-cd80-48d3-8a18-cd7cbc279457",
        "74ddc0de-4200-4c36-9687-ab69e49e7af1",
        "85ebef3f-624c-4118-9ba7-0098322395b8",
        "94c5a45a-f5c5-4e8c-9087-85902e08a41a",
        "c4919d68-dd86-461c-89a1-53fa0cd47798",
        "ca68468f-9f3e-4b5a-9851-a39c06e95543",
        "daa81eb8-17fd-45d7-8f36-5b0dff15c59f",
        "e13f78fd-79a3-4918-afcb-9136e2871e2c",
        "f4457a03-ddcb-4c1b-ac87-15bf50f3df7d",
        "f9e0ac8f-fcee-4908-86ca-1c73d260061b",
        
        "0e18ac54-ce48-4379-b69e-b608ab0890ba",
        "1076e737-4ae1-4236-ba50-17da9c3d5203",
        "296a8a4c-1bc4-4e67-a8d6-217ca5da7c17",
        "2ea22eb6-7b96-4db2-94d1-8d2e1442b68f",
        "31b0ce44-1623-4cda-a1ff-8fe1dae9ea8d",
        "37cd2a59-31e5-414d-b211-3344301ca08e",
        "4edab2bf-34e7-4dac-9cd7-8ed4f787d55c",
        "7ef05818-a25e-497a-a301-c47ee2814460",
        "a6ebbda8-ae3f-40b8-9aab-d4e9328bdf96",
        "a90c839f-7f46-43e2-8c9c-30fe96d86c62",
        "c774c35e-a3e4-4e41-8881-4cc941ff5e36",
        "c8b68235-302b-4d1f-b84d-1652c7c1385c",
        "e57ed472-ad44-44d0-8edb-6ba7581dee7d",
        "e60a40cb-38b1-46a9-b707-bb5a83b8b502",
        
        "0cf8f942-c82c-468b-a1fa-760507b07112",
        "34bf5fa5-2047-4715-a460-b8c9040c667b",
        "35d88f93-f47c-4dbb-b9d1-3dc71bd561c2",
        "653c9455-3be6-497e-8519-02be533769c2",
        "65581efd-4516-4513-b97a-ed7af84939b0",
        "7edfa0fb-33fc-4955-ab5f-f206a854c622",
        "8221c8e2-e931-4328-96c0-47b87e8cc67f",
        "95dc57b2-8791-481d-a59d-6e9fe39e3503",
        "de27e9ea-37c3-472e-b47a-ecbedf9aa1d7",
        "e023dd61-b2a4-4d18-b2b5-e91b0a15cf48",
        "f46efb79-af99-468b-a63e-0bb1c3fab92f",
        "fd846da1-f737-44ac-90da-64286d968402",
        
        "e8e0fafb-c1bc-4bf4-b1a5-7c3da5bdfe61",
        
        "9d388a69-6c14-4481-842a-17f593091f8b",
        
        "03f610ae-90a9-47c4-b733-2882e908febc",
        "0d4a68ff-0fed-489e-b9f6-7ced6f458453",
        "60788451-fea2-4fe3-88de-53510c62ea0d",
        
        "0291aba8-7717-4cf0-86a9-fa2c653bc6ea",
        "1a9552b8-f31d-4f3c-b504-3f766a8852a8",
        "2f42e5ae-55ed-4a7a-83af-42cfd93bfef8",
        "7e02b71e-c992-4f84-9445-952dd0cdbc63",
        "b007da9a-4cf5-4c57-9535-7febdd6f98f6",
        "b453bc0d-f949-4e38-8bae-96fbc06f4ff0",
        "b7649c4c-f3af-4048-b5b1-1b072b1e45ab",
        "b855a344-5a9b-4150-9bda-413c448bd6f2",
        "c41849c8-f472-47f0-a3d5-e962ab726f9d",
        "d7c5ce02-991c-4731-9e0f-730b8cf6783f",
        "e5c0d7d0-ada6-4079-8c2c-d533b6bcfc59",
        
        "3b5ce072-b620-48cc-bfe1-63dcc9319b79",
        "d4fb65e6-e0c2-4e67-b947-9aa099b0795b",
        "f3eb1b6b-3438-4a06-9406-7172fd339255",
        
        "0b8d3d55-615e-4cf8-8b05-8244943b773e",
        "0e0a38c4-bcad-49f9-afef-75e88574bc68",
        "27345fab-aac9-44d9-94f0-8b3930559699",
        "3f9d644d-5646-4b75-bdc1-0d0b6f0f281b",
        "3faf4bc5-aa6d-461a-87a7-911ff09c67f3",
        "4f6936a9-0df8-4f2d-ba92-f31ab08edd14",
        "7f347a77-4fd8-416d-82bb-40128f61eb8b",
        "85fa3671-1be2-44d9-b30b-8fcb9fefff09",
        "93b0a357-dc86-4ce4-806b-0866a800bf57",
        "9818b160-1f71-4abf-96ee-7868c2e8d478",
        "9dfd6190-4e87-476c-8135-4ea50d04a607",
        "b9db54c4-f45c-4388-8a20-86614426da22",
        "be57fff8-9a8c-4a54-969e-460f63352b3c",
        "c0bad103-b879-4d80-9e46-191f6baf3be8"]

    for (var i=0; i<guids.length;i++)
        {
            const guid=guids[i];
            const voicemail_id= guid.split("_")[0]
             const callinfodata ={guid:guid}
            var reportdata=await getreportdatadocument(accountDb,callinfodata);
            reportdata.voicemailid=`${voicemail_id}.mp3`;
            console.log(reportdata.elasticid);
            await insertreportdata(reportdata,accountDb);
            var fields = {
                voicemailid:reportdata.voicemailid
            }

            if (reportdata.elasticid)
            {
                await updatereportdatatoelastic(accountDb,reportdata,fields);
            }
            else
            {
                await insertreportdatatoelastic(accountDb,reportdata);
            }
            

        }
}


const getGeneralIncident=async(comapnyid,time)=>
{
     var ids=[];
    const contactsSelector = 
        {
            "selector": {
               "pvt_type": "dtmfinfo",
               "notifytimestamp": {
               
                  "$gte":time
                  
                  
               },
               "callflowoption": {
                "$ne": "Other"
             }
            },
            "use_index":"callflowoption_callflowoption",
        "execution_stats": process.env.EXECUTION_STATS === 'true'? true : false,
            "limit": 3000
         }
        
        console.log(JSON.stringify(contactsSelector));
        const accountDb= nano.use(parseAccountToDatabaseName(comapnyid));
        var callinfodatalist:any=await getalldocumentsbyproperty(accountDb,contactsSelector);
        callinfodatalist= callinfodatalist.reverse();
        //callinfodatalist.forEach(async (callinfodata) => 
        for (var i=0 ; i<callinfodatalist.length;i++)
        {
            const callinfodata=callinfodatalist[i];
            
            if (callinfodata.voicemail_id)
            {
                var reportdata=await getreportdatadocument(accountDb,callinfodata);
                if (!reportdata.voicemailkey && reportdata.voicemailid)
                {
                     console.log("got report");
                    console.log(reportdata.companyname);
                    
                    ids.push(reportdata.guid);
                    // console.log(JSON.parse(s3notification.data.Message) );
                    await tmps3parse(reportdata.voicemailid,callinfodata.notifytimestamp)
                   
                }
            }
            console.log(i)
            console.log(callinfodatalist.length)

            
        };
        console.log( ids);
        console.log("end");
}
const tmps3parse=async (voicemailid,time)=>

{
    console.log("tmps3parse");
    const contactsSelector2 = 
    {
        //no need
        "selector": {
            "pvt_type": "s3notification",
            "data.Message": {
            "$regex": voicemailid
            }
        }
    };
const globaldb=nano.use("globaldb");

var s3notification=await getdocumentbyproperty(globaldb,contactsSelector2);
    if(s3notification && s3notification.data && s3notification.data.Message)
                   {
                   
                    
                    const message= JSON.parse(s3notification.data.Message);
                    const nowtime= time;
                    console.log(JSON.stringify(message) );
                    console.log(nowtime);
                    await sendVoiceMail(message,nowtime);
                   }
}
const sendVoiceMail=async(message,time)=>
{

   //  message= {"Records":[{"eventVersion":"2.1","eventSource":"aws:s3","awsRegion":"us-west-2","eventTime":"2021-03-05T15:15:56.001Z","eventName":"ObjectCreated:Put","userIdentity":{"principalId":"AWS:AIDAIND6XFBQVCVGGBWJC"},"requestParameters":{"sourceIPAddress":"192.34.51.102"},"responseElements":{"x-amz-request-id":"8E447WJD8H6PNZAV","x-amz-id-2":"//95nOmz5TZWPkghR9J/TNr8HId6MvIVf5Mi19VtO1VSsD2dUJgY0Ov8HjXt3fOky+bzcgDyPam1JRwlv+daRp/R4WHYl46I"},"s3":{"s3SchemaVersion":"1.0","configurationId":"voicemesssag","bucket":{"name":"hsnotify","ownerIdentity":{"principalId":"AFD8O01VN61EK"},"arn":"arn:aws:s3:::hsnotify"},"object":{"key":"account%252F18%252Fee%252F821425d34d545967d45a5c48a0cc-202103/202103-603b64f663d0cce094ea2c0f146125b9_940ff638ecd13351c6ad265425586fc6.mp3","size":48528,"eTag":"b0a6dc114667453c3760dc0f8d3cf937","sequencer":"0060424B2C09D95267"}}}]}

    console.log("sendVoiceMail");
    message.Records.forEach(async(record) => {
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
               await   parseS3Notifcation(s3Onje3ct,time);
               
            }
       });

console.log( "here i am " )
}

const getVoiceMailsForId=  async(apikey,accountId,vid)=>
{   
   const kazooupdatepromise = new Promise<any>((resolve, reject) => {
    
            const kRequest =getKazooRequest(null,apikey)

			.get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}/messages?paginate=false`
				,
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                    
                     
                        resolve(JSON.parse( b));
                    }
                }
                );
             });

  
    const result = await kazooupdatepromise;
     return result;
}
const getVm_Id=async ()=>
{
    const apikey= await loginwithcred();
    const kazooupdatepromise = new Promise<any>((resolve, reject) => {
    const kRequest = getKazooRequest(null,apikey)

    .get(`${process.env.KAZOO_SERVER}/v2/accounts/f9b45805fa213343e4f84d56eed46503/vmboxes/9fd2b992d4280bd70672e72c79f1d71a/messages?paginate=true`, (err, response, body) => {
       console.log(JSON.parse( body));
    })
});
}
const printVoicemail=(vms,property,callflowoption,company)=>
{
   // console.log(vms);
    vms= vms.filter((vm)=>{return vm.timestamp>63783957600 &&vm.timestamp<63784359600})
    vms= vms.map((vm)=> {  
        var new_obj={ companyname:company.name,
        propertyname: property.propertyname,
        type: callflowoption,
        call_id:vm.call_id,
        media_id:vm.media_id,
        timestamp:vm.timestamp,

    }
    
    
    return new_obj;});

    for (var k=0;k<vms.length;k++)
    {
        
    }

    
   /*: vms.forEach(vm => {
        vm.companyname= company.name;
        vm.propertyname= property.propertyname;
        vm.type= callflowoption;
        console.log(`${vm.companyname},${vm.propertyname},${vm.type},${vm.call_id},${vm.media_id},${vm.timestamp},${vm.caller_id_number},${vm.caller_id_name} `);
    });*/
}
const getVoiceemails=async ( property)=>
{
    const apikey= await loginwithcred();
    const  callflowdata= property.callflowdata.filter(cl=>  cl.callflowoptiontype==="FWD Message" && cl.deviceid)
    const propertyid= property.propertyid;
    const company= await getcompanyInfo(property.companyid);
    if (callflowdata)
    {
        callflowdata.forEach(async (cl) => {
            var vmbox=   await getVoiceMailsForId(apikey,propertyid,cl.deviceid);
            console.log(`${property.propertyname}_${cl.callflowoption}`);
            printVoicemail(vmbox.data,property,cl.callflowoption,company);
        //    vmbox=await  updateVoiceMailBoxForId(apikey,propertyid,cl.deviceid,vmbox);
               
            
        });
    }
    
}
const generatevoicemaillist=async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
  // && d==="nt_account/06/45/36efbf50c38cac7f8824e74ab55a");
   // dbnames.forEach(async(dbname) => 
   var kk=1;
   console.log("start");
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const propertyid= parseDatabaseNameToAccount(dbname);
       const property=  await getpropertyInfo( propertyid); 
       if (property && property.propertyid)
       {
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
    const callinfo= {    "type": "agentaction",
    "timestamp": "1645023663",
    "guid": "8122ff29-8202-4d94-a82d-1b80d862e430",
    "boxid": "5025550819_Emergency_Callflow",
    "propertyid": "c374bdc6ddba9d690cdaeeccca57e629",
    "agentphonenumber": "+15025550981",
    "when": "agentcall",
    "messagetype": "new",
    "action": "7",
    "messageid": "msg_a522c66f-75df-49cd-b097-0a932bdac3ff.mp3",
    "agentid": "fdfe3d5a8d463f9d4320445c75e48a2d",
    "agentname": "Aparna",
    "firstname": "Aparna",
    "lastname": "Singh",
    "didnumber": "5025550819",
    "pvt_type": "callinfolog",
    "enabled": true,
    "notifytimestamp": 1645005613,
    "inserttimestamp": 1645005613};
    insertcallinfolog(callinfo);
   //  voicemaillog(callinfo)
    //    insertcallinfolog(callinfo)
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
const getOptinStatus = async (phoneNumber=undefined) => {
    const globalSmsDb= nano.use("globaldb_optin");
    //check this
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
    var optinnumbers = await getalldocumentsbyproperty(globalSmsDb, contactsSelector);
   return optinnumbers;
}
const findphonenumber=async ()=>
{
    console.log("findphonenumber")
    var dbnames:any=await getcompanyaccountdbnamesforcron();
    console.log(dbnames.length);
    var optin_numbers = await getOptinStatus();
    console.log(optin_numbers);
    //dbnames = dbnames.filter(d=>d.accountid==='6fec1c82443783bcf1b82a83ddae16c0');
    for (var dbindex=0;dbindex<dbnames.length;dbindex++)
    {
        var account= dbnames[dbindex];
        const company = account.type==="company";
        const companyid =account.accountid;
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
                        user.phonesettings=      {
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

//createindexforce()
//findphonenumber();
/*
http.createServer(function (req, res) {
    console.log(req.url);
   // if (req && req.headers &&req.headers['host'] )
     //   res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(':3000','') + req.url });
    
    res.end();
}).listen(3000);

httpsServer.listen(443,3000);
*/
//setScheduleReportJob();
app.listen(process.env.PORT || 4003);
module.exports = app;
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack);
    debugMessage(log4jsexceptionlogger,"************ exception starts ************");
    debugMessage(log4jsexceptionlogger, JSON.stringify(err));
    debugMessage(log4jsexceptionlogger, JSON.stringify(err.stack));
    debugMessage(log4jsexceptionlogger,"************ exception End ************");
    process.exit(1)
});
