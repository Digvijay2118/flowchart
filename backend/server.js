const express = require('express')
const cors = require("cors")
const mysql = require("mysql2")
const bodyparser = require("body-parser");
const bodyParser = require('body-parser');
const router = require('./src/routers/flowchart.router')


const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("localhost connected")
});

app.use('/api/v1/flowchart',router)

app.listen(PORT,()=>{
    console.log(`sever is running on ${PORT}`);
});