const http = require('http')
const serverHandle = require('../app')
const server = http.createServer(serverHandle)
const PORT = 8000

server.listen(PORT)