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
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    //createHTML();
    //createTable(userDatas[0].users);
    let invoke = document.querySelector('.opc');
    invoke.addEventListener("click", createHTML());



    /*var stat = document.querySelector("#stat");
    stat.addEventListener("click", stat(userDatas[0].users));*/
    /*var bf = document.querySelector('#bf1990');
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
        createTable(eredmeny);*/
}
//////////////////////////////////////////////////////////////////////////////////




getData('/js/users.json', successAjax);

function createHTML() {
    let container = document.createElement('div');
    container.className = 'container';

    let row = document.createElement('div');
    row.className = 'row';

    let column = document.createElement('div');
    column.className = 'col-xs-12';

    let statField = document.createElement('div');
    statField.className = 'stat-field'
    statField.style.display = "none";

    let tableField = document.createElement('div');
    tableField.className = 'table-field';

    //column.appendChild(btnGroup);
    column.appendChild(statField);
    column.appendChild(tableField);
    row.appendChild(column);
    container.appendChild(row);
    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;

    document.querySelector('.modal-body').innerHTML = '';
    document.querySelector('.modal-body').appendChild(container);
    loadAdmin();
}

function loadAdmin() {
    let btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    btnGroup.innerHTML = `<button id="stat" class="btn btn-info">Statisztika</button>
    <button id="bf1990" class="btn btn-success">1990 előttiek</button>
    <button id="oldests" class="btn btn-success">A 3 legidősebb</button>
    <button id="nevek" class="btn btn-success">Szűrt nevek</button>
    <button id="varosok" class="btn btn-success">Városok</button>
    <button id="nbp2000" class="btn btn-success">2000 előttiek</button>`;

    document.querySelector('.stat-field').innerHTML = `<div class="panel-heading">Statisztikák</div>
    <div class="panel-body"></div>`;

    document.querySelector('.modal-header').innerHTML = '';
    document.querySelector('.modal-header').innerHTML = `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>`;

    document.querySelector('.modal-header').appendChild(btnGroup);
}