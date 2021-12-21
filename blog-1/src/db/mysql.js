const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            // console.log('111sql:', sql)
            // console.log('111res:', res)
            if (err) {
                reject(err)
                // console.error(err)
                return
            }
            // console.log('res:', res)
            resolve(res)
        })
    })
    return promise
}

module.exports = {
    exec
}