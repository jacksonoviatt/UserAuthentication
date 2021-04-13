
// This function runs if the axios.request is successful 
// it sets the API token to the cookie login token and sends a
//  message that the login was successful the set timeout function is then used to call
//  a function that redirects to the next page, 1 second after so user can read the message

function loginUserSuccess(res) {
    let token = res.data.token;
    Cookies.set("loginToken", token);
    document.getElementById('successMessage').innerHTML = "<h2>Login was successful</h2>";
    setTimeout(redirectLogin, 1000);

}

// This function runs if the axios.request is unsuccessful 
// it posts a message that tells the user they were unsuccessful
function loginUserFailure(err) {
    console.log(err);
    document.getElementById('successMessage').innerHTML = "<h2>Login was unsuccessful</h2>"
}


// This function will be called on click
// this function uses axios to send and receive the api request
// We use the POST method as instructed by the API's documentation
// using the input from  .value and an html form to verify the logins authenticity
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


// this function redirects you to page.html
function redirectLogin() {
    window.location = "/pages/page.html";
}

// add event listener to the login button
let loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", loginUser)