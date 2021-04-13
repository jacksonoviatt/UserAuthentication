// get the login token from app.js
let token = Cookies.get("loginToken");
console.log(token);

// if the token is undefined let the user know that no on is logged in 
// and there is a button that takes you back
// if someone is logged in, run the color array function
if(token === undefined) {
document.getElementById('loggedInMessage').outerHTML = `<p>No one is logged in</p><button onclick="goLogin()">Go Login</button>`;
document.getElementById('logoutButton').style.display = "none";
} else {
    colorsArray();
}

// if the axios request is successful this function will run
// run a loop over the array of colors that we requested, and display them 
// as well as set their background color style as the hex code from the array
function colorsArraySuccess(res) {
    let colorArray = res.data.data;
    console.log(colorArray);
    let container = document.getElementById('colorContainer');
    for(i=0; i<colorArray.length; i++) {
        container.innerHTML += `<div id="color${colorArray[i].id}" class="colorBox"><h3>${colorArray[i].name}col</h3><p>${colorArray[i].year}</p></div>`
        document.getElementById(`color${colorArray[i].id}`).style.backgroundColor = colorArray[i].color;
    }
}

// if the axios request is unsuccessful this function will run
function colorsArrayFailure(err) {
    console.log(err);
}

// This function will be called if the user is logged in
// this function uses axios to send and receive the api request for the color array
// We use the GET method

function colorsArray(){
    axios.request({
        method: "GET",
        url: `https://reqres.in/api/unknown`
    }).then(colorsArraySuccess).catch(colorsArrayFailure);
}

// this function sends you back to the homepage
// this only displays if you are logged out
function goLogin() {
    window.location = "/index.html";
}

// this function runs on click and it removes the token cookie
// and reloads the page, logging out the user
function goLogout(e) {
    Cookies.remove("loginToken");
    location.reload();
}

document.getElementById('logoutButton').addEventListener("click", goLogout)

