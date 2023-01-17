const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('Public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post('/', (req,res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = ' https://us21.api.mailchimp.com/3.0/lists/4460a2a4e5';
    const options ={
        method: 'POST',
        auth: 'tonio:ef5a33138b926778df7e9e5909bcfdd3-us21'
    };
    const request=https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname+'/Success.html');
        }
        else{
            res.sendFile(__dirname+'/Failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post('/failure', (req,res){
    res.redirect('/');
})


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running on port 3000");
});


//129fcd1149f69e02a6835715fdb320d0-us21
// 4460a2a4e5