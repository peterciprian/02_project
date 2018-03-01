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
var trying = 0;

function clickCheck() {
var error;
var userName = document.querySelector('#username').value;
var userPassword = document.querySelector('#pass').value;
var errorMessage = "Meg kell adnod a felhasználóneved és jelszavad";
var errorMessage2 = " Hibás felhasználónév vagy jelszó";
var errorMessage3 = "Háromszor is elrontottad az adataidat, 24 órára kitiltottunk.";


if (trying > 1) {
    document.querySelector('#error').innerHTML = errorMessage3;
} else {
    if (userName == '' || userPassword == '') {
        document.querySelector('#error').innerHTML = errorMessage;
    } else {
        for (var i = 0; i < users.length; i++) {
            if (userName == users[i].email && userPassword == users[i].password) {
                document.querySelector('#error').innerHTML = "";
                document.querySelector('#success').innerHTML = `Belépve: ${userName}`;
                window.location.assign("../index-mate.html");

                break;
            } else {
                document.querySelector('#error').innerHTML = errorMessage2;
            }
        }

    }
}
error = document.querySelector('#error').innerHTML;

switch (error) {
    case errorMessage2:
        trying++;
        break;
    case "":
       trying = 0;
        break;
    default:
        trying = trying;
        break;
}
} 

function makePrompt() {
var promptMessage = "Nincs ilyen felhasználónév";
userName = prompt("Írd be a felhasználóneved: ");
for (var i in users) {
    if (userName == users[i].email) {
        promptMessage = "Elküldtük az új jelszót az email címére";
        break;
    }
}
alert(promptMessage);
}