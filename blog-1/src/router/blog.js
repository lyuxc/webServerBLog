const { getList, getDetail, newBlog, upDateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    } 
}

const handleBlogRouter = (req, res) => {
    const { method, url, query: { id } } = req
    const path = url.split('?')[0]
    // console.log('url:', url)
    // console.log('path:', path)
    // console.log('method:', method)
    // console.log('req.query:', req.query)
    // console.log('req.session', req.session)

    // 获取博客列表 http://localhost:8000/api/blog/list?author=%E5%BC%A0%E4%B8%89&keyword=%E6%A0%87%E9%A2%98
    if (method === "GET" && path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckRes = loginCheck(req)
            if (loginCheckRes) {
                // 未登录
                return loginCheckRes
            }
            // 强制查询自己的博客
            author = req.session.realname
        }
        const res = getList(author, keyword)
        return res.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情 http://localhost:8000/api/blog/detail?id=6
    if (method === "GET" && path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const res = getDetail(id)
        return res.then(data => {
            // console.log('data', data)
            return new SuccessModel(data)
        })
    }

    /**
     * 新建博客
     * {{ip}}/api/blog/new
     * body = { "title": "狂人日记","content": "小说","author": "鲁迅" } 
     */
    if (method === "POST" && path === '/api/blog/new') {
        // const data = newBlog(req.body)
        const loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            // 未登录
            return loginCheckRes
        }
 
        // const author = '鲁迅'
        req.body.author = req.session.realname
        // req.body.author = author
        const res = newBlog(req.body)
        return res.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === "POST" && path === '/api/blog/update') {
        const loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            // 未登录
            return loginCheckRes
        }
        const res = upDateBlog(id, req.body)
        return res.then(data => {
            if(data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除博客
    if (method === "POST" && path === '/api/blog/del') {
        const loginCheckRes = loginCheck(req)
        if (loginCheckRes) {
            // 未登录
            return loginCheckRes
        }
        const author = req.session.realname
        // const author = '鲁迅' // 假数据，待开发登录时再改成真实数据
        const res = delBlog(id, author)
        return res.then(data => {
            if (data) {
                return new SuccessModel(res)
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter