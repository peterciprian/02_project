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

var attempt = 0;
var error;
var found = false;
var ERROR_EMPTY = "Meg kell adnod a felhasználóneved és jelszavad";
var ERROR_FAULT = "Hibás felhasználónév vagy jelszó";
var ERROR_TOO_MANY_ATTEMPTS = "Háromszor is elrontottad az adataidat, 24 órára kitiltottunk.";

function getUserNameFieldValue() {
    return document.querySelector('#username').value;
}

function getPasswordFieldValue() {
    return document.querySelector('#pass').value;
}

function clickCheck() {
    document.querySelector('#success').innerHTML = '';
    document.querySelector('#error').innerHTML = '';

    if (attempt >= 3) {
        document.querySelector('#error').innerHTML = ERROR_TOO_MANY_ATTEMPTS;
    } else {
        if (getUserNameFieldValue() == '' || getPasswordFieldValue() == '') {
            document.querySelector('#error').innerHTML = ERROR_EMPTY;
        } else {
            for (var i = 0; i < users.length; i++) {
                if (getUserNameFieldValue() == users[i].email && getPasswordFieldValue() == users[i].password) {
                    found = true;
                    break;
                } else {
                    found = false;
                }
            }
            if (found) {
                document.querySelector('#success').innerHTML = 'Belépve: ' + getUserNameFieldValue();
                window.location.assign("/02_project/index-zsiga.html");
                attempt = 0;
            } else {
                document.querySelector('#error').innerHTML = ERROR_FAULT;
                attempt++;
            }
        }
    }

}

function forgot() {
    var promptMessage = "Nincs ilyen felhasználónév";
    var userName = prompt("Írd be a felhasználóneved: ");
    for (user in users) {
        if (userName === users[user].email) {
            promptMessage = "Elküldtük az új jelszót az email címére";
            break;
        }
    }
    alert(promptMessage);
}