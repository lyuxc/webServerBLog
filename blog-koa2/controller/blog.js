// const xxs = require('xxs')
const { exec } = require('../db/mysql')

const getList = async (author, keyWord) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyWord) {
        sql += `and title like '%${keyWord}%' `
    }
    sql += `order by createtime desc;`
    // 返回promise

    return await exec(sql)
}

const getDetail = async (id) => {
    let sql = `select * from blogs where id = '${id}'`
    const rs = await exec(sql)
    return rs[0]
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含title content 属性
    const { title, content, author } = blogData
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createTime}', '${author}');
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const upDateBlog = async (id, blogData = {}) => {
    const { title, content } = blogData
    console.log('update blog', id, blogData)
    const sql = `
        update blogs set title='${title}', content='${content}' where id = ${id};
    `
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    const sql = `delete from blogs where id = ${id} and author = '${author}'`
    const deleData = await exec(sql)
    if(deleData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    upDateBlog,
    delBlog
}