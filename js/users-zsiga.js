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
    // itt a json content, benne a data változóban
    var userDatas = (JSON.parse(xhttp.responseText))[0].users;
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!
 
      Na azokat a függvényeket ITT HÍVD MEG! 
 
      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    generateTable(userDatas);
    document.getElementById("kilencvenelott").addEventListener("click", function () {
        kilencvenelott(userDatas)
    });
    document.getElementById("ketezerelott").addEventListener("click", function () {
        ketezerelott(userDatas)
    });
    document.getElementById("szurtnevek").addEventListener("click", function () {
        szurtnevek(userDatas)
    });
    document.getElementById("haromlegidosebb").addEventListener("click", function () {
        legidosebb3(userDatas)
    });

    document.getElementById("statisztika").addEventListener("click", function () {
        statKiiras(userDatas)
    });
}


getData('js/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function generateTable(userDatas) {

    // Header tartalma, lekérdezés az objektumból
    // id, username, password stb.
    var col = [];
    for (var i = 0; i < userDatas.length; i++) {
        for (var key in userDatas[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }


    // Táblázat létrehozása dinamikusan

    var table = document.createElement('table');
    table.border = 1;


    // HTML táblázat fejléc generálása, a dataProps nevekkel
    var dataProps = ['Azonosító', 'Felhasználónév', 'Jelszó', 'Vezetéknév', 'Keresztnév',
        'Ország', 'Megye', 'Irányítószám', 'Város', 'Cím', 'Nem', 'Születési dátum',
        'Email', 'Telefonszám'
    ];


    var tr = table.insertRow(-1); // Table row

    for (var i = 0; i < dataProps.length; i++) {
        var th = document.createElement('th'); // Table header
        th.innerHTML = dataProps[i];
        tr.appendChild(th);
        th.bgColor = 'grey';
    }

    // JSON adatok hozzáadása a táblázathoz, sorokként
    for (var i = 0; i < userDatas.length; i++) {

        tr = table.insertRow(-1);


        for (var j = 0; j < col.length; j++) {
            var tableCell = tr.insertCell(-1);
            tableCell.innerHTML = userDatas[i][col[j]];
        }
    }

    // Hozzáadom a generált táblázatot egy div elemhez
    var genTable = document.querySelector('#gentable');
    genTable.innerHTML = '';
    genTable.appendChild(table);
}


// ------------ 90 előttiek ------------
function kilencvenelott(userDatas) {
    var col = [];
    for (var i = 0; i < userDatas.length; i++) {
        for (var key in userDatas[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement('table');
    table.border = 1;
    var dataProps = ['Felhasználónév'];
    var tr = table.insertRow(-1);
    var th = document.createElement('th');
    th.innerHTML = dataProps[0];
    tr.appendChild(th);
    for (var i = 0; i < userDatas.length; i++) {
        if (userDatas[i].birthdate < "1990. 01. 01.") {
            tr = table.insertRow(-1);
            var tableCell = tr.insertCell(-1);
            tableCell.innerHTML = userDatas[i][col[1]];
        }

    }
    var genTable = document.querySelector('#gentable');
    genTable.innerHTML = '';
    genTable.appendChild(table);
}


// ------------ 2000 előttiek -------------
function ketezerelott(userDatas) {
    var col = ["username", "firstname", "lastname", "email", "phone"];
    var table = document.createElement('table');
    table.border = 1;
    var dataProps = ['Felhasználónév', 'Vezetéknév', 'Keresztnév', 'Email', 'Telefonszám'];
    var tr = table.insertRow(-1); // Table row

    for (var i = 0; i < dataProps.length; i++) {
        var th = document.createElement('th'); // Table header
        th.innerHTML = dataProps[i];
        tr.appendChild(th);
    }
    for (var i = 0; i < userDatas.length; i++) {
        if (userDatas[i].birthdate < "2000. 01. 01." && userDatas[i].city != "Budapest") {

            tr = table.insertRow(-1);


            for (var j = 0; j < col.length; j++) {
                var tableCell = tr.insertCell(-1);
                tableCell.innerHTML = userDatas[i][col[j]];
            }
        }
    }

    var genTable = document.querySelector('#gentable');
    genTable.innerHTML = '';
    genTable.appendChild(table);
}


//------------- Szűrt nevek ------------
function szurtnevek(userDatas) {
    var col = ["firstname", "lastname"];
    var table = document.createElement('table');
    table.border = 1;
    var dataProps = ['Vezetéknév', 'Keresztnév'];
    var tr = table.insertRow(-1); // Table row

    for (var i = 0; i < dataProps.length; i++) {
        var th = document.createElement('th'); // Table header
        th.innerHTML = dataProps[i];
        tr.appendChild(th);
    }
    for (var i = 0; i < userDatas.length; i++) {
        if (userDatas[i].birthdate > "1990. 01. 01." &&
            userDatas[i].birthdate < "2000. 01. 01." &&
            userDatas[i].city == "Budapest" &&
            userDatas[i].state != null &&
            userDatas[i].sex == "férfi") {

            tr = table.insertRow(-1);


            for (var j = 0; j < col.length; j++) {
                var tableCell = tr.insertCell(-1);
                tableCell.innerHTML = userDatas[i][col[j]];
            }
        }
    }

    var genTable = document.querySelector('#gentable');
    genTable.innerHTML = '';
    genTable.appendChild(table);
}

// --- 3 legidősebb --------



function legidosebb3(userDatas) {
    var col = ["firstname", "lastname", "birthday"];
    var table = document.createElement('table');
    table.border = 1;
    var dataProps = ['Vezetéknév', 'Keresztnév', 'Születési dátum'];
    var tr = table.insertRow(-1); // Table row

    for (var i = 0; i < dataProps.length; i++) {
        var th = document.createElement('th'); // Table header
        th.innerHTML = dataProps[i];
        tr.appendChild(th);
    }
    for (var i = 0; i < userDatas.length; i++) {
        var eldest = [];
        var temp = userDatas[0].birthdate;
        if (userDatas[i].birthdate > temp) {
            eldest.push(userDatas[i]);
            tr = table.insertRow(-1);


            for (var j = 0; j < col.length; j++) {
                var tableCell = tr.insertCell(-1);
                tableCell.innerHTML = eldest[0][col[j]];
            }
        }
    }

    var genTable = document.querySelector('#gentable');
    genTable.innerHTML = '';
    genTable.appendChild(table);
}

// -------- Városok --------



//------------ stat kiiratás -----------
function statKiiras(userDatas) {
    var stats = document.querySelector('#gentable');
    stats.innerHTML = `<h1>Statisztikák</h1>
        <ul>
            <li>A legidősebb ember: ${legidosebb(userDatas)}</li>
            <li>A legfiatalabb ember: ${legfiatalabb(userDatas)}</li>
            <li>Az emberek össz életkora: ${osszeletkor(userDatas)} év</li>
            <li>Az emberek átlag életkora: ${(osszeletkor(userDatas)/userDatas.length).toFixed(2)} év</li>
            
        
        </ul>
    `
}

//-------------- legidősebb -----------

function legidosebb(userDatas) {
    var temp = parseInt(userDatas[0].birthdate.slice(0, 4))
    var tempPerson;
    for (var i = 0; i < userDatas.length; i++) {
        if (parseInt(userDatas[i].birthdate.slice(0, 4)) < temp) {
            temp = userDatas[i].birthdate.slice(0, 4)
            tempPerson = userDatas[i];

        }

    }
    return (`${datumformazas(tempPerson.birthdate)}  ${tempPerson.username}`);
}

//----------- legfiatalabb -----------
function legfiatalabb(userDatas) {
    var temp = parseInt(userDatas[0].birthdate.slice(0, 4))
    var tempPerson;
    for (var i = 0; i < userDatas.length; i++) {
        if (parseInt(userDatas[i].birthdate.slice(0, 4)) > temp) {
            temp = userDatas[i].birthdate.slice(0, 4)
            tempPerson = userDatas[i];

        }

    }

    return (`${datumformazas(tempPerson.birthdate)}  ${tempPerson.username}`);
}
// ----------- össz életkor -------------
function osszeletkor(userDatas) {
    var ossz = 0;
    for (var i = 0; i < userDatas.length; i++) {
        ossz += (2018 - parseInt(userDatas[i].birthdate.slice(0, 4)))
    }
    return ossz;
}

// ------ Dátum formázás ----------
function datumformazas(userDatas) {
    date = new Date(userDatas);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;

    switch (m) {
        case 1:
            return `${y}. Január ${d}.`
            break;
        case 2:
            return `${y}. Február ${d}.`
            break;
        case 3:
            return `${y}. Március ${d}.`
            break;
        case 4:
            return `${y}. Április ${d}.`
            break;
        case 5:
            return `${y}. Május ${d}.`
            break;
        case 6:
            return `${y}. Június ${d}.`
            break;
        case 7:
            return `${y}. Július ${d}.`
            break;
        case 8:
            return `${y}. Augusztus ${d}.`
            break;
        case 9:
            return `${y}. Szeptember ${d}.`
            break;
        case 10:
            return `${y}. Október ${d}.`
            break;
        case 11:
            return `${y}. November ${d}.`
            break;

        default:
            return `${y}. December ${d}.`
            break;
    }
}