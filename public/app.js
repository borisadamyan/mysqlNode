
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
    $('form').on('submit', function (form) {
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
    function table(dataset) {
        $('table').remove();
        var table = $('<table style="width: 90%; margin: 20px auto;"></table>');
        dataset.forEach(tr => {
            // console.log(tr);
            var row = $('<tr></tr>');
            var cell = $(`<td>${tr.user_id}</td><td>${tr.first_name}</td><td>${tr.last_name}</td><td>${tr.username}</td><td>${tr.password}</td><td>${tr.gender}</td><td>${tr.status}</td>`);
            row.append(cell);
            table.append(row);

        });
        table.append(`<thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>password</th><th>Gender</th><th>Status</th></tr></thead>`);
        $('#table').append(table);
    }
});
