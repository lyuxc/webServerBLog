const router = require('koa-router')()
const { getList, getDetail, newBlog, upDateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  console.log('author---', ctx.session.realname)
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
      console.log('is admin')
      // 管理员界面
      // const loginCheckRes = loginCheck(ctx)
      if (ctx.session.realname == null) {
          console.error('is admin, but no login')
          // 未登录
          ctx.body = new ErrorModel('未登录')
          return
      }
      // 强制查询自己的博客
      author = ctx.session.realname
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/column', async function(ctx, next) {
  const data = [
    {
        classname: '集团要闻',
        classid: 2,
        classpath: 'news_recommend2'
    },
    {
        classname: '集团简讯',
        classid: 3,
        classpath: 'news_recommend3'
    }
  ]
  ctx.body = new SuccessModel(data)
})

router.get('/detail', async function(ctx, next) {
  // 获取博客详情 http://localhost:8000/api/blog/detail?id=6
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function (ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.realname
  
  const data = await newBlog(body)
  console.log('ddata', data)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async function (ctx, next) {
  const val = await upDateBlog(ctx.query.id, ctx.request.body)
  if(val) {
    ctx.body = new SuccessModel('更新博客成功')
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', loginCheck,  async function (ctx, next) {
  const author = ctx.session.realname
  // const author = '鲁迅' // 假数据，待开发登录时再改成真实数据
  const data = await delBlog(ctx.query.id, author)
  if (data) {
    ctx.body = new SuccessModel('删除成功')
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
