const { exec } = require('../db/mysql')
const getList = (author, keyWord) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyWord) {
        sql += `and title like '%${keyWord}%' `
    }
    sql += `order by createtime desc;`
    // 返回promise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id = '${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
    // return {
    //     id: id,
    //     title: '标题3',
    //     content: '内容3',
    //     author: 'Jerry',
    //     createtime: '',
    // }
}

const newBlog = (blogData ={}) => {
    // blogData 是一个博客对象，包含title content 属性
    const { title, content, author } = blogData
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createTime}', '${author}');
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const upDateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    console.log('update blog', id, blogData)
    const sql = `
        update blogs set title='${title}', content='${content}' where id = ${id};
    `

    return exec(sql).then(updateData => {
        // console.log('update is :', updateData)
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id = ${id} and author = '${author}'`
    return exec(sql).then(deleData => {
        if(deleData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
}