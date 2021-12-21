var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, upDateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET blog page. */
router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isadmin) {
      // 管理员界面
      // const loginCheckRes = loginCheck(req)
      if (req.session.realname == '') {
          // 未登录
          res.json(
            new ErrorModel('未登录')
          )
          return
      }
      // 强制查询自己的博客
      author = req.session.realname
  }

  const result = getList(author, keyword)
  return result.then(listData => {
      // return new SuccessModel(listData)
      res.json(
        new SuccessModel(listData)
      )
  })
});

router.get('/detail', (req, res, next) => {
  // 获取博客详情 http://localhost:8000/api/blog/detail?id=6
  const result = getDetail(req.query.id)
  return result.then(data => {
      res.json(
        new SuccessModel(data)
      ) 
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.realname
  const result = newBlog(req.body)
  return result.then(data => {
      res.json(
        new SuccessModel(data)
      )
  })

})

router.post('/update', loginCheck, (req, res, next) => {
  const result = upDateBlog(req.query.id, req.body)
  return result.then(data => {
      if(data) {
        res.json(
           new SuccessModel('更新博客成功')
        )
      } else {
        res.json(
          new ErrorModel('更新博客失败')
        )
      }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.realname
  // const author = '鲁迅' // 假数据，待开发登录时再改成真实数据
  const result = delBlog(req.query.id, author)
  return result.then(data => {
      console.log('datadata', data)
      if (data) {
          res.json(
            new SuccessModel('删除成功')
          )
      } else {
          res.json(
            new ErrorModel('删除博客失败')
          )
      }
  })
})
module.exports = router;
