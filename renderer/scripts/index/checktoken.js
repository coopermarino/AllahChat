// Function checks if user has a token and redirects if not
window.addEventListener('load', checkToken());

function checkToken() {
    if (!sessionStorage.getItem('token')) {
        window.location.replace('login.html');
    }
}

$.ajax({
    type: 'post',
    url: 'http://cmarino.ddns.net/api/token.php',   // here your php file to do something with postdata
    data: {
        token: sessionStorage.getItem('token')
    },
    success: function (data) {
        console.log(data);
        const str = data
        credentials = JSON.parse(str)
        console.log(`Currently Logged in as ${credentials.username}`)
        sessionStorage.setItem('username', credentials.username);
        sessionStorage.setItem('pfp', credentials.pfp);
        RunWebSocket()
    }
  });