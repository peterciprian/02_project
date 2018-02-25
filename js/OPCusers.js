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
    console.log(userDatas[0].users);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createTable(userDatas[0].users);




    /*var stat = document.querySelector("#stat");
    stat.addEventListener("click", stat(userDatas[0].users));*/
    var bf = document.querySelector('#bf1990');
    bf.addEventListener('click', function () {
        bf1990(userDatas[0].users);
    });

    var old = document.querySelector('#oldests')
    old.addEventListener('click', function () {
        oldests(userDatas[0].users);
    });
    var nev = document.querySelector('#nevek');
    nev.addEventListener('click', function () {
        nevek(userDatas[0].users);
    });
    var varos = document.querySelector('#varosok');
    varos.addEventListener('click', function () {
        varosok(userDatas[0].users);
    });
    var nbp = document.querySelector('#nbp2000');
    nbp.addEventListener('click', function () {
        nbp2000(userDatas[0].users);
    });
    var sta = document.querySelector('#stat');
    sta.addEventListener('click', function () {
        stat(userDatas[0].users);
    });

    function check(userDatas) {
        console.log(userDatas);
        return parseInt(userDatas.birthdate.substring(0, 4)) < 1990;
    }

    function bf1990() {
        eredmeny = userDatas[0].users.filter(check);
        var tab = document.body.getElementsByTagName('table')[0];
        document.body.removeChild(tab);
        createTable(eredmeny);
    }
    //////////////////////////////////////////////////////////////////////////////////

}


getData('/js/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function gererateHeaders(headerData) {
    var tr = document.createElement('tr');
    var keys;
    for (i in headerData[0]) {
        var th = document.createElement('th');
        th.textContent = i;
        tr.appendChild(th);
    }
    return tr;
}

function createTable(taplalek) {
    var table = document.createElement('table');
    table.appendChild(gererateHeaders(taplalek));
    for (i in taplalek) {
        var tr = document.createElement('tr');
        for (j in taplalek[i]) {
            var td = document.createElement('td');
            var element = taplalek[i][j];
            if (element) {
                td.textContent = element;
            } else {
                td.textContent = '';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.querySelector('body').appendChild(table);
}

function stat(taplalek) {

    document.querySelector('#stats').innertext = `${oldest}`

}

/*function bf1990(taplalek) {
    var eredmeny = [];
    for (i in taplalek) {
        if (parseInt(taplalek[i].birthdate.substring(0, 4)) < 1990) {
            eredmeny.push(taplalek[i].username);
        }
    }
    createTable(eredmeny);
}*/

function oldests(taplalek) {
    var eredmeny = [];

    var tab = document.body.getElementsByTagName('table')[0];
    document.body.removeChild(tab);
    createTable(eredmeny);
}

function nevek(taplalek) {
    var eredmeny = [];
    var tab = document.body.getElementsByTagName('table')[0];
    document.body.removeChild(tab);
    createTable(eredmeny);
}

function varosok(taplalek) {
    var eredmeny = [];
    var tab = document.body.getElementsByTagName('table')[0];
    document.body.removeChild(tab);
    createTable(eredmeny);
}

function nbp2000(taplalek) {
    var eredmeny = [];
    var tab = document.body.getElementsByTagName('table')[0];
    document.body.removeChild(tab);
    createTable(eredmeny);
}
//////////////////////////////////