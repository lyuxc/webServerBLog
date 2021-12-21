var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET blog page. */
router.post('/login', function(req, res, next) {
    // console.log('req:', req.body);
    const { username, password } = req.body
    const result = login(username, password)

    return result.then(data => {
        console.log('login-data2-res', data)
        if (data.username) {
            // 操作 cookie
            // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
            req.session.username = data.username
            req.session.realname = data.realname
                         
            res.json(
                new SuccessModel(data, '登录成功')
            )
            return
        }
        res.json(
            new ErrorModel('账号或者密码错误!!')
        )
    })
});

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: '已登陆'
        })
        return
    }
    res.json({
        errno: -1,
        msg: '未登陆'
    })
})

router.get('/session-test', (req, res, next) => {
    const session = req.session
    if (session.viewNum == null) {
        session.viewNum = 0
    }
    session.viewNum++
    res.json({
        viewNum: session.viewNum
    })
})

module.exports = router;
