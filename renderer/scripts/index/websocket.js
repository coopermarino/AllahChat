function RunWebSocket() {
const Pass = "Allah";
console.log(`using decryption pass ${Pass}`)

if(Pass != null){
    decPass = Pass
}else{
    user = prompt("Please enter the decryption password:", "");
    console.log(`using decryption pass ${user}`)
    if (user != "" && user != null) {
    localStorage.setItem('Password', user);
        decPass = user
    }
}

const sessionUsername = sessionStorage.getItem('username');
const sessionPfp = sessionStorage.getItem('pfp');
console.log(sessionUsername)
const ws = new WebSocket(`ws://cmarino.ddns.net:3000`);

ws.addEventListener("message", function(event) {
    const data = JSON.parse(event.data);
    console.log(data)
    if (data.type === "message") {
    console.log('Recieved Message', data)
    addMessage(data.data, data.sent, data.pfp);

    // Sends Notification
    var title = `New Message from ${data.sent}:`;
    icon = `https://brothersinallah.ga/ProfilePics/${data.pfp}`;
    var body = `${data.sent} Has sent a Message.`;
    var notification = new Notification(title, { body, icon });

    let showNotification = document.visibilityState !== "visible";

    document.getElementById("audio").play()
    
    }
});

function sendMessage() {
    console.log("sending message")
    const message = document.getElementById("message").value;

    if (!message) return false;

    const encryptedMsgSent = String(CryptoJS.AES.encrypt(message, decPass));
    console.log(`Message Sent Encrypted: ${encryptedMsgSent}`)

    ws.send(JSON.stringify({ type: "message", sent: sessionUsername, data: encryptedMsgSent, pfp: sessionPfp}));
    addMessage(encryptedMsgSent, sessionUsername, sessionPfp);
    document.getElementById("message").value = "";
}

function addMessage(message, sender, pfp) {

var pos = 'left'
var Cclass = "container"

if(sender === sessionUsername){
    pos = 'right'
    Cclass = "container darker"
}

    var decryptedmsg = CryptoJS.AES.decrypt(message, decPass).toString(CryptoJS.enc.Utf8);
    console.log(`Decrypted: ${decryptedmsg}`)

    const node = document.createElement("div");
    node.className = "RetrievedMessage " + Cclass;

    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = `${sender}:`;

    const img = document.createElement("img");
    img.src = "https://brothersinallah.ga/ProfilePics/" + pfp;
    img.alt = "Avatar";
    img.className = pos;
    img.style.width = "100%";

    const p = document.createElement("p");
    p.id = "encmessage";
    p.className = "enc";
    p.textContent = decryptedmsg;

    node.appendChild(nameSpan);
    node.appendChild(img);
    node.appendChild(p);

    document.getElementById("chat").appendChild(node);

    var chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight +100;

    $.ajax({
        type: 'post',
        url: 'http://cmarino.ddns.net/api/addsql.php',
        data: {
          name: sessionUsername,
          pfp: sessionPfp,
          message: message
        },
        success: function(data) {
          console.log(data);
        }
      });
    
   

}

document.addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
    sendMessage();
    }
});

document.getElementById('sendmsgbtn').addEventListener('click', sendMessage);
}