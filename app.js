
let express = require("express");
let path = require("path");
let app = express();
const http = require("http");
const socketio = require("socket.io");

app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

const pubDir = path.join(__dirname, "/public");
app.use(express.static(pubDir));

app.get("/", (req, res) => {
    res.render("home");
})

let users = [];

io.on("connection", (socket) => {

    socket.emit("msg", "This is socket");

    socket.on("submitEvent", (roomObj) => {
        console.log(roomObj.name);
        console.log("su:" + roomObj.room);
        console.log(roomObj);
        io.to(roomObj.room).emit("message", roomObj.input, roomObj.name);
        console.log(roomObj.input);
    })

    socket.on("joinRoom", (roomName, type) => {
        if (type == "private") {
            console.log("r" + roomName);
            users.push(socket.id);
            console.log(users);
            console.log(users.length);
            if (users.length > 2) {
                console.log("The room is private");
                socket.emit("privateRoom", "The room is private");
                socket.disconnect();
                return
            }
            console.log(type);
            console.log("rm" + roomName);
            socket.join(roomName);
            console.log("User connected", roomName);
        }
        else {
            console.log(type);
            console.log("re" + roomName);
            socket.join(roomName);
            console.log("User connected", roomName);
        }

    })
})

server.listen(3700, () => {
    console.log("server connected port is 3700");
})