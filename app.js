

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req,res) =>{
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req,res) =>{
let firstName = req.body.fName;
let lastName = req.body.lName;
let emailData = req.body.email;
let data = {
  members : [
    {
    email_address: emailData,
    status: 'subscribed',
    merge_fields:{
      FNAME: firstName,
      LNAME: lastName
    }
  }
  ]
};
let jsonData = JSON.stringify(data);
let options ={
  url: 'https://us'YOUR_SERVER_CODE_HERE'.api.mailchimp.com/3.0/lists/'YOUR_AUDIENCE_ID'',
  method: 'POST',
headers:{
  'Authorization': 'ANY_NAME YOUR_MAILCHIMP_APIKEY'
},
body: jsonData
}
request(options, (error, response, body) =>{
   if(error){
        res.sendFile(__dirname + '/failure.html');
   } else if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
   }else{
     res.sendFile(__dirname + '/failure.html');
   }
})
});

//route failure
app.post('/failure', (req,res) =>{
  res.redirect('/');
});
//setup server to listen port
app.listen(port, ()=>{
  console.log(`server is running on ${port}`);
})
