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
    invoke.addEventListener("click", loadLogin(userDatas[0].users));
}
//////////////////////////////////////////////////////////////////////////////////
getData('/js/users.json', successAjax);

function createHTML(datas) {
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
    //
    createAdmin(datas);
}

function loadLogin(datas) {
    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-body').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;

    let login = document.createElement('div');
    login.innerHTML = `<div class="container">
    <div class="camera">
        <i class="fas fa-camera fa-2x" style="color:rgba(255, 255, 255, 0.75)"></i>

    </div>
    <form>
        <span id="error"></span>
        <input type="text" id="username" placeholder="   &#9823; Username">
        <input type="password" id="password" name="password" placeholder="   &#128274; ********">
        <span id="success"></span>
        <button type="button" id="loginButton" value="Login">Login</button>

        <div class="also">
            <input type="checkbox" name="remember" id="remember">
            <label for="remember">Remember me</label>
            <a calss="forgot" onclick="forgot()">Forgot Password?</a>
        </div>
    </form>
    <p class="cr">Copyright &#169; 2018, Your Brand Name.INC</p>
</div>`;

    document.querySelector('.modal-body').appendChild(login);
    document.querySelector('#loginButton').addEventListener('click', function () {
        createHTML(datas);
    });
}

function createAdmin(datas) {
    //ez nem jó!!           document.querySelector('.modal-body').innerHTML = ''; //ez nem jó!!
    let btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.innerHTML = `<button id="stat" class="btn btn-info">Statisztika</button>
    <button id="bf1990" class="btn btn-success">1990 előttiek</button>
    <button id="oldests" class="btn btn-success">A 3 legidősebb</button>
    <button id="nevek" class="btn btn-success">Szűrt nevek</button>
    <button id="varosok" class="btn btn-success">Városok</button>
    <button id="nbp2000" class="btn btn-success">2000 előttiek</button>`;

    // ez nem kell!         document.querySelector('.modal-body').appendChild(statField);
    document.querySelector('.stat-field').innerHTML = `<div class="panel-heading">User adatok</div>
    <div class="panel-body"></div>`;

    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;

    document.querySelector('.modal-header').appendChild(btnGroup);

    let bf = document.querySelector('#bf1990');
    bf.addEventListener('click', function () {
        bf1990(datas);
    });

    let old = document.querySelector('#oldests')
    old.addEventListener('click', function () {
        oldests(datas);
    });
    let nev = document.querySelector('#nevek');
    nev.addEventListener('click', function () {
        nevek(datas);
    });
    let varos = document.querySelector('#varosok');
    varos.addEventListener('click', function () {
        varosok(datas);
    });
    let nbp = document.querySelector('#nbp2000');
    nbp.addEventListener('click', function () {
        nbp2000(datas);
    });
    let sta = document.querySelector('#stat');
    sta.addEventListener('click', function () {
        stat(datas);
    });
    $("#stat").click(function () {
        $(".stat-field").toggle();
    });
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

//----------LOGIN----------
var users = [{
        email: 'baratheon@got.com',
        password: 'baratheon'
    },
    {
        email: 'bolton@got.com',
        password: 'bolton'
    },
    {
        email: 'florent@got.com',
        password: 'florent'
    },
    {
        email: 'lennister@got.com',
        password: 'lennister'
    },
    {
        email: 'martell@got.com',
        password: 'martell'
    },
    {
        email: 'redwyne@got.com',
        password: 'redwyne'
    },
    {
        email: 'stark@got.com',
        password: 'stark'
    },
    {
        email: 'umber@got.com',
        password: 'umber'
    },
    {
        email: 'tully@got.com',
        password: 'tully'
    },
    {
        email: 'targaryen@got.com',
        password: 'targaryen'
    }
];

function forgot() {
    let e = prompt("Add meg az e - mail címedet!");
    if (e.includes("@")) {
        alert("Az új jelszót elküldtük.");
    } else {
        alert("Adj meg egy valós e-mail címet!");
    }
}
let elrontottad = 0;

function req(datas) {
    if (document.querySelector("#username").value == '' || document.querySelector("#password").value == '') {
        document.querySelector("#error").innerHTML = 'Meg kell adnod a felhasználóneved és jelszavad.';
    } else {
        try {
            var found = false;
            let i = 0;
            while (found == false || i < users.length) {
                if (users[i].email == document.querySelector("#username").value && users[i].password == document.querySelector("#password").value) {
                    found = true;
                    document.querySelector("#error").innerHTML = '';
                    document.querySelector("#success").innerHTML = `Belépve, mint ${users[i].email}`;
                    createAdmin(datas);

                    break;
                } else {
                    i++;
                }
            }

        } catch (e) {
            document.querySelector("#error").innerHTML = "Valamit nem jól adtál meg, próbáld meg újra!";
        }
        if (found == false) {
            elrontottad++;
        }

    }
}