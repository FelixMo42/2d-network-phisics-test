module.exports = (socket) => {
    console.log("Agent connected")


    socket.on("disconect", () => {
        console.log("Agent disconected")
    })
}