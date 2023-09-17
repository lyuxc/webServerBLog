const { exec } =  require('../db/mysql')

const getTypeList = async () => {
    let sql = `select * from tb_category where 1=1`
    const typelist = await exec(sql)

    // for循环 可以等异步执行结束后才进入下一个迭代
    for (const el of typelist) {
        el['products'] = await getGoodList(el.category_id);
    }

    // 方法2 
    // const data = []
    // typelist.map((el, index) => {
    //     data.push(getGoodList(el.category_id))
    // })
    // const p = await Promise.all(data)
    // typelist[0]['products'] = p[0]
    // typelist[1]['products'] = p[1]
    return typelist
}

const getGoodList = async (id) => {
    // let sql = `select * from tb_goods where 1=1`
    let sql = `select * from tb_goods where 1=1`
    if(id) {
        sql += ` and category_id='${id}'`
    }
    return await exec(sql)
}

const addGood = async (body) => {
    const { good_name, category_id, price, original_price, quantity } = body
    let sql = `
        INSERT INTO tb_goods (goods_name, quantity, price, original_price, category_id)
        VALUES ('${good_name}', '${quantity}', '${price}', '${original_price}', '${category_id}');
    `
    const addRes = await exec(sql)
    return {
        id: addRes.insertId
    }
}

const deleteGood = async (id) => {
    const sql = `delete from tb_goods where goods_id = ${id}`
    const delData = await exec(sql)
    if(delData.affectedRows > 0) {
        return true
    }
}

module.exports = {
    getGoodList,
    getTypeList,
    addGood,
    deleteGood
}