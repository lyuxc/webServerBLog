const router = require('koa-router')()
const { login, create } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body
    const data = await login(username, password)
    console.log('users-login', data)
    if (data.username) {
        // 操作 cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        ctx.session.username = data.username
        ctx.session.realname = data.realname
                     
        ctx.body = new SuccessModel(data, '登录成功')
        return
    }
    ctx.body = new ErrorModel('账号或者密码错误!!')
})

router.post('/create', async function (ctx, next) {
    const { username, realname } = ctx.request.body
    const data = await create(username, realname)
    ctx.body = new SuccessModel(data)
})

// router.get('/session-test', async function (ctx, next) {
//     console.log('test-------------', ctx.session.viewCount)
//     // if (ctx.session.viewCount == null) {
//     //     ctx.session.viewCount = 0
//     // }
//     ctx.session.viewCount++

//     ctx.body = { 
//         errno: 0,
//         viewCount: ctx.session.viewCount
//     }

// })

module.exports = router
