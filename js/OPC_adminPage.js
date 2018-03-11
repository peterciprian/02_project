function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas[0].users);
    /*
      ITT HÍVD MEG! 
    */
    let invoke = document.querySelector('.opc');
    invoke.addEventListener("click", createHTML());


    let bf = document.querySelector('#bf1990');
    bf.addEventListener('click', function () {
        bf1990(userDatas[0].users);
    });

    let old = document.querySelector('#oldests')
    old.addEventListener('click', function () {
        oldests(userDatas[0].users);
    });
    let nev = document.querySelector('#nevek');
    nev.addEventListener('click', function () {
        nevek(userDatas[0].users);
    });
    let varos = document.querySelector('#varosok');
    varos.addEventListener('click', function () {
        varosok(userDatas[0].users);
    });
    let nbp = document.querySelector('#nbp2000');
    nbp.addEventListener('click', function () {
        nbp2000(userDatas[0].users);
    });
    let sta = document.querySelector('#stat');
    sta.addEventListener('click', function () {
        stat(userDatas[0].users);
    });
}
//////////////////////////////////////////////////////////////////////////////////
getData('/js/users.json', successAjax);

function createHTML() {
    let container = document.createElement('div');
    container.className = 'container';

    let row = document.createElement('div');
    row.className = 'row';

    let column = document.createElement('div');
    column.className = 'col-xs-8 col-offset-2';

    let statField = document.createElement('div');
    statField.className = 'stat-field'
    statField.style.display = "none";

    //column.appendChild(btnGroup);
    column.appendChild(statField);
    row.appendChild(column);
    container.appendChild(row);
    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;

    document.querySelector('.modal-body').innerHTML = '';
    document.querySelector('.modal-body').appendChild(container);


    createAdmin();
}

function createAdmin() {
    let btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.innerHTML = `<button id="stat" class="btn btn-info">Statisztika</button>
    <button id="bf1990" class="btn btn-success">1990 előttiek</button>
    <button id="oldests" class="btn btn-success">A 3 legidősebb</button>
    <button id="nevek" class="btn btn-success">Szűrt nevek</button>
    <button id="varosok" class="btn btn-success">Városok</button>
    <button id="nbp2000" class="btn btn-success">2000 előttiek</button>`;

    document.querySelector('.stat-field').innerHTML = `<div class="panel-heading">User adatok</div>
    <div class="panel-body"></div>`;

    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;

    document.querySelector('.modal-header').appendChild(btnGroup);
}

function createLogin() {


    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;


}


//////////////////////////////////////////////////////////
function gererateHeaders(headerData) {
    let thead = document.createElement('thead')
    let tr = document.createElement('tr');
    let keys;
    for (i in headerData[0]) {
        let th = document.createElement('th');
        th.textContent = i;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function createTable(taplalek) {
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    table.classList.add('table', 'table-bordered', 'table-hover');
    //table.style.width = '100%';
    table.appendChild(gererateHeaders(taplalek));
    for (i in taplalek) {
        let tr = document.createElement('tr');
        for (j in taplalek[i]) {
            let td = document.createElement('td');
            let element = taplalek[i][j];
            if (element) {
                td.textContent = element;
            } else {
                td.textContent = '';
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.querySelector('.panel-body').style.overflowX = 'auto';
    document.querySelector('.panel-body').appendChild(table);
}

function stat(taplalek) {


    let eredmeny = taplalek
    let statField = document.createElement('span');
    statField.innerText = `
    A legidősebb: ${old(taplalek)}
    A legfiatalabb: ${young(taplalek)}
    ${ageStats(taplalek)}`;

    document.body.querySelector('.panel-body').innerHTML = '';
    createTable(eredmeny);
    document.querySelector('.panel-body').appendChild(statField);

}

function old(arr) {
    var min = arr[0].birthdate;
    var result = '';
    for (i = 0; i < arr.length; i++) {
        if (arr[i].birthdate > '0002. 01. 01' && arr[i].birthdate < min) {
            min = arr[i].birthdate;
            var date = new Date(arr[i].birthdate);
            result = arr[i].username + ' ' + date.getFullYear() + '. ' + (date.getMonth() + 1) + '. ' + date.getDay() + '.';
        }
    }
    return result;
}

function young(arr) {
    var youngest = arr[0].birthdate;
    var result = '';
    for (i = 0; i < arr.length; i++) {
        if (arr[i].birthdate > '0002. 01. 01' && arr[i].birthdate > youngest) {
            youngest = arr[i].birthdate;
            var date = new Date(arr[i].birthdate);
            result = arr[i].username + ' ' + date.getFullYear() + '. ' + (date.getMonth() + 1) + '. ' + date.getDay() + '.';
        }
    }
    return result;
}

function ageStats(arr) {
    var currentDate = new Date();
    var sum = 0;

    for (i = 0; i < arr.length; i++) {
        sum += (Math.floor((currentDate - new Date(arr[i].birthdate)) / 31536000000));
    }
    var avg = (sum / arr.length).toFixed(2);
    eredmeny = `Eletkorok osszege: ${sum} év, 
    életkorok átlaga: ${avg} év`;
    return eredmeny;
}

function bf1990(taplalek) {
    let eredmeny = [];
    for (let i in taplalek) {
        if (parseInt(taplalek[i].birthdate.substring(0, 4)) < 1990) {
            let user = {};
            user.username = taplalek[i].username;
            eredmeny.push(user);
        }
    }
    document.body.querySelector('.panel-body').innerHTML = '';
    createTable(eredmeny);
}

function oldests(taplalek) {
    let arr = [];
    for (let i in taplalek) {
        let user = {};
        user.firstname = taplalek[i].firstname;
        user.lastname = taplalek[i].lastname;
        user.birthdate = taplalek[i].birthdate;
        arr.push(user);
    }
    arr.sort((a, b) => (a.birthdate < b.birthdate) ? -1 : 1);
    let eredmeny = arr.slice(0, 3);

    document.body.querySelector('.panel-body').innerHTML = '';
    createTable(eredmeny);
}

function nevek(taplalek) {
    let arr = [];
    for (let i in taplalek) {
        let user = {};
        if (parseInt(taplalek[i].birthdate.substring(0, 4)) > 1900 && parseInt(taplalek[i].birthdate.substring(0, 4)) < 2000 && taplalek[i].city == 'Budapest' && taplalek[i].sex == 'férfi' && taplalek[i].country != '') {
            user.firstname = taplalek[i].firstname;
            user.lastname = taplalek[i].lastname;
            arr.push(user);
        }
    }
    arr.sort((a, b) => (a.firstname < b.firstname) ? -1 : 1);
    let eredmeny = arr;
    document.body.querySelector('.panel-body').innerHTML = '';
    createTable(eredmeny);
}

function varosok(taplalek) {
    let arr = [];
    for (let i in taplalek) {
        let user = {};
        user.city = taplalek[i].city;
        user['#'] = 0;
        arr.push(user);
    }
    for (let i in arr) {
        for (let j in arr) {
            if (arr[i].city == arr[j].city) {
                arr[i]['#']++;
            }
        }
    }

    function removeDuplicates(arr) {
        let unique_array = [];
        unique_array[0] = arr[0];
        for (let i = 0, j = 0; i < arr.length, j < unique_array.length; i++, j++) {
            if (unique_array[i].city != (arr[i].city)) {
                unique_array.push(arr[i])
            }
        }
        return unique_array
    }
    for (i in arr) {
        if (arr[i]['#'] < 2) {
            delete arr[i];
        }
    }
    let eredmeny = removeDuplicates(arr);
    document.body.querySelector('.panel-body').innerHTML = '';
    createTable(eredmeny);
}

function nbp2000(taplalek) {
    let arr = [];
    for (let i in taplalek) {
        if (parseInt(taplalek[i].birthdate.substring(0, 4)) < 2000 || taplalek[i].city != 'Budapest') {
            let user = {};
            user.firstname = taplalek[i].firstname;
            user.lastname = taplalek[i].lastname;
            user.username = taplalek[i].username;
            user.email = taplalek[i].email;
            user.phone = taplalek[i].phone;
            arr.push(user);
        }
    }
    let eredmeny = arr;
    document.body.querySelector('.panel-body').innerHTML = '';
    createTable(eredmeny);
}