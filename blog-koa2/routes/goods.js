const router = require('koa-router')()
const { getGoodList, getTypeList, addGood, deleteGood } = require('../controller/good')
const { SuccessModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/good')

router.get('/list', async function (ctx, next) {
  const listData = await getGoodList()
  ctx.body = new SuccessModel(listData)
})

router.get('/typeList', async function (ctx, next) {
  const typeListData = await getTypeList()
  ctx.body = new SuccessModel(typeListData)
})

router.post('/add', async function (ctx, next) {
  const body = ctx.request.body
  const data = await addGood(body)
  ctx.body = new SuccessModel(data)
})

router.post('/delete', loginCheck,  async function (ctx, next) {
  const author = ctx.session.realname
  const id = ctx.request.body.id
  const data = await deleteGood(id)
  if(data) {
    ctx.body = new SuccessModel('删除成功')
  } else {
    ctx.body = new ErrorModel('删除商品失败')
  }
})

module.exports = router
