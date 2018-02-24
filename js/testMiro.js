var users = [{
        email: 'baratheon@got.com',
        password: 'baratheon'
    },
    {
        email: 'bolton@got.com',
        password: 'bolton'
    },
    {
        email: 'a',
        password: 'a'
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


/*  Minden alkalommal, amikor a login gombra kattintanak, ellenőrizni kell, 
    hogy a felhasználónév és a jelszó nem üres e. 
    Amennyiben üres, a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel, hogy: Meg kell adnod a felhasználóneved és jelszavad. 

    Ha nem ürresek a mezők, akkor egy függvény leellenőrzi, hogy az adott
    felhasználónév, jelsz ópáros szerepel e a tömbben.
    Ha igen, kiírja a LOGIN gomb fölé egy #success id-jú elembe,
    zölden, hogy Belépve: usename.
    (A username helyére az adott user emailjét írja ki)


    Ha a tömbünkben nincs olyan felhasználó akinek ez lenne a felhasználónév jelszó
    párosa, a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel, hogy: Hibás felhasználónév vagy jelszó.


    Ha legalább háromszor téves felhasználónév jelszó páros lett megadva,
    akkor a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel : HÁromszor is elrontottad az adataidat, 24 órára kitiltottunk.

    Amennyiben a user a forgott password-re kattint, ugorjon fel egy prompt,
    amibe bekérjük a felhasználó email címét.
    Miután ezt leokézta, ugorjon fel egy alert azzal a szöveggel, hogy az 
    új jelszó el lett küldve az email címére.
    (Az emailt persze nem kell elküldeni)
*/
var counter = 0;

function login() {
    var un = document.querySelector("#un").value;
    var pw = document.querySelector("#pw").value;
    document.querySelector("#error").innerHTML = "";
    document.querySelector("#success").innerHTML = "";


    if (un === "" || pw === "") {
        document.querySelector("#error").innerHTML = "Meg kell adnod a felhasználóneved és jelszavad."
        return;
    }
    var bejut = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == un && users[i].password == pw) {
            document.querySelector("#success").innerHTML = `Belepve: ${users[i].email}`;
            var bejut = true;
            newDoc()
        }

    }
    if (bejut == false) {
        document.querySelector("#error").innerHTML = "Hibás felhasználónév vagy jelszó"
        counter++;
    }
    if (counter >= 3) {
        document.querySelector("#error").innerHTML = "Háromszor is elrontottad az adataidat, 24 órára kitiltottunk."
    }

}

function fpw() {

    var input = prompt("add meg az email címed:")

    alert("Az új jelszó elküldve az email címedre!")


}

function newDoc() {
    window.location.assign("../indexMiro.html")
}