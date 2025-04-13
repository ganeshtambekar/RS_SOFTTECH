require("dotenv").config();

const app = require('express')();
const cors=require('cors');
var http = require('http').Server(app);

const paymentRoute = require('./routes/paymentRoute');

app.use('/',paymentRoute);
app.use(cors());
const PORT=6000;
http.listen(PORT, function(){
    console.log(`Server is running on ${PORT}`);
});