const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http,{
    cors:{
        origin: "*"
    }
});
app.use(express.json());

const db = mysql.createConnection({
    host: "mysql-christopherobin.alwaysdata.net",
    user: "358042_admin",
    password: "YqUZn6T6AxLYc5k",
    database: "christopherobin_practiceclientserver"
})

app.post('/login', (req, res) =>{
    const sql = "SELECT * FROM usuarios WHERE username = ? AND password =?";

    db.query(sql, [req.body.email, req.body.password], (err, data) =>{
        if(err) return res.json("Error");
        if(data.length > 0){ 
           return res.json("Login Successfully")
        } else {
            return res.json("Login Failed")
        }
    })
})

app.get('/', (req, res) => {
    res.send('Server is running.....');
});

http.listen(8081, function (){
    console.log("Listening..");
    socketIO.on("Connection", function (socket){
        console.log("User connected:"+socket.id); 
    })
});
