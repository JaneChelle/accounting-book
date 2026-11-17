var express = require('express');
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/UserModel')

var router = express.Router();

// 登录接口
router.post('/login', async function (req, res, next) {
    // 获取请求体数据
    const { username, password } = req.body;
    const result = await UserModel.findOne({ username, password })
    console.log('login req.body: ', req.body);

    console.log('login result: ', result);

    if (result) {
        // 1、创建 token
        const token = jwt.sign({
            username,
            _id: result._id,
        }, 'atguigu', {
            expiresIn: 60 * 60 * 24 * 7
        })
        res.json({
            code: '0000',
            msg: '登录成功',
            data: token
        })
        return;
    }
    if (!result) {
        return  res.json({
            code: '2002',
            msg: '用户名或者密码错误～～',
            data: null
        })
    }

});

// 退出登录
router.get('/loginOut', function (req, res, next) {
    req.session.destroy(() => {
        res.render('success', { msg: '已退出登录', url: '/account' })
    })
});

module.exports = router;
