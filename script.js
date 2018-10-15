const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, './public'); //
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(publicPath));


const connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'sampleDB'
});

// connection.connect((err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Connected');
//     }
//
// });

app.post('/gender', (req, res) => {
    console.log(req.body.gend);
    // console.log(res.body);
    connection.getConnection((err, tempCont) => {
        if (!!err) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Connected');
            if (req.body.gend === 'all') {
                var query = `SELECT * FROM user_details ORDER BY user_id`
            } else {
                var query = `SELECT * FROM user_details WHERE gender="${req.body.gend}" ORDER BY user_id`
            }
            tempCont.query(query, (err, rows, fields) => {
                tempCont.release();
                if (!!err) {
                    console.log('Error query');
                } else {
                    console.log('Successful query');
                    // console.log(rows);
                    // res.json(rows);
                    res.json(rows);
                }
            })
        }
    });
    // connection.query('SELECT * FROM mySampleTable', (err, rows, fields) => {
    //     if(!!err){
    //         console.log('Error query');
    //     } else {
    //         console.log('Successful query');
    //         console.log(rows);
    //         res.send(rows)
    //     }
    // })
});

app.post('/search', (req, res) => {
    connection.getConnection((err, tempCont) => {
        if (!!err) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Connected');
            if (req.body.username === '') {
                var query = `SELECT * FROM user_details ORDER BY user_id`
            } else {
                var query = `SELECT * FROM user_details WHERE username LIKE "%${req.body.username}%" ORDER BY user_id`
            }
            tempCont.query(query, (err, rows, fields) => {
                tempCont.release();
                if (!!err) {
                    console.log('Error query');
                } else {
                    console.log('Successful query');
                    // console.log(rows);
                    // res.json(rows);
                    res.json(rows);
                }
            })
        }
    });
});

app.post('/customFilter', (req, res) => {
    console.log(req.body);
    connection.getConnection((err, tempCont) => {
        if (!!err) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Connected');
            if (req.body.gender === 'all') {
                var query = `SELECT * FROM user_details WHERE first_name LIKE "%${req.body.name}%" AND user_id >=${req.body.id} ORDER BY user_id`;
            } else {
                var query = `SELECT * FROM user_details WHERE first_name LIKE "%${req.body.name}%" AND user_id >=${req.body.id} AND gender="${req.body.gender}" ORDER BY user_id`;
            }

            tempCont.query(query, (err, rows, fields) => {
                tempCont.release();
                if (!!err) {
                    console.log('Error query');
                } else {
                    console.log('Successful query');
                    // console.log(rows);
                    // res.json(rows);
                    res.json(rows);
                }
            })
        }
    });
});

app.post('/newUser', (req, res) => {
    "use strict";
    connection.getConnection((err, content) => {
        if (!!err) {
            content.release();
            console.log(err);
        } else {
            console.log('Connect');
            console.log(req.body);
            var query = `INSERT INTO user_details (username, first_name, last_name, gender, password, status)
            VALUES ('${req.body.username}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.gender}', '${req.body.password}', '${req.body.status}');`;
            content.query(query, (err, rows, fields) => {
                content.release();
                if(!!err){
                    console.log(err);
                }else{
                    res.json(rows);
                }
            })
        }
    });
});

app.post('/deleteUser', (req, res) => {
    "use strict";
    connection.getConnection((err, content) => {
        if (!!err) {
            content.release();
            console.log(err);
        } else {
            console.log('Connect');
            console.log(req.body);
            var query = `DELETE FROM user_details WHERE user_id = '${req.body.id}'`;
                content.query(query, (err, rows, fields) => {
                content.release();
                if(!!err){
                    console.log(err);
                }else{
                    res.json(rows);
                }
            })
        }
    });
});

app.post('/updateUser', (req, res) => {
    var username, first_name, last_name, password, gender, status, id;
    connection.getConnection((err, content) => {
        if (!!err) {
            content.release();
            console.log(err);
        } else {
            console.log('Connect');
            // console.log(req.body);

            req.body.filter(uName => {
                // console.log(uName.key);
                id = uName.id;
                if(uName.key === 'username'){
                    username = uName.value;
                }else if(uName.key === 'first_name'){
                    first_name = uName.value;
                } else if(uName.key === 'last_name'){
                    last_name = uName.value;
                }else if(uName.key === 'password'){
                    password = uName.value;
                }else if(uName.key === 'addGender'){
                    gender = uName.value;
                }else if(uName.key === 'addStatus'){
                    status = uName.value;
                }
            });
            console.log(username);
            var query = `UPDATE user_details SET username = '${username}', first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', password='${password}', status = '${status}' WHERE user_id = '${id}'`;
            content.query(query, (err, rows, fields) => {
                content.release();
                if(!!err){
                    console.log(err);
                }else{
                    res.json(rows);
                }
            })
        }
    });
});

app.listen(1337);