const {
    selectByGenderOrderBy,
    selectByUsernameOrderBy,
    selectByNameGenderIdOrderBy,
    addNewUser,
    deleteUser,
    updateUser
} = require('../service/query');
const Joi = require('joi');
const {newUserVal, customSearchVal, updateUserVal} = require('../validation/validation');

 function api (app) {

    app.get('/gender', (req, res) => {
        // selectByGenderOrderBy(req.query.gend, 'user_id', (result) => {
        //     res.json(result);
        // });
       const gender = async () => {
            try {
                const result = await selectByGenderOrderBy(req.query.gend, 'user_id');
                res.send(result);
            } catch (err) {
                console.log(err)
            }
        };
        gender();


        // selectByGenderOrderBy(req.query.gend, 'user_id')
        //     .then(w => {
        //         // console.log(w);
        //         res.json(w);
        //     })
        //     .catch(err => console.error(err));
    });

    app.get('/search', (req, res) => {
        // selectByUsernameOrderBy(req.query.username, 'user_id', (result) => {
        //     res.json(result);
        // });
        const search = async () => {
          try {
              const result = await selectByUsernameOrderBy(req.query.username, 'user_id');
              res.json(result);
          } catch (err) {
              console.log(err);
          }
        };
        search();
    });

    app.get('/customFilter', (req, res) => {
        // console.log(req.query);
        // selectByNameGenderIdOrderBy(req.query.name, req.query.gender, req.query.id, 'user_id', (result) => {
        //     res.json(result);
        // });

        // selectByNameGenderIdOrderBy(req.query.name, req.query.gender, req.query.id, 'user_id').then(result => {
        //     res.send(result)
        // }).catch(err => {
        //     console.log(err);
        // })
        const result = Joi.validate(req.query, customSearchVal);
        const customFilter = async() => {
            try {
                const result = await selectByNameGenderIdOrderBy(req.query.name, req.query.gender, req.query.id, 'user_id');
                res.send(result);
            } catch (err) {
                console.log(err);
            }
        };
        if(result.error){
            res.status(404).send(result.error.details[0].message);
        } else{
            customFilter();
        }
    });

    app.post('/newUser', (req, res) => {

        const result = Joi.validate(req.body, newUserVal);

        const newUser = async() => {
          try {
              const result = await addNewUser(req.body.username, req.body.first_name, req.body.last_name, req.body.gender, req.body.password, req.body.status);
              res.send(result);
          } catch (err) {
              console.log(err);
          }
        };
        if(result.error){
            res.status(404).send(result.error.details[0].message)
        }else{
             newUser();
        }
    });

    app.delete('/deleteUser', (req, res) => {
        // deleteUser(req.body.id, (result) => {
        //     res.json(result);
        // });
        // deleteUser(req.body.id).then(result => {
        //     res.send(result);
        // }).catch(err => {
        //     console.log(err);
        // })
        const deleteing = async() => {
            try {
                const result = await deleteUser(req.body.id);
                res.send(result);
            } catch (err) {
                console.log(err);
            }
        };
        deleteing();
    });

    app.put('/updateUser', (req, res) => {
        var username, first_name, last_name, password, gender, status, id;
        const data = {};
        req.body.filter(uName => {
            // console.log(uName.key);
            id = uName.id;
            data.id = id;
            if(uName.key === 'username'){
                username = uName.value;
                data.username = username;
            }else if(uName.key === 'first_name'){
                first_name = uName.value;
                data.first_name = first_name
            } else if(uName.key === 'last_name'){
                last_name = uName.value;
                data.last_name = last_name
            }else if(uName.key === 'password'){
                password = uName.value;
                data.password = password
            }else if(uName.key === 'addGender'){
                gender = uName.value;
                data.gender = gender
            }else if(uName.key === 'addStatus'){
                status = uName.value;
                data.status = status
            }
        });
        // updateUser(username, first_name, last_name, gender, password, status, id).then(result => {
        //     res.send(result)
        // }).catch(err => {
        //     console.log(err);
        // })
        // console.log(data);

        const result = Joi.validate(data, updateUserVal);
         console.log(result);
        const updating = async() => {
          try{
              const result = await updateUser(username, first_name, last_name, gender, password, status, id);
              res.send(result)
          } catch (err) {
              console.log(err);
          }
        };
        if(result.error){
            res.status(404).send(result.error.details[0].message)
        }else{
            updating();
        }

    });
};

module.exports = api;
