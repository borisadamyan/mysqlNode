const connection = require('../connection/connect');

// CALLBACK

// const selectByGenderOrderBy = (gender, order, callback) => {
//     connection.getConnection((err, tempCont) => {
//         if (!!err) {
//             tempCont.release();
//             console.log('Error');
//         } else {
//             console.log('Connected');
//             if (gender === 'all') {
//                 var query = `SELECT * FROM user_details ORDER BY ${order}`;
//             } else {
//                 var query = `SELECT * FROM user_details WHERE gender="${gender}" ORDER BY ${order}`
//             }
//             tempCont.query(query, (err, rows, fields) => {
//                 tempCont.release();
//                 if (!!err) {
//                     console.log('Error query');
//                 } else {
//                     console.log('Successful query');
//                     // res.json(rows);
//                     callback(rows);
//                 }
//             })
//         }
//     });
// };

// const selectByUsernameOrderBy = (username, order, callback) => {
//     connection.getConnection((err, tempCont) => {
//         if (!!err) {
//             tempCont.release();
//             console.log('Error');
//         } else {
//             console.log('Connected');
//             if (username === '') {
//                 var query = `SELECT * FROM user_details ORDER BY ${order}`;
//             } else {
//                 var query = `SELECT * FROM user_details WHERE username LIKE "%${username}%" ORDER BY ${order}`;
//             }
//             tempCont.query(query, (err, rows, fields) => {
//                 tempCont.release();
//                 if (!!err) {
//                     console.log('Error query');
//                 } else {
//                     console.log('Successful query');
//                     // console.log(rows);
//                     // res.json(rows);
//                     callback(rows);
//                 }
//             })
//         }
//     });
// };

// const selectByNameGenderIdOrderBy = (name, gender, id, order, callback) => {
//     connection.getConnection((err, tempCont) => {
//         if (!!err) {
//             tempCont.release();
//             console.log('Error');
//         } else {
//             console.log('Connected');
//             if (gender === 'all') {
//                 var query = `SELECT * FROM user_details WHERE first_name LIKE "%${name}%" AND user_id >=${id} ORDER BY ${order}`;
//             } else {
//                 var query = `SELECT * FROM user_details WHERE first_name LIKE "%${name}%" AND user_id >=${id} AND gender="${gender}" ORDER BY ${order}`
//             }
//             tempCont.query(query, (err, rows, fields) => {
//                 tempCont.release();
//                 if (!!err) {
//                     console.log('Error query');
//                 } else {
//                     console.log('Successful query');
//                     // console.log(rows);
//                     // res.json(rows);
//                     callback(rows);
//                 }
//             })
//         }
//     });
// };

// PROMISE

selectByGenderOrderBy = (gender, order) => {
    return new Promise((accept, reject) => {
        connection.getConnection((err, tempCont) => {
            if (!!err) {
                tempCont.release();
                console.log('Error');
            } else {
                console.log('Connected');
                if (gender === 'all') {
                    var query = `SELECT * FROM user_details ORDER BY ${order}`;
                } else {
                    var query = `SELECT * FROM user_details WHERE gender="${gender}" ORDER BY ${order}`
                }
                tempCont.query(query, (err, rows, fields) => {
                    tempCont.release();
                    if (!!err) {
                        console.log('Error query');
                    } else {
                        console.log('Successful query');
                        accept(rows);
                    }
                })
            }
        });
    });
};

selectByUsernameOrderBy = (username, order) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, tempCont) => {
            if (!!err) {
                tempCont.release();
                console.log('Error');
            } else {
                console.log('Connected');
                if (username === '') {
                    var query = `SELECT * FROM user_details ORDER BY ${order}`;
                } else {
                    var query = `SELECT * FROM user_details WHERE username LIKE "%${username}%" ORDER BY ${order}`;
                }
                tempCont.query(query, (err, rows, fields) => {
                    tempCont.release();
                    if (!!err) {
                        console.log('Error query');
                    } else {
                        console.log('Successful query');
                        // console.log(rows);
                        // res.json(rows);
                        resolve(rows);
                    }
                })
            }
        });
    })
};

selectByNameGenderIdOrderBy = (name, gender, id, order) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, tempCont) => {
            if (!!err) {
                tempCont.release();
                console.log('Error');
            } else {
                console.log('Connected');
                if (gender === 'all') {
                    var query = `SELECT * FROM user_details WHERE first_name LIKE "%${name}%" AND user_id >=${id} ORDER BY ${order}`;
                } else {
                    var query = `SELECT * FROM user_details WHERE first_name LIKE "%${name}%" AND user_id >=${id} AND gender="${gender}" ORDER BY ${order}`
                }
                tempCont.query(query, (err, rows, fields) => {
                    tempCont.release();
                    if (!!err) {
                        console.log('Error query');
                    } else {
                        console.log('Successful query');
                        // console.log(rows);
                        // res.json(rows);
                        resolve(rows);
                    }
                })
            }
        });
    });
};

addNewUser = (username ,first_name, last_name, gender, password, status) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, content) => {
            if (!!err) {
                content.release();
                console.log(err);
            } else {
                console.log('Connect');
                // console.log(req.body);
                var query = `INSERT INTO user_details (username, first_name, last_name, gender, password, status)
            VALUES ('${username}', '${first_name}', '${last_name}', '${gender}', '${password}', '${status}')`;
                content.query(query, (err, rows, fields) => {
                    content.release();
                    if(!!err){
                        console.log(err);
                        reject(err)
                    }else{
                        resolve(rows);
                    }
                })
            }
        });
    })
};

deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, content) => {
            if (!!err) {
                content.release();
                console.log(err);
            } else {
                console.log('Connect');
                var query = `DELETE FROM user_details WHERE user_id = '${id}'`;
                content.query(query, (err, rows, fields) => {
                    content.release();
                    if(!!err){
                        console.log(err);
                        reject(err)
                    }else{
                        resolve(rows);
                    }
                })
            }
        });
    })
};

updateUser = (username ,first_name, last_name, gender, password, status, id) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, content) => {
            if (!!err) {
                content.release();
                console.log(err);
            } else {
                console.log('Connect');
                // console.log(req.body);
                console.log(username);
                var query = `UPDATE user_details SET username = '${username}', first_name = '${first_name}', last_name = '${last_name}', gender = '${gender}', password='${password}', status = '${status}' WHERE user_id = '${id}'`;
                content.query(query, (err, rows, fields) => {
                    content.release();
                    if(!!err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                })
            }
        });
    })
};

module.exports = {
    selectByGenderOrderBy,
    selectByUsernameOrderBy,
    selectByNameGenderIdOrderBy,
    addNewUser,
    deleteUser,
    updateUser,
};