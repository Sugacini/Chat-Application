const socket = io();
let roomName2;
let idValue = [];
let count = 0;
let user1;
let user2;

var role;



let submit = document.getElementById("sendMessage");
submit.addEventListener("click", () => {
    count++;
    idValue.push(socket.id);
    console.log(roomName2)
    let inputMsg = (document.getElementById("inputValue").value);
    let roomName = document.getElementById("rName").value;
    
    // if (roomName == "") {
        console.log(user1);
        console.log(user2);
        if(role == "creater"){
           
            socket.emit("submitEvent", { room: roomName2, input: inputMsg, name:user1 });
        }
        else{
            socket.emit("submitEvent", { room: roomName2, input: inputMsg, name:user2 });
        }
    console.log(idValue);
    console.log(roomName);
    console.log(inputMsg);
    if(count == 2){
        count = 0;
        idValue = [];
    }
})

document.getElementById('createRoom').addEventListener('click',()=>{
    role='creater';
})
document.getElementById('joinRoom').addEventListener('click',()=>{
    role='member';
})



socket.on("message", (msg, name) => {
    console.log(document.getElementById("message"));
    // let liEle = document.createElement("li");
    // console.log(name);
    // liEle.textContent = name+"\n"+msg;
    // document.getElementById("message").appendChild(liEle);
    let liEle = document.createElement("div");
    liEle.id = "msgDiv";
    let pEle = document.createElement("p");
    pEle.className = "msg1";
    let pEle1 = document.createElement("p");
    pEle1.className = "msg";
    pEle.textContent = name;
    pEle1.textContent = msg;
    liEle.appendChild(pEle);
    liEle.appendChild(pEle1);
    document.getElementById("message").appendChild(liEle);
})

let roomType;

function room(choice) {
    console.log(choice)
    document.getElementsByClassName("firstPage")[0].style.display = "none";
    document.getElementsByClassName("roomCreated")[0].style.display = "block";
    roomType = choice;
}

let joinRoom = document.getElementById("roomName");
joinRoom.addEventListener("click", () => {
    let rm1 = document.getElementById("rName").value;
    roomName2 = rm1;
    document.getElementById("nameOfRoom").textContent = "Room Name: "+rm1;
    console.log(rm1);
    console.log(roomType);
    socket.emit("joinRoom", rm1, roomType);
})

let joinRoom1 = document.getElementById("roomName1");
joinRoom1.addEventListener("click", () => {
    let rm = document.getElementById("rName1").value;
    roomName2 = rm;
    document.getElementById("nameOfRoom").textContent = "Room Name: "+rm;
    console.log(rm);
    console.log(roomType);
    socket.emit("joinRoom", rm, roomType);
})

function hide() {
    document.getElementsByClassName("roomCreated")[0].style.display = "none";
    document.getElementsByClassName("create")[0].style.display = "block";
}

function hide1() {
    document.getElementsByClassName("roomCreated")[0].style.display = "none";
    document.getElementsByClassName("roomJoin")[0].style.display = "block";
}

function join() {
    user1 = prompt("Enter the user Name");
    document.getElementById("user").textContent = "User Name: "+user1;
    document.getElementsByClassName("create")[0].style.display = "none";
    document.getElementsByClassName("outerDiv")[0].style.display = "block";
    document.getElementById("header").style.display = "block";
}

function join1() {
    user2 = prompt("Enter the user Name");
    document.getElementById("user").textContent = "User Name: "+user2;
    document.getElementsByClassName("roomJoin")[0].style.display = "none";
    document.getElementsByClassName("outerDiv")[0].style.display = "block";
    document.getElementById("header").style.display = "block";
}

document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        document.getElementById("sendMessage").click();
        document.getElementById("inputValue").value = "";
    }
})