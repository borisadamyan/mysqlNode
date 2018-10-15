
$(document).ready(function () {

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
        console.log($('form#add').serialize());
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
        console.log(event);
        var row = event.target.parentNode.parentNode;
        var id = row.getElementsByClassName('idPart')[0].getAttribute('id');
        console.log(id);
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
    // $('#editUser').on('click', function (event) {
    //     // event.preventDefault();
    //     console.log(event.target);
    // });

    function getDataBySearchUsername(username) {
        var data = { username: username};
        var http = new XMLHttpRequest();
        http.open('POST', '/search');
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                console.log(JSON.parse(http.responseText));
                table(data);
            }
        };
    }
    function getDataByGender(gender){
        var data = { gend: gender};
        var http = new XMLHttpRequest();
        http.open('POST', '/data');
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                console.log(JSON.parse(http.responseText));
                table(data);
            }
        };
    }
    function customSearch(data) {
        var http = new XMLHttpRequest();
        http.open('POST', '/customFilter');
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(http.responseText);
                console.log(JSON.parse(http.responseText));
                table(data);
            }
        };
    }
    function addNewUser(data) {
        var http = new XMLHttpRequest();
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
                console.log(id.insertId);
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
        var http = new XMLHttpRequest();
        http.open('POST', '/deleteUser');
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

                 var id = JSON.parse(http.responseText);
                console.log(id.insertId);
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
    function table(dataset) {
        $('table').remove();
        var table = $('<table style="width: 90%; margin: 20px auto;"></table>');
        dataset.forEach(tr => {
            // console.log(tr);
            var row = $('<tr></tr>');
            var cell = $(`<td class="idPart" id="${tr.user_id}">${tr.user_id}</td><td>${tr.first_name}</td><td>${tr.last_name}</td><td>${tr.username}</td><td>${tr.password}</td><td>${tr.gender}</td><td>${tr.status}</td>
                        <td>
                        <button id="editUser">Edit</button>
                        <button id="deleteUserbtn">Delete</button>
                        </td>`);
            row.append(cell);
            table.append(row);

        });
        table.append(`<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>password</th><th>Gender</th><th>Status</th><th>Actions</th></tr></thead>`);
        $('#table').append(table);
    }
});
