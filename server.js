const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const db = mysql.createConnection({
    host: "DB_HOST",
    user: "DB_USER",
    password: "DB_PASS",
    database: "DB_NAME"
});

wss.on('connection', function connection(ws) {
    console.log('WebSocket connected');

    ws.on('message', function incoming(message) {
        console.log('Received message:', message);
    });

    ws.send('Hello, WebSocket client!');
});

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

server.listen(443, () =>{
    console.log("Listening..")
});
