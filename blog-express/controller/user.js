const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username)

    // 生成加密密码
    // password = genPassword(password)
    // password = escape(password)
    // console.log('username:', username)
    // console.log('password:', password)
    const sql = `
        select username, realname from users where username = ${username} and password = '${password}'
    `
    // console.log('sql:', sql)
    return exec(sql).then(rows => {
        // console.log('loginData::', rows)
        return rows[0] || {}
    })
    // 先用假数据
    // if (username === 'zhangsan' && password === '123123') {
    //     return true
    // }
    // return false
}

module.exports = {
    login
}