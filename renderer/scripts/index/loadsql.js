$.get('https://brothersinallah.ga/api/sql.php', function(data) {
    const arr = JSON.parse(data)
    arr.forEach(message => {
        loadMSG(message)
    });
  });

function loadMSG(msgData){
    
    var pos = 'left'
    var Cclass = "container"

    if(msgData['sent'] === sessionStorage.getItem('username')){
        pos = 'right'
        Cclass = "container darker"
    }

    var decryptedmsg = CryptoJS.AES.decrypt(msgData['message'], decPass).toString(CryptoJS.enc.Utf8);
    console.log(`Decrypted: ${decryptedmsg}`)

    const node = document.createElement("div");
    node.className = "RetrievedMessage " + Cclass;

    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = `${msgData['sent']}:`;

    const img = document.createElement("img");
    img.src = "https://brothersinallah.ga/ProfilePics/" + msgData['pfp'];
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
}