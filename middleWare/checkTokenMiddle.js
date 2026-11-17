const jwt = require('jsonwebtoken')
const AccountModel = require('../models/AccountModel')

module.exports = (req, res, next) => {
    const token = req.get('token')

    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token 缺失～',
            data: null,
        })
    }
    jwt.verify(token, 'atguigu', async (err, data) => {
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token 校验失败～',
                data: null
            })
        }

        req.user = data
        // token 校验成功，继续执行
        next()


    })

}