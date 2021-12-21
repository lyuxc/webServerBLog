const http = require('http')
const querystring = require('querystring')

//http://localhost:8000/?old=18&score=88&sex=male

// const server = http.createServer((req, res) => {
//     // console.log('req: ', req)
//     console.log('method: ', req.method)
//     const url = req.url
//     console.log('url: ', url)
//     req.query = querystring.parse(url.split('?')[1])
//     console.log('query: ', req.query)
//     // res.end(JSON.stringify(req.query))
//     res.write(`<h1>${JSON.stringify(req.query)}</h1>`)
// })

// const server = http.createServer((req, res)=>{
//     if (req.method === 'POST') {
//         // req 数据格式
//         console.log('req content-type: ', req.headers['content-type'])
//         // 接收数据
//         let postData = ''
//         req.on('data', chunk => {
//             postData += chunk.toString()
//         })
//         req.on('end', () => {
//             console.log('postData:', postData)
//             res.end('post end !!!!')
//         })
//     }
// })



// http://localhost:8000/api/blog/list?old=18&score=88&sex=male
const server = http.createServer((req, res)=>{
    const { method, url }  = req
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])

    // 设置返回格式为JSON
    res.setHeader('Content-type', 'application/json')

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    }

    // 返回
    if (method === "GET") {
        res.end(
            JSON.stringify(resData)
        )
    } else if (method === 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            resData.postData = postData
            // 返回
            res.end(
                JSON.stringify(resData)
            )
        })
    }


})

server.listen(8000) 
