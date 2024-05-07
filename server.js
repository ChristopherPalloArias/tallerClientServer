const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'https://urchin-app-4llz3.ondigitalocean.app',
    methods: ['GET', 'POST'],
    credentials: true,
  };
  app.use(cors(corsOptions));
  
  const server = http.createServer(app);
  const io = socketIO(server);

const db = mysql.createConnection({
    host: 'mysql-christopherobin.alwaysdata.net',
    user: '358042_admin',
    password: 'YqUZn6T6AxLYc5k',
    database: 'christopherobin_practiceclientserver'
});

io.on('connection', socket => {
    console.log('User connected: ' + socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json('Error');
        if (data.length > 0) {
            return res.json('Login Successfully');
        } else {
            return res.json('Login Failed');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Server is running.....');
});

server.listen(8081, () => {
    console.log('Listening..');
});
