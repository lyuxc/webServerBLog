const { exec } = require('../db/mysql')

const login = (username, password) => {
    const sql = `
        select username, realname from users where username = '${username}' and password = '${password}'
    `
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