
$(document).ready(function () {

    /*EVENTS*/
    $('#gender').on('change', function (data) {
        console.log(data.target.value);
        if(data.target.value !== 'all') {
            $('#searchUsername').attr('disabled', 'disabled')
        }else{
            $('#searchUsername').removeAttr('disabled')
        }
        getDataByGender(data.target.value);
    });
    $('#searchUsername').on('keyup', function (data) {
        console.log(data.target.value);
        if(data.target.value.length !== 0) {
            $('#gender').attr('disabled', 'disabled')
        }else{
            $('#gender').removeAttr('disabled')
        }
        if(data.target.value.length >= 3 || data.target.value.length === 0) {
            getDataBySearchUsername(data.target.value)
        }
    });
    $('form#search').on('submit', function (form) {
        form.preventDefault();

        const formData = new FormData(form.target);
        // console.log($('form').serialize());
        const gender = formData.get('gender');
        const id = formData.get('id');
        const name = formData.get('name');
        const searchData = {
            gender,
            name,
            id
        };
         customSearch(searchData)
    });
    $('form#add').on('submit', function (form) {
       form.preventDefault();
        const formData = new FormData(form.target);
        // console.log($('form#add').serialize());
        const gender = formData.get('addGender');
        const status = formData.get('addStatus');
        const first_name = formData.get('first_name');
        const last_name = formData.get('last_name');
        const username = formData.get('username');
        const password = formData.get('password');
        const addData = {
            password,
            username,
            last_name,
            first_name,
            status,
            gender
        };
         addNewUser(addData);

    });
    $(document).on('click', '#deleteUserbtn',  function (event) {
        // console.log(event);
        var row = event.target.parentNode.parentNode;
        var id = row.getElementsByClassName('idPart')[0].getAttribute('id');
        // console.log(id);
        var deleteData = {
            id
        };
        if(confirm('Are you want to delete User?')){
            deleteUser(deleteData);
            event.target.parentNode.parentNode.remove();
        } else {
            return false;
        }
    });
    $(document).on('click', '#editUser', function (event) {
        // event.preventDefault();
        var row = event.target.parentNode.parentNode;
        // console.log(row);
        // console.log(row.querySelectorAll('input'));
        row.querySelectorAll('input').forEach(one => {
            "use strict";
            one.removeAttribute('readonly');
            one.classList.remove('readonly');
        });
        // event.target.nextSibling.style.display = 'block';
        event.target.style.display = 'none';
        event.target.nextElementSibling.style.display = 'inline-block';
        event.target.nextElementSibling.nextElementSibling.style.display = 'inline-block';
    });
    $(document).on('click', '#confirmUser', function (event) {
        // event.preventDefault();
        var row = event.target.parentNode.parentNode;
        console.log(row);
        console.log(row.querySelectorAll('input'));
        row.querySelectorAll('input').forEach(one => {

            one.setAttribute('readonly', 'readonly');
            one.classList.add('readonly');
        });
        // event.target.nextSibling.style.display = 'block';
        event.target.style.display = 'none';
        event.target.nextElementSibling.style.display = 'none';
        event.target.previousElementSibling.style.display = 'inline-block';
        var rowId = event.target.parentNode.parentNode;
        var id = rowId.getElementsByClassName('idPart')[0].getAttribute('id');
        console.log(row);
        const updateData = [];
        row.querySelectorAll('input').forEach(one => {
            console.log(one.value);
            updateData.push({
                key: one.name,
                value: one.value
            })
        });
        updateData.push({id});
        console.log(updateData);
        // const updateData = {
        //     id,
        //     password,
        //     username,
        //     last_name,
        //     first_name,
        //     status,
        //     gender
        // };
        updateUser(updateData)
    });
    $(document).on('click', '#cancel', function (event) {
        // event.preventDefault();
        var row = event.target.parentNode.parentNode;
        // console.log(row);
        // console.log(row.querySelectorAll('input'));
        row.querySelectorAll('input').forEach(one => {

            one.setAttribute('readonly', 'readonly');
            one.classList.add('readonly');
        });
        // event.target.nextSibling.style.display = 'block';
        event.target.style.display = 'none';
        event.target.previousElementSibling.style.display = 'none';
        event.target.previousElementSibling.previousElementSibling.style.display = 'inline-block';
    });

    /*REQUESTS*/
    function getDataBySearchUsername(username) {
        const data = { username: username};
        $.ajax({
            url: "/search",
            type:'get',
            data: data,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                table(response)
            },
            error: function(xhr) {
            }
        });
    }
    function getDataByGender(gender){
        const data = { gend: gender};
        $.ajax({
            url: "/gender",
            type:'get',
            data: data,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                table(response)
            },
            error: function(xhr) {
            }
        });
    }
    function customSearch(datas) {
        $.ajax({
            url: "/customFilter",
            type:'get',
            data: datas,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                table(response)
            },
            error: function(xhr) {
            }
        });
    }
    function addNewUser(data) {
        const http = new XMLHttpRequest();
        http.open('POST', '/newUser');
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log("New User Added");
                $('form#add')[0].reset();
                $('#userAdded').show();
                setTimeout(() => {
                    "use strict";
                    $('#userAdded').hide();
                },2500);
                 var id = JSON.parse(http.responseText);
                // console.log(id.insertId);
                const searchData = {
                    id: id.insertId,
                    gender: 'all',
                    name: ''
                };
                customSearch(searchData);
                //console.log(JSON.parse(http.responseText.insertId));
            }
        };
    }
    function deleteUser(data) {
        const http = new XMLHttpRequest();
        http.open('DELETE', '/deleteUser');
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log("User Deleted");
               // $('form#add')[0].reset();
                $('#userDeleted').show();
                setTimeout(() => {
                    "use strict";
                    $('#userDeleted').hide();
                },2500);
            }
        };
    }
    function updateUser(data) {
        const http = new XMLHttpRequest();
        http.open('PUT', '/updateUser');
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log("User Updated");
                // $('form#add')[0].reset();
                $('#userUpdated').show();
                setTimeout(() => {
                    $('#userUpdated').hide();
                },2500);

                var id = JSON.parse(http.responseText);
                // console.log(id.insertId);
                // const searchData = {
                //     id: id.insertId,
                //     gender: 'all',
                //     name: ''
                // };
                // customSearch(searchData);
                //console.log(JSON.parse(http.responseText.insertId));
            }
        };
    }


    /*TABLE CREATING*/
    function table(dataSet) {
        $('table').remove();
        let table = $('<table style="width: 90%; margin: 20px auto;"></table>');
        dataSet.forEach(tr => {
            // console.log(tr);
            let row = $('<tr></tr>');
            let cell = $(`
                          <td class="idPart" id="${tr.user_id}">${tr.user_id}</td>
                          <td> <input readonly style="text-align: center" type="text" name="first_name" value="${tr.first_name}" class="readonly"></td>
                          <td> <input readonly style="text-align: center" type="text" name="last_name" value="${tr.last_name}" class="readonly"></td>
                          <td> <input readonly style="text-align: center" type="text"  name="username" value="${tr.username}" class="readonly"></td>
                          <td> <input readonly style="width: 220px; text-align: center" name="password" type="text" value="${tr.password}" class="readonly"></td>
                          <td> <input readonly style="width: 50px; text-align: center"  name="addGender" type="text" value="${tr.gender}" class="readonly"></td>
                          <td> <input readonly style="width: 20px; text-align: center" name="addStatus" type="text" value="${tr.status}" class="readonly"></td>
                        
                        <td>
                        <button id="editUser">Edit</button>
                        <button style="display: none" id="confirmUser">Save</button>
                        <button style="display: none" id="cancel">Cancel</button>
                        <button id="deleteUserbtn">Delete</button>
                        </td>
                     `);
            row.append(cell);
            table.append(row);

        });
        table.append(`<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>password</th><th>Gender</th><th>Status</th><th>Actions</th></tr></thead>`);
        $('#table').append(table);
    }
});
