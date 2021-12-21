const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
// const sql = 'select * from users;'
const sql = 'select * from blogs;'
// const sql = `update users set realname = '李四' where id = '7';`
// const sql = `insert into blogs (title, content, createtime, author) values ('标题6','内容6','1622798910021','老六');` 
con.query(sql, (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('res:', res)
})

// 关闭连接
con.end()