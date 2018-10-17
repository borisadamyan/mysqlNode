const {
    selectByGenderOrderBy,
    selectByUsernameOrderBy,
    selectByNameGenderIdOrderBy,
    addNewUser,
    deleteUser,
    updateUser
} = require('../service/query');

function api (app) {

    app.get('/gender', (req, res) => {
        // selectByGenderOrderBy(req.query.gend, 'user_id', (result) => {
        //     res.json(result);
        // });
        selectByGenderOrderBy(req.query.gend, 'user_id').then(w => {
            // console.log(w);
            res.json(w);
        }).catch(err => console.error(err));
    });

    app.get('/search', (req, res) => {
        // selectByUsernameOrderBy(req.query.username, 'user_id', (result) => {
        //     res.json(result);
        // });
        selectByUsernameOrderBy(req.query.username, 'user_id').then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        })
    });

    app.get('/customFilter', (req, res) => {
        // console.log(req.query);
        // selectByNameGenderIdOrderBy(req.query.name, req.query.gender, req.query.id, 'user_id', (result) => {
        //     res.json(result);
        // });
        selectByNameGenderIdOrderBy(req.query.name, req.query.gender, req.query.id, 'user_id').then(result => {
            res.send(result)
        }).catch(err => {
            console.log(err);
        })
    });

    app.post('/newUser', (req, res) => {
        // addNewUser(req.body.username, req.body.first_name, req.body.last_name, req.body.gender, req.body.password, req.body.status, (result) => {
        //     res.json(result);
        // });
        addNewUser(req.body.username, req.body.first_name, req.body.last_name, req.body.gender, req.body.password, req.body.status)
            .then(result => {
                res.send(result);
            }).catch(err => {
            console.log(err);
        })
    });

    app.delete('/deleteUser', (req, res) => {
        // deleteUser(req.body.id, (result) => {
        //     res.json(result);
        // });
        deleteUser(req.body.id).then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
        })
    });

    app.put('/updateUser', (req, res) => {
        var username, first_name, last_name, password, gender, status, id;
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
        updateUser(username, first_name, last_name, gender, password, status, id).then(result => {
            res.send(result)
        }).catch(err => {
            console.log(err);
        })
    });
};

module.exports = api;
