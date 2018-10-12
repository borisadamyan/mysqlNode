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

app.post('/data', (req, res) => {
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
            if(req.body.gender === 'all'){
                var query = `SELECT * FROM user_details WHERE first_name LIKE "%${req.body.name}%" AND user_id >=${req.body.id} ORDER BY user_id`;
            }else {
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


app.listen(1337);