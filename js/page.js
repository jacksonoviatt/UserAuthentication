token = Cookies.get("loginToken");
console.log(token);


if(token === undefined) {
document.getElementById('loggedInMessage').outerHTML = `<p>No one is logged in</p><button onclick="goLogin()">Go Login</button>`;
document.getElementById('logoutButton').style.display = "none";
} else {
    colorsArray();
}

function colorsArraySuccess(res) {
    let colorArray = res.data.data;
    console.log(colorArray);
    let container = document.getElementById('colorContainer');
    for(i=0; i<colorArray.length; i++) {
        container.innerHTML += `<div id="color${colorArray[i].id}" class="colorBox"><h3>${colorArray[i].name}col</h3><p>${colorArray[i].year}</p></div>`
        document.getElementById(`color${colorArray[i].id}`).style.backgroundColor = colorArray[i].color;
    }
}

function colorsArrayFailure(err) {
    console.log(err);
}

function colorsArray(){
    axios.request({
        method: "GET",
        url: `https://reqres.in/api/unknown`
    }).then(colorsArraySuccess).catch(colorsArrayFailure);
}

function goLogin() {
    window.location = "/index.html";
}

function goLogout(e) {
    Cookies.remove("loginToken");
    location.reload();
}

document.getElementById('logoutButton').addEventListener("click", goLogout)

