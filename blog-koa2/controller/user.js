const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    username = escape(username)

    // 生成加密密码
    // password = genPassword(password)
    // password = escape(password)
    // console.log('username:', username)
    // console.log('password:', password)
    const sql = `
        select username, realname from users where username = ${username} and password = '${password}'
    `
    const rows = await exec(sql)
    return rows[0] || {}

    // return exec(sql).then(rows => {
    //     return rows[0] || {}
    // })
    // 先用假数据
    // if (username === 'zhangsan' && password === '123123') {
    //     return true
    // }
    // return false
}

const create = async (username, realname) => {
    console.info('controller-user:', username, realname)
    const sql = `
        insert into users (username, password, realname) values ('${username}', 111111, '${realname}');
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

module.exports = {
    login,
    create
}