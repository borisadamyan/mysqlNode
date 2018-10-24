const {
    selectByGenderOrderBy,
    selectByUsernameOrderBy,
    selectByNameGenderIdOrderBy,
    addNewUser,
    deleteUser,
    updateUser
} = require('../service/query');
const Joi = require('joi');

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
        const customFilter = async() => {
            try {
                const result = await selectByNameGenderIdOrderBy(req.query.name, req.query.gender, req.query.id, 'user_id');
                res.send(result);
            } catch (err) {
                console.log(err);
            }
        }
        customFilter();
    });

    app.post('/newUser', (req, res) => {
        // addNewUser(req.body.username, req.body.first_name, req.body.last_name, req.body.gender, req.body.password, req.body.status, (result) => {
        //     res.json(result);
        // });
        const schema = {
            username: Joi.string().min(3).required(),
            first_name: Joi.string().min(3).required(),
            last_name: Joi.string().min(3).required(),
            password: Joi.string().min(3).required(),
            gender: Joi.required(),
            status: Joi.required(),
        };
        const result = Joi.validate(req.body, schema);

        // console.log(result);

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
        // updateUser(username, first_name, last_name, gender, password, status, id).then(result => {
        //     res.send(result)
        // }).catch(err => {
        //     console.log(err);
        // })
        const updating = async() => {
          try{
              const result = await updateUser(username, first_name, last_name, gender, password, status, id);
              res.send(result)
          } catch (err) {
              console.log(err);
          }
        };
        updating();
    });
};

module.exports = api;
