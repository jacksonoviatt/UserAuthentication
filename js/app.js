function loginUser(e) {
    document.getElementById('successMessage').innerHTML = "<h2>verifying credentials</h2>"
    axios.request({
        method: "POST",
        url: `https://reqres.in/api/login`,
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            email: document.getElementById('usernameInput').value,
            password: document.getElementById('passwordInput').value
        }
    }).then(loginUserSuccess).catch(loginUserFailure);
}

function loginUserSuccess(res) {
    let token = res.data.token;
    Cookies.set("loginToken", token);
    document.getElementById('successMessage').innerHTML = "<h2>Login was successful</h2>"
    // redirectLogin();
    setTimeout(redirectLogin, 1000)
    
// 2; SHOW USER LOGIN SUCCESS Message -->
// send user to 2nd page
}

function loginUserFailure(err) {
    console.log(err);
    document.getElementById('successMessage').innerHTML = "<h2>Login was unsuccessful</h2>"
}

function redirectLogin() {
    window.location = "/pages/page.html";
}

let loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", loginUser)