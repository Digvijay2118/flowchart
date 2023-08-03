const mysql = require("mysql2");


const connection = mysql.createConnection({
    host:"localhost",
      user:"root",
    database:"flowchart",
    password:"123456"
});

connection.connect((err)=>{
    if(err){
        console.log("there is error in connection",err.stack)
        return;
    }
    console.log("connected to mysql",)
});

module.exports = connection;