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

console.log(users.length);

function forgot() {

    var e = prompt("Add meg az e - mail címedet!");
    if (e.includes("@")) {
        alert("Az új jelszót elküldtük.");
    } else {
        alert("Adj meg egy valós e-mail címet!");
    }

}
var elrontottad = 0;

function req() {
    if (document.querySelector("#username").value == '' || document.querySelector("#password").value == '') {
        document.querySelector("#error").innerHTML = 'Meg kell adnod a felhasználóneved és jelszavad.';
    } else {
        /*for (i in users) {
            if (users[i].email === document.querySelector("#username").value && users[i].password === document.querySelector("#password").value) {
                document.querySelector("#success").innerHTML = `Belépve, mint ${users[i].email}`;
                break;
            } else {
                document.querySelector("#error").innerHTML = 'Hibás felhasználónév vagy jelszó';
            }
        }*/

        try {
            var found = false;
            var i = 0;
            while (found == false || i < users.length) {
                if (users[i].email == document.querySelector("#username").value && users[i].password == document.querySelector("#password").value) {
                    found = true;
                    document.querySelector("#error").innerHTML = '';
                    document.querySelector("#success").innerHTML = `Belépve, mint ${users[i].email}`;
                    newDoc()
                    break;
                } else {
                    i++;
                }

            }

        } catch (e) {
            console.log("Undefined");
            document.querySelector("#error").innerHTML = "Valamit nem jól adtál meg, próbáld meg újra!";
        }
        if (found == false) {
            elrontottad++;
        }

        console.log(i + "-ig ment az i");
        console.log("megtalálta=" + found);
        console.log(elrontottad + "-szor elrontottad");

    }
}

function newDoc() {
    window.location.assign("../OPCindex.html")
}