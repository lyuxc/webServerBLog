-[app.use](#app.use)

-[express开发接口](#express开发接口)

-[日志](#日志)

### app.use

### 代码汇总的next参数是什么？

### express开发接口

- 初始化项目，之前的本分代码可以复用

  - 安装mysql xss

    `npm install mysql xxs --save --registry=https://registry.npmmirror.com`

  - mysql controller resModel相关代码可复用

  - 初始化路由

- 开发路由，并实现登陆

  - 使用express-session和redis和connect-redis,简单方便

    `npm install express-session --save --registry=https://registry.npmmirror.com` 

    `npm i redis connect-redis --save --registry=https://registry.npmmirror.com `

  - req.session保存登陆信息，登陆校验做成express中间件

- 记录日志

### 日志
- access log记录，直接使用脚手架推荐的 morgan
- 自定义日志使用 console.log 和 console.error 即可
- 日志文件拆分、日志内容分析



