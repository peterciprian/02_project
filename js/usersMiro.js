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
    var userDatas = JSON.parse(xhttp.responseText);
    //console.log(userDatas[0].users[0].id);

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createTable(userDatas);


    var pre90Btn = document.querySelector('#pre90');
    var oldest3Btn = document.querySelector('#oldest3');
    var filteredNamesBtn = document.querySelector('#filteredNames');
    var citiesBtn = document.querySelector('#cities');
    var pre2kBtn = document.querySelector('#pre2k');
    var statisticsBtn = document.querySelector('#statistics');

    pre90Btn.addEventListener('click', function () {
        createTable(userDatas, 'pre90');
    });
    oldest3Btn.addEventListener('click', function () {
        createTable(userDatas, 'oldest3');
    });
    filteredNamesBtn.addEventListener('click', function () {
        createTable(userDatas, 'filteredNames');
    });
    citiesBtn.addEventListener('click', function () {
        createTable(userDatas, 'cities');
    });
    pre2kBtn.addEventListener('click', function () {
        createTable(userDatas, 'pre2k');
    });
    statisticsBtn.addEventListener('click', function () {
        calcPrintOut(userDatas);
    });

}
getData('/js/users.json', successAjax);
// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
//procedural
/*function createTable(data) {
    var table = '';
    table += `<thead>
            <th>Azonosító</th>
            <th>Felhasználónév</th> 
            <th>Jelszó</th> 
            <th>Vezetéknév</th> 
            <th>Keresztnév</th> 
            <th>Ország</th> 
            <th>Állam/Megye</th> 
            <th>Irányítószám</th> 
            <th>Város</th> 
            <th>Cím</th> 
            <th>Nem</th> 
            <th>Születési dátum</th> 
            <th>Email cím</th> 
            <th>Telefonszám</th>
            </thead>`
    document.querySelector('#table').innerHTML += table;

}*/
//functional
function genHeads(filter) {
    var table = document.querySelector('#table');
    var thead = document.createElement('thead');
    var thElements = ['Azonosító', 'Felhasználónév', 'Jelszó',
        'Vezetéknév', 'Keresztnév', 'Ország', 'Állam/Megye', 'Irányítószám',
        'Város', 'Cím', 'Nem', 'Születési dátum', 'Email cím', 'Telefonszám'
    ];
    if (filter == 'pre90') {
        var th = document.createElement('th');
        th.textContent = thElements[1];
        thead.appendChild(th);
        table.appendChild(thead);
    } else if (filter == 'oldest3') {
        var th = document.createElement('th');
        var th2 = document.createElement('th');
        var th3 = document.createElement('th');

        th.textContent = thElements[3];
        th2.textContent = thElements[3];
        th3.textContent = thElements[11];

        thead.appendChild(th);
        thead.appendChild(th2);
        thead.appendChild(th3);

        table.appendChild(thead);
    } else if (filter == 'filteredNames') {
        var th = document.createElement('th');
        var th2 = document.createElement('th');

        th.textContent = thElements[3];
        th2.textContent = thElements[4];

        thead.appendChild(th);
        thead.appendChild(th2);

        table.appendChild(thead);
    } else if (filter == 'cities') {
        var th = document.createElement('th');
        var th2 = document.createElement('th');

        th.textContent = thElements[8];
        th2.textContent = 'Lakosok';

        thead.appendChild(th);
        thead.appendChild(th2);

        table.appendChild(thead);
    } else if (filter == 'pre2k') {
        var th = document.createElement('th');
        var th2 = document.createElement('th');
        var th3 = document.createElement('th');
        var th4 = document.createElement('th');
        var th5 = document.createElement('th');

        th.textContent = thElements[3];
        th2.textContent = thElements[4];
        th3.textContent = thElements[1];
        th4.textContent = thElements[12];
        th5.textContent = thElements[13];

        thead.appendChild(th);
        thead.appendChild(th2);
        thead.appendChild(th3);
        thead.appendChild(th4);
        thead.appendChild(th5);

        table.appendChild(thead);

    } else {

        thElements.forEach(function (element) {
            var th = document.createElement('th');
            th.textContent = element;
            thead.appendChild(th);
        });
        table.appendChild(thead);
    }
}


function createTable(data, filter) {
    document.querySelector('table').innerHTML = '';

    var tbody = '';
    var temp = [];
    if (filter === 'pre90') {

        for (let i = 0; i < data[0].users.length; i++) {
            temp[i] = parseInt(data[0].users[i].birthdate.slice(0, 4));
            if (temp[i] < 1990) {
                tbody += `<tbody>
         <td>${data[0].users[i].username}</td>
         </tbody>`
            }

        }
        genHeads(filter);
        table.innerHTML += tbody;


    } else if (filter === 'oldest3') {
        for (let i = 0; i < data[0].users.length; i++) {
            for (var j = i + 1; j < data[0].users.length; j++) {
                if (parseInt(data[0].users[i].birthdate.slice(0, 4)) > parseInt(data[0].users[j].birthdate.slice(0, 4))) {
                    var changeTemp = [data[0].users[i], data[0].users[j]];
                    data[0].users[i] = changeTemp[1];
                    data[0].users[j] = changeTemp[0];
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            tbody += `<tbody>
            <td>${data[0].users[i].firstname}</td>
            <td>${data[0].users[i].lastname}</td>
            <td>${data[0].users[i].birthdate}</td>
         </tbody>`
        }
        genHeads(filter);
        table.innerHTML += tbody;

    } else if (filter === 'filteredNames') {
        for (let i = 0; i < data[0].users.length; i++) {
            if (parseInt(data[0].users[i].birthdate.slice(0, 4)) >= 1900 && parseInt(data[0].users[i].birthdate.slice(0, 4)) <= 2000) {
                if (data[0].users[i].city == 'Budapest' && data[0].users[i].sex == 'férfi' && (data[0].users[i].state.length > 0)) {
                    data.sort(function (a, b) {
                        return a.users[i].lastname - b.users[i].lastname
                    });
                    tbody += `<tbody>
                    <td>${data[0].users[i].firstname}</td>
                    <td>${data[0].users[i].lastname}</td>
                 </tbody>`
                }
            }
        }
        genHeads(filter);
        table.innerHTML += tbody;

    } else if (filter === 'cities') {
        var cityList = [];
        for (let i = 0; i < data[0].users.length; i++) {
            if (cityList.indexOf(data[0].users[i].city) == -1) {
                cityList.push(data[0].users[i].city)
            }

        }
        var counter = [0, 0, 0, 0];
        for (let i = 0; i < cityList.length; i++) {
            for (let j = 0; j < data[0].users.length; j++) {
                if (cityList[i] == data[0].users[j].city) {
                    counter[i] += 1
                }
            }
        }

        for (let i = 0; i < cityList.length; i++) {
            if (counter[i] > 1) {
                tbody += `<tbody>
                <td>${cityList[i]}</td>
                <td>${counter[i]}</td>
             </tbody>`
            }
        }

        genHeads(filter);
        table.innerHTML += tbody;

    } else if (filter === 'pre2k') {
        for (let i = 0; i < data[0].users.length; i++) {
            if (parseInt(data[0].users[i].birthdate.slice(0, 4)) < 2000 || (data[0].users[i].city != 'Budapest')) {
                tbody += `<tbody>
                <td>${data[0].users[i].firstname}</td>
                <td>${data[0].users[i].lastname}</td>
                <td>${data[0].users[i].username}</td>
                <td>${data[0].users[i].email}</td>
                <td>${data[0].users[i].phone}</td>
             </tbody>`
            }
        }
        genHeads(filter);
        table.innerHTML += tbody;

    } else {
        for (let i = 0; i < data[0].users.length; i++) {
            tbody += `<tbody>
         <td>${data[0].users[i].id}</td>
         <td>${data[0].users[i].username}</td>
         <td>${data[0].users[i].password}</td>
         <td>${data[0].users[i].firstname}</td>
         <td>${data[0].users[i].lastname}</td>
         <td>${data[0].users[i].country}</td>
         <td>${data[0].users[i].state}</td>
         <td>${data[0].users[i].zipcode}</td>
         <td>${data[0].users[i].city}</td>
         <td>${data[0].users[i].address}</td>
         <td>${data[0].users[i].sex}</td>
         <td>${data[0].users[i].birthdate}</td>
         <td>${data[0].users[i].email}</td>
         <td>${data[0].users[i].phone}</td>
         </tbody>`
        }
        genHeads();
        table.innerHTML += tbody;
    }
}

function calcPrintOut(data) {
    var stats = document.querySelector('#stats');
    stats.innerHTML = `<h1>Statisztikák</h1>
        <ul>
            <li>A legidősebb ember: ${oldestPerson(data)}</li>
            <li>A legfiatalabb ember: ${yungestPerson(data)}</li>
            <li>Az emberek össz életkora: ${totalAge(data)} év</li>
            <li>Az emberek átlag életkora: ${(totalAge(data)/data[0].users.length).toFixed(2)} év</li>
            
        
        </ul>
    `
}

function oldestPerson(data) {
    var temp = parseInt(data[0].users[0].birthdate.slice(0, 4))
    var tempPerson;
    for (var i = 0; i < data[0].users.length; i++) {
        if (parseInt(data[0].users[i].birthdate.slice(0, 4)) < temp) {
            temp = data[0].users[i].birthdate.slice(0, 4)
            tempPerson = data[0].users[i];

        }

    }
    return (`${dateFormatter(tempPerson.birthdate)}  ${tempPerson.username}`);
}

function yungestPerson(data) {
    var temp = parseInt(data[0].users[0].birthdate.slice(0, 4))
    var tempPerson;
    for (var i = 0; i < data[0].users.length; i++) {
        if (parseInt(data[0].users[i].birthdate.slice(0, 4)) > temp) {
            temp = data[0].users[i].birthdate.slice(0, 4)
            tempPerson = data[0].users[i];

        }

    }

    return (`${dateFormatter(tempPerson.birthdate)}  ${tempPerson.username}`);
}

function totalAge(data) {
    var tempCount = 0;
    for (var i = 0; i < data[0].users.length; i++) {
        tempCount += (2018 - parseInt(data[0].users[i].birthdate.slice(0, 4)))
    }
    return tempCount;
}

function dateFormatter(date) {
    date = new Date(date);
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