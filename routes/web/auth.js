var express = require('express');
const UserModel = require('../../models/UserModel')

var router = express.Router();
// 注册页面
router.get('/reg', function (req, res, next) {
  // 获取请求体数据
  res.render('auth/reg')
});
// 注册接口
router.post('/reg', function (req, res, next) {
  // 获取请求体数据
  // 校验入参
  console.log('req.body', req.body);
  const result = UserModel.create({
    username: req.body.username,
    password: req.body.password,
  })
    if (result) {
        res.render('success', { msg: '注册成功', url: '/account' })
    } else {
        res.status(500).send('注册失败，请稍后再试～')
    }
});


// 登录页面
router.get('/login', function (req, res, next) {
    // 获取请求体数据
    res.render('auth/login')
});

// 登录接口
router.post('/login', async function (req, res, next) {
    // 获取请求体数据
    const { username, password } = req.body;
    const result = await UserModel.findOne({ username, password })
    console.log('login req.body: ', req.body);

    console.log('login result: ', result);

    if (result) {
        req.session.username = username;
        req.session._id = result._id;
        res.render('success', { msg: '登录成功', url: '/account' })
        return;
    }
    res.status(500).send('登录失败，请稍后再试～');
    return res.send('账号或密码错误～')

});

// 退出登录
router.get('/loginOut', function (req, res, next) {
    req.session.destroy(() => {
        res.render('success', { msg: '已退出登录', url: '/account' })
    })
});

module.exports = router;
