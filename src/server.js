let server = require('http').createServer()

let agents = new Set()

let io = require('socket.io')(server)
    io.on('connection', (agent) => {
        console.log("Agent connected")

        agents.add( agent )
    
        agent.on("disconect", () => {
            console.log("Agent disconected")

            agents.delete( agent )
        })
    })

server.listen(3000)

let startTurn = () => Promise.all( agents.entries().map( agent => new Promise( (resolve, reject) => 
        agent.emit("turn", data => resolve([agent, data]))
    ) ) )
        .then((moves) => {
            
        })
        .catch(error => console.log(error))

process.stdin.setRawMode(true)
process.stdin.resume()
process.stdin.on('data', (data) => {
    if ( "" + data == String.fromCharCode(03) ) {
        return process.exit()
    }

    startTurn()
})