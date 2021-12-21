const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取cookie的过期时间 
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is', d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const { method, url, query: { id }, body } = req
    // console.log('111', req)
    const path = url.split('?')[0]
    console.log('path2:', path)
    console.log('method2:', method)
    console.log('id2', id)

    // 登录 http://localhost:8000/api/user/login?username=zhangsan&password=123
    if (method === "POST" && path === '/api/user/login') {
        const { username, password } = body
        console.log('222', body)
        // const { username, password } = req.query
        const result = login(username, password)

        return result.then(data => {
            console.log('login-data2', data)
            if (data.username) {
                // 操作 cookie
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session is :', req.session)
                             
                return new SuccessModel(data, '登录成功')
            } else {
                return new ErrorModel('账号或者密码错误')
            }
        })
    } 

    // 登录验证的测试 http://localhost:8000/api/user/login-test
    if (method === "GET" && path === '/api/user/login-test') {
        console.log('login-test', req.cookie)
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    // username: req.cookie
                    session: req.session
                })
            )
        } 
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }

}

module.exports = handleUserRouter