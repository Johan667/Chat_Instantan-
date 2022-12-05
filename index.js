// Parti serveur

// On instancie expreess
const app = require("express")();

// On crée le serveur http
const http = require("http").createServer(app);

// On instancie socket.io
const io = require("socket.io")(http);

// On crée la route /
app.get("/", (req, res) => {
res.sendFile(__dirname+"/index.html")
})
// On ecoute l'evenement connexion de socket.io
io.on("connection", (socket) => {
    console.log("Une connexion est mise en place");
    // On ecoute les deconnexions
    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est déconnecter");
    });

    // On gère le CHAT
    socket.on("chat_message", (msg) => {
        // Le serveur recois bien le message envoyer
        io.emit("chat_message", msg);
        // Le serveur recois le message et le retransmet
    })

});


// On demandes au serveur http de repondre sur le port :3000

http.listen(3000, () => {
    console.log("J'écoute le port 3000")
})

// Sert à avoir une page blanche qui prouve que le serveur fonctionne
// La page indique qu'il ne trouve pas la route '/'

