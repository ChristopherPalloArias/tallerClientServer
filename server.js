const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(8081, () =>{
    console.log("Listening..")
})
