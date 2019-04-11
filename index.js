const app = require('express')();
const server = app.listen(80, () => {
    console.log("Chat server başladı");
})
const io = require("socket.io").listen(server); // socket.io yu express serverine bağladık

// Pug template engine kullancağmızı belirttik
app.set('view engine', 'pug');

app.get('/chat', (req, res) => {
    res.render('index', {
        title: "Chat!"
    })
})

//ilk eventimizi yazalım
//Client servera ilk bağlandığında "connection" eventine
//kendi socket objesini gönderir
io.on("connection", (socket) => {
    console.log("Biri bağlandı");
    socket.on('chat message', (data) => {
        console.log("Biri mesaj gönderdi: " + data);
        //Bütün herkese bu mesajı gönderelim.
        io.emit('chat message', data);
    })

    socket.on("disconnect", () => {
        console.log("Biri ayrıldı");
    })
})