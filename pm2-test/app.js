const http = require('http')

const server = http.createServer((req, res) => {
    // 模拟日志
    console.log('cur time', Date.now())
    console.error('error', Date.now())
    if(req.url === '/err') {
        throw new Error('/err 出错了')
    }
    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            error: 0,
            msg: 'pm2 test server 111'
        })
    )
})

server.listen(8000)
console.log('server is listening on port 8000....')