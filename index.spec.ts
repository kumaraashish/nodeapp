

const app = require('./index')
const request = require('supertest')
// const moment  = require('moment-timezone');

var email = "kumaraashish@facileconsulting.com";
var token = "";
var account_name = "morit";
var id = "";
var uid = "";
var account_id  = "";
var company_id = "";
var property_id = "";
var propertyname = "";
var company_name = "";
var selected_company_index = 5;
var type = "";
var businesshours = true;
var nonbusinesshours = true;
// const start_date_local = moment().add(-30, "days").startOf('day');
// var start_date_utc = moment(start_date_local.clone()).utc();
// var starttime = start_date_utc.unix();
var property = "";
// const end_date_local = moment().endOf('day');
// var end_date_utc = moment(end_date_local.clone()).utc() ;
// var endtime = end_date_utc.unix();
var callflowdata = [];
var download_url = "";
var setUpCompResponse;

describe('Login Test', () => {
   
    beforeAll(async () => {
        const loginResponse = await request(app)
          .post('/login')
          .send({
            account_name: account_name,
            creds: "5174b56e28ae2c09a7fd3128af9709fe"
          })
          token = loginResponse.body.token; 
          account_id = loginResponse.body.account_id; 
    });

    test('presenceid Call', async () => {
        const res = await request(app)
        .get('/presenceid/'+email)
        .set('Authorization', "Bearer " + token)
        expect(res.statusCode).toEqual(200)
        uid = res.body.id;
    }, 10000);


    // test('jwt Call', async () => {
    //     const res = await request(app)
    //     .get('/verifyJWT')
    //     .set('Authorization', "Bearer " + token)
    //     expect(res.statusCode).toEqual(200)
    // });

    // test('get companies list', async () => {
    //     const companiesRes = await request(app)
    //     .get('/getnotifycompanies/'+account_id)
    //     .set('Authorization', "Bearer " + token)
    //     expect(companiesRes.statusCode).toEqual(200)
    //     if(companiesRes.body.docs.length > 0)
    //     {
    //         console.log("[+++] company found ");
    //         company_id = companiesRes.body.docs[0].companyid;
    //         company_name = companiesRes.body.docs[0].companyname;
    //     }
    //     else{
    //         console.log("[>>>] No company found");
    //     }
    // });

    // /* Notify Module */

    //   test('get companies Call summary', async () => {
    //     console.log("get companies Call summary call");
    //    // console.log("Token --- "+ token);
    //     const res = await request(app)
    //     .get('/companies/'+company_id+"/callsummery")
    //     .set('Authorization', "Bearer " + token)
    //     expect(res.statusCode).toEqual(200)
    //      console.log(res.body);
    // }, 10000)

    //  test('get companies properties_avg ', async () => {
    //     console.log("get companies properties_avg ");
    //     // console.log("Token --- "+ token);
    //     const res = await request(app)
    //     .get('/companies/'+company_id+"/properties_avg")
    //     .set('Authorization', "Bearer " + token)
    //     expect(res.statusCode).toEqual(200);
    // }, 10000)



    // //// add new user

    // var useremail  = "xodibad262@tawtar.com";

    // let newuserdata = {payload: JSON.stringify({"data":{"caller_id":{"internal":{"name":"DeveloperTest","number":"1000"}},"presence_id":"10001","notify_enabled":true,"email":useremail,"user_type":"admin","msteruser":false,"pvt_type":"user","primarykazooaccount":{"id":"2047a7abb35d2ee72092efca120a0119","name":"Property-B"},"cid":"441202171b923a9cc3a8ab36f9728294","accountname":"Company A (Notify Only)","companyinfo":[{"id":"441202171b923a9cc3a8ab36f9728294","name":"","enabled":true,"user_type":"Admin","timezone":"America/Kentucky/Louisville"}],"propertylist":[{"id": property_id,"enabled":true,"name": property,"timezone":"America/Los_Angeles"}],"priv_level":"admin","vm_to_email_enabled":true,"first_name":"Developer","username": useremail,"last_name":"Test","password":"dg380xw7","title":"Test Dev","send_email_on_creation":false,"masteruser_name":"Manish billor","logo":"http://web1.hsnotify.com:3000/img/HelloSpoke_logo.png","loginimg":"http://web1.hsnotify.com:3000/img/login.png","ui_metadata":{"version":"4.3-66","ui":"monster-ui","origin":"voip"}}})};
    // console.log(newuserdata);
    // it('Add new user call', async () => {
    //     console.log("Add new user call");
    //     // console.log("Token --- "+ token);
    //     const res = await request(app)
    //     .post("/companies/"+company_id+"/properties/"+property_id+"/users")
    //     .send(newuserdata)
    //     .set('Authorization', "Bearer " + token)
    //     if(res.statusCode == 200)
    //     {
    //         expect(res.statusCode).toEqual(200)
    //     }
    //     else
    //     {
    //         expect(res.statusCode).toEqual(500)
    //     }
    //     // expect(res.body).toHaveProperty('data');
    //     console.log(res.body);
    // })

    // //edit team member

    // let useraccountid = "441202171b923a9cc3a8ab36f9728294";
    // let updateuid = "80e86640465c40a4b85a4e06de773b26"
    // let edituserdata = {payload: JSON.stringify({uid: updateuid,title:"rdg",timezone:"America/Chicago",phonesettings:{settings:[{number:343546456,type:"Mobile"}]},smssettings:{settings:[]},emailsettings:{settings:[{email:"jaxasen408@arasj.net"}]},pin:87674,livereplysetting:[{number:343546456,livereplywait:30}],notificationrulessetting:[{type:"Phone",number:343546456,notificationwait:2}],handoffrulessettings:[],escalationsettings:[],accountid: useraccountid,member_image:""})};
    // // test('Edit User call', async () => {
    // //     console.log("Edit User call");
    // //     // console.log("Token --- "+ token);
    // //     const res = await request(app)
    // //     .put("/updatenotifyusersettings/"+useraccountid+"/"+updateuid)
    // //     .send(edituserdata)
    // //     .set('Authorization', "Bearer " + token)
    // //     if(res.statusCode == 200)
    // //     {
    // //         expect(res.statusCode).toEqual(200)
    // //     }
    // //     else
    // //     {
    // //         expect(res.statusCode).toEqual(500)
    // //     }
    // //     // expect(res.body).toHaveProperty('data');
    // //     console.log(res.body);
    // // }, 30000)



// /* Company settings */


//   test('Get company master list', async () => {
//         console.log("Get company master list");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .get('/companies/'+company_id+"/masterusers")
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res);
//     }, 10000)
// })

// /**** Reports module starts here ****/
// describe('Reports module', () => {
//     test('Get company properties info', async () => {
//         const companyPropertiesResponse = await request(app)
//         .get(`/companies/${company_id}/properties/added`)
//         .set('Authorization', 'Bearer ' + token)
//         if(companyPropertiesResponse && companyPropertiesResponse.body && companyPropertiesResponse.body.docs && companyPropertiesResponse.body.docs.length > 0)
//         {   
//             console.log("[+++] company properties found");
//             property_id = companyPropertiesResponse.body.docs[0].propertyid;
//             property = companyPropertiesResponse.body.docs[0].propertyname;
//             type = companyPropertiesResponse.body.docs[0].type;
//         }
//         else{
//             console.log("[>>>] No company properties found");
//         }
//     });

    // test('Get statistics info ', async () => {
    //     const propertyStatisticsResponse = await request(app)
    //     .get(`/property/${property_id}/chart/${type}/${businesshours}/${nonbusinesshours}/${starttime}/${endtime}`)
    //     .set('Authorization', 'Bearer ' + token)
    //     if(propertyStatisticsResponse && propertyStatisticsResponse.body && propertyStatisticsResponse.body.chartdata)
    //     {
    //         console.log("[+++] company properties statistics found");
    //     }
    //     else{
    //         console.log("[>>>] No company properties statistics found");
    //     }
    // });

    // test('Get call activity info', async () => {
    //     const callActivityResponse = await request(app)
    //     .post('/elasticsearch')
    //     .send({ 
    //         "payload": 
    //             {
    //                 "querystring": `(companyid:${company_id})`,
    //                 "starttime": starttime,
    //                 "endtime": endtime
    //             },
    //         "json":true
    //     })
    //     .set('Authorization', 'Bearer ' + token)
    //     if(callActivityResponse && callActivityResponse.body && callActivityResponse.body.result.length > 0)
    //     {
    //         console.log("[+++] call activity info found ");
    //         download_url = callActivityResponse.body.result[0].messageid;
    //         console.log("[+++] call activity info found download_url ", download_url);
    //     }
    //     else{
    //         console.log("[>>>] No call activity info found");
    //     }
    // });

    
    // test('Download recordings ', async () => {
    //     console.log("[+++] call activity info found download_url ", download_url);
    //     const propertyStatisticsResponse = await request(app)
    //     .post(`/downloadfile/`)
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({"fileurl": download_url })
    //     expect(propertyStatisticsResponse.statusCode).toEqual(200)
    //      console.log("[+++] Successfully downloaded ", download_url);        
    // });
});

/**** Reports module ends here ****/


/* Set up module starts here */
// describe('Set up module', () => {
//     test('Get accounts  ', async () => {
//         const accountResponse = await request(app)
//         .get(`/admin/accounts`)
//         .set('Authorization', 'Bearer ' + token)
//         expect(accountResponse.statusCode).toEqual(200)
//         console.log("[+++] Set up module account response ", accountResponse);
//     });


    // test('Get set up company  ', async () => {
    //     setUpCompResponse = await request(app)
    //     .get(`/companies/${property_id}`)
    //     .set('Authorization', 'Bearer ' + token)
    //     expect(setUpCompResponse.statusCode).toEqual(200)
    //     console.log("[+++] Set up module Get set up set up company response ", setUpCompResponse);
    // });

    // test('Add company  ', async () => {
    //     const payload = {
    //         "companyname": setUpCompResponse.body.companyname,
    //         "companyid": setUpCompResponse.body.companyid,
    //         "accountid": setUpCompResponse.body.accountid,
    //         "industry": setUpCompResponse.body.industry,
    //         "kazooid": setUpCompResponse.body.kazooid,
    //         "tree": setUpCompResponse.body.tree,
    //         "name": setUpCompResponse.body.name,
    //         "phone": setUpCompResponse.body.phone,
    //         "enabled": setUpCompResponse.body.enabled,
    //         "timezone": setUpCompResponse.body.timezone
    //     }
    //     const addCompResponse = await request(app)
    //     .post(`/addcompany`)
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({'payload' : JSON.stringify(payload)})
    //     expect(addCompResponse.statusCode).toEqual(200)
    //     console.log("[+++] Set up module Get set up add Company response ", addCompResponse);
    //  });    

    //  test('Get master user info ', async () => {
    //     const masterUserResponse = await request(app)
    //     .get(`/companies/${property_id}/masterusers`)
    //     .set('Authorization', 'Bearer ' + token)
    //     expect(masterUserResponse.statusCode).toEqual(200)
    //     console.log("[+++] Set up module master user info ", masterUserResponse);
    // });

//      test('Get not added master user info  ', async () => {
//         const noAddedResponse = await request(app)
//         .get(`/companies/${property_id}/masterusers/notadded`)
//         .set('Authorization', 'Bearer ' + token)
//         expect(noAddedResponse.statusCode).toEqual(200)
//         console.log("[+++] Set up module not added master user info ", noAddedResponse);
//      }); 
// });



// /* Set up module ends here */



// /* *******  Schedule Module  ********* */

// describe('Schedule Test', () => {
//     it('get companies properties list service call', async () => {
//         console.log("get companies properties list service call");
//         console.log("Token --- "+ token);
//         console.log("Company id --- "+ company_id);
//         const res = await request(app)
//         .get('/companies/'+company_id+"/properties/added")
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         console.log("----------- Property List ----------")
//         console.log(res.body.docs);
//         property_id = res.body.docs[0].propertyid;
//         property = res.body.docs[0].propertyname;
//         console.log("----------------------------------------");
        
//         let callflowoptions = res.body.docs[0].callflowdata;
//         callflowoptions.forEach(clp => {
//             if (clp.callflowoptiontype== "Escalation")
//                 callflowdata.push(clp.callflowoption);

//           });
//           callflowdata = callflowdata[0];
//           console.log(callflowdata);
          

//     })





//     it('Get schedules list call', async () => {
//         console.log("Get schedules list call");
//         console.log(callflowdata);
//         console.log("---------------------------------------------");
        
//         const res = await request(app)
//         .get('/companies/'+company_id+"/properties/"+property_id+"/schedules/"+callflowdata)
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })
//     it('Get escalation list call', async () => {
//         console.log("Get escalation list call");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .get('/companies/'+company_id+"/properties/"+property_id+"/escalationuserlist")
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })

// const esclist = {payload: JSON.stringify({"_id":"7dcc537ea43c2a2aa08184035c281928","_rev":"33-8e62e2f4e8a727366646bc2cf4cd8505","data":[{"name":"test","userlistcount":0,"users":[{"key":"70af5de0e375d90d42772eb412587278","name":"Automation T"},{"key":"c188def733fc8f008ac274f3d6deec86","name":"AAjio f"},{"key":"7438ac991a1892e38925b932f002a1c4","name":"manish_new_p p"},{"key":"4ea7ae6962dd9bad78d1f362f383181d","name":"AAAAAshshssss s"},{"key":"4ea7ae6962dd9bad78d1f362f383181d","name":"AAAAAshshssss s"},{"key":"3dabe8d9b1decd7c30a188078c832aae","name":"2267Dorton 2"},{"key":"46bd935954a0271c9e1d6f01d2e747ef","name":"manish_master_b n"},{"key":"0a2c2d485f919972c71fe9a3c363dda2","name":"saceka s"},{"key":"4ea7ae6962dd9bad78d1f362f383181d","name":"AAAAAshshssss s"},{"key":"1f3a3c7af0a8fa5b41f55641d2a9e63d","name":"Aparna S"}]},{"name":"1","userlistcount":0,"users":[{"key":"c188def733fc8f008ac274f3d6deec86","name":"AAjio f"},{"key":"1f3a3c7af0a8fa5b41f55641d2a9e63d","name":"Aparna S"}]}],"propertyid":"2047a7abb35d2ee72092efca120a0119","companyid":"441202171b923a9cc3a8ab36f9728294","pvt_type":"escalationuserlist","enabled":true})};

//     it('save escalation list call', async () => {
//         console.log("Get escalation list call");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .post('/companies/'+company_id+"/properties/"+property_id+"/escalationuserlist")
//         .send(esclist)
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })


//     var dayschdata = {payload: JSON.stringify({propertyid:property_id,companyid:company_id,scheduleid:"a1b72a80-a67d-11ea-90be-1d58cf75ca58",datetime:1604125800,datetimeunix:1604102400,enddatetimeunix:1604127600,time:"5pm - 12am",schedulekey:"a1b72a80-a67d-11ea-90be-1d58cf75ca58",users:[{key:"3dabe8d9b1decd7c30a188078c832aae",name:"2267Dorton 2",colorindex:"9"}],dayschedule:true,livereply:false,scheduledatetime:"2020-10-31T06:30:00.000Z",callflowsoptiontype:"Emergency",_id:"deb785805f53d41fba62cd70de3720ce",_rev:"1-de42a2e51dd5f834597513eaf71b54a5"})};
//     it('day schedule save call', async () => {
//         console.log("day schedule save call");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .post('/companies/'+company_id+"/properties/"+property_id+"/dayschedules")
//         .send(dayschdata)
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })


//     var sc = 0;
//     var adschdata = {payload: JSON.stringify({propertyid: property_id, callflowsoptiontype: callflowdata, companyid :company_id, adjustdate:"2020-11-03T08:00:00.000Z", adjustdate_unix: 1604390400, data:[{ scheduleid:"1c2ee550-c2c6-11ea-9f35-1d63d2f66aa3", livereply: true, livereplyduration: 60, from:{hh:"00",mm:"00",ss:"00",a:"am"}, ifrom: 0,to: {hh:"00",mm:"30",ss:"00",a:"am"},ito:0.3,enabled:true,createddate:1604316392,colorindex:3},{scheduleid:"35e2ff00-c36a-11ea-8171-e32c8fd7c3a3", livereply:true, livereplyduration:60, from:{hh:"02",mm:"00",ss:"00",a:"am"},ifrom:2,to:{hh:"06",mm:"00",ss:"00",a:"am"},ito:6,enabled:true,createddate:1604316392,colorindex:3},{scheduleid:"ebf965c0-c1f5-11ea-8b32-47b2067a656a",livereply:true,livereplyduration:60,from:{hh:"06",mm:"00",ss:"00",a:"am"},ifrom:6,to:{hh:"06",mm:"00",ss:"00",a:"pm"},ito:18,enabled:true,createddate:1604316392,colorindex:3},{scheduleid:"f74eaaa0-8b6f-11ea-872f-5d9db458d22c",livereply:false,from:{hh:"12",mm:"00",a:"am"},ifrom:12,to:{hh:"12",mm:"00",a:"am"},ito:36,enabled:true,createddate:1588312359,colorindex:1}],_id:"deb785805f53d41fba62cd70de3759fc",_rev:"1-acad7892ffc13ab6fa6de8350ff11523"})};
//     it('adjust schedule save call', async () => {
//         console.log("adjust schedule save call");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .post('/companies/'+company_id+"/properties/"+property_id+"/adjustschedules/"+sc)
//         .send(adschdata)
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })


//     it('adjust schedule save call', async () => {
//         console.log("adjust schedule save call");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .post('/companies/'+company_id+"/properties/"+property_id+"/adjustschedules/"+sc)
//         .send(adschdata)
//         .set('Authorization', "Bearer " + token)
//         expect(res.statusCode).toEqual(200)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })



//     it('Get getnotifyusersettings call in schedule', async () => {
//         console.log("Get getnotifyusersettings call in schedule");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .get("/getnotifyusersettings/"+account_id+"/undefined")
//         .set('Authorization', "Bearer " + token)
//         if(res.statusCode == 200)
//         {
//             expect(res.statusCode).toEqual(200)
//         }
//         else
//         {
//             expect(res.statusCode).toEqual(500)
//         }
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })


//     it('Get userlist call in schedule', async () => {
//         console.log("Get userlist call in schedule");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .get("/companies/"+company_id+"/property/"+property_id+"/users/undefined/undefined/true")
//         .set('Authorization', "Bearer " + token)
//         if(res.statusCode == 200)
//         {
//             expect(res.statusCode).toEqual(200)
//         }
//         else
//         {
//             expect(res.statusCode).toEqual(500)
//         }
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })

// })

// /* *******  My Settings Module  ********* */

// describe('My Settings Test', () => {

//     var mysettingsdata1 = {payload: JSON.stringify({uid: uid, title:"Aparna Singh", timezone:"America/New_York", phonesettings: { settings:[{number:"0000000000",type:"Work"}]},smssettings: {settings:[]},emailsettings:{settings:[{email:email}]},pin:"45354",accountid:account_id,livereplysetting:[{number:"0000000000",livereplywait:30}],notificationrulessetting:[{type:"Phone",number:"0000000000",notificationwait:1}],handoffrulessettings:[],escalationsettings:[],member_image:""})};
//     test('Get My Settings data', async () => {
//         console.log("day schedule save call --- get");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .get("/getnotifyusersettings/"+account_id+"/"+uid)
//         .set('Authorization', "Bearer " + token)
//         if(res.statusCode == 200)
//         {
//             expect(res.statusCode).toEqual(200)
//         }
//         else
//         {
//             expect(res.statusCode).toEqual(500)
//         }
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     }, 30000)

//     it('Save My Settings data', async () => {
//         console.log("day schedule save call --- save");
//         // console.log("Token --- "+ token);
//         const res = await request(app)
//         .post("/getnotifyusersettings/"+account_id+"/"+uid)
//         .send(mysettingsdata1)
//         .set('Authorization', "Bearer " + token)
//         if(res.statusCode == 200)
//         {
//             expect(res.statusCode).toEqual(200)
//         }
//         else
//         {
//             expect(res.statusCode).toEqual(500)
//         }
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     })

//     // it('Save Email Notifications', async () => {
//     //     console.log("day schedule save call --- save");
//     //     // console.log("Token --- "+ token);
//     //     const res = await request(app)
//     //     .post("/updatenotifyuseremailsettings/"+account_id+"/"+uid)
//     //     .send({payload:JSON.stringify({})})
//     //     .set('Authorization', "Bearer " + token)
//     //     if(res.statusCode == 200)
//     //     {
//     //         expect(res.statusCode).toEqual(200)
//     //     }
//     //     else
//     //     {
//     //         expect(res.statusCode).toEqual(500)
//     //     }
//     //     // expect(res.body).toHaveProperty('data');
//     //     console.log(res.body);
//     // })

// });
// /* ******   Forgot Password    ****** */

// describe('Forgot Password Test', () => {
//     // test('Forgot Password data', async () => {
//     //     console.log("Forgot Password call");
//     //     // console.log("Token --- "+ token);
//     //     const res = await request(app)
//     //     .get("/forgotpassword/company/"+account_name+"/user/"+email)
//     //     expect(res.statusCode).toEqual(res.statusCode)
//     //     // expect(res.body).toHaveProperty('data');
//     //     console.log(res.body);
//     // }, 30000)


//     test('Reset Password data', async () => {
//         console.log("Reset Password call");
//         // console.log("Token --- "+ token);
//         const password = "Admin@123";
//         const res = await request(app)
//         .get("/savepassword/company/"+company_id+"/"+account_name+"/user/"+uid+"/"+password)
//         expect(res.statusCode).toEqual(res.statusCode)
//         // expect(res.body).toHaveProperty('data');
//         console.log(res.body);
//     }, 30000)
// });

// /* new user setup */

// describe('New User Setup', () => {

//     // test('set Password data for new user', async () => {
//     //     console.log("set Password data for new user");
//     //     // console.log("Token --- "+ token);
//     //     let setupaccountdata = {payload:{data:{username:"dimivi4636@sovixa.com",password:"T123456",accountname:"Property B"},creds:"a3c0c0427124cd81289efc68a44cac4f"}};
//     //     const res = await request(app)
//     //     .put("/changePassword")
//     //     .send(setupaccountdata)
//     //     expect(res.statusCode).toEqual(res.statusCode)
//     //     // expect(res.body).toHaveProperty('data');
//     //     console.log(res.body);
//     // }, 30000)

// });