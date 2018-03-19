let mod = document.querySelector('.zsiga');
mod.addEventListener("click", Modal());

function Modal(datas) {
    document.querySelector('.zs').innerHTML = '';
    let loginform = document.createElement('div');
    document.querySelector('.zs').style.background = "radial-gradient(circle, rgb(23, 103, 168), rgb(98, 211, 245), rgb(184, 196, 49))";
    loginform.innerHTML = `<div class="login-form" style="position: relative;
    margin: 100px auto 10px auto;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    width: 450px;
    height: 300px;
    padding: 20px;
    font-family: 'Nunito', sans-serif;">
    <div style="">
        <i class="fas fa-circle fa-8x" style="color:rgba(42, 77, 112, 0.85);position: absolute; left: 172px; top: -60px; height: 105px; width: 105px;"></i>
        <i class="fas fa-camera fa-3x" style=" color: white;position: absolute; left: 175px; top: -40px; height: 70px; width: 100px;"></i>
    </div>
    <form>
        <div style="">
            <input type="text" class="username" name="username" id="username1" placeholder="Username" style="margin-top: 60px;
            position: relative;
            width: 100%;
            box-sizing: border-box;
            padding: 14px 14px 14px 2em;
            border: none;
            border-radius: 3px;
            font-size: 16px;
            font-family: inherit;">
            <span>
                <i class="fas fa-user" style="position: absolute; left: 27px;
                top: 95px;"></i>
            </span>
        </div>

        <div>
            <input type="password" class="pass" name="pass" id="pass" placeholder="*********" style="margin-top: 1em;
            width: 100%;
            box-sizing: border-box;
            padding: 14px 14px 14px 2em;
            border: none;
            border-radius: 3px;
            font-size: 16px;
            font-family: inherit;">
            <span>
                <i class="fas fa-lock" style="position: absolute; left: 27px;
                top: 165px;"></i>
            </span>
        </div>

        <div>
            <span id="error"></span>
            <span id="success"></span>
            <button type="button" id="loginbutton" value="Login" style="margin-top: 12px;
            background: rgba(3, 98, 178, 0.8);
            color: white;
            width: 100%;
            height: 25px;
            border: none;
            font-family: inherit;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 2px;">Login</button>
        </div>
        <div>
            <input type="checkbox" name="remember1" id="remember1">
            <label for="remember1">Remember Me</label>
            <a class="forgot" href="" onclick="forgot()" style="position: relative; left: 172px; top: -5px;
            font-style: oblique;
            text-decoration: none;
            color: rgba(0, 0, 0, 0.65);
            text-align: justify;
            ">Forgot Password?</a>
        </div>
    </form>

</div>
<p class="copyright" style="text-align: center;
color: white;
font-size: 12px;
font-family: 'Nunito', sans-serif;">Copyright &copy; 2018 Your Brand Name, Inc</p>`

    document.querySelector('.zs').appendChild(loginform);
    document.querySelector('#loginbutton').addEventListener('click', function () {
        clickCheck(users);
    });
}


//----------LOGIN-----------

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
    return document.querySelector('#username1').value;
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
                window.location.assign("../index-zsiga.html");
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