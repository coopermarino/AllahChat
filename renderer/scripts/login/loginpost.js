// Sets the hostname
//var hoststname = prompt()




function emptycreds() {
    console.log("Creds are not filled")
    Toastify({
        text: "All feilds are required",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      
}

function checkCreds() {
  if (document.getElementById('uname').value == "" || document.getElementById('pword').value == "" || document.getElementById('hname').value == "" ) {
    emptycreds();
  }else{

    hostname = document.getElementById('hname').value 
    //document.getElementById('hname').value
    console.log("Running POST Request")
    // var hostname = $("#hname").val();
    var username = $("#uname").val();
    var password = $("#pword").val();

    $.ajax({
      type: 'post',
      url: 'http://cmarino.ddns.net/api/login.php',   // here your php file to do something with postdata
      data: $('form').serialize(), // here you set the data to send to php file
      success: function (data) {
        sessionStorage.setItem('token', data);
        alert("Successfully Logged In");
        window.location.replace('index.html');
      }
    });
    
  }
}
$(function () {
  $('#form').on('submit', function (e) {
    e.preventDefault();
    checkCreds();
  });
});