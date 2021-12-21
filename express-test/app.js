const express = require('express')

// 本次 http 请求的实例
const app = express()
 
app.use((req, res, next) => {
    console.log('请求开始。。。。', 'method: ' + req.method, 'url: ' + req.url)
    next()
})

app.use((req, res, next) => {
    // 
    req.cookie = {
        userId: 'abc123',
        _a: 'ksdnidnv823n283yb23823'
    }
    next()
})

app.use((req, res, next) => {
    // 假设处理post data
    // 异步
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 100
        }
        next()
    })
})

app.use('/api', (rew, res, next) => {
    console.log('处理/api路由')
    next()
})

app.get('/api', (rew, res, next) => {
    console.log('get /api 路由')
    next()
})

app.post('/api', (rew, res, next) => {
    console.log('post /api 路由')
    next()
})


// 模拟登陆验证
function loginCheck(req, res, next) {
    console.log('模拟登陆成功')
    const a = Math.floor(Math.random() * 10)
    console.log('a', a)
    setTimeout(() => {
        if (a>=4) {
            next()
            return
        }
        res.json({
            errno: -1,
            message: '登陆失败'
        })
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie', req.cookie)
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api.get-post-data')
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理 404')
    res.json({
        errno: -1,
        msg: '404 not fount'
    })
})

app.listen(3000, () => {
    console.log('server is running listen 3000 ')
})